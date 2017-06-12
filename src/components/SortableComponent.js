import React, {Component} from 'react'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import Menu from './Menu'
import Instructions from './Instructions'
import ProceedButton from './ProceedButton'

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
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      valueName: arrayMove(this.state.valueName, oldIndex, newIndex)
    })
  }

  updateScreenThree = () => {
    console.log(this.state.valueName.length)
    if (this.state.valueName.length > 5) {
      const oldValues = this.state
      const newValues = oldValues.valueName.slice(0, 5)
      console.log(newValues, oldValues)
      console.log(this.state)
      oldValues.valueName = newValues
      this.setState({text: 'screenThreeUpdate', oldValues: oldValues})
    } else {
      //move to final screen
      this.setState({screen: 4})
    }
  }
  render() {
    console.log(this.state.valueName.length)
    if (this.state.screen === 4) {
      return (
        <div>hello</div>

      )
    }
    let text3 = this.state.text
    const SortableItem = SortableElement(({value}) => <li>{value}</li>);
    const SortableList = SortableContainer(({valueName}) => {
      return (
        <div>
          App
          <Menu></Menu>
          <main id="main" className="container clearfix">
            <Instructions text={text3}></Instructions>
            <ul>
              {valueName.map((value, index) => (<SortableItem key={`item-${index}`} index={index} value={value}/>))}
            </ul>
          </main>
          <ProceedButton onClick={this.updateScreenThree}/>
        </div>
      );
    });
    return <SortableList valueName={this.state.valueName} onSortEnd={this.onSortEnd}/>;
  }
}
