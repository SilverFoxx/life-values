import React, {Component} from 'react'
import _ from 'lodash'

// import ScreenOne from './ScreenOne'
// import ScreenTwo from './ScreenTwo'
// import ScreenThree from './ScreenThree'
import Menu from './Menu'
import Instructions from './Instructions'
import ValueCard from './ValueCard'
import FlexCard from './FlexCard'
import SelectorButton from './SelectorButton'
import Counter from './Counter'
import ProceedButton from './ProceedButton'
//import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import SortableComponent from './SortableComponent'
import logo from '../logo.svg'
import UserInput from './UserInput'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      values: [
        {
          id: 0,
          name: 'peace',
          rank: 0,
          selected: false,
          rejected: false,
          active: false
        }, {
          id: 1,
          name: 'wealth',
          rank: 0,
          selected: false,
          rejected: false,
          active: true
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
        }, {
          id: 5,
          name: 'joy',
          rank: 0,
          selected: false,
          rejected: false,
          active: false
        }, {
          id: 6,
          name: 'family',
          rank: 0,
          selected: false,
          rejected: false,
          active: false
        }
      ],
      totalSelected: 0,
      totalRejected: 0,
      activeIndex: 0,
      screen: 1
    }
  }

  changeScreen(screen) {
    let newScreen = this.state
    newScreen.screen = screen
    this.setState({newScreen: newScreen})
  }

handleSelectCard = () => { //TODO redo without state mutation

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
    //this.props.changeScreen(2, this.state)
    this.setState({screen: 2})
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
    this.setState({screen: 2})
  } else {
    let nextActiveIndex = this.state.values.findIndex(element => !element.selected && !element.rejected)
    this.state.values[nextActiveIndex].active = true
    this.setState({activeIndex: nextActiveIndex})
  }
}

handleMaybe = () => {
  let activeCard = this.state.values[this.state.activeIndex]
  let nextActiveIndex = this.state.values.findIndex(element => !element.selected && !element.rejected && !element.active)
  this.state.values[nextActiveIndex].active = true
  //Deactivate card after have set next card (otherwise would reactivate same card)
  activeCard.active = false
  this.setState({activeIndex: nextActiveIndex})
}

handleToggleCard(id) {
  //this.setState({selected: false})
  // let card = this.state.values[id].selected
  // this.setState({card: false})
  let index = this.state.values.findIndex(element => element.id === id)
  let card = this.state.values[index]
  card.selected = !card.selected
  this.setState({card: card}) //Why does this syntax work?
}

// Because 1: react-sortable-hoc requires an array of simple strings, 2: to transfer state to SortableComponent
makeValueArray() {
  const obj = {text: 'screenThree'}
  obj.valueName = []
  this.state.values.forEach(element => {
    if (element.selected) {
      obj.valueName.push(element.name)
      console.log(obj.valueName)
    }
  })
  return obj
}

//User adds new values
handleEnter = (text) => {
  //TODO sanitise input
  const oldValues = this.state
  const newValues = oldValues.values.push(
    {
      id: oldValues.values.length,
      name: text,
      rank: 0,
      selected: true,
      rejected: false,
      active: false
    }
  )
  console.log(newValues, oldValues)
  console.log(this.state)
  oldValues.valueName = newValues
  this.setState({oldValues: oldValues})
}

componentWillUnmount() {}

  render() {
    if (this.state.screen === 1) {
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
  }  else if (this.state.screen === 2) {
                  //TODO use filter
      return (
        <div>
          {console.log(this.state.values)}
          <Menu></Menu>
          <main id="main" className="container clearfix">
            <Instructions text={'screenTwoInput'} />
            <Instructions text={'screenTwoTop'} />
            <div id="cardRoot" className="clearfix">

              {_.map(this.state.values, (card) => {
                if (card.selected) {
                  return <FlexCard name={card.name} key={card.id} onClick={() => this.handleToggleCard(card.id)}/>
                }
              })}
            </div>
            <UserInput onClick={this.handleEnter}/>
            <Instructions text={'screenTwoBottom'} />
            <div id="cardRoot" className="clearfix">
              {_.map(this.state.values, (card) => {
                //console.log(card.name)
                if (!card.selected) {
                  return <FlexCard name={card.name} key={card.id} onClick={() => this.handleToggleCard(card.id)}/>
                }
              })}
            </div>
            <ProceedButton onClick={() =>this.changeScreen(3)} />
              </main>
        </div>
      )
    } else {
      console.log(this.state)
      return (
        <div><SortableComponent data={this.makeValueArray()} screen={3}/></div>
      )

    }
  }
}
//
