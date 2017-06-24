import React, { Component } from 'react';

class Winner extends Component {
  render () {
    return <h2>Winner <em><marquee>{this.props.name}</marquee></em></h2>
  }
}

export default Winner
