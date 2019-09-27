import React from 'react'

import DefaultLayout from 'layouts/DefaultLayout'
import ListProjectClub from 'components/ListProjectClub'

const SelectProject = () => (
    <DefaultLayout
        middle={<ListProjectClub showAction />}
    />
)

export default SelectProject