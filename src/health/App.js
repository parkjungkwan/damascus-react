import React, { Component } from 'react';
import {
  Box,
  Grommet,
  ResponsiveContext
} from 'grommet';
import NavBar from './containers/NavBar';
import FooBar from './components/FooBar';

const theme = {
  global: {
    colors: {
      brand: "#000000"
    },
    font: {
      family: "Roboto, Noto Sans KR",
      size: "14px",
      height: "20px",
    },
  },
}

class App extends Component {
  render() {
    return (
      <Grommet theme={theme} full>
        <ResponsiveContext.Consumer>
          {size => (
            <Box fill="horizontal">
              <NavBar />
              <FooBar />
            </Box>
          )}
        </ResponsiveContext.Consumer>
      </Grommet>
    );
  }
}

export default App;