import React from 'react'
import cn from 'classnames'

import NodeTable from 'components/NodeTable'
import NodesStatus from 'components/NodesStatus'
import * as api from 'helpers/api'

import styles from './Root.module.scss'

export default class Root extends React.Component {
  state = {}

  updateStatusRun = () => {
    this.updateStatus()
      .finally(() => {
        setTimeout(() => {
          this.updateStatusRun()
        }, 3000)
      })
  }

  updateStatus = () => {
    return api.getAll()
      .then(data => {
        const { nodes, allNodesDataCount } = data
        this.setState({ nodes, allNodesDataCount })
      })
  }

  stopNode = (pid) => {
    return api.deleteOne(pid)
      .finally(() => {
        return this.updateStatus()
      })
  }

  componentDidMount () {
    this.updateStatusRun()
  }

  render () {
    const { nodes, allNodesDataCount } = this.state

    return (
      <div className={cn(styles.root)}>
        <h1>Node List</h1>
        {
          nodes ? (
            <>
              <NodeTable nodes={nodes} stopNode={this.stopNode} />
              <NodesStatus allNodesDataCount={allNodesDataCount} />
            </>
          ) : (
            <div className='text-center m-3'>
              <div className='spinner-border' />
            </div>
          )
        }
      </div>
    )
  }
}
