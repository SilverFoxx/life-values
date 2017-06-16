import React, {Component} from 'react'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc'
import _ from 'lodash'

import Menu from './Menu'
import Instructions from './Instructions'
import ProceedButton from './ProceedButton'
import ValueCard from './ValueCard'

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
      //FIXME works, but also adds oldValues
      this.setState({screen: 4, oldValues: oldValues})
    } else {
      this.setState({screen: 4})
    }
  }

  render() {
    console.log(this.state.valueName.length)
    if (this.state.screen === 4) {
      console.log(this.state)
      //startover option
      return (
        <div>
          <Menu></Menu>
          <main id="main" className="container clearfix">
            <Instructions text={'screenOne'}></Instructions>
            <div id="cardRoot">
              {this.state.valueName.map(card => {
                return <ValueCard name={card}/>
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
          <main id="main" className="container clearfix">
            <Instructions text={this.state.text}></Instructions>
            <div className="listContainer">
              {valueName.map((value, index) => (<SortableItem key={`item-${index}`} index={index} value={value}/>))}
            </div>
          </main>

          <ProceedButton onClick={this.updateScreenThree}/>
        </div>
      )
    })
    return <SortableList valueName={this.state.valueName} onSortEnd={this.onSortEnd}/>

  }
}
}
