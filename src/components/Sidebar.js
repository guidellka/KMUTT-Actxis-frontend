import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon, Affix } from 'antd'
import { connect } from 'react-redux'

import { changeSelectedKey, changeSubMenuKeys } from '../redux/sidebar'

const { Sider } = Layout
const { SubMenu } = Menu

class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.changeSelectedKey = this.changeSelectedKey.bind(this)
        this.openSubMenu = this.openSubMenu.bind(this)
    }

    openSubMenu(key) {
        this.props.dispatch(changeSubMenuKeys(key))
    }
    changeSelectedKey(key) {
        this.props.dispatch(changeSelectedKey(key))
    }

    render() {
        let subMenuDocuments = [
            <Menu.Item key="Documents_infer_all" onClick={() => this.changeSelectedKey(["Documents_infer_all"])}>
                แบบเสนอโครงการทั้งหมด
                <Link to="/projects" />
            </Menu.Item>,
            // {/* //  ต้องรอให้กิจกรรมจบเเล้ว เเละกองกิจอนุญาตให้เริ่มเขียนสรุปโครงการ Menu.Item ถึงจะขึน */}
            <Menu.Item key="Documents_offer_all" onClick={() => this.changeSelectedKey(["Documents_offer_all"])}>
                เเบบสรุปโครงการทั้งหมด
                <Link to="#" />
            </Menu.Item>,
        ]

        let subMenuTrackings = [
            <Menu.Item key="Tracking_infer" onClick={() => this.changeSelectedKey(["Tracking_infer"])}>
                แบบเสนอโครงการทั้งหมด
                <Link to="/tracking" />
            </Menu.Item>,
            <Menu.Item key="Tracking_offer" onClick={() => this.changeSelectedKey(["Tracking_offer"])}>
                เเบบสรุปโครงการทั้งหมด
                <Link to="#" />
            </Menu.Item>,
        ]

        let subMenuBudgets = [
            <Menu.Item key="budget_club" onClick={() => this.changeSelectedKey(["budget_club"])}>
                งบประมาณโดยรวม
            <Link to="#" />
            </Menu.Item>,
            <Menu.Item key="budget_project" onClick={() => this.changeSelectedKey(["budget_project"])}>
                งบประมาณแต่ละโครงการ
                <Link to="#" />
            </Menu.Item>
        ]

        let subMenuInformations = [
            <Menu.Item key="information_organize" onClick={() => this.changeSelectedKey(["information_organize"])}>
                ข้อมูลหน่วยงาน
                <Link to="#" />
            </Menu.Item>,
            <Menu.Item key="old_documents" onClick={() => this.changeSelectedKey(["old_documents"])}>
                เอกสารย้อนหลัง
                <Link to="#" />
            </Menu.Item>
        ]
        
        return (
            <Sider
                width={248}
                trigger={null}
                collapsed={this.props.sidebar}
                collapsible
                style={{ zIndex: 50, minHeight: "100vh" }}
            >
                <Affix offsetTop={55} style={{ width: 248 }}>
                    <Menu mode="inline"
                        style={{ height: '100vh', borderRight: 0, paddingTop: '10px', overflowY: "auto", paddingBottom: 100 }}
                        defaultOpenKeys={this.props.submenukeys}
                        defaultSelectedKeys={this.props.selectedkey}
                        onOpenChange={(openKey) => this.openSubMenu(openKey)}
                    >
                        <SubMenu key="Documents"
                            title={
                                <div>
                                    <Icon type="file-text" />
                                    <span><strong>กรอกแบบฟอร์มโครงการ</strong></span>
                                </div>
                            }
                        >
                            {this.props.sidebar ?
                                <Menu.ItemGroup title="กรอกแบบฟอร์มโครงการ" >
                                    {subMenuDocuments}
                                </Menu.ItemGroup>
                                :
                                subMenuDocuments
                            }
                        </SubMenu>
                        <SubMenu key="Tracking"
                            title={
                                <div>
                                    <Icon type="tag" />
                                    <span><strong>ติดตามโครงการ</strong></span>
                                </div>
                            }
                        >
                            {this.props.sidebar ?
                                <Menu.ItemGroup title="ติดตามโครงการ" >
                                    {subMenuTrackings}
                                </Menu.ItemGroup>
                                :
                                subMenuTrackings
                            }
                        </SubMenu>
                        <SubMenu key="Budget"
                            title={
                                <div>
                                    <Icon type="dollar" />
                                    <span><strong>งบประมาณ</strong></span>
                                </div>
                            }
                        >
                            {this.props.sidebar ?
                                <Menu.ItemGroup title="งบประมาณ" >
                                    {subMenuBudgets}
                                </Menu.ItemGroup>
                                :
                                subMenuBudgets
                            }
                        </SubMenu>
                        <SubMenu key="etc"
                            title={
                                <div>
                                    <Icon type="info-circle" />
                                    <span><strong>ข้อมูลเพิ่มเติม</strong></span>
                                </div>
                            }
                        >
                            {this.props.sidebar ?
                                <Menu.ItemGroup title="ข้อมูลเพิ่มเติม" >
                                    {subMenuInformations}
                                </Menu.ItemGroup>
                                :
                                subMenuInformations
                            }
                        </SubMenu>
                    </Menu>
                </Affix>
            </Sider>
        )
    }
}

const mapStateToProps = state => ({
    sidebar: state.sidebar.sidebar,
    selectedkey: state.sidebar.selectedkey,
    submenukeys: state.sidebar.submenukeys
})

export default connect(mapStateToProps)(Sidebar)