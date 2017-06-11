import React, {Component} from 'react'

export default class SelectorButton extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
        <div className="selectorButton" onClick={this.props.onClick}>{this.props.children}</div>
    )
  }
}
