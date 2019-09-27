import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import './assets/css/fonts.css'
import './assets/css/styles.css'
import './assets/css/responsive.css'

import createStore from './redux'

ReactDOM.render(
    <Provider store={createStore()} >
        <App />
    </Provider>,
    document.getElementById('root')
)
