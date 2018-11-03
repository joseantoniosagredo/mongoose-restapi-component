import React, { Component } from 'react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Model from './Model'
import LeftDrawer from './leftdrawer'
const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#7d6cff',
      main: '#5741ff',
      dark: '#452cff',
      contrastText: '#fff',
    },
    secondary: {
      light: '#88b7ff',
      main: '#5f9eff',
      dark: '#2c7fff',
      contrastText: '#000',
    },
  },
})

class App extends Component {
  state = {
    menu: null,
    tree: [],
    headers: {},
    init: false,
  }

  handleItemMenuClick = (menu) => {
    this.setState({ menu })
    if (this.props.onMenuChange) this.props.onMenuChange(menu)
  }

  render() {
    const content = this.state.menu === null ?
      <div>
        <p>Select an item from menu</p>
      </div> :
      <div>
        <Model
          model={this.props.tree.find(model => model.name === this.state.menu)}
          requestHeaders={this.state.headers} />
      </div>
    return <MuiThemeProvider theme={this.props.theme ? this.props.theme : defaultTheme}>
      <LeftDrawer
        showAppBar={this.props.showAppBar}
        selected={this.state.menu}
        onItemMenuClick={this.handleItemMenuClick}
        title={this.state.menu ? this.state.menu : 'Configuration'}
        menuItems={this.props.tree.map(model => model.name)}
        content={content} />
    </MuiThemeProvider>
  }
}

export default App;
