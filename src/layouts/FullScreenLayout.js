import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

class FullScreenLayout extends Component {
    render() {
        const Main = styled.main`
            display:flex;
            align-items:center;
            justify-content:center;
            min-height: 80vh;
        `
        return (
            <Fragment>
                <Main>
                    {this.props.main}
                </Main>
            </Fragment>
        )
    }
}

export default FullScreenLayout
