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
      totalArray: [],
      total: 0,
      deliveryCharge: 5.0
    };

    this.receiver = this.receiver.bind(this);
    this.receiverAmount = this.receiverAmount.bind(this);
    // this.receiverDelete = this.receiverDelete.bind(this);
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

  receiverAmount(value) {
    let clone = this.state.totalArray;
    clone.push(value);
    let subtotal = clone.reduce(function(acc, price) {
      return acc + price;
    }, 0);
    this.setState({
      total: subtotal
    });
  }

  // receiverDelete(id) {
  //   let prevOrder = this.state.order;
  //   let newOrder = Object.assign({}, prevOrder);
  //   delete newOrder[id];

  //   let newArray = this.state.totalArray;
  //   let newSortedArray = newArray.sort();
  //   let itemIndex = this.state.totalArray.indexOf(this.state.menu[id].price);
  //   let quantity = this.state.order[id];
  //   let newSlicedArray = newSortedArray.slice(itemIndex, quantity);

  //   let subtotal = newArray.reduce(function(acc, price) {
  //     return acc + price;
  //   }, 0);

  //   this.setState({
  //     order: newOrder,
  //     totalArray: newSlicedArray,
  //     total: subtotal
  //   });
  // }

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
                  receiver={this.receiver}
                  receiverAmount={this.receiverAmount}
                />
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
                  /* receiverDelete={this.receiverDelete} */
                />
              );
            })}
          </div>
          <div className="app__menu__order__subtotal">
            <p>Subtotal: £{(+this.state.total).toFixed(2)}</p>
            <p>Delivery Fee: £5.00</p>
            <p>
              Total: £{(
                +this.state.total.toFixed(2) +
                +this.state.deliveryCharge.toFixed(2)
              ).toFixed(2)}
            </p>
          </div>
          <button onSubmit={this.sendOrderToAdmin}>Feed me</button>
        </div>
      </div>
    );
  }
}

export default App;
