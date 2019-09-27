import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import {
    Form, Col, Row, Button, Input, Checkbox,
    Table, Select, InputNumber, Upload, Icon,
    TimePicker, DatePicker, message, Anchor
} from 'antd'
import moment from 'moment'
import 'moment/locale/th'

const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const { Option } = Select
const { Dragger } = Upload

const selectAfter = (
    <Select defaultValue="หน่วย" >
        <Option value="หน่วย">หน่วย</Option>
        <Option value="คน">คน</Option>
        <Option value="ชิ้น">ชิ้น</Option>
        <Option value="แผ่น">แผ่น</Option>
        <Option value="ถุง">ถุง</Option>
    </Select>
)

const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
}

class InferFrom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            columnMember: [
                {
                    title: 'รหัสนักศึกษา',
                    dataIndex: 'studentId',
                    key: 'studentId',
                },
                {
                    title: 'ชื่อ-นามสกุล',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: 'ตำแหน่ง',
                    dataIndex: 'role',
                    key: 'role',
                },
                {
                    title: 'Action',
                    dataIndex: '',
                    key: 'x',
                    align: 'center',
                    fixed: 'right',
                    render: () =>
                        <Fragment>
                            <Link to="#">แก้ไข</Link>
                            <span> / </span>
                            <Link to="#">ลบ</Link>
                        </Fragment>
                }
            ],
            dataMember: [
                {
                    studentId: '59130500033',
                    name: 'นางสาวพิมพ์ชนก ทิพย์ชมพู',
                    role: 'รองประธานโครงการ'
                },
                {
                    studentId: '59130500032',
                    name: 'นางสาวกนกพร กระจ่างฟ้า',
                    role: 'เหรัญญิก'
                },
            ],
            error: null
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const textFieldLayout = {
            labelCol: {
                sm: { span: 8 },
                md: { span: 7 },
            },
            wrapperCol: {
                sm: { span: 15 },
                md: { span: 15 },
            }
        }

        const textFieldLayout2 = {
            labelCol: {
                sm: { span: 8 },
                md: { span: 4 },
            },
            wrapperCol: {
                sm: { span: 15 },
                md: { span: 18 },
            }
        }

        const CheckLayout = {
            wrapperCol: {
                offset: 1
            }
        }

        const selectLayout = {
            labelCol: {
                sm: { span: 8 },
                md: { span: 7 },
            },
        }

        const selectLayout2 = {
            labelCol: {
                sm: { span: 8 },
                md: { span: 4 },
            },
        }

        const numberLayout = {
            labelCol: {
                sm: { span: 8 },
                md: { span: 7 },
            }
        }

        const numberLayout2 = {
            labelCol: {
                sm: { span: 8 },
                md: { span: 4 },
            }
        }

        const priceLayout = {
            labelCol: {
                sm: { span: 8 },
                md: { span: 4 },
            },
            wrapperCol: {
                sm: { span: 12 },
                md: { span: 20 },
            }
        }

        const timeLayout = {
            labelCol: {
                sm: { span: 8 },
                md: { span: 7 },
            },
            wrapperCol: {
                sm: { span: 8 },
                md: { span: 10 },
            }
        }

        return (
            <Row>
                <Col md={19} lg={19}>
                    <Form>
                        <Row style={{ marginBottom: 24 }}>
                            <Col sm={{ span: 20, offset: 2 }} md={{ offset: 2, span: 20 }} lg={{ offset: 3, span: 18 }} style={{ marginBottom: 5 }} id="evaluation_form">
                                <strong>รูปแบบการประเมินผล:</strong>
                            </Col>
                            <Col sm={{ span: 20, offset: 2 }} md={{ offset: 2, span: 20 }} lg={{ offset: 3, span: 18 }}  >
                                <div className="border-form" >
                                    <FormItem {...CheckLayout}>
                                        {getFieldDecorator('checkbox-evaluation')(
                                            <CheckboxGroup>
                                                <Row>
                                                    <Col span={24} style={{ marginBottom: 10 }}>
                                                        <Checkbox value="Observatation">การสังเกต (Observatation)</Checkbox>
                                                    </Col>
                                                    <Col span={24} style={{ marginBottom: 10 }}>
                                                        <Checkbox value="Interview">การสัมภาษณ์ (Interview)</Checkbox>
                                                    </Col>
                                                    <Col span={24} style={{ marginBottom: 10 }}>
                                                        <Checkbox value="Questoinaires">การใช้แบบสอบถาม (Questoinaires)</Checkbox>
                                                    </Col>
                                                    <Col span={24} style={{ marginBottom: 10 }}>
                                                        <Checkbox value="Test">การใช้แบบสอบถาม (Test)</Checkbox>
                                                    </Col>
                                                    <Col span={24}>
                                                        <Checkbox value="etc" style={{ display: 'inline-flex' }} >
                                                            อื่นๆ โปรดระบุ
                                                {getFieldDecorator('etc_data')(<Input />)}
                                                        </Checkbox>
                                                    </Col>
                                                </Row>
                                            </CheckboxGroup>,
                                        )}
                                    </FormItem>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 24 }}>
                            <Col sm={{ span: 20, offset: 2 }} md={{ offset: 2, span: 20 }} lg={{ offset: 3, span: 18 }} id="expected_results">
                                <strong>ผลที่คาดว่าจะได้รับ</strong>
                            </Col>
                            <Col sm={{ span: 20, offset: 2 }}md={{ offset: 2, span: 20 }} lg={{ offset: 3, span: 18 }} style={{ marginBottom: 5 }}>
                                (การกำหนดผลที่คาดว่าจะได้รับหลังจากการดำเนินกิจกรรมจะต้องสอดคล้องกับวัตถุประสงค์ของโครงการ และต้องมีการกำหนดตัวชี้วัดด้วย)
                            </Col>
                            <Col sm={{ span: 20, offset: 2 }} md={{ offset: 2, span: 20 }} lg={{ offset: 3, span: 18 }} >
                                <div className="border-form">
                                    <FormItem label="ผลที่คาดว่าจะได้รับ" {...textFieldLayout}>
                                        {getFieldDecorator('expected_results')(<Input />)}
                                    </FormItem>
                                    <FormItem label="ตัวชี้วัด KPI" {...textFieldLayout}>
                                        {getFieldDecorator('kpi')(<Input />)}
                                    </FormItem>
                                    <FormItem label="ค่าเป้าหมาย" {...textFieldLayout}>
                                        {getFieldDecorator('target_value')(<Input />)}
                                    </FormItem>
                                    <FormItem className="text-right" wrapperCol={{ xs: 24, sm: 23, md: 22 }}>
                                        <Button type="primary" style={{ backgroundColor: "#216185", borderColor: "#707070", marginTop: 0 }}>เพิ่มข้อมูล</Button>
                                    </FormItem>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 24 }}>
                            <Col sm={{ span: 20, offset: 2 }} md={{ offset: 2, span: 20 }} lg={{ offset: 3, span: 18 }} >
                                <Table
                                    className="form-table"
                                    size="small"
                                    scroll={{ x: 700 }}
                                    dataSource={this.state.dataWorking}
                                    columns={this.state.columnWorking}
                                />
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 24 }}>
                            <Col sm={{ span: 20, offset: 2 }} md={{ offset: 2, span: 20 }} lg={{ offset: 3, span: 18 }} style={{ marginBottom: 5 }} id="past_performance">
                                <strong>ผลการดำเนินงานที่ผ่านมาและการนำผลการประเมินโครงการ/กิจกรรมมาปรับปรุงในการจัดโครงการครั้งนี้ (กรณีเป็นโครงการต่อเนื่อง)</strong>
                            </Col>
                            <Col sm={{ span: 20, offset: 2 }} md={{ offset: 2, span: 20 }} lg={{ offset: 3, span: 18 }} >
                                <div className="border-form">
                                    <FormItem label="ปัญหา/อุปสรรค:" {...textFieldLayout}>
                                        {getFieldDecorator('issue')(<Input />)}
                                    </FormItem>
                                    <FormItem label="แนวทางการแก้ไข:" {...textFieldLayout}>
                                        {getFieldDecorator('solution')(<Input />)}
                                    </FormItem>
                                    <FormItem className="text-right" wrapperCol={{ xs: 24, sm: 23, md: 22 }}>
                                        <Button type="primary" style={{ backgroundColor: "#216185", borderColor: "#707070", marginTop: 0 }}>เพิ่มข้อมูล</Button>
                                    </FormItem>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 24 }}>
                            <Col sm={{ span: 20, offset: 2 }} md={{ offset: 2, span: 20 }} lg={{ offset: 3, span: 18 }} >
                                <Table
                                    className="form-table"
                                    size="small"
                                    scroll={{ x: 700 }}
                                    dataSource={this.state.dataWorking}
                                    columns={this.state.columnWorking}
                                />
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 24 }}>
                            <Col sm={{ span: 20, offset: 2 }} md={{ offset: 2, span: 20 }} lg={{ offset: 3, span: 18 }}>
                                <strong>รายละเอียดงบประมาณ:</strong>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 24 }}>
                            <Col sm={{ span: 20, offset: 2 }} md={{ offset: 2, span: 20 }} lg={{ offset: 3, span: 18 }} style={{ marginBottom: 5 }} id="external_budget">
                                <strong>1. งบประมาณที่ได้รับการสนับสนุนจากแหล่งทุนภายนอก (ถ้ามี)</strong>
                            </Col>
                            <Col sm={{ span: 20, offset: 2 }} md={{ offset: 2, span: 20 }} lg={{ offset: 3, span: 18 }} >
                                <div className="border-form">
                                    <FormItem label="ได้รับงบประมาณจาก" {...textFieldLayout}>
                                        {getFieldDecorator('budget_external_for')(<Input />)}
                                    </FormItem>
                                    <FormItem label="หมวด" {...selectLayout}>
                                        {getFieldDecorator('budget_external_type')(
                                            <Select placeholder="เลือก" style={{ width: '200px' }} >
                                                <Option value="ค่าวัสดุ">ค่าวัสดุ</Option>
                                                <Option value="ค่าใช้สอย">ค่าใช้สอย</Option>
                                                <Option value="ค่าตอบแทน">ค่าตอบแทน</Option>
                                                <Option value="ค่ายานพาหนะ">ค่ายานพาหนะ</Option>
                                                <Option value="ค่าเชื้อเพลิง">ค่าเชื้อเพลิง</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem label="รายละเอียด:" {...textFieldLayout}>
                                        {getFieldDecorator('budget_external_description')(<Input />)}
                                    </FormItem>
                                    <FormItem label="เป็นเงิน" {...numberLayout}>
                                        {getFieldDecorator('budget_external_total')(<InputNumber />)}
                                        <span style={{ marginLeft: 10 }}>บาท</span>
                                    </FormItem>
                                    <FormItem wrapperCol={{
                                        xs: 24,
                                        sm: { span: 10, offset: 8 },
                                        md: { span: 10, offset: 7 }
                                    }}>
                                        <Button type="primary" style={{ backgroundColor: "#216185", borderColor: "#707070", marginTop: 0 }}>เพิ่มข้อมูล</Button>
                                    </FormItem>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 24 }}>
                            <Col sm={{ span: 20, offset: 2 }} md={{ offset: 2, span: 20 }} lg={{ offset: 3, span: 18 }} >
                                <Table
                                    className="form-table"
                                    size="small"
                                    scroll={{ x: 700 }}
                                    dataSource={this.state.dataWorking}
                                    columns={this.state.columnWorking}
                                />
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 24 }}>
                            <Col sm={{ span: 20, offset: 2 }} md={{ offset: 2, span: 20 }} lg={{ offset: 3, span: 18 }} style={{ marginBottom: 5 }} id="case_product_support">
                                กรณี การขอรับการสนับสนุนเป็นทรัพยากร สินค้า หรือผลิตภัณฑ์:
                            </Col>
                            <Col sm={{ span: 20, offset: 2 }} md={{ offset: 2, span: 20 }} lg={{ offset: 3, span: 18 }} >
                                <div className="border-form">
                                    <FormItem label="ได้รับผลิตภัณฑ์จาก" {...textFieldLayout}>
                                        {getFieldDecorator('product_external_for')(<Input />)}
                                    </FormItem>
                                    <FormItem label="ชื่อผลิตภัณฑ์" {...textFieldLayout}>
                                        {getFieldDecorator('product_external_name')(<Input />)}
                                    </FormItem>
                                    <FormItem label="มูลค่า" {...numberLayout}>
                                        {getFieldDecorator('product_external_price')(<InputNumber />)}
                                        <span style={{ marginLeft: 10 }}>บาท</span>
                                    </FormItem>
                                    <FormItem wrapperCol={{
                                        xs: 24,
                                        sm: { span: 10, offset: 8 },
                                        md: { span: 18, offset: 7 }
                                    }}>
                                        <Button type="primary" style={{ backgroundColor: "#216185", borderColor: "#707070", marginTop: 0 }}>เพิ่มข้อมูล</Button>
                                    </FormItem>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 24 }}>
                            <Col sm={{ span: 20, offset: 2 }} md={{ offset: 2, span: 20 }} lg={{ offset: 3, span: 18 }} >
                                <Table
                                    className="form-table"
                                    size="small"
                                    scroll={{ x: 700 }}
                                    dataSource={this.state.dataWorking}
                                    columns={this.state.columnWorking}
                                />
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 24 }}>
                            <Col sm={{ span: 20, offset: 2 }} md={{ offset: 2, span: 20 }} lg={{ offset: 3, span: 18 }} style={{ marginBottom: 5 }}>
                                <strong>2. งบประมาณที่ขอรับการสนับสนุนจากมหาวิทยาลัย</strong>
                            </Col>
                            <Col sm={{ span: 20, offset: 2 }} md={{ offset: 2, span: 20 }} lg={{ offset: 3, span: 18 }} style={{ marginBottom: 5 }} id="budget_organization">
                                งบประมาณที่ขอรับการสนับสนุนผ่านองค์การบริหารนักศึกษา:
                            </Col>
                            <Col sm={{ span: 20, offset: 2 }} md={{ offset: 2, span: 20 }} lg={{ offset: 3, span: 18 }} >
                                <div className="border-form">
                                    <FormItem label="หมวด" {...selectLayout2}>
                                        {getFieldDecorator('budget_internal_type')(
                                            <Select placeholder="เลือก" style={{ width: '250px' }} >
                                                <Option value="ค่าวัสดุ">ค่าวัสดุ</Option>
                                                <Option value="ค่าใช้สอย">ค่าใช้สอย</Option>
                                                <Option value="ค่าตอบแทน">ค่าตอบแทน</Option>
                                                <Option value="ค่ายานพาหนะ">ค่ายานพาหนะ</Option>
                                                <Option value="ค่าเชื้อเพลิง">ค่าเชื้อเพลิง</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem label="ชื่อผลิตภัณฑ์" {...textFieldLayout2}>
                                        {getFieldDecorator('budget_internal_name')(<Input />)}
                                    </FormItem>
                                    <FormItem label="ราคาต่อหน่วย"
                                        help="ตัวอย่าง (ราคาหน่วยละ 20 บาท X จำนวน 10 คน X 3 มื้อ)"
                                        {...priceLayout}
                                    >
                                        <Row gutter={8}>
                                            <Col xs={20} sm={20} md={8} lg={6}>
                                                {getFieldDecorator('budget_internal_count_1')(<Input addonAfter="บาท" />)}
                                            </Col>
                                            <Col xs={20} sm={24} md={12} lg={9}>
                                                {getFieldDecorator('budget_internal_count_2')(<Input addonBefore="จำนวน" addonAfter={selectAfter} width={20} />)}
                                            </Col>
                                            <Col xs={20} sm={24} md={12} lg={8}>
                                                {getFieldDecorator('budget_internal_count_3')(<Input addonBefore="จำนวน" addonAfter="บาท" />)}
                                            </Col>
                                        </Row>
                                    </FormItem>
                                    <FormItem label="เป็นเงิน" {...numberLayout2}>
                                        {getFieldDecorator('budget_internal_total')(<InputNumber />)}
                                        <span style={{ marginLeft: 10 }}>บาท</span>
                                    </FormItem>
                                    <FormItem wrapperCol={{
                                        xs: 24,
                                        sm: { span: 10, offset: 8 },
                                        md: { span: 20, offset: 4 }
                                    }}>
                                        <Button type="primary" style={{ backgroundColor: "#216185", borderColor: "#707070", marginTop: 0 }}>เพิ่มข้อมูล</Button>
                                    </FormItem>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 24 }}>
                            <Col sm={{ span: 20, offset: 2 }} md={{ offset: 2, span: 20 }} lg={{ offset: 3, span: 18 }}>
                                <Table
                                    className="form-table"
                                    size="small"
                                    scroll={{ x: 700 }}
                                    dataSource={this.state.dataWorking}
                                    columns={this.state.columnWorking}
                                />
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 24 }} id="budget_faculty">
                            <Col sm={{ span: 20, offset: 2 }} md={{ offset: 2, span: 20 }} lg={{ offset: 3, span: 18 }} style={{ marginBottom: 5 }}>
                                งบประมาณที่ขอรับการสนับสนุนผ่านคณะ/หน่วยงาน:
                            </Col>
                            <Col sm={{ span: 20, offset: 2 }} md={{ offset: 2, span: 20 }} lg={{ offset: 3, span: 18 }} >
                                <div className="border-form">
                                    <FormItem label="หมวด" {...selectLayout2}>
                                        {getFieldDecorator('budget_organize_type')(
                                            <Select placeholder="เลือก" style={{ width: '250px' }} >
                                                <Option value="ค่าวัสดุ">ค่าวัสดุ</Option>
                                                <Option value="ค่าใช้สอย">ค่าใช้สอย</Option>
                                                <Option value="ค่าตอบแทน">ค่าตอบแทน</Option>
                                                <Option value="ค่ายานพาหนะ">ค่ายานพาหนะ</Option>
                                                <Option value="ค่าเชื้อเพลิง">ค่าเชื้อเพลิง</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem label="รายละเอียด:" {...textFieldLayout2}>
                                        {getFieldDecorator('budget_organize_description')(<Input />)}
                                    </FormItem>
                                    <FormItem label="ราคาต่อหน่วย"
                                        help="ตัวอย่าง (ราคาหน่วยละ 20 บาท X จำนวน 10 คน X 3 มื้อ)"
                                        {...priceLayout}
                                    >
                                        <Row gutter={8}>
                                            <Col xs={20} sm={20} md={8} lg={6}>
                                                {getFieldDecorator('budget_organize_count_1')(<Input addonAfter="บาท" />)}
                                            </Col>
                                            <Col xs={20} sm={24} md={12} lg={9}>
                                                {getFieldDecorator('budget_organize_count_2')(<Input addonBefore="จำนวน" addonAfter={selectAfter} width={20} />)}
                                            </Col>
                                            <Col xs={20} sm={24} md={12} lg={8}>
                                                {getFieldDecorator('budget_organize_count_3')(<Input addonBefore="จำนวน" addonAfter="บาท" />)}
                                            </Col>
                                        </Row>
                                    </FormItem>
                                    <FormItem label="เป็นเงิน" {...numberLayout2}>
                                        {getFieldDecorator('budget_organize_total')(<InputNumber />)}
                                        <span style={{ marginLeft: 10 }}>บาท</span>
                                    </FormItem>
                                    <FormItem wrapperCol={{
                                        xs: 24,
                                        sm: { span: 10, offset: 8 },
                                        md: { span: 20, offset: 4 }
                                    }}>
                                        <Button type="primary" style={{ backgroundColor: "#216185", borderColor: "#707070", marginTop: 0 }}>เพิ่มข้อมูล</Button>
                                    </FormItem>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 24 }}>
                            <Col sm={{ span: 20, offset: 2 }} md={{ offset: 2, span: 20 }} lg={{ offset: 3, span: 18 }} >
                                <Table
                                    className="form-table"
                                    size="small"
                                    scroll={{ x: 700 }}
                                    dataSource={this.state.dataWorking}
                                    columns={this.state.columnWorking}
                                />
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 24 }} id="schedule">
                            <Col sm={{ span: 20, offset: 2 }} md={{ offset: 2, span: 20 }} lg={{ offset: 3, span: 18 }}style={{ marginBottom: 5 }}>
                                <strong>กำหนดการ:</strong>
                            </Col>
                            <Col sm={{ span: 20, offset: 2 }} md={{ offset: 2, span: 20 }} lg={{ offset: 3, span: 18 }} >
                                <div className="border-form">
                                    <FormItem label="วันที่" {...timeLayout}>
                                        {getFieldDecorator('schedule_date')(<DatePicker format="ll" />)}
                                    </FormItem>
                                    <FormItem label="เวลาเริ่ม - เวลาสิ้นสุด" {...timeLayout}>
                                        {getFieldDecorator('schedule_time_start')(<TimePicker format="HH:mm" style={{ marginRight: 10 }} />)}
                                        {getFieldDecorator('schedule_time_end')(<TimePicker format="HH:mm" />)}
                                    </FormItem>
                                    <FormItem label="กิจกรรม" {...textFieldLayout}>
                                        {getFieldDecorator('schedule_event')(<Input />)}
                                    </FormItem>
                                    <FormItem label="วัตถุประสงค์" {...textFieldLayout}>
                                        {getFieldDecorator('schedule_objective')(<Input />)}
                                    </FormItem>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 24 }}>
                            <Col sm={{ span: 20, offset: 2 }} md={{ offset: 2, span: 20 }} lg={{ offset: 3, span: 18 }} >
                                <Table
                                    className="form-table"
                                    size="small"
                                    scroll={{ x: 700 }}
                                    dataSource={this.state.dataWorking}
                                    columns={this.state.columnWorking}
                                />
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 24 }} id="upload">
                            <Col sm={{ span: 20, offset: 2 }} md={{ offset: 2, span: 20 }} lg={{ offset: 3, span: 18 }} style={{ marginBottom: 20 }}>
                                <strong>เอกสารเพิ่มเติม</strong> (เช่น ประวัติวิทยากร, แผนการเรียนการสอน หรือ อื่น ๆ) ถ้ามี:
                    </Col>
                            <Col sm={{ span: 20, offset: 2 }} md={{ span: 16, offset: 4 }} lg={{ span: 13, offset: 5 }}>
                                <FormItem>
                                    {getFieldDecorator('upload')(
                                        <Dragger {...props}>
                                            <p className="ant-upload-drag-icon">
                                                <Icon type="inbox" />
                                            </p>
                                            <p className="ant-upload-text">คลิก หรือ ลากไฟล์มาวางที่นี่</p>
                                            <p className="ant-upload-hint">Click or drag file to this area to upload</p>
                                        </Dragger>,
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Form >
                </Col>
                <Col md={5} lg={5} className="hidden-xs hidden-sm hidden-md">
                    <Anchor affix={true} offsetTop={260} >
                        <Anchor.Link href="#evaluation_form" title="รูปแบบการประเมินผล" />
                        <Anchor.Link href="#expected_results" title="ผลที่คาดว่าจะได้รับ" />
                        <Anchor.Link href="#past_performance" title="ผลการดำเนินงานที่ผ่านมา" />
                        <Anchor.Link href="#external_budget" title="งบประมาณจากภายนอก" />
                        <Anchor.Link href="#case_product_support" title="กรณี ขอสนับสนุนผลิตภัณฑ์" />
                        <Anchor.Link href="#budget_organization" title="งบประมาณผ่านองค์การนักศึกษา" />
                        <Anchor.Link href="#budget_faculty" title="งบประมาณผ่านคณะ" />
                        <Anchor.Link href="#schedule" title="กำหนดการ" />
                        <Anchor.Link href="#upload" title="เอกสารแนบ" />
                    </Anchor>
                </Col>
            </Row>
        )
    }
}

const WrappedInfer = Form.create({ name: 'project_proposal' })(InferFrom)

export default WrappedInfer