import React, {Component} from 'react'

export default class Selector extends Component {
  constructor(props) {
    super(props)
    this.handleSelectCard = this.handleSelectCard.bind(this)
  }

  handleSelectCard = () => {
    // this.props.onThumbsUp(this.props.id)
    //go into state to find id of active card
    console.log(this.state)
    console.log(this.props)
    let selectedId = 1
    //update its status to selected

    //make next card active

  }

  render() {
    return (
      <section id="chooseCard" className="clearfix">
        <p className="cj">Selector</p>
        <div className="selectorButton">Reject</div>
        <div className="selectorButton">Maybe</div>
        <div className="selectorButton" onClick={this.handleSelectCard}>Select</div>
      </section>
    )
  }
}
