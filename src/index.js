import React from 'react'
import ReactDOM from 'react-dom'

import Root from 'components/Root'

import 'styles/index.scss'

window.APP = {}
const rootElement = document.getElementById('root')
ReactDOM.render(
  <Root />,
  rootElement
)
