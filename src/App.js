import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import LoginStudent from 'pages/LoginStudent'
import Home from 'pages/Home'
import RegisterStudent from 'pages/RegisterStudent'
import HttpNotFound from 'pages/error/HttpNotFound'

const App = () => (
    <Fragment>
        <Router>
            <Switch>

                <Route exact path="/" component={LoginStudent} />
                <Route exact path="/register" component={RegisterStudent} />
                <Route exact path="/home" component={Home} />

                <Route component={HttpNotFound} />
            </Switch>
        </Router>
    </Fragment>
)

export default App
