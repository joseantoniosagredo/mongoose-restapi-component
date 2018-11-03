import React from 'react'

import ArrayModelForm from './ModelFormArray'
import withStyles from '@material-ui/core/styles/withStyles'
import TextFieldUI from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
const textFieldStyle = {
    root: {
        margin: '10px'
    }
}
const TextField = withStyles(textFieldStyle)(TextFieldUI)
export default class ModelForm extends React.Component {
    handleChange(path, event) {
        this.props.onChange({ ...this.props.value, [path]: event.target.value })
    }
    handleModelChange(path, value) {
        this.props.onChange({ ...this.props.value, [path]: value })
    }
    renderPath(path) {
        if (path.complex) {
            return <div>
                <div style={{ marginLeft: 5, marginTop: 5 }}><InputLabel required={path.required} >{path.name}</InputLabel></div>
                <ModelForm value={this.props.value[path.name]} onChange={this.handleModelChange.bind(this, path.name)} paths={path.children} />
            </div>
        }
        if (path.type === 'Array') {
            return <div>
                <div style={{ marginLeft: 5, marginTop: 5 }}><InputLabel required={path.required} >{path.name}</InputLabel></div>
                <div><ArrayModelForm value={this.props.value[path.name]} onChange={this.handleModelChange.bind(this, path.name)} paths={path.children} label={path.label ? path.label : '_id'} /></div>
            </div>
        }
        return <TextField value={this.props.value[path.name]} onChange={this.handleChange.bind(this, path.name)} label={path.name} required={path.required} />
    }
    render() {
        const { paths } = this.props
        return paths.filter(path => path.name !== '_id' && path.name !== '__v').map(path => this.renderPath(path));
    }
}