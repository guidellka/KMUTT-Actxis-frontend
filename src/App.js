import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import LoginStudent from 'pages/LoginStudent'
import LoginStaff from 'pages/LoginStaff'
import RegisterStudent from 'pages/RegisterStudent'
import Home from 'pages/Home'
import CreateProject from 'pages/CreateProject'
import ViewProject from 'pages/ViewProject'
import HttpNotFound from 'pages/error/HttpNotFound'

import Test from 'pages/test'
import FormPage from 'pages/FormPage'
import Tracking from 'pages/Tracking'

const App = () => (
    <Fragment>
        <Router>
            <Switch>
                <Route exact path="/" component={LoginStudent} />
                <Route exact path="/register" component={RegisterStudent} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/create" component={CreateProject} />

                <Route exact path="/staff" component={LoginStaff} />
                <Route exact path="/lec/home" component={LoginStaff} />

                {/* mock up front-end */}
                <Route exact path="/view" component={ViewProject} />
                <Route exact path="/tracking" component={Tracking} />



                {/* <Route exact path="/projects/:project_id/docs/:doctype_id/create" component={FormPage} /> */}
                <Route exact path="/test" component={Test} />
                <Route exact path="/form" component={FormPage} />


                <Route component={HttpNotFound} />
            </Switch>
        </Router>
    </Fragment>
)

export default App
