import React, { Component } from 'react'
import { render } from 'react-dom'

import Example from '../../src/components/App'

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
/*
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
//import App from './App';
import * as serviceWorker from './serviceWorker';
var deferred = null

ReactDOM.render(<App />, document.getElementById('demo'));
window.addEventListener('beforeinstallprompt', function (e) {
    console.log('bfp')
    deferred = e
})
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
*/