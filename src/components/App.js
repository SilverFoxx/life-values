import React, {Component} from 'react'
import {CSSTransitionGroup} from 'react-transition-group'
import BurgerMenu from './BurgerMenu'
//import {push as Menu} from 'react-burger-menu'

import Instructions from './Instructions'
import ValueCard from './ValueCard'
import FlexCard from './FlexCard'
import Button from './Button'
import Counter from './Counter'
import SortableComponent from './SortableComponent'
import UserInput from './UserInput'
import Login from './Login'
import LogOut from './LogOut'
import db from '../lib/database'
// import img from '../img/login.jpg'

const fire = db.ref('UserValues')

//Save initial state so can reset
const initialState = {
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
      name: 'happiness',
      rank: 0,
      selected: false,
      rejected: false,
      active: false
    }, {
      id: 3,
      name: 'success',
      rank: 0,
      selected: false,
      rejected: false,
      active: false
    }, {
      id: 4,
      name: 'relationships',
      rank: 0,
      selected: false,
      rejected: false,
      active: false
    }, {
      id: 5,
      name: 'fame',
      rank: 0,
      selected: false,
      rejected: false,
      active: false
    }, {
      id: 6,
      name: 'authenticity',
      rank: 0,
      selected: false,
      rejected: false,
      active: false
    }, {
      id: 7,
      name: 'influence',
      rank: 0,
      selected: false,
      rejected: false,
      active: false
    }, {
      id: 8,
      name: 'power',
      rank: 0,
      selected: false,
      rejected: false,
      active: false
    }, {
      id: 9,
      name: 'justice',
      rank: 0,
      selected: false,
      rejected: false,
      active: false
    }, {
      id: 10,
      name: 'faith',
      rank: 0,
      selected: false,
      rejected: false,
      active: false
    }, {
      id: 11,
      name: 'honesty',
      rank: 0,
      selected: false,
      rejected: false,
      active: false
    }, {
      id: 12,
      name: 'loyalty',
      rank: 0,
      selected: false,
      rejected: false,
      active: false
    }, {
      id: 13,
      name: 'integrity',
      rank: 0,
      selected: false,
      rejected: false,
      active: false
    }, {
      id: 14,
      name: 'enjoyment',
      rank: 0,
      selected: false,
      rejected: false,
      active: false
    }, {
      id: 15,
      name: 'love',
      rank: 0,
      selected: false,
      rejected: false,
      active: false
    }, {
      id: 16,
      name: 'leadership',
      rank: 0,
      selected: false,
      rejected: false,
      active: false
    }, {
      id: 17,
      name: 'recognition',
      rank: 0,
      selected: false,
      rejected: false,
      active: false
    }, {
      id: 18,
      name: 'community',
      rank: 0,
      selected: false,
      rejected: false,
      active: false
    }, {
      id: 19,
      name: 'truth',
      rank: 0,
      selected: false,
      rejected: false,
      active: false
    }, {
      id: 20,
      name: 'respect for self',
      rank: 0,
      selected: false,
      rejected: false,
      active: false
    }, {
      id: 21,
      name: 'respect for others',
      rank: 0,
      selected: false,
      rejected: false,
      active: false
    }, {
      id: 22,
      name: 'location',
      rank: 0,
      selected: false,
      rejected: false,
      active: false
    }, {
      id: 23,
      name: 'responsibility',
      rank: 0,
      selected: false,
      rejected: false,
      active: false
    }, {
      id: 24,
      name: 'courtesy',
      rank: 0,
      selected: false,
      rejected: false,
      active: false
    }, {
      id: 25,
      name: 'creativity',
      rank: 0,
      selected: false,
      rejected: false,
      active: false
    }, {
      id: 26,
      name: 'health',
      rank: 0,
      selected: false,
      rejected: false,
      active: false
    }, {
      id: 27,
      name: 'service',
      rank: 0,
      selected: false,
      rejected: false,
      active: false
    }, {
      id: 28,
      name: 'independence',
      rank: 0,
      selected: false,
      rejected: false,
      active: false
    }
  ],
  totalSelected: 0,
  totalRejected: 0,
  activeIndex: 0,
  screen: 1,
  user: false,
  anonUser: false
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  reset = () => {
    const user = this.state.user
    const anonUser = this.state.anonUser
    //Reset to initial state
    this.setState(initialState) //FIXME doesn't deeply work - coz mutating state elsewhere??
    //...but preserve login status
    this.setState({user: user, anonUser: anonUser})
  }

  handleAuth = (user, anon) => {
    this.setState({user: user, anonUser: anon})
  }

  handleLogOut = () => {
    //persist users state through firebase
    fire.set(this.state)
    //Reset state to defaults
    this.reset()
    window.location.reload();
  }

  changeScreen = (screen) => {
    if (this.state.totalSelected < 10) {
      alert('Choose more values!')
    } else {
      let newScreen = this.state
      newScreen.screen = screen
      this.setState({newScreen: newScreen})
    }
  }

  //find next nonhandled card and activate it
  setNextActive = () => {
    let nextActiveIndex = this.state.values.findIndex(element => !element.selected && !element.rejected)
    const nextActiveCard = this.state.values[nextActiveIndex]
    nextActiveCard.active = true
    this.setState({activeIndex: nextActiveIndex, nextActiveCard: nextActiveCard})
  }

  handleSelectCard = () => {
    //find currently active card
    let activeCard = this.state.values[this.state.activeIndex]
    //update its status to selected, and de-activate it
    activeCard.selected = true
    activeCard.active = false
    this.setState({activeCard: activeCard})
    this.updateTotalSelected()
    if (this.state.values.length === ((this.state.totalSelected) + this.state.totalRejected)) {
      //If all values have been handled, move to next screen
      this.setState({screen: 2})
    } else {
      this.setNextActive()
    }
  }

  handleRejectCard = () => {
    let activeCard = this.state.values[this.state.activeIndex]
    activeCard.rejected = true
    activeCard.active = false
    this.setState({activeCard: activeCard})
    this.updateTotalRejected()
    if (this.state.values.length === ((this.state.totalSelected) + this.state.totalRejected)) {
      this.setState({screen: 2})
    } else {
      this.setNextActive()
    }
  }

  handleMaybe = () => {
    let activeCard = this.state.values[this.state.activeIndex]
    //Choose a new random card to present
    let tempArray = []
    this.state.values.forEach(element => {
      if (!element.selected && !element.rejected && !element.active) {
        tempArray.push(element)
      }
    })
    let randomId = activeCard.id
    if (tempArray.length > 1) {
      randomId = tempArray[Math.floor(Math.random() * tempArray.length)].id
    }
    let nextActiveIndex = this.state.values.findIndex(element => element.id === randomId)
    let nextActiveCard = this.state.values[nextActiveIndex]
    nextActiveCard.active = true
    //Deactivate card after have set next card (otherwise would reactivate same card)
    activeCard.active = false
    this.setState({activeIndex: nextActiveIndex})
  }

  handleToggleCard = (id) => {
    let index = this.state.values.findIndex(element => element.id === id)
    let card = this.state.values[index]
    if (card.selected) {
      let state = this.state
      state.totalSelected -= 1
    } else {
      let state = this.state
      state.totalSelected += 1
    }
    card.selected = !card.selected
    this.setState({card: card})
  }

  updateTotalSelected = () => {
    let totalSelected = 0
    this.state.values.forEach(element => {
      if (element.selected) {
        totalSelected = totalSelected + 1
      }
    })
    //this.setState({totalSelected: totalSelected})
    //FIXME BUG: the above setState does not occur before full render, therefore can't use the value of totalSelected for logic and timing. Resorted to direct mutation for now.
    let state = this.state
    state.totalSelected = totalSelected
  }
  updateTotalRejected = () => {
    let totalRejected = 0
    this.state.values.forEach(element => {
      if (element.rejected) {
        totalRejected++
      }
    })
    //this.setState({totalRejected: totalRejected})
    let state = this.state
    state.totalRejected = totalRejected
  }

  // Because 1: react-sortable-hoc requires an array of simple strings, 2: to transfer state to SortableComponent
  makeValueArray = () => {
    const obj = {
      text: 'screenThree',
      screen: this.state.screen,
      user: this.state.user,
      anonUser: this.state.anonUser
    }
    obj.valueName = []
    this.state.values.forEach(element => {
      if (element.selected) {
        obj.valueName.push(element.name)
      }
    })
    return obj
  }

  //User adds new values
  handleEnter = (text) => {
    //TODO sanitise input
    const oldValues = this.state
    const newItem = {
      id: oldValues.values.length,
      name: text,
      rank: 0,
      selected: true,
      rejected: false,
      active: false
    }
    const newValues = oldValues.values.push(newItem)
    console.log(newValues, oldValues)
    console.log(this.state)
    oldValues.valueName = newValues
    this.updateTotalSelected()
    this.setState({oldValues: oldValues})
  }

  //Set defaults to firebase
  componentWillMount() {
    //TODO if logged in, restore previous saved state from firebase
  }

  render() {
    if (!this.state.user && !this.state.anonUser) {
      return <div>
        <Login handleAuth={this.handleAuth}/>
      </div>
    } else {
      if (this.state.screen === 1) {
        return (
          <div id="outer-container">
            <BurgerMenu></BurgerMenu>
            <div id="page-wrap" className="screenOne">
              <LogOut handleLogOut={this.handleLogOut}></LogOut>
              <Button onClick={this.reset} className="startOver" icon="redo">
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <path fill="rgba(48, 60, 108, 1)" d="M17.51 4.49c-1.605-1.605-3.74-2.49-6.010-2.49s-4.405 0.884-6.010 2.49-2.49 3.74-2.49 6.010v1.293l-2.146-2.146c-0.195-0.195-0.512-0.195-0.707 0s-0.195 0.512 0 0.707l3 3c0.098 0.098 0.226 0.146 0.354 0.146s0.256-0.049 0.354-0.146l3-3c0.195-0.195 0.195-0.512 0-0.707s-0.512-0.195-0.707 0l-2.146 2.146v-1.293c0-4.136 3.364-7.5 7.5-7.5s7.5 3.364 7.5 7.5-3.364 7.5-7.5 7.5c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5c2.27 0 4.405-0.884 6.010-2.49s2.49-3.74 2.49-6.010c0-2.27-0.884-4.405-2.49-6.010z"></path>
                </svg>
              </Button>
              <main className="container screenOne">
                <Instructions text={'screenOne'}></Instructions>
                <div id="cardRoot">
                  <CSSTransitionGroup transitionName="cardFade" transitionAppear={true} transitionAppearTimeout={900} transitionEnterTimeout={600} transitionLeave={false}>
                    <ValueCard name={this.state.values[this.state.activeIndex].name} key={this.state.values[this.state.activeIndex].id}/>
                  </CSSTransitionGroup>
                </div>
                <section className="chooseCard">
                  <Counter className={"cardsRejected"} total={this.state.totalRejected}></Counter>
                  <Counter className={"cardsRemaining"} total={this.state.values.length - (this.state.totalSelected + this.state.totalRejected)}></Counter>
                  <Counter className={"cardsSelected"} total={this.state.totalSelected}></Counter>
                </section>
                <section className="chooseCard">
                  <Button onClick={this.handleRejectCard} className="select">
                    <svg width="20" height="20" viewBox="0 0 20 20">
                      <path fill="white" d="M18.916 8.792c0.443 0.511 0.695 1.355 0.695 2.159 0 0.531-0.115 0.996-0.333 1.345-0.284 0.454-0.738 0.704-1.278 0.704h-2.618c1.425 2.591 1.785 4.543 1.070 5.807-0.499 0.881-1.413 1.193-2.045 1.193-0.25 0-0.462-0.185-0.495-0.433-0.179-1.319-1.188-2.893-2.768-4.318-1.514-1.365-3.374-2.456-5.286-3.11-0.241 0.508-0.758 0.86-1.356 0.86h-3c-0.827 0-1.5-0.673-1.5-1.5v-9c0-0.827 0.673-1.5 1.5-1.5h3c0.634 0 1.176 0.395 1.396 0.952 1.961-0.246 2.699-0.64 3.414-1.022 0.895-0.478 1.739-0.93 4.503-0.93 0.72 0 1.398 0.188 1.91 0.529 0.5 0.333 0.82 0.801 0.926 1.343 0.399 0.162 0.753 0.536 1.024 1.092 0.264 0.541 0.435 1.232 0.435 1.761 0 0.099-0.006 0.19-0.017 0.274 0.253 0.186 0.48 0.473 0.667 0.851 0.27 0.545 0.432 1.228 0.432 1.826 0 0.424-0.079 0.777-0.234 1.051-0.013 0.022-0.026 0.044-0.039 0.065zM4.5 2h-3c-0.276 0-0.5 0.224-0.5 0.5v9c0 0.276 0.224 0.5 0.5 0.5h3c0.276 0 0.5-0.224 0.5-0.5v-8.999c0-0 0-0.001 0-0.001-0-0.276-0.224-0.5-0.5-0.5zM18.339 9.726c-0.151-0.304-0.304-0.414-0.37-0.414-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5c0.042 0 0.072 0 0.117-0.078 0.066-0.117 0.104-0.32 0.104-0.558 0-0.445-0.126-0.974-0.328-1.382-0.198-0.399-0.399-0.544-0.487-0.544-0.276 0-0.5-0.224-0.5-0.5 0-0.177 0.092-0.333 0.231-0.422 0.031-0.317-0.117-1.165-0.501-1.718-0.145-0.209-0.298-0.329-0.418-0.329-0.276 0-0.5-0.224-0.5-0.5 0-0.88-0.972-1.281-1.875-1.281-2.513 0-3.217 0.376-4.032 0.812-0.762 0.407-1.618 0.865-3.781 1.134v8.187c2.101 0.689 4.152 1.877 5.812 3.373 1.593 1.436 2.639 2.988 2.994 4.426 0.272-0.087 0.579-0.271 0.776-0.618 0.334-0.59 0.584-2.096-1.493-5.557-0.093-0.154-0.095-0.347-0.006-0.504s0.255-0.254 0.435-0.254h3.483c0.199 0 0.327-0.070 0.43-0.234 0.117-0.187 0.181-0.477 0.181-0.815 0-0.424-0.102-0.882-0.272-1.225z"></path>
                    </svg>
                  </Button>
                  <Button onClick={this.handleMaybe} className="select">
                    <svg width="20" height="20" viewBox="0 0 20 20">
                      <path fill="white" d="M16.218 3.782c-1.794-1.794-4.18-2.782-6.718-2.782s-4.923 0.988-6.718 2.782-2.782 4.18-2.782 6.717 0.988 4.923 2.782 6.718 4.18 2.782 6.718 2.782 4.923-0.988 6.718-2.782 2.782-4.18 2.782-6.718-0.988-4.923-2.782-6.717zM9.5 19c-4.687 0-8.5-3.813-8.5-8.5s3.813-8.5 8.5-8.5c4.687 0 8.5 3.813 8.5 8.5s-3.813 8.5-8.5 8.5z"></path>
                      <path fill="white" d="M9.5 15c-0.276 0-0.5-0.224-0.5-0.5v-2c0-0.276 0.224-0.5 0.5-0.5 1.93 0 3.5-1.57 3.5-3.5s-1.57-3.5-3.5-3.5-3.5 1.57-3.5 3.5c0 0.276-0.224 0.5-0.5 0.5s-0.5-0.224-0.5-0.5c0-2.481 2.019-4.5 4.5-4.5s4.5 2.019 4.5 4.5c0 2.312-1.753 4.223-4 4.472v1.528c0 0.276-0.224 0.5-0.5 0.5z"></path>
                      <path fill="white" d="M9.5 18c-0 0 0 0 0 0-0.276 0-0.5-0.224-0.5-0.5v-1c0-0.276 0.224-0.5 0.5-0.5 0 0 0 0 0 0 0.276 0 0.5 0.224 0.5 0.5v1c0 0.276-0.224 0.5-0.5 0.5z"></path>
                    </svg>
                  </Button>
                  <Button onClick={this.handleSelectCard} className="select">
                    <svg width="20" height="20" viewBox="0 0 20 20">
                      <path fill="white" d="M18.916 11.208c0.443-0.511 0.695-1.355 0.695-2.159 0-0.531-0.115-0.996-0.333-1.345-0.284-0.454-0.738-0.704-1.278-0.704h-2.618c1.425-2.591 1.785-4.543 1.070-5.807-0.499-0.881-1.413-1.193-2.045-1.193-0.25 0-0.462 0.185-0.495 0.433-0.179 1.319-1.188 2.893-2.768 4.318-1.514 1.365-3.374 2.456-5.286 3.11-0.241-0.508-0.758-0.86-1.356-0.86h-3c-0.827 0-1.5 0.673-1.5 1.5v9c0 0.827 0.673 1.5 1.5 1.5h3c0.634 0 1.176-0.395 1.396-0.952 1.961 0.246 2.699 0.64 3.414 1.022 0.895 0.478 1.739 0.93 4.503 0.93 0.72 0 1.398-0.188 1.91-0.529 0.5-0.333 0.82-0.801 0.926-1.343 0.399-0.162 0.753-0.536 1.024-1.092 0.264-0.541 0.435-1.232 0.435-1.761 0-0.099-0.006-0.19-0.017-0.274 0.253-0.186 0.48-0.473 0.667-0.851 0.27-0.545 0.432-1.228 0.432-1.826 0-0.424-0.079-0.777-0.234-1.051-0.013-0.022-0.026-0.044-0.039-0.065zM4.5 18h-3c-0.276 0-0.5-0.224-0.5-0.5v-9c0-0.276 0.224-0.5 0.5-0.5h3c0.276 0 0.5 0.224 0.5 0.5v8.999c0 0 0 0.001 0 0.001-0 0.276-0.224 0.5-0.5 0.5zM18.339 10.274c-0.151 0.304-0.304 0.414-0.37 0.414-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5c0.042 0 0.072 0 0.117 0.078 0.066 0.117 0.104 0.32 0.104 0.558 0 0.445-0.126 0.974-0.328 1.382-0.198 0.399-0.399 0.544-0.487 0.544-0.276 0-0.5 0.224-0.5 0.5 0 0.177 0.092 0.333 0.231 0.422 0.031 0.317-0.117 1.165-0.501 1.718-0.145 0.209-0.298 0.329-0.418 0.329-0.276 0-0.5 0.224-0.5 0.5 0 0.88-0.972 1.281-1.875 1.281-2.513 0-3.217-0.376-4.032-0.812-0.762-0.407-1.618-0.865-3.781-1.134v-8.187c2.101-0.689 4.152-1.877 5.812-3.373 1.593-1.436 2.639-2.988 2.994-4.426 0.272 0.087 0.579 0.271 0.776 0.618 0.334 0.59 0.584 2.096-1.493 5.557-0.093 0.154-0.095 0.347-0.006 0.504s0.255 0.254 0.435 0.254h3.483c0.199 0 0.327 0.070 0.43 0.234 0.117 0.187 0.181 0.477 0.181 0.815 0 0.424-0.102 0.882-0.272 1.225z"></path>
                    </svg>
                  </Button>
                </section>
                <section className="chooseCard text">
                  <span>Not Me</span>
                  <span>Maybe</span>
                  <span>So Me</span>
                </section>
              </main>

            </div>
          </div>
        )
      } else if (this.state.screen === 2) {
        //TODO use filter
        return (
          <div id="outer-container">
            <BurgerMenu></BurgerMenu>
            <div id="page-wrap">
              <LogOut handleLogOut={this.handleLogOut}></LogOut>
              <Button onClick={this.reset} className="startOver" icon="redo">
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <path fill="rgba(48, 60, 108, 1)" d="M17.51 4.49c-1.605-1.605-3.74-2.49-6.010-2.49s-4.405 0.884-6.010 2.49-2.49 3.74-2.49 6.010v1.293l-2.146-2.146c-0.195-0.195-0.512-0.195-0.707 0s-0.195 0.512 0 0.707l3 3c0.098 0.098 0.226 0.146 0.354 0.146s0.256-0.049 0.354-0.146l3-3c0.195-0.195 0.195-0.512 0-0.707s-0.512-0.195-0.707 0l-2.146 2.146v-1.293c0-4.136 3.364-7.5 7.5-7.5s7.5 3.364 7.5 7.5-3.364 7.5-7.5 7.5c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5c2.27 0 4.405-0.884 6.010-2.49s2.49-3.74 2.49-6.010c0-2.27-0.884-4.405-2.49-6.010z"></path>
                </svg>
              </Button>
              <main id="main" className="screenTwo">
                <Instructions text={'screenTwoTop'}/>
                <div id="cardRoot" className="flexContainer">
                  <FlexCard className="flexLabel accepted" name="accepted:"/> {this.state.values.map(card => {
                    if (card.selected) {
                      return <FlexCard name={card.name} randomColor key={card.id} onClick={() => this.handleToggleCard(card.id)}/>
                    }
                  })}
                </div>
                <Instructions className="inputInstructions" text={'screenTwoInput'}/>
                <UserInput className="newValue" onClick={this.handleEnter}/>
                <Instructions text={'screenTwoBottom'}/>
                <div id="cardRoot" className="flexContainer">
                  <FlexCard className="flexLabel rejected" name="rejected:"/> {this.state.values.map(card => {
                    if (!card.selected) {
                      return <FlexCard name={card.name} randomColor key={card.id} onClick={() => this.handleToggleCard(card.id)}/>
                    }
                  })}
                </div>
                <Button className="proceed" onClick={() => this.changeScreen(3)}>When you're ready...</Button>
              </main>
            </div>
          </div>
        )
      } else {
        return (
          <div><SortableComponent data={this.makeValueArray()} screen={3} reset={this.reset}/></div>
        )
      }
    }
  }
}
