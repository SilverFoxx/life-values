import React, {Component} from 'react'

// TODO stateless functional components


export default class Counter extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section id={this.props.id} className={`counter ${this.props.className}`}>
        {/* <p>{this.props.children}</p> */}
        <p className="cj">
          {this.props.total}
        </p>
      </section>

    )
  }
}
