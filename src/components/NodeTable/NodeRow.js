import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './NodeRow.module.scss'

export default class NodeRow extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    pid: PropTypes.number,
    dataCount: PropTypes.number,
    status: PropTypes.string,
    isActive: PropTypes.bool,
    stopNode: PropTypes.func,
  }

  state = {
    isPending: false,
  }

  handleClick = () => {
    const { pid, stopNode } = this.props
    this.setState({
      isPending: true,
    })
    stopNode(pid)
      .finally(() => {
        this.setState({
          isPending: false,
        })
      })
  }

  render () {
    const { pid, dataCount, status, isActive } = this.props
    const { isPending } = this.state

    return (
      <tr className={cn(styles.nodeItem, this.props.className)}>
        <th scope='row'>{pid}</th>
        <td>{status}</td>
        <td className='text-nowrap'>
          {
            isActive ? (
              <>
                <span>Работает</span>
                <button type='button' className='btn btn-danger btn-sm ml-4 my-n2' onClick={this.handleClick} disabled={isPending}>
                  {
                    isPending && <span className='spinner-border spinner-border-sm mr-1' />
                  }
                  Выключить
                </button>
              </>
            ) : (
              'Выключен'
            )
          }
        </td>
        <td className='w-100 text-right'>{dataCount}</td>
      </tr>
    )
  }
}
