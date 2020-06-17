import React, { useState, useEffect, Fragment } from 'react'
import { Col, Row, Form, Input, Button, message, Upload, Icon, Modal, Empty, Table, Select, DatePicker, TimePicker } from 'antd'
import { connect } from 'react-redux'
import reqwest from 'reqwest'
import { withRouter } from 'react-router-dom'

import axios from 'scripts/Api'
import Header from './sections/HeaderCustom.js'
import moment from 'moment'

const FormItem = Form.Item
const { Option } = Select
const { RangePicker } = DatePicker

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
        md: { span: 10 },
        lg: { span: 9 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 },
        md: { span: 14 },
        lg: { span: 15 },
    },
}


const CreateProject = (props) => {
    const [fileList, setFileList] = useState([])
    const [uploading, setUploading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [lecturerList, setLecturerList] = useState([])
    const [searchText, setSearchText] = useState("")
    const [advisorId, setAdvisorId] = useState({})
    const [clubs, setClubs] = useState(null)


    const { getFieldDecorator, setFieldsValue } = props.form

    useEffect(() => {
        FetchLecturer()
        FetchClub()
    }, [])

    const FetchLecturer = async () => {
        try {
            const { data } = await axios.get(`/lecturer`)
            setLecturerList(data)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setError(error)
        }
    }

    const FetchClub = async () => {
        try {
            const { data } = await axios.get(`/clubs`)
            setClubs(data.club)
        } catch (error) {
            setError(error)
        }
    }

    const countDown = () => {
        let secondsToGo = 3
        const modal = Modal.success({
            title: 'ส่งโครงการเรียบร้อยเเล้ว',
            content: `กลับสู่หน้าเเรกภายใน ${secondsToGo} วินาที`,
            okText: 'ปิดหน้าต่างนี้'
        })
        const timer = setInterval(() => {
            secondsToGo -= 1;
            modal.update({
                content: `กลับสู่หน้าเเรกภายใน ${secondsToGo} วินาที`,
            })
        }, 1000)
        setTimeout(() => {
            clearInterval(timer)
            modal.destroy()
            props.history.push('/home')
        }, secondsToGo * 1000)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        props.form.validateFields(async (err, values) => {
            if (!err) {
                setUploading(true)
                let document = {
                    owner_id: props.userId,
                    club_id: values.club,
                    advisor_id: advisorId,
                    document_category_id: 1,
                    name: values.name,
                    name_en: values.name_en,
                    file_name: values.doucument.file.name,
                    start_at: values.time[0].format("YYYY-MM-DD HH:mm:ss"),
                    end_at: values.time[1].format("YYYY-MM-DD HH:mm:ss"),
                    purpose_budget: values.budget
                }

                try {
                    let document_id = 0
                    await axios.post(`/documents`, document).then(response => {
                        document_id = response.data
                    })
                    let doucument_step = {
                        document_id: document_id,
                        category_step_id: 1,
                        inspector_id: advisorId,
                        status: "รอตรวจสอบ"
                    }
                    try {
                        await axios.post(`/document_steps`, doucument_step)
                        setUploading(false)
                        countDown()
                    } catch (error) {

                    }
                } catch (error) {

                }
            } else {
                message.error('กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน')
            }
        })
    }

    const showModal = () => {
        setVisible(true)
    }


    const handleCancel = () => {
        setVisible(false)
    }

    const rangeConfig = {
        rules: [{ type: 'array', required: true, message: 'กรุณาเลือกวันที่จัดกิจกรรม' }],
    }

    const handleUpload = (info) => {
        let fileList = [...info.fileList]
        const formData = new FormData()

        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-1)

        // 2. Read from response and show file link
        fileList = fileList.map(file => {
            if (file.response) {
                // Component will show file.url:link
                file.url = file.response.url
            }
            return file
        })

        setFileList(fileList)


        // reqwest({
        //     url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        //     method: 'post',
        //     processData: false,
        //     data: formData,
        //     success: () => {
        //         setFileList([])
        //         setUploading(false)
        //         message.success('upload successfully.')
        //     },
        //     error: () => {
        //         setUploading(false)
        //         message.error('upload failed.')
        //     },
        // })
    }

    // ชื่อไฟล์โครงการ userId_doucumentId (อย่าลืมจำกัดให้อัพโหลดเเค่ 1 ไฟล์)
    // ชื่อไฟล์เอกสารเเนบ userId_doumentId_number
    const upload = {
        // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        // onChange: handleUpload,
        // multiple: false,
        onRemove: file => {
            const index = fileList.indexOf(file)
            const newFileList = fileList.slice()
            newFileList.splice(index, 1)
            return {
                fileList: newFileList,
            }
        },
        beforeUpload: file => {
            setFileList([...fileList, file])
            return false
        },
        fileList,
    }




    // const upload = {
    //     action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    //     onChange({ file, fileList }) {
    //         // ชื่อไฟล์โครงการ userId_doucumentId (อย่าลืมจำกัดให้อัพโหลดเเค่ 1 ไฟล์)
    //         // ชื่อไฟล์เอกสารเเนบ userId_doumentId_number
    //         console.log('>>> [CreateProject.js:88] file.status : ', file.status)
    //         if (file.status !== 'uploading') {
    //             // let fileNow = 
    //             console.log(file, fileList)
    //         }
    //     },
    //     multiple: false,
    // }


    const tableLocale = {
        emptyText: () => {
            if (error) {
                return <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} description="เกิดข้อผิดพลาดขณะกำลังโหลดข้อมูล โปรดลองอีกครั้งในภายหลัง" />
            }
        }
    }

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`ค้นหาจากชื่อโครงการ`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    ค้นหา
            </Button>
                <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    ล้าง
            </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
    })

    const handleSearch = (selectedKeys, confirm) => {
        confirm()
        setSearchText(selectedKeys[0])
    }

    const handleReset = (clearFilters) => {
        clearFilters()
        setSearchText('')
    }

    const columns = [
        {
            title: 'รายชื่ออาจารย์',
            dataIndex: 'first_name',
            key: 'first_name',
            render: (val) => `อาจารย์ ${val}`,
            ...getColumnSearchProps('first_name'),
        },
        {
            title: 'นามสกุล',
            dataIndex: 'last_name',
            key: 'last_name',
            ...getColumnSearchProps('last_name'),
        },
        {
            title: 'อีเมล์',
            key: 'email',
            dataIndex: 'email',
        },
    ]

    return (
        <Fragment>
            <Header
                topic="สร้างโครงการ"
                description="กรอกรายละเอียดโครงการตามที่กำหนด"
            />
            <Form layout='horizontal' onSubmit={handleSubmit} {...formItemLayout}>
                <Row style={{ marginTop: 15 }}>
                    <Col
                        xs={{ span: 22, offset: 1 }}
                        sm={{ span: 24, offset: 0 }}
                        md={{ span: 14, offset: 0 }}
                        lg={{ span: 15, offset: 2 }}
                    >
                        <FormItem label="ชื่อโครงการ(ภาษาไทย)" >
                            {getFieldDecorator("name", {
                                rules: [{
                                    required: true,
                                    message: "กรุณาชื่อโครงการ(ภาษาไทย)"
                                }]
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="ชื่อโครงการ(ภาษาอังกฤษ)">
                            {getFieldDecorator('name_en', {
                                rules: [{
                                    required: true,
                                    message: "กรุณากรอกโครงการ(ภาษาอังกฤษ)"
                                }]
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="หน่วยงานที่จัด">
                            {getFieldDecorator('club', {
                                rules: [{
                                    required: true,
                                    message: "กรุณาเลือกหน่วยงาน"
                                }]
                            })(
                                <Select placeholder="เลือกหน่วยงาน"  >
                                    {clubs && clubs.map(club => (
                                        <Option key={club.id} value={club.id}>{club.name}</Option>
                                    ))}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="ระยะเวลาจัดกิจกรรม" {...rangeConfig}>
                            {getFieldDecorator('time', {
                                rules: [{
                                    required: true,
                                    message: "กรุณากรอกเลือกระยะเวลาจัดกิจกรรม"
                                }]
                            })(<RangePicker placeholder={["เริ่มต้นกิจกรรม", "สิ้นสุดกิจกรรม"]} showTime format="YYYY-MM-DD HH:mm:ss" />)}
                        </FormItem>
                        <FormItem label="อาจารย์ที่ปรึกษา">
                            <Row gutter={8}>
                                <Col span={18}>
                                    {getFieldDecorator("advisor", {
                                        rules: [{
                                            required: true,
                                            message: "กรุณาเลือกอาจารย์ที่ปรึกษา"
                                        }]
                                    })(<Input placeholder="เลือกอาจารย์ที่ปรึกษา" disabled />)}
                                </Col>
                                <Col span={6}>
                                    <Button type="primary" onClick={showModal}>ค้นหา</Button>
                                </Col>
                            </Row>
                            <Modal
                                title="เลือกอาจารย์ที่ปรึกษา"
                                visible={visible}
                                onCancel={handleCancel}
                                footer={false}
                                width={700}
                            >
                                <Table
                                    className="pointer"
                                    style={{ padding: '0 20px' }}
                                    dataSource={lecturerList}
                                    rowKey="user_id"
                                    columns={columns}
                                    locale={tableLocale}
                                    loading={isLoading}
                                    scroll={{ x: 300 }}
                                    size="middle"
                                    onRow={(val) => {
                                        return {
                                            onClick: event => {
                                                setFieldsValue({
                                                    advisor: `อาจารย์${val.first_name} ${val.last_name}`,
                                                })
                                                setAdvisorId(val.user_id)
                                                handleCancel()
                                            }
                                        }
                                    }}
                                />

                            </Modal>
                        </FormItem>
                        <FormItem label="งบประมาณโครงการ(บาท)">
                            {getFieldDecorator('budget', {
                                rules: [{
                                    required: true,
                                    message: "กรุณากรอกงบประมาณโครงการ"
                                }]
                            })(<Input placeholder="ตัวอย่าง 15000" />)}
                        </FormItem>
                        <Form.Item label="เอกสารโครงการ">
                            {getFieldDecorator('doucument', {
                                // valuePropName: 'fileList',
                                // getValueFromEvent: this.normFile,
                                rules: [{
                                    required: true,
                                    message: "กรุณาเลือกเอกสารโครงการที่ต้องการอัพโหลด"
                                }]
                            })(
                                <Upload {...upload} fileList={fileList}>
                                    <Button style={{ marginBottom: 8 }}>
                                        <Icon type="upload" /> เเนบเอกสารโครงการ
                                    </Button>
                                </Upload>
                            )}
                        </Form.Item>

                    </Col>
                    <Col
                        xs={{ span: 22, offset: 1 }}
                        sm={{ span: 24, offset: 0 }}
                        md={{ span: 9, offset: 0 }}
                        lg={{ span: 10, offset: 0 }}
                    >
                        {/* <Form.Item label="เอกสารเพิ่มเติม">
                            {getFieldDecorator('attach', {
                                // valuePropName: 'fileList',
                                // getValueFromEvent: this.normFile,
                            })(
                                <Upload {...upload} fileList={fileList}>
                                    <Button style={{ marginBottom: 8 }}>
                                        <Icon type="upload" /> เเนบเอกสารเพิ่มเติม
                                </Button>
                                </Upload>
                            )}
                        </Form.Item> */}
                    </Col>
                </Row>
                <div style={{ textAlign: 'center', marginTop: 15 }}>
                    <Button type="primary" htmlType="submit" loading={uploading} style={{ fontSize: 16, height: 45 }}>
                        {uploading ? 'กำลังส่งข้อมูล' : 'ส่งเเบบเสนอโครงการ'}
                    </Button>
                </div>
            </Form>
        </Fragment>
    )

}

const mapStateToProps = state => ({
    userId: state.login.userId,
})

const WrappedCreateProject = Form.create({})(CreateProject)

export default withRouter(connect(mapStateToProps)(WrappedCreateProject))