import React, { Component } from 'react';
import classnames from 'classnames'

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
    <label className={classnames('ball__label', {
      'ball__label--active': props.check
    })}>
      <input
        name={props.index}
        type="checkbox"
        className="ball__checkbox"
        onClick={props.onClick}
        checked={props.check}
        disabled={props.check || props.disabled}
      />
    </label>
  );
}

export default class Board extends Component {
  render() {
    const listItems = this.props.Balls.map((value, index) => (
      <li className="ball__list-item" key={index}>
        <Ball
          index={index}
          check={this.props.Balls[index]}
          onClick={() => this.props.onClick(index)}
          disabled={this.props.disableAll}
        />
      </li>
    ))

    return (
      <ol className="ball__list">
        {listItems}
      </ol>
    );
  }
}
