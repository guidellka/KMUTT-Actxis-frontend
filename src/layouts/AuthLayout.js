import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const AuthLayout = ({ children, userId }) => (
        <Fragment>
            {children}
            {!userId && <Redirect to="/" />}
        </Fragment>
    )

const mapStateToProps = state => ({
    userId: state.login.userId,
})

export default connect(mapStateToProps)(AuthLayout)