import React, {Component} from 'react'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc'
//import _ from 'lodash'

//import Menu from './Menu'
import BurgerMenu from './BurgerMenu'
//import {push as Menu} from 'react-burger-menu'
import Instructions from './Instructions'
import Button from './Button'
import ValueCard from './ValueCard'
import Login from './Login'
import LogOut from './LogOut'
import db from '../lib/database'

export default class SortableComponent extends Component {
  constructor(props) {
    super(props)
    this.state = this.props.data
    // this.state = {
    //   valueName: [
    //     'peace', 'power', 'love'
    //   ],
    //   text: 'screenThreeUpdate'
    // }
    //this.handleEnter = this.handleEnter.bind(this)
  }

  handleLogOut = () => {
    //persist users state through firebase
    const fire = db.ref('UserValues')
    if (this.state.user) {
      fire.set(this.state)
    }
    this.setState({user: false, anonUser: false})
  }
  handleAuth = (user, anon) => {
    console.log('called')
    this.setState({user: user, anonUser: anon})
  }
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      valueName: arrayMove(this.state.valueName, oldIndex, newIndex)
    })
  }

  updateScreenThree = () => {
    //TODO update main state (callback passing names, find correct id, update selected and rank)
    console.log(this.state.valueName.length)
    if (this.state.valueName.length > 5) {
      const oldValues = this.state
      const newValues = oldValues.valueName.slice(0, 5)
      oldValues.valueName = newValues
      this.setState({text: 'screenThreeUpdate', oldValues: oldValues})
      console.log(this.state)
    } else if (this.state.valueName.length > 3 && this.state.valueName.length <= 5) {
      //move to final screen with top 3 values
      let oldValues = this.state
      //console.log(newValues, oldValues)
      oldValues.valueName = oldValues.valueName.slice(0, 3)
      console.log(oldValues.valueName)
      //FIXME works, but also adds oldValues - to do with slice?
      this.setState({screen: 4, oldValues: oldValues})
    } else {
      this.setState({screen: 4})
    }
  }

  render() {
    console.log(this.state.valueName.length)

    if (!this.state.user && !this.state.anonUser) {
      return <Login handleAuth={this.handleAuth}/>
    }

    if (this.state.screen === 4) {
      console.log(this.state)
      //startover option
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
            <main id="main" className="finalScreen">
              <Instructions text={'screenFinal'}></Instructions>
              <div id="cardRoot">
                {this.state.valueName.map((card, index) => {
                  return <ValueCard name={card} key={index}/>
                })}
              </div>
            </main>
          </div>
        </div>
      )
    } else {
      const SortableItem = SortableElement(({value}) => <div className="listItem">{value}</div>);
      const SortableList = SortableContainer(({valueName}) => {
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
              <main id="main" className="">
                <Instructions text={this.state.text}></Instructions>
                <div className="listContainer">
                  {valueName.map((value, index) => (<SortableItem key={`item-${index}`} index={index} value={value}/>))}
                </div>
              </main>
              <Button className="proceed" onClick={this.updateScreenThree}>Proceed</Button>
            </div>
          </div>
        )
      })
      return <SortableList valueName={this.state.valueName} onSortEnd={this.onSortEnd}/>
    }
  }
}
