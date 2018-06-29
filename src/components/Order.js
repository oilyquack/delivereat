import React from "react";

class Order extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="app__menu__order" id={this.props.item}>
        <p>Meal: {this.props.menuName}</p>
        <p>Quantity: {this.props.itemQuantity}</p>
        <p>
          Price: £
          <span id="item-price">
            {(this.props.menuPrice * this.props.itemQuantity).toFixed(2)}
          </span>
        </p>
      </div>
    );
  }
}

export default Order;
