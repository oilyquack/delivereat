import React from "react";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      menu: {}
    };
  }

  componentDidMount() {
    console.log("HI");
    fetch("//localhost:8080/menu")
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          menu: json
        });
      })
      .catch(error => alert("Sorry, I coulnd't find the menu"));
  }

  render() {
    return (
      <div>
        <h1>Delivereat app</h1>
        <h2>Menu</h2>

        {Object.values(this.state.menu).map(item => {
          return (
            <div>
              <p>{item.name}</p>
              <p>£{item.price}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
