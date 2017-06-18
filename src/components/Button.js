import React, {Component} from 'react'

export default class Button extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
        <div className={`button ${this.props.className}`} onClick={this.props.onClick}>{this.props.children}</div>
    )
  }
}
