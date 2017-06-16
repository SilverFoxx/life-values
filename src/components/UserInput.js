import React, { Component } from 'react'

export default class UserInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
          value: ''
        }
  }
  handleChange = (event) => {
    this.setState({value: event.target.value});
  }
  passText = () => {
    this.props.onClick(this.state.value)
  }

  render() {
    return (
      <div>
      <input type="text" value={this.state.value} onChange={this.handleChange} />
      <div onClick={this.passText}>Enter</div>
    </div>
    )
  }
}
