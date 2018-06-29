import React from "react";
import Header from "./Header";
import Order from "./Order";
import Menu from "./Menu";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      menu: {},
      order: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(id) {
    let prevOrder = this.state.order;
    let newOrder = Object.assign({}, prevOrder, {
      [id]: !this.state.order[id] ? 1 : this.state.order[id] + 1
    });
    this.setState({
      order: newOrder
    });
    console.log(newOrder);
  }

  render() {
    return (
      <div>
        <Header />

        <div className="app__menu">
          <h2>Menu</h2>
          <form>
            {Object.values(this.state.menu).map(item => {
              return (
                <Menu
                  key={item.id}
                  item={item}
                  handleSubmit={this.handleSubmit}
                />
              );
            })}
          </form>
        </div>
        <Order />
      </div>
    );
  }
}

export default App;
