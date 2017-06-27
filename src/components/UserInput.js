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
    this.setState({value: ''})
  }

  render() {
    return (
      <div>
      <input type="text" className={`${this.props.className}`} value={this.state.value} onChange={this.handleChange} />
      <div className="button newValue" onClick={this.passText}>Add new value...</div>
    </div>
    )
  }
}
