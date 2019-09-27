import React from 'react'

import DefaultLayout from 'layouts/DefaultLayout'
import Test from 'components/Test'

const TestComment = () => (
    <DefaultLayout
        middle={<Test />}
    />
)

export default TestComment