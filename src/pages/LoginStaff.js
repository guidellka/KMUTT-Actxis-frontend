import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Icon, Input, Button, Card, message } from 'antd'

import axios from '../scripts/Api'
import LogoImg from 'assets/images/Logo.png'
import { setUserId, setIsUserData, setOrganName, setMail, setFirstName, setLastName } from '../redux/login'




const Logo = styled.img`
    height: 140px;
    margin: 0 0 15px 0;
`
const CenterCard = styled.div`
    display: grid;
    margin-top: 40px;
    justify-content: center;
    align-items: center;
`

const LoginStaff = (props) => {
    const { dispatch } = props
    const { getFieldDecorator } = props.form


    const handleSubmit = async (e) => {
        e.preventDefault()
        props.form.validateFields(async (err, values) => {
            if (!err) {
                //check ldap
                const { data } = await axios.post(`/api/v1/staff/login`, values)
                if (!data.status) {
                    dispatch(setMail(data.mail))
                    console.log('>>> [LoginStudent.js:37] data.cn : ', data.cn)
                    try {
                        //chack username in db ?
                        const { data: getUser } = await axios.get(`/user/${values.username}`)
                        dispatch(setUserId(getUser.id))
                        try {
                            //user have user_data in db?
                            const { data: getUserData } = await axios.get(`/user_data/${getUser.id}`)
                            console.log('>>> [LoginStudent.js:46] getUserData : ', getUserData)
                            dispatch(setIsUserData(true))
                            props.history.push(`/lec/home`)
                        } catch (error) {
                            
                        }

                    } catch (error) {
                        
                    }
                } else {
                    message.error('บัญชีผู้ใช้หรือรหัสผ่านไม่ถูกต้อง !!')
                }
            }
        })
    }

    return (
        <CenterCard>
            <Card
                title="สำหรับอาจารย์เเละบุคลากร"
                headStyle={{ backgroundColor: '#d0d0d0' }}
                bodyStyle={{ backgroundColor: '#e8e8e8' }}
                style={{ width: 380, textAlign: 'center', borderRadius: 5 }}
            >
                <Logo src={LogoImg} />
                <Form className="login-form" onSubmit={handleSubmit}>
                    <Form.Item style={{ marginBottom: 0 }}>
                        <p style={{ textAlign: "left", margin: 0, height: 30 }}>บัญชีผู้ใช้งาน</p>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'กรุณากรอกบัญชีผู้ใช้งาน' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="กรอกบัญชีผู้ใช้งาน"
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
            </Card>
        </CenterCard>
    )
}

const mapStateToProps = state => ({
    userId: state.login.userId,
    isUserData: state.login.isUserData,
})

const WrappedLogin = Form.create()(LoginStaff)

export default connect(mapStateToProps)(WrappedLogin)