import React, { Component } from 'react'
import auth from '../lib/auth'

export default class LogOut extends Component {
  constructor(props) {
    super(props)
  }

  onClick = () => {
    this.props.handleLogOut()
    auth.signOut()
  }

  render() {
    return (
      <div className="logOut" onClick={this.onClick}>{this.props.children}</div>
    )

  }
}
