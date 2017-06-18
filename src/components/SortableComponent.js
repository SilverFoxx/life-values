import React, {Component} from 'react'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc'
//import _ from 'lodash'

import Menu from './Menu'
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
    if (this.state.user) {fire.set(this.state)}
    this.setState({
      user: false,
      anonUser: false,
    })
  }
  handleAuth = (user, anon) => {
    console.log('called')
    this.setState({
      user: user,
      anonUser: anon,
    })
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
      return <Login handleAuth={this.handleAuth} />
    }

    if (this.state.screen === 4) {
      console.log(this.state)
      //startover option
      return (
        <div>
          <Menu></Menu>
          <LogOut handleLogOut={this.handleLogOut}>Logout & Save</LogOut>
          <Button className="startOver" onClick={this.props.reset}>Start Over</Button>
          <main id="main" className="container clearfix">
            <Instructions text={'screenFinal'}></Instructions>
            <div id="cardRoot">
              {this.state.valueName.map((card, index) => {
                return <ValueCard name={card} key={index} />
              })}
            </div>
          </main>
        </div>
      )
    } else {
      const SortableItem = SortableElement(({value}) => <div className="listItem">{value}</div>);
      const SortableList = SortableContainer(({valueName}) => {
        return (
          <div>
            App
            <Menu></Menu>
            <LogOut handleLogOut={this.handleLogOut}>Logout & Save</LogOut>
            <Button className="startOver" onClick={this.props.reset}>Start Over</Button>
            <main id="main" className="container clearfix">
              <Instructions text={this.state.text}></Instructions>
              <div className="listContainer">
                {valueName.map((value, index) => (<SortableItem key={`item-${index}`} index={index} value={value} />))}
              </div>
            </main>
            <Button className="proceed" onClick={this.updateScreenThree}>Proceed</Button>
          </div>
        )
      })
      return <SortableList valueName={this.state.valueName} onSortEnd={this.onSortEnd}/>
    }
  }
}
