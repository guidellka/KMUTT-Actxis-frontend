import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Login from 'pages/Login'
import Index from 'pages/Index'
import Projects from 'pages/Projects'
import FormPage from 'pages/FormPage'
import SelectProject from 'pages/SelectProject'
import Tracking from 'pages/Tracking'
import HttpNotFound from 'pages/error/HttpNotFound'

const App = () => (
    <Fragment>
        <Router>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/index" component={Index} />
                <Route exact path="/projects" component={Projects} />
                <Route exact path="/selectProject" component={SelectProject} />
                <Route exact path="/projects/:project_id/docs/:doctype_id/create" component={FormPage} />
                <Route exact path="/form" component={FormPage} />

                <Route exact path="/tracking" component={Tracking} />
                <Route component={HttpNotFound} />
            </Switch>
        </Router>
    </Fragment>
);

export default App
