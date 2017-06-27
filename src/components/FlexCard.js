import React, { Component } from 'react'

export default class FlexCard extends Component {
  constructor(props) {
super(props)
  }
  getRandomColor = () => {
    const colors = [
      'rgba(249,181,106, 1)',
      'rgba(180, 223, 229, 1)',
      'rgba(244, 151, 108, 1)',
      'rgba(103,98,120, 1)',
      'rgba(111,177,191, 1)',
      'rgba(255,169,122, 1)',
      'rgba(251, 232, 166, 1)',
      'rgba(168, 242, 219, 1)',
      'rgba(230,130,80, 1)',
      'rgba(253,190,118, 1)',
      'rgba(109,143,144, 1)',

  ]
    const color = colors[Math.floor(Math.random() * colors.length)]
    let style = {}
    console.log()
    if (this.props.randomColor) {
    style = {color: color }
    }
    return style
  }
  render() {
    return (
      <section className={`flexCard ${this.props.className}`} style={this.getRandomColor()} onClick={this.props.onClick}>
        <p>{this.props.name} </p>
      </section>
    )
  }
}
