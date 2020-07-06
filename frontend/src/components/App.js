import React, { Component } from "react";
import { render } from "react-dom";

class App extends Component {
  
  render() {
    return (
      <div>
        <h1>This is from the Frontend React Test App</h1>
      </div>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);