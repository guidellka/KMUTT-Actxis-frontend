import React from 'react'

import DefaultLayout from 'layouts/DefaultLayout'
import WrappedProjectProposalForm from 'components/Form'

const FormPage = () => (
    <DefaultLayout
        middle={<WrappedProjectProposalForm />}
    />
)

export default FormPage