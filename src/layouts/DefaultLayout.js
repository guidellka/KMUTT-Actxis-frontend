import React, { Component, Children } from 'react'
import { Layout } from 'antd'
import PropTypes from 'prop-types'

import Navbar from '../components/NavbarCustom'
import Sidebar from '../components/Sidebar'

const { Content } = Layout

class DefaultLayout extends Component {
    render() {
        return (
            <Layout>
                {this.props.showSidebar ?
                    <Navbar showIconMenu={this.props.showSidebar} />
                    :
                    <Navbar showIconMenu={this.props.showSidebar} />
                }
                <Layout>
                    {this.props.showSidebar ?
                        <Sidebar />
                        :
                        null
                    }
                    <Content
                        style={{
                            background: '#fff',
                            paddingBottom: 20,
                            minHeight: 280,
                        }}
                    >
                        {this.props.middle}
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>

        )
    }
}

DefaultLayout.defaultProps = {
    showSidebar: true
}

DefaultLayout.propTypes = {
    middle: PropTypes.element,
    showSidebar: PropTypes.bool,
}

export default DefaultLayout