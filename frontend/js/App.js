import React, { Component } from "react";
import ScreenManager from './screens/ScreenManager';

class App extends Component {
  render() {
    return(  
      <ScreenManager data={this.props.data}/>
    );
  }
}

export default App;