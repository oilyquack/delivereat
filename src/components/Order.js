import React from "react";

class Order extends React.Component {
  constructor() {
    super();

    // this.deleteItem = this.deleteItem.bind(this);
  }

  // deleteItem() {
  //   this.props.receiverDelete(this.props.menuItemId);
  // }

  render() {
    return (
      <div id={this.props.item}>
        <p>{this.props.menuName}</p>
        <p>Quantity: {this.props.itemQuantity}</p>
        <span /*onClick={this.deleteItem}*/ className="delete-item">🗑</span>
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
