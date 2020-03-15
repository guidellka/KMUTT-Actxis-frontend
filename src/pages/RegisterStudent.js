import React from 'react'
import { connect } from 'react-redux'
import { Button, message, Col, Card, Cascader, Input, Form, Row } from 'antd'

import axios from '../scripts/Api'
import AuthLayout from '../layouts/AuthLayout'
import { setIsUserData, setFirstName, setLastName } from '../redux/login'

const FormItem = Form.Item
const options = [
    {
        name: 'วิศวกรรมศาสตร์',
        items: [
            {
                name: 'วิศวกรรมเคมี',
            },
            {
                name: 'วิศวกรรมเคมี (หลักสูตรนานาชาติ)',
            },
            {
                name: 'วิศวกรรมเครื่องกล',
            },
            {
                name: 'วิศวกรรมเครื่องกลและพลังงาน',
            },
            {
                name: 'วิศวกรรมยานยนต์',
            },
            {
                name: 'วิศวกรรมไฟฟ้า',
            },
            {
                name: 'วิศวกรรมไฟฟ้า (ระบบไฟฟ้า อิเล็กทรอนิกส์ และพลังงาน)',
            },
            {
                name: 'วิศวกรรมโยธา',
            },
            {
                name: 'วิศวกรรมโยธา (หลักสูตรนานาชาติ)',
            },
            {
                name: 'วิศวกรรมอุตสาหการ',
            },
            {
                name: 'วิศวกรรมคอมพิวเตอร์',
            },
            {
                name: 'วิศวกรรมคอมพิวเตอร์ (หลักสูตรนานาชาติ)',
            },
            {
                name: 'วิศวกรรมระบบควบคุมและเครื่องมือวัด',
            },
            {
                name: 'วิศวกรรมสิ่งแวดล้อม (หลักสูตรนานาชาติ)',
            },
            {
                name: 'วิศวกรรมไฟฟ้าสื่อสารและอิเล็กทรอนิกส์',
            },
            {
                name: 'วิศวกรรมไฟฟ้าสื่อสารและอิเล็กทรอนิกส์ (หลักสูตรนานาชาติ)',
            },
            {
                name: 'วิศวกรรมวัสดุ',
            },
            {
                name: 'วิศวกรรมเครื่องมือ',
            },
            {
                name: 'วิศวกรรมอัตโนมัติ (หลักสูตรนานาชาติ)',
            },
            {
                name: 'วิศวกรรมเมคคาทรอนิกส์',
            },
            {
                name: 'วิศวกรรมการผลิตชิ้นส่วนยานยนต์',
            },
        ],
    },
    {
        name: 'วิทยาศาสตร์',
        items: [
            {
                name: 'คณิตศาสตร์',
            },
            {
                name: 'เคมี',
            },
            {
                name: 'ฟิสิกส์ประยุกต์ (หลักสูตรสองภาษา)',
            },
            {
                name: 'จุลชีววิทยา',
            },
            {
                name: 'วิทยาการคอมพิวเตอร์ประยุกต์ ',
            },
            {
                name: 'วิทยาศาสตร์และเทคโนโลยีการอาหาร',
            },
            {
                name: 'สถิติ',
            },
        ],
    },
    {
        name: 'ครุศาสตร์อุตสาหกรรมและเทคโนโลยี',
        items: [
            {
                name: 'เทคโนโลยีการพิมพ์และบรรจุภัณฑ์',
            },
            {
                name: 'เทคโนโลยีอุตสาหกรรม',
            },
            {
                name: 'วิทยาการคอมพิวเตอร์ประยุกต์-มัลติมีเดีย',
            },
            {
                name: 'วิศวกรรมเครื่องกล',
            },
            {
                name: 'วิศวกรรมไฟฟ้า ',
            },
            {
                name: ' วิศวกรรมโยธา',
            },
            {
                name: 'วิศวกรรมอุตสาหการ',
            },
            {
                name: 'เทคโนโลยีการศึกษาและการสื่อสารมวลชน',
            },
        ],
    },
    {
        name: 'เทคโนโลยีสารสนเทศ',
        items: [
            {
                name: 'เทคโนโลยีสารสนเทศ',
            },
            {
                name: 'วิทยาการคอมพิวเตอร์',
            },
            {
                name: 'นวัตกรรมบริการดิจิทัล',
            },
        ],
    },
    {
        name: 'สถาปัตยกรรมศาสตร์และการออกแบบ',
        items: [
            {
                name: 'สถาปัตยกรรม (หลักสูตรนานาชาติ)',
            },
            {
                name: 'สถาปัตยกรรมภายใน (หลักสูตรนานาชาติ)',
            },
            {
                name: 'การออกแบบอุตสาหกรรม (หลักสูตรนานาชาติ)',
            },
            {
                name: 'ออกแบบนิเทศศิลป์ (หลักสูตรนานาชาติ)',
            },
            {
                name: 'เทคโนโลยีมีเดีย',
            },
            {
                name: 'มีเดียทางการแพทย์และวิทยาศาสตร์',
            },
            {
                name: 'มีเดียอาตส์',
            },
        ],
    },
    {
        name: 'วิทยาการหุ่นยนต์ภาคสนาม',
        items: [
            {
                name: 'วิศวกรรมหุ่นยนต์และระบบอัตโนมัติ',
            },
        ],
    },
    {
        name: 'สหวิทยาการ',
        items: [
            {
                name: 'วิทยาศาสตร์และเทคโนโลยี',
            },
        ],
    },
]

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
        md: { span: 7 },
        lg: { span: 7 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 14 },
        lg: { span: 12 },
    },
}

const RegisterStudent = (props) => {

    const { dispatch } = props
    const { getFieldDecorator } = props.form

    const handleSubmit = async (e) => {
        e.preventDefault()
        props.form.validateFields(async (err, values) => {
            if (!err) {
                let user_data = {
                    user_id: props.userId,
                    student_id: props.stdId,
                    email: props.mail,
                    first_name: values.first_name,
                    last_name: values.last_name,
                    department: values.study[0],
                    branch: values.study[1],
                    tel_no: values.tel_no,
                    is_lecturer: false
                }
                console.log('>>> [RegisterStudent.js:226] values.tel_no : ', values.tel_no)
                try {
                    await axios.post(`/user_data`, user_data)
                    dispatch(setIsUserData(true))
                    dispatch(setFirstName(values.first_name))
                    dispatch(setLastName(values.last_name))
                    props.history.push(`/home`)
                } catch (error) {

                }
            } else {
                message.error('กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน')
            }
        })
    }

    return (
        <AuthLayout>
            <Row>
                <Col
                    xs={{ span: 22, offset: 1 }}
                    sm={{ span: 22, offset: 1 }}
                    md={{ span: 18, offset: 3 }}
                    lg={{ span: 16, offset: 4 }}
                >
                    <Card
                        title="ข้อมูลเบื้องต้น"
                        style={{ margin: '20px 0px', }}
                        headStyle={{ fontSize: 25, textAlign: 'center' }}
                    >
                        <Form layout='horizontal' onSubmit={handleSubmit} {...formItemLayout}>
                            <FormItem label="รหัสศึกษา">
                                <Input value={props.stdId} disabled />
                            </FormItem>
                            <FormItem label="อีเมล">
                                <Input value={props.mail} disabled />
                            </FormItem>
                            <FormItem label="ชื่อ" >
                                {getFieldDecorator('first_name', {
                                    rules: [{
                                        required: true,
                                        message: "กรุณากรอกชื่อ"
                                    }]
                                })(<Input />)}
                            </FormItem>
                            <FormItem label="นามสกุล">
                                {getFieldDecorator('last_name', {
                                    rules: [{
                                        required: true,
                                        message: "กรุณากรอกนามสกุล"
                                    }]
                                })(<Input />)}
                            </FormItem>
                            <FormItem label="คณะ/สาขาภาควิชา">
                                {getFieldDecorator('study', {
                                    rules: [{
                                        required: true,
                                        message: "กรุณาเลือกคณะ"
                                    }]
                                })(
                                    <Cascader
                                        fieldNames={{ label: 'name', value: 'name', children: 'items' }}
                                        options={options}
                                        placeholder="เลือกคณะ/สาขาภาควิชา"
                                        className="cascader-custom"
                                    />
                                )}
                            </FormItem>
                            <FormItem label="เบอร์โทรติดต่อ">
                                {getFieldDecorator('tel_no', {
                                    rules: [{
                                        required: true,
                                        message: "กรุณากรอกเบอร์โทร"
                                    }]
                                })(<Input placeholder="ตัวอย่าง 0901234567" pattern="[0-9]{10}" />)}
                            </FormItem>
                            <div style={{ textAlign: 'center' }}>
                                <Button type="primary" htmlType="submit" style={{ width: 155, height: 35 }}>
                                    ยืนยัน
                                </Button>
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </AuthLayout>
    )
}

const mapStateToProps = state => ({
    userId: state.login.userId,
    mail: state.login.mail,
    stdId: state.login.stdId,
})

const WrappedRegister = Form.create()(RegisterStudent)

export default connect(mapStateToProps)(WrappedRegister)