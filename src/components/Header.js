import React, {Component} from 'react'
import '../css/Header.css'

export default class Header extends Component {
  render () {
    let buttonText =
      this.props.currentPage !== 'help' ? 'What is this?' : 'Close help!'
    return (
      <header className="site-header header">
        <h1 className="header__heading">Odds.cool Lottery Machine</h1>
        <button className="header__help-button" onClick={this.props.onClick}>
          {buttonText}
        </button>
      </header>
    )
  }
}
