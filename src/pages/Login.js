import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Form, Icon, Input, Button, Card } from 'antd'

import LogoImg from 'assets/images/Logo.png';

const Logo = styled.img`
    height: 140px;
    margin: 0 0 20px 0;
`
const CenterCard = styled.div`
    display: grid;
    margin-top: 40px;
    justify-content: center;
    align-items: center;
`

class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <CenterCard>
                <Card style={{ width: 400, textAlign: 'center', borderRadius: 5 }}>
                    <Logo src={LogoImg} />
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            <p style={{ textAlign: "left", margin: 0, height: 30 }}>รหัสนักศึกษา</p>
                            {getFieldDecorator('studentid', {
                                rules: [{ required: true, message: 'กรุณากรอกรหัสนักศึกษา' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="กรอกรหัสนักศึกษา"
                                />,
                            )}
                            <p style={{ textAlign: "left", margin: 0, height: 30 }}>รหัสผ่าน</p>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'กรุณากรอกรหัสผ่าน!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="กรอกรหัสผ่าน"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Link to="/projects">
                                <Button type="primary" style={{ width: '100%' }}>
                                    Log in
                                </Button>
                            </Link>
                        </Form.Item>
                    </Form>
                </Card>
            </CenterCard>
        )
    }
}

const WrappedLogin = Form.create({ name: 'normal_login' })(Login)

export default WrappedLogin