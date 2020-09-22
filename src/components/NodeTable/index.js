import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import NodeRow from './NodeRow'

import styles from './index.module.scss'

export default class NodeTable extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    nodes: PropTypes.array,
    stopNode: PropTypes.func,
  }

  static defaultProps = {
    nodes: [],
  }

  render () {
    const { nodes, stopNode } = this.props

    return (
      <table className={cn(styles.nodeTable, this.props.className, 'table table-striped')}>
        <thead>
          <tr>
            <th scope='col'>PID</th>
            <th scope='col'>Статус</th>
            <th scope='col'>Активность</th>
            <th scope='col' className='text-right'>Сообщений</th>
          </tr>
        </thead>
        <tbody>
          {
            nodes.map((oneNode) => {
              return <NodeRow key={oneNode.pid} {...oneNode} stopNode={stopNode} />
            })
          }
        </tbody>
      </table>
    )
  }
}
