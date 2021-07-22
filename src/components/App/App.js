/* Modules */
import { Component } from "react";
import { Provider } from "react-redux";

/* Store */
import store from "../../redux/store";

/* Components */
import AppRouter from "../../index.routes";

/* Styles */
import "antd/dist/antd.css";
import "./App.css";

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppRouter />
        </div>
      </Provider>
    );
  }
}

export default App;
