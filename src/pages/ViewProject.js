import React from 'react'
import { Row, Col, Button } from 'antd'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


import AuthLayout from '../layouts/AuthLayout'
import DefaultLayout from 'layouts/DefaultLayout'
import Header from '../components/sections/HeaderCustom.js'
import View from 'components/ViewProject'
import Reply from 'components/Reply'

const TextCustom = styled.p`
    font-size: 18px;
    margin: 6px 0px;
`

const ViewProject = () => (
    <AuthLayout>
        <DefaultLayout showSidebar={false}>
            <Header
                topic="แบบเสนอโครงการวิปแคมป์ 12"
                description="ผู้ที่แสดงความคิดเห็นได้ คือผู้สร้างโครงการเเละผู้ตรวจโครงการเท่านั้น"
            />
            <Row style={{ marginTop: 20, marginBottom: 30 }}>
                <Col
                    xs={{ span: 22, offset: 1 }}
                    sm={{ span: 20, offset: 2 }}
                    md={{ span: 20, offset: 2 }}
                    lg={{ span: 10, offset: 2 }}
                >
                    <TextCustom>
                        <span className="mr-2">  ชื่อโครงการ:</span> เส้นทางฝันสู้หนทางไอที ครั้งที่ 12
                    </TextCustom>
                    <TextCustom>
                        <span className="mr-2"> ชื่อโครงการ (ภาษาอังกฤษ): </span>Ways to IT Professionals Camp 12
                    </TextCustom>
                    <TextCustom>
                        <span className="mr-2"> ประเภทของโครงการ:</span> แบบเสนอโครงการ
                    </TextCustom>
                    <TextCustom style={{ textDecoration: 'underline' }}>
                        <span className="mr-2">ระยะเวลาจัดกิจกรรม</span>
                    </TextCustom>
                    <TextCustom>
                        <span className="mr-2">ตั้งเเต่:</span> 20 พฤศจิกายน 2563 เวลา 8.00 น.
                    </TextCustom>
                    <TextCustom>
                        <span className="mr-2"> สิ้นสุด:</span> 24 พฤศจิกายน 2563 เวลา 15.00 น.
                    </TextCustom>

                </Col>
                <Col
                    xs={{ span: 22, offset: 1 }}
                    sm={{ span: 20, offset: 2 }}
                    md={{ span: 20, offset: 2 }}
                    lg={{ span: 10, offset: 1 }}
                >
                    <TextCustom>
                        <span className="mr-2">ผู้เสนอโครงการ: </span> ชนาภา ชูวิเศษวณิชย์
                    </TextCustom>
                    <TextCustom>
                        <span className="mr-2">อาจารย์ที่ปรึกษา:</span> อาจารย์สยาม แย้มแสงสังข์
                    </TextCustom>
                    <TextCustom>
                        <span className="mr-2">งบประมาณที่ขอ:</span> 80,000 บาท
                    </TextCustom>
                    <TextCustom>
                        <span className="mr-2"> สถานะโครงการ:</span> รอตรวจสอบ
                        <Button style={{ padding: '2px 15px', marginLeft: '10px' }}>
                            <Link to='/tracking'>ประวัติสถานะ</Link>
                        </Button>
                    </TextCustom>

                </Col>
            </Row>
            <Row>
                <Col
                    xs={{ span: 22, offset: 1 }}
                    sm={{ span: 20, offset: 2 }}
                    md={{ span: 20, offset: 2 }}
                    lg={{ span: 12, offset: 1 }}
                >
                    <p style={{ fontSize: 20 }}>เอกสารโครงการ</p>
                    <hr style={{ margin: '5px 0px' }} />
                    <View />
                </Col>
                <Col
                    xs={{ span: 22, offset: 1 }}
                    sm={{ span: 20, offset: 2 }}
                    md={{ span: 20, offset: 2 }}
                    lg={{ span: 9, offset: 1 }}
                >
                    <p style={{ fontSize: 20 }}>ความคิดเห็น</p>
                    <hr style={{ margin: '5px 0px' }} />
                    <Reply />
                </Col>
            </Row>
        </DefaultLayout>
    </AuthLayout>
)

export default ViewProject