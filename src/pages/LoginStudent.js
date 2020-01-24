import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Icon, Input, Button, Card, message } from 'antd'

import axios from '../scripts/Api'
import LogoImg from 'assets/images/Logo.png'
import { setUserId, setIsUserData, setOrganName, setMail, setStdId, setFirstName, setLastName } from '../redux/login'

const Logo = styled.img`
    height: 140px;
    margin: 0 0 30px 0;
`
const CenterCard = styled.div`
    display: grid;
    margin-top: 40px;
    justify-content: center;
    align-items: center;
`

const LoginStudent = (props) => {
    const { dispatch } = props
    const { getFieldDecorator } = props.form


    const handleSubmit = async (e) => {
        e.preventDefault()
        props.form.validateFields(async (err, values) => {
            if (!err) {
                //check ldap
                const { data } = await axios.post(`/api/v1/login`, values)
                if (!data.status) {
                    dispatch(setStdId(data.cn))
                    dispatch(setMail(data.mail))
                    try {
                        //check username in db ?
                        const { data: getUser } = await axios.get(`/user/${values.username}`)
                        dispatch(setUserId(getUser.id))
                        try {
                            //user have user_data in db?
                            const { data: getUserData } = await axios.get(`/user_data/${getUser.id}`)
                            dispatch(setIsUserData(true))
                            dispatch(setFirstName(getUserData.first_name))
                            dispatch(setLastName(getUserData.last_name))
                            try {
                                //Is student council or student union ?
                                const { data: getOrganUser } = await axios.get(`/organization_name/${getUser.id}`)
                                dispatch(setOrganName(getOrganUser[0].name))
                                //** ลิ้งค์ไปหน้าเเรกขององค์การ & สภา */
                                props.history.push(`/form`)
                            } catch (error) {
                                props.history.push(`/home`)
                            }
                        } catch (error) {
                            props.history.push(`/register`)
                        }


                    } catch (error) {
                        // have not username in db
                        if (error.status || 404) {
                            //create user in db 
                            const { data: userId } = await axios.post(`/users`,
                                {
                                    username: data.cn,
                                })
                            dispatch(setUserId(userId))
                            props.history.push(`/register`)
                        } else {
                            console.error(error)
                        }
                    }
                } else {
                    message.error('รหัสนักศึกษาหรือรหัสผ่านไม่ถูกต้อง !!')
                }
            }
        })
    }

    return (
        <CenterCard>
            <Card style={{ width: 380, textAlign: 'center', borderRadius: 5 }}>
                <Logo src={LogoImg} />
                <Form className="login-form" onSubmit={handleSubmit}>
                    <Form.Item style={{ marginBottom: 0 }}>
                        <p style={{ textAlign: "left", margin: 0, height: 30 }}>รหัสนักศึกษา</p>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'กรุณากรอกรหัสนักศึกษา' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="กรอกรหัสนักศึกษา"
                            />
                        )}
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 20 }}>
                        <p style={{ textAlign: "left", margin: 0, height: 30 }}>รหัสผ่าน</p>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'กรุณากรอกรหัสผ่าน' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="กรอกรหัสผ่าน"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            เข้าสู่ระบบ
                        </Button>
                    </Form.Item>
                </Form>
                <Link to='/staff' >สำหรับอาจารย์เเละบุคลากร คลิกที่นี่</Link>
            </Card>
        </CenterCard>
    )
}

const mapStateToProps = state => ({
    userId: state.login.userId,
    isUserData: state.login.isUserData,
    stdId: state.login.stdId,

})

const WrappedLogin = Form.create()(LoginStudent)

export default connect(mapStateToProps)(WrappedLogin)