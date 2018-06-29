import React from "react";

class Menu extends React.Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.handleSubmit(
      this.props.item.id,
      this.props.item.name,
      this.props.item.price
    );
  }

  render() {
    return (
      <div
        className="app__menu__item"
        id={this.props.item}
        onClick={this.handleSubmit}
      >
        <p>
          <strong>{this.props.item.name}</strong>
        </p>
        <p>{this.props.item.description}</p>
        <div className="app__menu__place-order">
          <p className="app__menu__item__price">
            £{this.props.item.price.toFixed(2)}
          </p>
          <button className="add-to-order-button">✚</button>
        </div>
      </div>
    );
  }
}

export default Menu;
