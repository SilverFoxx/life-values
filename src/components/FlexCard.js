import React, { Component } from 'react'

export default class FlexCard extends Component {
  constructor(props) {
super(props)
  }

  render() {
    return (
      <section className="flexCard" onClick={this.props.onClick}>
        <p>{this.props.name} </p>
      </section>
    )
  }
}
