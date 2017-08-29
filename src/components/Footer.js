import React, {Component} from 'react'
import '../css/Footer.css'

export default class Header extends Component {
  render () {
    const today = new Date()
    return (
      <footer className="site-footer">
        <p>
          This is a project by <a href="http://branthardy.com/">Brant Hardy</a>.
          Copyright Ⓒ {today.getFullYear()}. For question or comments{' '}
          <a href="mailto:brant@branthardy.com">email</a> or{' '}
          <a href="https://twitter.com/bh_">tweet me</a>.
        </p>
      </footer>
    )
  }
}
