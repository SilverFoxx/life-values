import React, {Component} from 'react'
import _ from 'lodash'

// import ScreenOne from './ScreenOne'
// import ScreenTwo from './ScreenTwo'
// import ScreenThree from './ScreenThree'
import Menu from './Menu'
import Instructions from './Instructions'
import ValueCard from './ValueCard'
import FlexCard from './FlexCard'
import Button from './Button'
import Counter from './Counter'
import SortableComponent from './SortableComponent'
import logo from '../logo.svg'
import UserInput from './UserInput'
import Login from './Login.js'
import LogOut from './LogOut.js'
import db from '../lib/database'

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
    //this.state.values = []
    //this.state = initialState
    this.setState(initialState) //doesn't deeply work - coz mutating state elsewhere??
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
  }

  changeScreen = (screen) => {
    if (this.state.totalSelected < 6) { //TODO increase
      alert('Choose more values!')
    } else {
      let newScreen = this.state
      newScreen.screen = screen
      this.setState({newScreen: newScreen})
    }
  }

  //find next nonhandled card and activate it
  setNextActive = () => {
    console.log(this.state.totalSelected + this.state.totalRejected)
    let nextActiveIndex = this.state.values.findIndex(element => !element.selected && !element.rejected)
    //console.log(this.state, nextActiveIndex)
    const nextActiveCard = this.state.values[nextActiveIndex]
    nextActiveCard.active = true
    this.setState({activeIndex: nextActiveIndex, nextActiveCard: nextActiveCard})
  }

  handleSelectCard = () => { //TODO redo without state mutation
    //find currently active card
    let activeCard = this.state.values[this.state.activeIndex]
    //update its status to selected, and de-activate it
    activeCard.selected = true
    activeCard.active = false
    this.setState({activeCard: activeCard})
    this.updateTotalSelected()
    console.log('this.state.totalSelected', this.state.totalSelected)
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
        console.log(tempArray)
      }
    })
    let randomId = activeCard.id
    if (tempArray.length > 1) {
      randomId = tempArray[Math.floor(Math.random() * tempArray.length)].id
      console.log(randomId)
    }
    let nextActiveIndex = this.state.values.findIndex(element => element.id === randomId)
    let nextActiveCard = this.state.values[nextActiveIndex]
    nextActiveCard.active = true
    //Deactivate card after have set next card (otherwise would reactivate same card)
    activeCard.active = false
    this.setState({activeIndex: nextActiveIndex})
  }

  handleToggleCard = (id) => {
    //this.setState({selected: false})
    // let card = this.state.values[id].selected
    // this.setState({card: false})
    let index = this.state.values.findIndex(element => element.id === id)
    let card = this.state.values[index]
    if (card.selected) {
      let state = this.state
      state.totalSelected -= 1
      console.log(this.state.totalSelected, this.state)
    } else {
      let state = this.state
      state.totalSelected += 1
    }
    card.selected = !card.selected
    this.setState({card: card}) //Why does this syntax work?
  }

  updateTotalSelected = () => {
    let totalSelected = 0
    this.state.values.forEach(element => {
      if (element.selected) {
        totalSelected = totalSelected + 1
        console.log(totalSelected)
        console.log('this.state.totalSelected', this.state.totalSelected)
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
        console.log(obj.valueName)
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
  // componentDidMount() {
  //   fire.on('value', snapshot => {
  //     console.log(snapshot, snapshot.val())
  //     this.setState({values: snapshot.val()})
  //     console.log(this.state.values[this.state.activeIndex], this.state.values.length - (this.state.totalSelected + this.state.totalRejected))
  //   })
  // }

  render() {
    if (!this.state.user && !this.state.anonUser) {
      return <Login handleAuth={this.handleAuth}/>
    } else {
      if (this.state.screen === 1) {
        {
          console.log(this.state)
        }
        return (
          <div>
            <Menu></Menu>
            <LogOut handleLogOut={this.handleLogOut}>Logout & Save</LogOut>
            <Button onClick={this.reset} className="startOver">Start Over</Button>
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
                <Button onClick={this.handleRejectCard}>Reject</Button>
                <Button onClick={this.handleMaybe}>Maybe</Button>
                <Button onClick={this.handleSelectCard}>Select</Button>
              </section>
            </main>
          </div>
        )
      } else if (this.state.screen === 2) {
        //TODO use filter
        return (
          <div>
            {console.log(this.state)}
            <Menu></Menu>
            <LogOut handleLogOut={this.handleLogOut}>Logout & Save</LogOut>
            <main id="main" className="container clearfix">
              <Instructions text={'screenTwoTop'}/>
              <div id="cardRoot" className="flexContainer">
                {_.map(this.state.values, (card) => {
                  if (card.selected) {
                    return <FlexCard name={card.name} key={card.id} onClick={() => this.handleToggleCard(card.id)}/>
                  }
                })}
              </div>
              <Instructions text={'screenTwoInput'}/>
              <UserInput onClick={this.handleEnter}/>
              <Instructions text={'screenTwoBottom'}/>
              <div id="cardRoot" className="flexContainer">
                {_.map(this.state.values, (card) => {
                  //console.log(card.name)
                  if (!card.selected) {
                    return <FlexCard name={card.name} key={card.id} onClick={() => this.handleToggleCard(card.id)}/>
                  }
                })}
              </div>
              <Button className="startOver" onClick={this.reset}>Start Over</Button>
              <Button className="proceed" onClick={() => this.changeScreen(3)}>Proceed</Button>
            </main>
          </div>
        )
      } else {
        console.log(this.state)
        return (
          <div><SortableComponent data={this.makeValueArray()} screen={3} reset={this.reset}/></div>
        )
      }
    }
  }
}
