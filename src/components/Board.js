import React, { Component } from 'react';

import '../css/Board.css'

/*
Board creates the checkboxes for the balls

  <Board
    Balls={current.Balls}
    onClick={(i) => this.handleClick(i)}
  />
*/

function Ball(props) {
  return (
    <input
      name={props.index}
      type="checkbox"
      className="ball"
      onClick={props.onClick}
      checked={props.check}
      disabled={props.check}
    />
  );
}

export default class Board extends Component {
  renderBall (i) {
    return (
      <Ball
        index={i}
        check={this.props.Balls[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const listItems = this.props.Balls.map((value, index) =>
      <li className="ball__list-item" key={index}>{this.renderBall(index)}</li>
    )

    return (
      <ol className="ball__list">
        {listItems}
      </ol>
    );
  }
}
