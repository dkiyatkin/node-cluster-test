const cp = require('child_process')

const config = require('./config.json')

const nodeCount = config.nodeCount
const nodeList = []
let masterNode
let allNodesDataCount = 0
const nodeDataCount = {}

function getRandomArrayItem (items) {
  return items[Math.floor(Math.random() * items.length)]
}

function setRandomMasterNode () {
  console.log('Set random master node')
  const activeNodes = nodeList.filter((oneNode) => !oneNode.killed)
  masterNode = getRandomArrayItem(activeNodes)
  if (masterNode) masterNode.send({ cmd: 'master' })
}

function getRandomWorkerNode () {
  console.log('Get random worker node')
  const activeWorkerNodes = nodeList.filter((oneNode) => (!oneNode.killed && (masterNode !== oneNode)))
  return getRandomArrayItem(activeWorkerNodes)
}

function startAllNodes () {
  console.log('Start all nodes')
  for (let i = 0; i < nodeCount; i++) {
    const oneNode = cp.fork(`${__dirname}/bin/cluster-node`)
    nodeDataCount[oneNode.pid] = 0
    oneNode.on('error', (err) => {
      console.error(`Node ${oneNode.pid}`, err)
    })
    oneNode.on('message', (msg) => {
      if (msg.cmd === 'data') {
        const workerNode = getRandomWorkerNode()
        if (workerNode) {
          workerNode.send({ cmd: 'data', data: msg.data })
          nodeDataCount[workerNode.pid]++
          allNodesDataCount++
        }
      }
    })
    nodeList.push(oneNode)
  }
  setRandomMasterNode()
}

function getNodesInfo () {
  console.log('Get nodes info')
  const info = { allNodesDataCount, nodes: [] }
  nodeList.forEach((oneNode) => {
    info.nodes.push({
      pid: oneNode.pid,
      dataCount: nodeDataCount[oneNode.pid],
      status: oneNode === masterNode ? 'master' : 'worker',
      isActive: !oneNode.killed,
    })
  })
  return info
}

function stopNode (pid) {
  console.log(`Stop node ${pid}`)
  const oneNode = nodeList.find((node) => (node.pid === pid))
  if (!oneNode) return
  oneNode.kill()
  if (oneNode === masterNode) setRandomMasterNode()
}

module.exports = function (req, res) {
  if (req.url.startsWith('/api/')) {
    if (req.method === 'GET') {
      res.setHeader('Content-Type', 'application/json')
      return res.end(JSON.stringify(getNodesInfo()))
    } else if (req.method === 'DELETE') {
      const pid = parseInt(req.url.slice(5))
      stopNode(pid)
      return res.end()
    }
  }
  res.statusCode = 404
  return res.end()
}

startAllNodes()
