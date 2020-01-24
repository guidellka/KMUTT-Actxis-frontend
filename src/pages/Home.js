import React from 'react'

import AuthLayout from '../layouts/AuthLayout'
import DefaultLayout from 'layouts/DefaultLayout'
import StudentPage from 'components/ListProjectStudent'

const Home = () => (
    <AuthLayout>
        <DefaultLayout
            showSidebar={false}
            // ถ้าไม่ใช่นศก็เด้งไปหน้าอื่น
            middle={<StudentPage />}
        />
    </AuthLayout>
)

export default Home