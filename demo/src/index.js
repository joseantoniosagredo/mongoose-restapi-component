import React, { Component } from 'react'
import { render } from 'react-dom'

import Example from '../../src'
const tree = [
  {
    "name": "Customer",
    "route": "/customer",
    "paths": [
      {
        "name": "name",
        "type": "String",
        "required": true
      }, {
        "name": "comment",
        "type": "String",
        "required": false
      }, {
        "name": "_id",
        "type": "ObjectId",
        "required": false
      }, {
        "name": "__v",
        "type": "Number",
        "required": false
      }]
  },
  {
    "name": "Provider",
    "route": "/provider",
    "paths": [
      {
        "name": "name",
        "type": "Array",
        "label": "hola",
        "required": true,
        "children": [
          {
            "name": "hola",
            "type": "String",
            "required": true
          }, {
            "name": "adios",
            "type": "String",
            "required": true
          }, {
            "name": "_id",
            "type": "ObjectId",
            "required": false
          }
        ]
      }, {
        "name": "comment",
        "type": "String",
        "required": false
      }, {
        "name": "_id",
        "type": "ObjectId",
        "required": false
      }, {
        "name": "__v",
        "type": "Number",
        "required": false
      }
    ]
  }
]

fetch = (...args) => new Promise((resolve, reject) => {
  const route = args.shift().url.replace(window.origin, '')
  const model = tree.find(model => model.route === route)
  resolve({
    json: () => new Promise(resolve => {
      const items = parseInt(Math.random() * 100)
      const array = []
      for (var i = 0; i < items; i++) {
        array.push({
          ...model.paths.map(el => {
            const val = () => {
              const concat = (string, c) => {
                let s = string + 'bla '
                if (c <= 0) return s
                return concat(s, c - 1)
              }
              switch (el.type) {
                case 'String': return concat('', Math.random() * 20)
                case 'Number': return parseInt(Math.random() * 10)
                case 'Array': return []
              }
            }
            return { key: el.name, value: val() }
          }).reduce((obj, next) => {
            obj[next.key] = next.value
            return obj
          }, {}),
          _id: i
        })
      }
      resolve(array)
    })
  })
})
class Demo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAppBar: false,
      menuChanged: ''
    }
  }
  render() {
    const { showAppBar } = this.state
    return <div>
      <h1>Mongoose RestApi demo</h1>
      <div>
        <label style={{ paddingRight: 10 }} htmlFor='showAppBar'>Show app bar</label>
        <select id='showAppBar' value={showAppBar} onChange={ev => this.setState({ showAppBar: JSON.parse(ev.target.value) })}>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <p>Selected menu listener: {this.state.menuChanged}</p>
      </div>
      <Example
        showAppBar={this.state.showAppBar}
        tree={tree}
        onMenuChange={menuChanged => this.setState({ menuChanged })} />
    </div>
  }
}

render(<Demo />, document.querySelector('#demo'))
