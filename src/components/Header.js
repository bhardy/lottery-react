import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setCurrentPage} from '../actions'
import * as global from '../variables'
import '../css/Header.css'

class Header extends Component {
  constructor () {
    super()
    this.state = {lastPage: global.PAGE_SETUP}
  }
  toggleHelp () {
    if (this.props.currentPage === global.PAGE_HELP) {
      this.props.setCurrentPage(this.state.lastPage)
    } else {
      this.setState({
        lastPage: this.props.currentPage
      })
      this.props.setCurrentPage(global.PAGE_HELP)
    }
  }

  render () {
    let buttonText =
      this.props.currentPage !== global.PAGE_HELP
        ? 'What is this?'
        : 'Close help!'
    return (
      <header className="site-header header">
        <h1 className="header__heading">Odds.cool Lottery Machine</h1>
        <button
          className="header__help-button"
          onClick={e => this.toggleHelp()}
        >
          {buttonText}
        </button>
      </header>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentPage: state.currentPage
  }
}

const mapDispatchToProps = {
  setCurrentPage
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
