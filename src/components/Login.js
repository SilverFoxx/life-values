import React, {Component} from 'react'
import auth from '../lib/auth'

import Button from './Button'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: undefined
    }
  }

  //TODO DRY
  onSignUp = () => {
    const username = this.refs.usernameInput.value
    const password = this.refs.passwordInput.value
    auth.createUserWithEmailAndPassword(username, password).then(() => {
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
      <main className="login">
        <div className="title">
          <h1>Find your values</h1>
          <h2>~find your path through life~</h2>
        </div>
        <div className="formWrapper">
          <div className="loginHolder">
            <form>
              <div>{this.state.error
                  ? this.state.error
                  : null}
              </div>
              <p>Email</p>
              <input ref="usernameInput" type="text"/>
              <p>Password</p>
              <input ref="passwordInput" type="password"/>
            </form>
            <div className="buttonWrapper">
              <button onClick={this.onSignUp}>Sign Up</button>
              <button onClick={this.onLogIn}>Log In</button>
            </div>
          </div>
          <div className="anon">
            <span>Use without log-in</span>
            <Button onClick={this.onAnonUser} className={'anonUser'}>
              Enter</Button>
            <span>(can't save and return)</span>
          </div>
        </div>
      </main>
    )
  }
}
