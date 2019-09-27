import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Empty, Icon, Table, Input, Button } from 'antd'
import Highlighter from 'react-highlight-words'

import moment from 'moment'
import 'moment/locale/th'

import axiosInstance from 'scripts/Api'
import Header from './sections/HeaderCustom.js'

class ListProjectClub extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchText: '',
            isLoading: true,
            data: [],
            error: null
        }
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`ค้นหาจากชื่อโครงการ`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    ค้นหา
            </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
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
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select())
            }
        },
        render: text => (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ),
    })

    handleSearch = (selectedKeys, confirm) => {
        confirm()
        this.setState({ searchText: selectedKeys[0] })
    }

    handleReset = clearFilters => {
        clearFilters()
        this.setState({ searchText: '' })
    }


    componentDidMount() {
        this.getData()
    }

    getData() {
        axiosInstance.get('/organizations/525f4efd-bd14-4d6d-8751-baa6efcba271/projects').then(response => {
            this.setState({
                data: response.data,
                isLoading: false
            })
        }).catch(error => {
            this.setState({
                error,
                isLoading: false
            })
        })
    }

    render() {
        const tableLocale = {
            emptyText: () => {
                if (this.state.error) {
                    return <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} description="เกิดข้อผิดพลาดขณะกำลังโหลดข้อมูล โปรดลองอีกครั้งในภายหลัง" />
                }
                return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="ไม่มีข้อมูล" />
            }
        }

        const columns = [
            {
                title: 'ชื่อโครงการ',
                dataIndex: 'name',
                key: 'name',
                render: (val) => val,
                ...this.getColumnSearchProps('name'),
            },
            {
                title: 'วันที่สิ้นสุดโครงการ',
                dataIndex: 'end_at',
                key: 'end_at',
                sorter: (a, b) => moment(a.end_at).unix() - moment(b.end_at).unix(),
                defaultSortOrder: 'ascend',
                render: (val) => moment(val).locale('th').format('ll'),
                align: 'center'
            },
            // {
                // จะเเสดงค่าต่อเมื่อกดส่งเเบบฟอร์มเเล้ว จะบันทึกค่าวันสุดท้ายของการเตรียมงาน จาก data{} เข้า DB
                // วันสุดท้ายของการเตรียมงาน อยู่ที่หน้า InferForm2 ที่ preparation_period 
                // ใช้ moment formatนี้ moment().endOf('day').fromNow()
                // ถ้ายังไม่มีการส่งฟอร์ม จะขึ้น -
                // title: 'ระยะเวลาคงเหลือ',
                // dataIndex: '???',
                // key: '???',
                // sorter: (a, b) => moment(a.???).unix() - moment(b.???).unix(),
                // render: (val) => moment(val).locale('th').endOf('day').fromNow(),
                // align: 'center'
            // },
            {
                // ถ้ายังไม่มีการกดเข้าไป จะขึ้นว่ายังไม่มีการแก้ไข
                title: 'แก้ไขล่าสุด',
                dataIndex: 'updated_at',
                key: 'updated_at',
                sorter: (a, b) => moment(a.update_at).unix() - moment(b.update_at).unix(),
                render: (val) => moment(val).locale('th').startOf('day').fromNow(),
                align: 'center'
            },
            {
                // รอเอมาทำ ดูสถานนะจากดีไซน์เอา
                title: 'สถานะ',
                align: 'center'
            },
        ]

        return (
            <Fragment>
                <Header
                    topic="การเสนอโครงการ"
                    description="รายชื่อโครงการที่ส่งแบบเสนอโครงการไปเเล้ว"
                    headerRight={
                        <Link to="#">
                            <Button style={{ marginBottom: 5 }} >
                                <Icon type="plus" />
                                <span className="hidden-md">
                                    สร้างแบบเสนอโครงการ
                                </span>
                            </Button>
                        </Link>
                    }
                />
                <Table
                    className="pointer"
                    style={{ padding: 20 }}
                    dataSource={this.state.data}
                    columns={columns}
                    rowKey={item => item.id}
                    locale={tableLocale}
                    loading={this.state.isLoading}
                    scroll={{ x: 700 }}
                    size="middle"
                    onRow={(item) => {
                        return {
                            onClick: event => this.props.history.push(`/projects/${item.id}/docs/1/create`)
                        }
                    }}
                />
            </Fragment>
        )
    }
}

export default withRouter(ListProjectClub)