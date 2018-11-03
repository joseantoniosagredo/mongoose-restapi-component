import React from 'react'

import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'

import AddForm from './AddForm'
import ModifyForm from './ModifyForm'

import Button from '@material-ui/core/Button';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';


export default class ArryModelForm extends React.Component {
    state = {
        addPopUp: false,
        updatePopUp: false,
        updateModel: {},
        selected: null
    }
    updateModel = React.createRef()

    saveModel = React.createRef()

    onAddClick = () => {
        this.setState({ addPopUp: true })
    }

    handleAddConfirm = () => {
        const data = this.props.value
        data.push(this.saveModel.current.data)
        this.props.onChange(data)
        this.setState({ addPopUp: false })
    }

    handleUpdateConfirm = () => {
        const data = this.props.value
        data[this.state.selected](this.updateModel.current.data)
        this.props.onChange(data)
        this.setState({ updatePopUp: false, selected: false })
    }

    handleAddClose = () => {
        this.setState({ addPopUp: false })
    };

    handleUpdateClose = () => {
        this.setState({ updatePopUp: false })
    }

    onModifyClick = (selected) => {
        this.setState({ updateModel: this.props.value[selected], selected, updatePopUp: true })
    }

    render() {
        return <Paper style={{ borderColor: 'lightblue', padding: 10 }}>
            <Dialog open={this.state.addPopUp} onClose={this.handleAddClose}>
                <DialogTitle>Add item to array</DialogTitle>
                <DialogContent>
                    <AddForm ref={this.saveModel} paths={this.props.paths} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleAddClose} color="primary">Cancel</Button>
                    <Button onClick={this.handleAddConfirm} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={this.state.updatePopUp} onClose={this.handleUpdateClose} >
                <DialogTitle>Modify item</DialogTitle>
                <DialogContent>
                    <ModifyForm ref={this.updateModel} data={this.state.updateModel} paths={this.props.paths} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleUpdateClose} color="primary">Cancel</Button>
                    <Button onClick={this.handleUpdateConfirm} color="primary">Update</Button>
                </DialogActions>
            </Dialog>
            <div><Button onClick={this.onAddClick.bind(this)}>Add</Button></div>
            <div>
                {this.props.value.map((val, key) => <Chip
                    key={key}
                    clickable
                    onClick={this.onModifyClick.bind(this, key)}
                    label={val[this.props.label]} />
                )}
            </div>
        </Paper>
    }
}