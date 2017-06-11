import React, {Component} from 'react'

export default class ProceedButton extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div onClick={this.props.onClick}>
        <p>Proceed </p>
      </div>
    )
  }
}
