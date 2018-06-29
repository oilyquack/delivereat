import React from "react";
import Header from "./Header";
import Order from "./Order";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      menu: {}
    };
  }

  receiver(data) {
    this.setState({
      menu: json
    });
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

        <div className="app__menu">
          <h2>Menu</h2>
          {Object.values(this.state.menu).map(item => {
            return (
              <div className="app__menu__item">
                <p>
                  <strong>{item.name}</strong>
                </p>
                <p>{item.description}</p>
                <div className="app__menu__place-order">
                  <p className="app__menu__item__price">
                    £{item.price.toFixed(2)}
                  </p>
                  <button className="add-to-order-button">✚</button>
                </div>
              </div>
            );
          })}
        </div>
        <Order />
      </div>
    );
  }
}

export default App;
