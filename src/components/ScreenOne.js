import React, {Component} from 'react'
import _ from 'lodash'

import Menu from './Menu'
import Instructions from './Instructions'
import ValueCard from './ValueCard'
import SelectorButton from './SelectorButton'
import Counter from './Counter'
import logo from '../logo.svg';

export default class ScreenOne extends Component {
  constructor(props) {
    super(props)
    this.state = this.props.data
    // this.handleSelectCard = this.handleSelectCard.bind(this)
    //   handleChange = () => {
    //   this.props.changeScreen(2);
    // }
  }
  handleSelectCard = () => {

    //go into state to find id of active card
    //let activeIndex = this.state.values.findIndex(element => element.active)
    let activeCard = this.state.values[this.state.activeIndex]
    //update its status to selected, and de-activate it
    activeCard.selected = true
    console.log(activeCard.selected)
    this.state.totalSelected += 1
    //this.state.selectedValues = this.state.selectedValues.concat(activeCard)
    //console.log(this.state.selectedValues)
    activeCard.active = false
    //find next nonhandled card and activate it
    //put into callback setNextActive ?
    if (this.state.values.length === this.state.totalSelected + this.state.totalRejected) {
      this.props.changeScreen(2, this.state)
    } else {
      let nextActiveIndex = this.state.values.findIndex(element => !element.selected && !element.rejected)
      this.state.values[nextActiveIndex].active = true
      this.setState({activeIndex: nextActiveIndex})
    }
  }

  handleRejectCard = () => {
    let activeCard = this.state.values[this.state.activeIndex]
    activeCard.rejected = true
    this.state.totalRejected += 1
    activeCard.active = false
    if (this.state.values.length === this.state.totalSelected + this.state.totalRejected) {
      this.props.changeScreen(2, this.state)
    } else {
      let nextActiveIndex = this.state.values.findIndex(element => !element.selected && !element.rejected)
      this.state.values[nextActiveIndex].active = true
      this.setState({activeIndex: nextActiveIndex})
    }
  }

  //not nec, straight to setNextActive function
  handleMaybe = () => {
    let activeCard = this.state.values[this.state.activeIndex]
    let nextActiveIndex = this.state.values.findIndex(element => !element.selected && !element.rejected && !element.active)
    this.state.values[nextActiveIndex].active = true
    //Deactivate card after have set next card (otherwise would reactivate same card)
    activeCard.active = false
    this.setState({activeIndex: nextActiveIndex})
  }

  componentWillUnmount() {}

  render() {
    return (
      <div>
        App
        <Menu></Menu>
        <main id="main" className="container clearfix">
          <Instructions text={'screenOne'}></Instructions>
          <div id="counterHolder">
            <Counter id={"cardsRemaining"} total={this.state.values.length - (this.state.totalSelected + this.state.totalRejected)}>
              Number of values remaining:
            </Counter>
            <Counter id={"cardsSelected"} total={this.state.totalSelected}>Number of values selected:
            </Counter>
          </div>
          <div id="cardRoot">
            <ValueCard name={this.state.values[this.state.activeIndex].name}/>
          </div>
          <section id="chooseCard" className="clearfix">
            <p className="cj">Selector</p>
            <SelectorButton onClick={this.handleRejectCard}>Reject</SelectorButton>
            <SelectorButton onClick={this.handleMaybe}>Maybe</SelectorButton>
            <SelectorButton onClick={this.handleSelectCard}>Select</SelectorButton>
          </section>
        </main>
      </div>
    )
  }
}
