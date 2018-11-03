import React from 'react'

import ModelForm from './ModelForm'


export default class ModifyForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: props.data
        }
    }

    get data() {
        return this.state.data
    }

    handleChange(data) {
        this.setState({ data })
    }

    render() {
        return <ModelForm value={this.state.data} onChange={this.handleChange.bind(this)} paths={this.props.paths} />
    }
}