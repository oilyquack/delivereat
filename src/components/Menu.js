import React from "react";

class Menu extends React.Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.receiver(this.props.item.id);
  }

  render() {
    return (
      <div className="app__menu__item" id={this.props.item}>
        <p>
          <strong>{this.props.item.name}</strong>
        </p>
        <p>{this.props.item.description}</p>
        <div className="app__menu__place-order">
          <p className="app__menu__item__price">
            £{this.props.item.price.toFixed(2)}
          </p>
          <button className="add-to-order-button" onClick={this.handleSubmit}>
            ✚
          </button>
        </div>
      </div>
    );
  }
}

export default Menu;
