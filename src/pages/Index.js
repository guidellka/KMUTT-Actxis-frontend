import React from 'react'

import DefaultLayout from 'layouts/DefaultLayout'
import ClubName from 'components/ClubName'

const Index = () => (
    <DefaultLayout
        middle={<ClubName name="สโมสรนักศึกษาคณะเทคโนโลยีสารสนเทศ" />}
    />
)

export default Index;