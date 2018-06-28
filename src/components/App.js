import React from "react";
import Header from "./Header";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      menu: {}
    };
  }

  componentDidMount() {
    fetch("/menu")
      .then(response => response.json())
      .then(json => {
        this.setState({
          menu: json
        });
      })
      .catch(error => alert("Sorry, I coulnd't find the menu"));
  }

  render() {
    return (
      <div>
        <Header />
        <h2>Menu</h2>

        {Object.values(this.state.menu).map(item => {
          return (
            <div>
              <p>{item.name}</p>
              <p>£{item.price.toFixed(2)}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
