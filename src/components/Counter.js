import React, {Component} from 'react'

export default class Counter extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section id={this.props.id} className="counter">
        <p>{this.props.children}</p>
        <p className="cj">
          {this.props.total}
        </p>
      </section>

    )
  }
}
