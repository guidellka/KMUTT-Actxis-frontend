import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Dropdown, Icon, Avatar, Affix } from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { sidebarToggle, changeSelectedKey, changeSubMenuKeys } from '../redux/sidebar'
import LogoImg from 'assets/images/LogoNon-Content.png';

const Nav = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
    height: 55px;
    padding: 0 16px !important;
    width: 100%;
    background-color: #ffffff;
    z-index:100;
    box-shadow:  0px 4px 4px rgba(0, 0, 0, 0.25);
`

const LinkStyleNone = styled(Link)`
    color: #464545 !important;
`

const Logo = styled.img`
    height: 30px;
    margin-right: 8px;
`

const LinkMenu = styled(Link)`
    display: flex;
    align-items: center;
    color: #464545;
    &:hover,&:active,&:visited, &:link,&:focus{
        color: #464545;
        border: none;
    }
`

const ProfileName = styled.div`
    font-size:13px;
    margin-right:2px;
    margin-left: 10px;

`

const FlexCenterItem = styled.div`
    display: flex;
    align-items: center;
`

const menu = (
    <Menu>
        <Menu.Item>
            <Link to="#">
                ดูโปรไฟล์
            </Link>
        </Menu.Item>
        <Menu.Item>
            <Link to="#">
                การตั้งค่า
            </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
            <Link to="#">
                ออกจากระบบ
            </Link>
        </Menu.Item>
    </Menu>
)

class NavbarCustom extends Component {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this)
        this.changeSelectedKey = this.changeSelectedKey.bind(this)
    }

    toggle() {
        const { dispatch } = this.props
        dispatch(sidebarToggle())
        if (!this.props.sidebar) {
            dispatch(changeSubMenuKeys([]))
        }
    }

    changeSelectedKey() {
        const { dispatch } = this.props
        dispatch(changeSelectedKey([""]))
    }

    render() {
        let name = `${this.props.firstName} ${this.props.lastName}`
        return (
            <Affix style={{ zIndex: 100 }}>
                <Nav>
                    <FlexCenterItem>
                        {this.props.showIconMenu ?
                            <Icon
                                className="trigger icon-fold"
                                type={this.props.sidebar ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                            :
                            null
                        }
                        <LinkStyleNone to="/home" onClick={this.changeSelectedKey}>
                            <Logo src={LogoImg} />
                            <span>
                                <strong>KMUTT Act<span style={{ color: '#E88044' }}>x</span>is</strong>
                            </span>
                        </LinkStyleNone>
                    </FlexCenterItem>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <LinkMenu to="#">
                            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{name.slice(0,1)}</Avatar>
                            <ProfileName className="hidden-xs">
                                {name.length > 25 ? `${name.slice(0, 24)}...` : name}
                            </ProfileName>
                            <Icon type="down" style={{ marginLeft: 5 }} />
                        </LinkMenu>
                    </Dropdown>
                </Nav >
            </Affix>
        )
    }
}

NavbarCustom.propTypes = {
    showIconMenu: PropTypes.bool,
}

const mapStateToProps = state => ({
    sidebar: state.sidebar.sidebar,
    firstName: state.login.firstName,
    lastName: state.login.lastName,
})

export default connect(mapStateToProps)(NavbarCustom)