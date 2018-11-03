import React from 'react'

import ModelForm from './ModelForm'

function mapPaths(paths) {
    return paths.filter(el=>el.name!=='_id').map(el => {
        if (el.complex)
            return {
                key: el.name,
                value: mapPaths(el.children)
            }
        if (el.type === 'Array')
            return {
                key: el.name,
                value: []
            }
        return {
            key: el.name,
            value: ''
        }
    }).reduce((obj, next) => {
        obj[next.key] = next.value
        return obj
    }, {})
}
export default class AddForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: mapPaths(props.paths)
        }
    }

    get data() {
        return this.state.data
    }

    handleChange(data) {
        this.setState({ data })
    }

    render() {
        return <ModelForm value={{ ...this.props.data, ...this.state.data }} onChange={this.handleChange.bind(this)} paths={this.props.paths} />
    }
}