import React, {Component} from 'react'
import _ from 'lodash'

import Menu from './Menu'
import Instructions from './Instructions'
import FlexCard from './FlexCard'
import SelectorButton from './SelectorButton'
import Counter from './Counter'
import logo from '../logo.svg';

export default class ScreenTwo extends Component {
  constructor(props) {
    super(props)

    this.state = this.props.data //CWM??
    // this.handleDeleteCard = this.handleDeleteCard.bind(this);
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

  //flexbox display
  render() {
    return (
      <div>
        {console.log(this.state.values)}
        <Menu></Menu>
        <main id="main" className="container clearfix">
          <Instructions text={'screenTwoTop'}></Instructions>
          <div id="cardRoot" className="clearfix">
            {_.map(this.state.values, (card) => {
              if (card.selected) {
                return <FlexCard name={card.name} key={card.id} onClick={() => this.handleToggleCard(card.id)}/>
              }
            })}
          </div>
          <Instructions text={'screenTwoBottom'}></Instructions>
          <div id="cardRoot" className="clearfix">
            {_.map(this.state.values, (card) => {
              //console.log(card.name)
              if (!card.selected) {
                return <FlexCard name={card.name} key={card.id} onClick={() => this.handleToggleCard(card.id)}/>
              }
            })}
          </div>
        </main>
        <div onClick={this.props.changeScreen(3, this.state)}>
          <p>Proceed</p>
        </div>
      </div>
    )
  }
}
//option to add value - bottom components
//delete button on each card

// {_.map(this.state.values, (value) => (
//   // console.log(value.selected)
//   <ValueCards className={`${value.active ? '' : 'not-active'}`}>
//     {value.name}
//   </ValueCards>
// ))}

// import React, {Component} from 'react'
// import _ from 'lodash'
//
// import ScreenOne from './ScreenOne'
// import ScreenTwo from './ScreenTwo'
// import Menu from './Menu'
// import Instructions from './Instructions'
// import ValueCard from './ValueCard'
// import SelectorButton from './SelectorButton'
// import Counter from './Counter'
// import logo from '../logo.svg'
//
// export default class App extends Component {
//   constructor(props) {
//     super(props)
//
//     this.state = {
//       screen: 1
//     }
//   }
//
// changeScreen = (screen, data) => {
//   console.log(screen)
//   this.state = data
//   this.setState({screen: screen})
//   console.log(2, this.state)
// }
//   render() {
//
//       if (this.state.screen === 2) {
//       return <ScreenTwo data={this.state.values}/>
//     } else {
//       console.log(this.state)
//       return <ScreenOne changeScreen={this.changeScreen}/>
//
//     }
//   }
// }
