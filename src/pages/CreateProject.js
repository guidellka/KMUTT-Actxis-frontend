import React from 'react'

import AuthLayout from '../layouts/AuthLayout'
import DefaultLayout from 'layouts/DefaultLayout'
import CreateProject from 'components/CreateProject'

const Home = () => (
    <AuthLayout>
        <DefaultLayout
            showSidebar={false}
            middle={<CreateProject />}
        />
    </AuthLayout>
)

export default Home