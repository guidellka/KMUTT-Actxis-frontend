import React, { Component, Fragment } from 'react'
import { Empty, Spin, Steps, Table, Row, Col } from 'antd'

import Header from './sections/HeaderCustom.js'
import axiosInstance from 'scripts/Api';

const { Step } = Steps;

const columns = [
    {
        title: 'วันที่',
        dataIndex: 'date',
        align: 'center'
    },
    {
        title: 'เวลา',
        dataIndex: 'time',
        align: 'center'
    },
    {
        title: 'เอกสารส่งออก',
        dataIndex: 'by',
        align: 'center'
    },
    {
        title: 'ถึง',
        dataIndex: 'to',
        align: 'center'
    },
    {
        title: 'สถานะโครงการ',
        dataIndex: 'status',
        align: 'center'
    },
]

const dataColumn = [
    {
        key: '1',
        date: '17 มิ.ย. 2562',
        time: '21:00 น.',
        by: 'ชมรมนาฏยโขนละคร',
        to: 'อาจารย์ที่ปรึกษา',
        status: 'รอตรวจสอบ'
    },
    {
        key: '2',
        date: '17 มิ.ย. 2562',
        time: '10:00 น.',
        by: 'อาจารย์ที่ปรึกษา',
        to: 'ชมรมนาฏยโขนละคร',
        status: 'รอแก้ไข'
    },
    {
        key: '3',
        date: '17 มิ.ย. 2562',
        time: '18:00 น.',
        by: 'ชมรมนาฏยโขนละคร',
        to: 'อาจารย์ที่ปรึกษา',
        status: 'รอตรวจสอบ'
    },

]
class ProjectTacking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            error: null,
            loading: true
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        axiosInstance.get('/organizations/2d648fc3-10aa-4c9b-8e2d-f4d27b1b9caa/projects?has_document&current_edu_year')
            .then(response => {
                this.setState({
                    data: response.data,
                })
            })
            .catch(error => {
                this.setState({
                    error: error,
                })
            }).finally(() => {
                this.setState({
                    loading: false
                })
            })
    }

    render() {
        let { data, loading, error } = this.state
        let content

        if (error) {
            content = <Empty description="เกิดข้อผิดพลาดขณะกำลังโหลดข้อมูล โปรดลองอีกครั้งในภายหลัง" />
        }
        else if (!data) {
            content = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="ไม่มีโครงการ" />
        }

        return (
            <Fragment>
                <Header topic="ติดตามแบบเสนอโครงการ" description="โครงการจิตอาสา คณะเทคโนโลยีสารสนเทศ" />
                <Spin size="large" spinning={loading} tip="กำลังโหลด..." >
                    <Row style={{ marginTop: 20 }}>
                        <Col xs={{ span: 18, offset: 3 }} sm={{ span: 10, offset: 6 }} md={{ span: 7, offset: 1 }}>
                            <Steps direction="vertical" current={1} status="process">
                                <Step title="ชมรมนาฏยโขนละคร"
                                    description={
                                        <div id="tracking-tail">
                                            ส่งเเบบเสนอโครงการเเล้ว<br />
                                            17/06/2562<br />
                                            18:00
                                </div>
                                    }
                                />
                                <Step title="อาจารย์ที่ปรึกษา"
                                    description={
                                        <div id="tracking-tail">
                                            รอตรวจสอบ<br />
                                            17/06/2562<br />
                                            18:00
                                </div>
                                    }
                                />
                                <Step title="องค์การนักศึกษา"
                                    description={
                                        <div id="tracking-tail">
                                            ส่งเเบบเสนอโครงการเเล้ว<br />
                                            17/06/2562<br />
                                            18:00
                                </div>
                                    }
                                />
                                <Step title="สภานักศึกษา"
                                    description={
                                        <div id="tracking-tail">
                                            ส่งเเบบเสนอโครงการเเล้ว<br />
                                            17/06/2562<br />
                                            18:00
                                </div>
                                    }
                                />
                                <Step title="กองกิจการนักศึกษา"
                                    description={
                                        <div className="text-left" id="tracking-tail">
                                            ส่งเเบบเสนอโครงการเเล้ว<br />
                                            17/06/2562<br />
                                            18:00
                                </div>
                                    }
                                />
                            </Steps>
                        </Col>
                        <Col xs={{ span: 22, offset: 1 }} sm={{ span: 23, offset: 1 }} md={{ span: 15, offset: 0 }} >
                            <Table
                                columns={columns}
                                dataSource={dataColumn}
                                scroll={{ x: 700 }}
                            />
                        </Col>
                    </Row>
                </Spin>
            </Fragment>
        )
    }
}

export default ProjectTacking