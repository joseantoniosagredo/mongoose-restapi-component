import React, { Component } from 'react'
import { render } from 'react-dom'

import Example from '../../src'

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
        tree={'/tree'}
        onMenuChange={menuChanged => this.setState({ menuChanged })} />
    </div>
  }
}

render(<Demo />, document.querySelector('#demo'))
