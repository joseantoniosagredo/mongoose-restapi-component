import React, { Component } from 'react'

import { Admin, Resource, ListGuesser } from 'react-admin'
import dataProvider from './data_provider'
import CreateForm from './CreateForm'
import EditForm from './EditForm'
import ListForm from './ListForm'

class App extends Component {
  state = {
    menu: null,
    tree: null,
    headers: {},
    init: false
  }

  componentDidMount () {
    fetch('/tree')
      .then(res =>
        res.json().then(tree => {
          this.setState({ tree })
        })
      )
      .catch(err => {
        console.log(err)
      })
  }
  
  render () {
    return (
      <div>
        {this.state.tree &&
          <Admin dataProvider={dataProvider}>
            {this.state.tree.map(model => (
              <Resource
                name={model.name}
                list={ListForm(model)}
                edit={EditForm(model)}
                create={CreateForm(model)}
              />
            ))}
          </Admin>}
      </div>
    )
  }
}

export default App
