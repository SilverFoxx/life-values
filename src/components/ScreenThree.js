import React, {Component} from 'react'
import _ from 'lodash'

import Menu from './Menu'
import Instructions from './Instructions'
import FlexCard from './FlexCard'
import SelectorButton from './SelectorButton'
import Counter from './Counter'
import logo from '../logo.svg';

export default class ScreenThree extends Component {
  constructor(props) {
    super(props)

    this.state = this.props.data
  }
  render(){
return (
  <div>screen 3</div>
)
  }
}
