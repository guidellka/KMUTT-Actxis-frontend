import React, { Component } from 'react'
import { Layout } from 'antd'
import PropTypes from 'prop-types'

import Navbar from '../components/NavbarCustom'
import Sidebar from '../components/Sidebar'

const { Content } = Layout

class DefaultLayout extends Component {
    render() {
        return (
            <Layout>
                <Navbar />
                    <Layout>
                        <Sidebar />
                        <Content
                            style={{
                                background: '#fff',
                                paddingBottom: 20,
                                minHeight: 280,
                            }}
                        >
                            {this.props.middle}
                        </Content>
                    </Layout>
            </Layout>

        )
    }
}

DefaultLayout.propTypes = {
    middle: PropTypes.element,
}

export default DefaultLayout