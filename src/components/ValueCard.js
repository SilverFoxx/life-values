import React, { Component } from 'react'

export default class ValueCard extends Component {
  constructor(props) {
super(props)
  }

  render() {
    return (
      <section id="" className="valueCard">
        <p>{this.props.name}</p>
      </section>
    )
  }
}
