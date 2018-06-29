import React from "react";

class Order extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div id={this.props.item}>
        <p>{this.props.menuName}</p>
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
