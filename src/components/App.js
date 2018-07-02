import React from "react";
import Header from "./Header";
import Order from "./Order";
import Menu from "./Menu";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      menu: {},
      order: {},
      total: 0,
      deliveryCharge: 5
    };

    this.receiver = this.receiver.bind(this);
    this.sendOrderToAdmin = this.sendOrderToAdmin.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.receiverDelete = this.receiverDelete.bind(this);
    // this.hideOrder = this.hideOrder.bind(this);
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

  receiver(id) {
    let prevOrder = this.state.order;
    let newOrder = Object.assign({}, prevOrder, {
      [id]: !this.state.order[id] ? 1 : this.state.order[id] + 1
    });
    this.setState({
      order: newOrder
    });
  }

  receiverDelete(id) {
    let prevOrder = this.state.order;
    let newOrder = Object.assign({}, prevOrder);
    delete newOrder[id];

    this.setState({
      order: newOrder
    });
  }

  // hideOrder() {
  //   const orderToHide = document.getElementById("#app__menu__order");
  //   if (orderToHide.style.display === "none") {
  //     orderToHide.style.display = "flex";
  //   } else {
  //     orderToHide.style.display = "none";
  //   }
  // }

  sendOrderToAdmin(event) {
    event.preventDefault();

    fetch("/order", {
      method: "post",
      body: JSON.stringify(this.state.order),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response =>
        alert(
          "Your order has been recieved. The restaurant will get back to you soon!"
        )
      )
      .catch(error => alert("Sorry, we couldn't process your oder."));

    this.setState({
      order: {}
    });
  }

  calculateTotal(menu, order) {
    const total = Object.entries(order)
      .map(([id, quantity]) => menu[id].price * quantity)
      .reduce((acc, value) => acc + value, 0);

    return total;
  }

  render() {
    const total = this.calculateTotal(this.state.menu, this.state.order);
    console.log(this.state.order);
    return (
      <div>
        <Header />

        <div className="app__menu">
          <h2>Menu</h2>
          <form>
            {Object.values(this.state.menu).map(item => {
              return (
                <Menu key={item.id} item={item} receiver={this.receiver} />
              );
            })}
          </form>
        </div>
        <div className="app__order">
          <h2>
            Order{" "}
            <span className="hide" onClick={this.hideOrder}>
              🤫
            </span>
          </h2>
          <div className="app__menu__order" id="app__menu__order">
            {Object.entries(this.state.order).map(([id, quantity]) => {
              return (
                <Order
                  key={id}
                  menuName={this.state.menu[id].name}
                  menuPrice={this.state.menu[id].price}
                  menuItemId={id}
                  itemQuantity={quantity}
                  receiverDelete={this.receiverDelete}
                />
              );
            })}
          </div>
          <div className="app__menu__order__subtotal">
            <p>Subtotal: £{total}</p>
            <p>Delivery Fee: £5.00</p>
            <p>Total: £{(total + this.state.deliveryCharge).toFixed(2)}</p>
          </div>
          <button
            className="add-to-order-button"
            onClick={this.sendOrderToAdmin}
          >
            Feed me
          </button>
        </div>
      </div>
    );
  }
}

export default App;
