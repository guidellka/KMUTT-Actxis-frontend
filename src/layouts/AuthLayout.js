import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

/*
    - /user_data/${getUser.id} 
        first_name
        last_name
        email
        is_lecturer
        student_id
    
    - /organization_name/${getUser.id}
        isOrgan
        organName
*/

const AuthLayout = ({ children, userId, mail, organName}) => {

    useEffect(() => {
        fetchUserData()
        fetchOrgan()
    }, [])

    const fetchUserData = async () => {
        if (!mail) {
            // code axios
        }
    }

    const fetchOrgan = async () => {
        if (organName) {
            // code axios
        }
    }


    return (
        <Fragment>
            {children}
            {!userId && <Redirect to="/" />}
        </Fragment>
    )
}

const mapStateToProps = ({ login: { userId,
    mail,
    organName } }) => ({
        userId,
        mail,
        organName
    })
export default connect(mapStateToProps)(AuthLayout)