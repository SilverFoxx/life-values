import React, {Component} from 'react'
import auth from '../lib/auth'

import Button from './Button'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: undefined,
    }
  }

  //TODO DRY
  onSignUp = () => {
    const username = this.refs.usernameInput.value
    const password = this.refs.passwordInput.value

    auth.createUserWithEmailAndPassword(username, password).then(() => {
      //console.log(username, this.props)
      this.setState({error: undefined})
      this.props.handleAuth(true, false)
    }).catch(err => {
      this.setState({error: err.message})
    });
    this.refs.usernameInput.value = ''
    this.refs.passwordInput.value = ''
  }

  onLogIn = () => {
    const username = this.refs.usernameInput.value
    const password = this.refs.passwordInput.value

    auth.signInWithEmailAndPassword(username, password).then(() => {
      //TODO How to read and set previously saved state from firebase?
      this.setState({error: undefined})
      this.props.handleAuth(true, false)
    }).catch(err => {
      this.setState({error: err.message})
    });
    this.refs.usernameInput.value = ''
    this.refs.passwordInput.value = ''
  }

onAnonUser = () => {
  this.setState({error: undefined})
  this.props.handleAuth(false, true)
}
  render() {
    return (
      <div>
        <div>
          <div>{this.state.error
              ? this.state.error
              : null}
          </div>
          <label>Username</label>
          <input ref="usernameInput" type="text"/>
        </div>
        <div>
          <label>Password</label>
          <input ref="passwordInput" type="password"/>
        </div>
        <div>
          <button onClick={this.onSignUp}>Sign Up</button>
          <button onClick={this.onLogIn}>Log In</button>
          <p>Or use anonymously (can't save and return)</p>
          <Button onClick={this.onAnonUser}> Anon</Button>
        </div>
      </div>
    )
  }
}
