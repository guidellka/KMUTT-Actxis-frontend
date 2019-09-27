import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Result, Button } from 'antd'

import FullScreenLayout from 'layouts/FullScreenLayout'

class HttpNotFound extends Component {
    render() {
        const main = (
            <Result
                status="404"
                title="404 Page not found"
                subTitle="หน้าที่คุณกำลังมองหาอาจถูกลบ เปลี่ยนชื่อ หรือไม่สามารถเข้าถึงได้ชั่วคราว"
                extra={
                    <Link to="/">
                        <Button type="primary">กลับสู่หน้าหลัก</Button>
                    </Link>
                }
            />
        )
        return <FullScreenLayout main={main} />
    }
}

export default HttpNotFound;