import React from 'react'

import DefaultLayout from 'layouts/DefaultLayout'
import ListProjectClub from 'components/ListProjectClub'

const Projects = () => (
    <DefaultLayout
        middle={<ListProjectClub />}
    />
)

export default Projects