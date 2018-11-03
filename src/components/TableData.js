import React from 'react'

import Table from './table'

export default class TableData extends React.Component {
    state = {
        data: [],
        filter: '',
        selected: []
    }
    refreshData(state = {}) {
        const { route } = this.props
        const { filter } = this.state
        const request = new Request(route + (filter ? `?$any=${filter}` : ''), { headers: this.props.requestHeaders })
        fetch(request).then(data => {
            data.json().then(data => {
                this.setState({ data, ...state })
            }).catch(err => {
            })
        }).catch(err => {
            console.log(err)
        })
    }
    componentDidMount() {
        this.refreshData()
    }
    componentDidUpdate(prevProps, prevState) {
        function getParams(props, state) {
            const { route } = props
            const { filter } = state
            return { route, filter }
        }
        if (JSON.stringify(getParams(prevProps, prevState)) !== JSON.stringify(getParams(this.props, this.state)))
            this.refreshData()
    }
    onChangeSelected = (selected) => {
        this.setState({ selected })
    }
    onAddClick = () => {
        this.props.onAddClick(() => {
            this.refreshData()
        })
    }
    onModifyClick = () => {
        this.props.onModifyClick(this.state.data.find(el => el._id === this.state.selected[0]), () => {
            this.refreshData({ selected: [] })
        })
    }
    onDeleteClick = () => {
        const { selected } = this.state
        this.props.onDeleteClick(selected, () => {
            this.refreshData({ selected: [] })
        })
    }
    render() {
        return <Table {...this.props}
            data={this.state.data}
            filterValue={this.state.filter}
            onAddClick={this.onAddClick}
            onModifyClick={this.onModifyClick}
            onDeleteClick={this.onDeleteClick}
            selected={this.state.selected}
            onSelect={this.onChangeSelected}
            onChangeFilter={ev => this.setState({ filter: ev.target.value })} />
    }
}