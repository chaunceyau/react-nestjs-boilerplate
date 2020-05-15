import React from 'react'
import ReactDOM from 'react-dom'
//
import './assets/styles/index.css'
//
import App from './modules/app/app'
import * as serviceWorker from './modules/app/serviceWorker'
import AppProviders from './modules/common/app-providers'
import { Pay } from './modules/stripe/pay'

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
