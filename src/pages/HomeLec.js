import React from 'react'

import AuthLayout from '../layouts/AuthLayout'
import DefaultLayout from 'layouts/DefaultLayout'
import LecPage from 'components/LecPage'

const Home = () => (
    <AuthLayout>
        <DefaultLayout
            showSidebar={false}
            // ถ้าไม่ใช่นศก็เด้งไปหน้าอื่น
            middle={<LecPage />}
        />
    </AuthLayout>
)

export default Home