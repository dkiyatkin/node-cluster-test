import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './NodesStatus.module.scss'

export default class NodesStatus extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    allNodesDataCount: PropTypes.number,
  }

  static defaultProps = {
    allNodesDataCount: 0,
  }

  render () {
    const { allNodesDataCount } = this.props

    return (
      <div className={cn(styles.nodesStatus, this.props.className, 'text-right')}>
        Всего обработанных сообщений: {allNodesDataCount}
      </div>
    )
  }
}
