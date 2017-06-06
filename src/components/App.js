import React, {Component} from 'react'
import _ from 'lodash'

import Menu from './Menu'
import Instructions from './Instructions'
import ValueCard from './ValueCard'
import Selector from './Selector'
import Counter from './Counter'
import logo from '../logo.svg';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.handleSelectCard = this.handleSelectCard.bind(this)

    this.state = {
      values: [
        {
          id: 0,
          name: 'peace',
          rank: 0,
          selected: false,
          rejected: false,
          active: true
        }, {
          id: 1,
          name: 'wealth',
          rank: 0,
          selected: false,
          rejected: false,
          active: false
        }, {
          id: 2,
          name: 'power',
          rank: 0,
          selected: false,
          rejected: false,
          active: false
        }, {
          id: 3,
          name: 'beauty',
          rank: 0,
          selected: false,
          rejected: false,
          active: false
        }, {
          id: 4,
          name: 'tolerance',
          rank: 0,
          selected: false,
          rejected: false,
          active: false
        }
      ],
      totalSelected: 0,
      totalRejected: 0,
      activeIndex: 0
    }
  }

  handleSelectCard = () => {

    //go into state to find id of selected card
    console.log(this.state)
    let selectedId = 1
  }
  // {_.map(this.state.values, (value) => (
  //   // console.log(value.selected)
  //   <ValueCards className={`${value.active ? '' : 'not-active'}`}>
  //     {value.name}
  //   </ValueCards>
  // ))}

  render() {
    return (
      <div>
        App
        <Menu></Menu>
        <main id="main" className="container clearfix">
          <Instructions></Instructions>
          <div id="counterHolder">
            <Counter id={"cardsRemaining"}> Number of values remaining: </Counter>
            <Counter id={"cardsSelected"} total={this.state.totalSelected}>Number of values selected: </Counter>
          </div>
          <div id="cardRoot">
            <ValueCard name={this.state.values[0].name}/>
          </div>
          <Selector></Selector>
        </main>
      </div>
    )
  }
}
