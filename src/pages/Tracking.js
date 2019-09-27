import React from 'react'

import DefaultLayout from 'layouts/DefaultLayout'
import ProjectTracking from 'components/ProjectTracking'

const Tracking = () => (
    <DefaultLayout
        middle={<ProjectTracking />}
    />
)

export default Tracking