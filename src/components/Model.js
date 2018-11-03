import React, { Component } from 'react';

import TableData from './TableData'
import AddForm from './AddForm'
import ModifyForm from './ModifyForm'

import Button from '@material-ui/core/Button';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

export default class Model extends Component {
    state = {
        addPopUp: false,
        updatePopUp: false,
        updateModel: {},
        callback: null
    }

    updateModel = React.createRef()

    saveModel = React.createRef()

    handleAddConfirm = () => {
        const { route } = this.props.model
        const { callback } = this.state
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4 && xhttp.status === 201) {
                callback(null)
                this.setState({ addPopUp: false })
            } else {
            }
        };
        xhttp.open('POST', route, true);
        const { requestHeaders } = this.props
        Object.keys(requestHeaders).forEach(requestKey => {
            xhttp.setRequestHeader(requestKey, requestHeaders[requestKey])
        })
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(this.saveModel.current.data));
    }

    handleUpdateConfirm = () => {
        const { route } = this.props.model
        const { callback } = this.state
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                callback(null)
                this.setState({ updatePopUp: false })
            } else {
            }
        };
        xhttp.open('PUT', `${route}/${this.state.updateModel._id}`, true);
        const { requestHeaders } = this.props
        Object.keys(requestHeaders).forEach(requestKey => {
            xhttp.setRequestHeader(requestKey, requestHeaders[requestKey])
        })
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(this.updateModel.current.data));
    }

    handleAddClose = () => {
        this.setState({ addPopUp: false })
    };

    handleUpdateClose = () => {
        this.setState({ updatePopUp: false })
    }

    onAddClick = (callback) => {
        this.setState({ addPopUp: true, callback })
    }

    onModifyClick = (updateModel, callback) => {
        this.setState({ updateModel, updatePopUp: true, callback })
    }

    onDeleteClick = (deleted, callback) => {
        const modelName = this.props.model.name
        deleted.forEach(id => {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState === 4 && xhttp.status === 200) {
                    callback(null)
                } else if (xhttp.status === 400) {
                    alert('some error')
                }
            };
            xhttp.open('DELETE', `/${modelName}/${id}`, true);
            const { requestHeaders } = this.props
            Object.keys(requestHeaders).forEach(requestKey => {
                xhttp.setRequestHeader(requestKey, requestHeaders[requestKey])
            })
            xhttp.send();
        })
    }

    render() {
        const { route } = this.props.model
        const paths = this.props.model.paths.filter(el => el.name !== '_id')
        return <div>
            <Dialog open={this.state.addPopUp} onClose={this.handleAddClose}>
                <DialogTitle>Add {this.props.model.name}</DialogTitle>
                <DialogContent>
                    <AddForm ref={this.saveModel} paths={paths} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleAddClose} color="primary">
                        Cancel
                        </Button>
                    <Button onClick={this.handleAddConfirm} color="primary">
                        Save
                        </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={this.state.updatePopUp} onClose={this.handleUpdateClose} >
                <DialogTitle>Modify {this.props.model.name}</DialogTitle>
                <DialogContent>
                    <ModifyForm ref={this.updateModel} data={this.state.updateModel} paths={paths} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleUpdateClose} color="primary">
                        Cancel
                        </Button>
                    <Button onClick={this.handleUpdateConfirm} color="primary">
                        Update
                        </Button>
                </DialogActions>
            </Dialog>
            <TableData
                requestHeaders={this.props.requestHeaders}
                headers={[{ id: '_id', path: '_id' }].concat(paths.map((header, key) => {
                    return ({
                        id: key,
                        path: header.name,
                        label: header.label
                    })
                }))}
                route={route}
                onAddClick={this.onAddClick}
                onModifyClick={this.onModifyClick}
                onDeleteClick={this.onDeleteClick} />
        </div>
    }
}