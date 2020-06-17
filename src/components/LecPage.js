import React, { useState, useEffect, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Empty, Icon, Table, Input, Button, Modal } from 'antd'
import Highlighter from 'react-highlight-words'
import styled from 'styled-components'
import moment from 'moment'
import 'moment/locale/th'

import axios from 'scripts/Api'
import Header from './sections/HeaderCustom.js'

const ButtonCustom = styled(Button)`
    height: 120px;
    width: 200px;
    font-size: 18px;
`

const LecPege = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [searchText, setSearchText] = useState("")
    const [filteredInfo, setFilteredInfo] = useState("")
    const [sortedInfo, setSortedInfo] = useState({ order: 'ascend', columnKey: 'end_at', })
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        firstFetch()
    }, [])

    const firstFetch = async () => {
        try {
            const { data } = await axios.get(`/document/student/${props.userId}`)
            setData(data)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setError(error)
        }
    }

    const showModal = () => {
        setVisible(true)
    }

    const handleCancel = () => {
        setVisible(false)
    }

    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters)
        setSortedInfo(sorter)
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
        render: text => (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ),
    })

    const handleSearch = (selectedKeys, confirm) => {
        confirm()
        setSearchText(selectedKeys[0])
    }

    const handleReset = (clearFilters) => {
        clearFilters()
        setSearchText('')
    }

    const tableLocale = {
        emptyText: () => {
            if (error) {
                return <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} description="เกิดข้อผิดพลาดขณะกำลังโหลดข้อมูล โปรดลองอีกครั้งในภายหลัง" />
            }
            return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="คุณยังไม่เคยสร้างเอกสารโครงการ" />
        }
    }

    const columns = [{
        title: 'ชื่อโครงการ',
        key: 'name',
        dataIndex: 'name',
        width: '20%',
        ...getColumnSearchProps('name'),
    },
    {
        title: 'ช่วงเวลาจัดกิจกรรม',
        dataIndex: 'end_at',
        key: 'end_at',
        width: '20%',
        align: 'center',
        sorter: (a, b) => moment(a.start_at).unix() - moment(b.start_at).unix(),
        sortOrder: sortedInfo.columnKey === 'end_at' && sortedInfo.order,
        render: (val, record) => {
            if (moment(val).isSame(record.start_at, 'day')) {
                return `${moment(record.start_at).format('ll')} เวลา ${moment(record.start_at).format('LT')} น. - ${moment(val).format('LT')} น.`
            } else {
                return `${moment(record.start_at).format('ll')} - ${moment(val).format('ll')}`
            }
        },
    },
    {
        title: 'ประเภทโครงการ',
        key: 'document_category_name',
        dataIndex: 'document_category_name',
        align: 'center',
        width: '15%',
        filters: [{ text: 'แบบเสนอโครงการ', value: 'แบบเสนอโครงการ' }, { text: 'แบบสรุปโครงการ', value: 'แบบสรุปโครงการ' }],
        filteredValue: filteredInfo.document_category_name || null,
        onFilter: (value, record) => record.document_category_name.includes(value),
    },
    {
        title: 'เหลือเวลาส่งโครงการ',
        dataIndex: 'start_at',
        key: 'start_at',
        align: 'center',
        width: '20%',
        render: (val) => {
            if (moment(val).unix() < moment().unix()) {
                return <span style={{ color: "#ff3537" }}>หมดเวลาในการส่งเเล้ว</span>
            } else {
                return moment(val).endOf('day').fromNow()
            }
        }
    },
    {
        title: 'อัพเดทล่าสุด',
        dataIndex: 'updated_at',
        key: 'updated_at',
        align: 'center',
        width: '10%',
        sorter: (a, b) => moment(a.updated_at).unix() - moment(b.updated_at).unix(),
        sortOrder: sortedInfo.columnKey === 'updated_at' && sortedInfo.order,
        render: (val) => moment(val).fromNow(),
    },
    {
        title: 'สถานะ',
        dataIndex: 'status',
        key: 'status',
        width: '15%',
        align: 'center',
        filters: [
            { text: 'รอตรวจสอบ', value: 'รอตรวจสอบ' },
            { text: 'รอแก้ไข', value: 'รอแก้ไข' },
            { text: 'เสร็จสิ้น', value: 'เสร็จสิ้น' },
            { text: 'ยกเลิก', value: 'ยกเลิก' },
        ],
        filteredValue: filteredInfo.status || null,
        onFilter: (value, record) => record.status.includes(value),
        render: (val) => {
            if(val === "รอแก้ไข"){
                return <span style={{color: '#e88044'}}>{val}</span>
            }else{
                return val

            }
        }
    }]

    return (
        <Fragment>
            <Header
                topic="เอกสารโครงการทั้งหมด"
                description="รายชื่อเอกสารโครงการที่คุณสร้างทั้งหมด"
                headerRight={
                    <div>
                        <Button style={{ marginBottom: 5 }} onClick={showModal} >
                            <Icon type="plus" />
                            <span className=" hidden-xs hidden-sm hidden-md">
                                สร้างแบบเสนอโครงการ
                            </span>
                        </Button>
                        <Modal
                            title="เลือกประเภทโครงการ"
                            visible={visible}
                            footer={false}
                            style={{ textAlign: 'center' }}
                            onCancel={handleCancel}
                        >
                            <Link to="/create">
                                <ButtonCustom style={{ marginRight: 20 }}>
                                    แบบเสนอโครงการ
                                 </ButtonCustom>
                            </Link>
                            <Link to="#">
                                <ButtonCustom>
                                    แบบสรุปโครงการ
                                </ButtonCustom>
                            </Link>
                        </Modal>
                    </div>
                }

            />
            <div>
            </div>
            <Table
                className="pointer"
                style={{ padding: 20 }}
                dataSource={data}
                rowKey={item => item.id}
                columns={columns}
                locale={tableLocale}
                loading={isLoading}
                onChange={handleChange}
                scroll={{ x: 700 }}
                size="middle"
                onRow={(document) => {
                    return {
                        onClick: event => props.history.push(`/view`)
                        // onClick: event => console.log(document.id)
                    }
                }}
            />
        </Fragment>
    )

}

const mapStateToProps = state => ({
    userId: state.login.userId,
})

export default withRouter(connect(mapStateToProps)(LecPege))