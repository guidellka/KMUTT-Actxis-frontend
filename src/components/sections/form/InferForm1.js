import React, { Component } from 'react'
import { Form, Input, InputNumber, Col, Row, Anchor } from 'antd'
import styled from 'styled-components'

const FormItem = Form.Item
const { TextArea } = Input
const { Link } = Anchor

const SpanMarginLeft = styled.span`
    padding-left: 20px;
`

class InferFrom extends Component {
    render() {
        const { getFieldDecorator } = this.props.form
        const nameLayout = {
            labelAlign: 'left',
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4, offset: 2 },
                md: { span: 3, offset: 2 },
                lg: { span: 4, offset: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
                md: { span: 16, offset: 1 },
                lg: { span: 13, offset: 1 },
            }
        }

        const nameEnLayout = {
            labelAlign: 'left',
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8, offset: 2 },
                md: { span: 6, offset: 2 },
                lg: { span: 5, offset: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
                md: { span: 14 },
                lg: { span: 13 },

            }
        }

        const numberLayout = {
            labelAlign: 'left',
            labelCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 13, offset: 2 },
                md: { span: 13, offset: 3 },
                lg: { span: 11, offset: 4 },
            },
            wrapperCol: {
                xs: { span: 18, offset: 6 },
                sm: { span: 9, offset: 0 },
                md: { span: 8, offset: 0 },
                lg: { span: 9, offset: 0 },
            },
            colon: false
        }

        const textAreaLayout = {
            labelAlign: 'left',
            labelCol: {
                sm: { span: 20, offset: 2 },
                md: { span: 22, offset: 2 },
                lg: { span: 21, offset: 3 },
            },
            wrapperCol: {
                sm: { span: 20, offset: 2 },
                md: { span: 20, offset: 2 },
                lg: { span: 18, offset: 3 },
            }
        }

        const listTextField = {
            labelCol: {
                sm: { span: 2, offset: 1 },
                md: { span: 3, offset: 0 },
                lg: { span: 3, offset: 0 },
            },
            wrapperCol: {
                sm: { span: 19 },
                md: { span: 21 },
                lg: { span: 19 },
            },
            colon: false
        }

        const countLayout = {
            labelAlign: 'left',
            labelCol: {
                xs: { offset: 4 },
                sm: { span: 9, offset: 1 },
                md: { span: 9, offset: 2 },
            },
            wrapperCol: {
                xs: { offset: 1 },
            },
            colon: false
        }

        return (
            <Row>
                <Col md={19} lg={19}>
                    <Form>
                        <Row id="name_project">
                            <FormItem label="ชื่อโครงการ" {...nameLayout}>
                                {getFieldDecorator('name', {})(<Input />)}
                            </FormItem>
                            <FormItem label="ชื่อโครงการ (ภาษาอังกฤษ)" {...nameEnLayout}>
                                {getFieldDecorator('name_en', {})(<Input />)}
                            </FormItem>
                        </Row>
                        <Row id="activity_project_type">
                            <Col sm={{ span: 20, offset: 2 }} md={{ span: 20, offset: 2 }} lg={{ span: 18, offset: 3 }}style={{ marginBottom: 10 }}>
                                <strong>ประเภทโครงการกิจกรรม ได้ดังนี้:</strong>
                            </Col>
                            <FormItem label="1. ด้านพัฒนาทักษะทางวิชาการและวิชาชีพ" {...numberLayout}>
                                {getFieldDecorator('hours_amount-educational')(<InputNumber min={0} />)}
                                <SpanMarginLeft>ชั่วโมง</SpanMarginLeft>
                            </FormItem>
                            <FormItem label="2. ด้านกีฬาและการส่งเสริมสุขภาพ" {...numberLayout}>
                                {getFieldDecorator('hours_amount-health')(<InputNumber min={0} />)}
                                <SpanMarginLeft>ชั่วโมง</SpanMarginLeft>
                            </FormItem>
                            <FormItem label="3. ด้านกิจกรรมจิตอาสาและบำเพ็ญประโยชน์" {...numberLayout}>
                                {getFieldDecorator('hours_amount-community')(<InputNumber min={0} />)}
                                <SpanMarginLeft>ชั่วโมง</SpanMarginLeft>
                            </FormItem>
                            <FormItem label="4. ด้านทำนุบำรุงศิลปะและวัฒนธรรม" {...numberLayout}>
                                {getFieldDecorator('hours_amount-arts')(<InputNumber min={0} />)}
                                <SpanMarginLeft>ชั่วโมง</SpanMarginLeft>
                            </FormItem>
                            <FormItem label="5. ด้านพัฒนาคุณลักษณะ" {...numberLayout}>
                                {getFieldDecorator('hours_amount-characteristics')(<InputNumber min={0} />)}
                                <SpanMarginLeft>ชั่วโมง</SpanMarginLeft>
                            </FormItem>
                            <FormItem label="6. ด้านความภาคภูมิใจและความผูกพันมหาวิทยาลัย" {...numberLayout}>
                                {getFieldDecorator('hours_amount-loyality')(<InputNumber min={0} />)}
                                <SpanMarginLeft>ชั่วโมง</SpanMarginLeft>
                            </FormItem>
                        </Row>
                        <Row id="qf">
                            <Col sm={{ span: 20, offset: 2 }} md={{ span: 20, offset: 2 }} lg={{ span: 18, offset: 3 }} style={{ marginBottom: 10 }}>
                                <strong>การเทียบค่ากิจกรรมตามคุณลักษณะที่พึงประสงค์ของมหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี (KMUTT Student QF):</strong>
                            </Col>
                            <FormItem label="1. ความรู้ (Knowledge)" {...numberLayout}>
                                {getFieldDecorator('qf_amount-knowledge')(<InputNumber min={0} max={100} />)}
                                <SpanMarginLeft>%</SpanMarginLeft>
                            </FormItem>
                            <FormItem label="2. ทักษะเชิงวิชาชีพ (Professional Skill)" {...numberLayout}>
                                {getFieldDecorator('qf_amount-profession')(<InputNumber min={0} max={100} />)}
                                <SpanMarginLeft>%</SpanMarginLeft>
                            </FormItem>
                            <FormItem label="3. ทักษะการคิด (Thinking Skill)" {...numberLayout}>
                                {getFieldDecorator('qf_amount-thinking')(<InputNumber min={0} max={100} />)}
                                <SpanMarginLeft>%</SpanMarginLeft>
                            </FormItem>
                            <FormItem label="4. ทักษะการเรียนรู้ (Learning Skill)" {...numberLayout}>
                                {getFieldDecorator('qf_amount-learning')(<InputNumber min={0} max={100} />)}
                                <SpanMarginLeft>%</SpanMarginLeft>
                            </FormItem>
                            <FormItem label="5. ทักษะการสื่อสาร (Communication Skill)" {...numberLayout}>
                                {getFieldDecorator('qf_amount-communication')(<InputNumber min={0} max={100} />)}
                                <SpanMarginLeft>%</SpanMarginLeft>
                            </FormItem>
                            <FormItem label="6. ทักษะการจัดการ (Management Skill)" {...numberLayout}>
                                {getFieldDecorator('qf_amount-management')(<InputNumber min={0} max={100} />)}
                                <SpanMarginLeft>%</SpanMarginLeft>
                            </FormItem>
                            <FormItem label="7. ภาวะผู้นำ (Leadership)" {...numberLayout}>
                                {getFieldDecorator('qf_amount-leadership')(<InputNumber min={0} max={100} />)}
                                <SpanMarginLeft>%</SpanMarginLeft>
                            </FormItem>
                            <FormItem label="8. ความเป็นพลเมือง มจธ. (KMUTT’s citizenship)" {...numberLayout}>
                                {getFieldDecorator('qf_amount-kmutt-citizen')(<InputNumber min={0} max={100} />)}
                                <SpanMarginLeft>%</SpanMarginLeft>
                            </FormItem>
                        </Row>
                        <Row id="rational_criterion">
                            <FormItem
                                label="หลักการและเหตุผล (เขียนไม่น้อยกว่าครึ่งกระดาษ A4 และทั้ง3 ย่อหน้าต้องสอดล้องกัน)"
                                {...textAreaLayout}
                            >
                                {getFieldDecorator('rational_criterion')(<TextArea rows={10} />)}
                            </FormItem>
                        </Row>
                        <Row id="objective">
                            <Col sm={{ span: 20, offset: 2 }} md={{ span: 20, offset: 2 }} lg={{ span: 18, offset: 3 }} style={{ marginBottom: 20 }}>
                                <strong>วัตถุประสงค์ (ไม่เกิน 3 ข้อ):</strong>
                            </Col>
                            <Col sm={{ span: 20, offset: 2 }} md={{ span: 20, offset: 2 }} lg={{ span: 18, offset: 3 }}>
                                <FormItem label="1." {...listTextField}>
                                    {getFieldDecorator('objective_1')(<Input />)}
                                </FormItem>
                                <FormItem label="2." {...listTextField}>
                                    {getFieldDecorator('objective_2')(<Input />)}
                                </FormItem>
                                <FormItem label="3." {...listTextField}>
                                    {getFieldDecorator('objective_3')(<Input />)}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row id="member">
                            <Col sm={{ span: 20, offset: 2 }} md={{ span: 20, offset: 2 }} lg={{ span: 18, offset: 3 }} style={{ marginBottom: 5 }}>
                                <strong>ผู้เข้าร่วมโครงการ:</strong>
                            </Col>
                            <Col sm={{ span: 20, offset: 2 }} md={{ span: 20, offset: 2 }} lg={{ span: 18, offset: 3 }}>
                                <div className="border-form">
                                    <FormItem label="1. นักศึกษา" {...countLayout}>
                                        {getFieldDecorator('attendee_amount-student')(<InputNumber min={0} />)}
                                        <SpanMarginLeft>คน</SpanMarginLeft>
                                    </FormItem>
                                    <FormItem label="2. อาจารย์" {...countLayout}>
                                        {getFieldDecorator('attendee_amount-lecturer')(<InputNumber min={0} />)}
                                        <SpanMarginLeft>คน</SpanMarginLeft>
                                    </FormItem>
                                    <FormItem label="3. เจ้าหน้าที่" {...countLayout}>
                                        {getFieldDecorator('attendee_amount-personnel')(<InputNumber min={0} />)}
                                        <SpanMarginLeft>คน</SpanMarginLeft>
                                    </FormItem>
                                    <FormItem label="4. บุคคลในชุมชน/นักเรียน" {...countLayout}>
                                        {getFieldDecorator('attendee_amount-outsider')(<InputNumber min={0} />)}
                                        <SpanMarginLeft>คน</SpanMarginLeft>
                                    </FormItem>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col md={5} lg={5} className="hidden-xs hidden-sm hidden-md">
                    <Anchor affix={true} offsetTop={260} >
                        <Link href="#name_project" title="ชื่อโครงการ" />
                        <Link href="#activity_project_type" title="ประเภทโครงการกิจกรรม" />
                        <Link href="#qf" title="การเทียบค่ากิจกรรม QF" />
                        <Link href="#rational_criterion" title="หลักการและเหตุผล" />
                        <Link href="#objective" title="วัตถุประสงค์" />
                        <Link href="#member" title="ผู้เข้าร่วมโครงการ" />
                    </Anchor>
                </Col>
            </Row>
        )
    }
}

const WrappedInfer = Form.create({ name: 'project_proposal' })(InferFrom)

export default WrappedInfer