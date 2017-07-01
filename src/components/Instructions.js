import React, {Component} from 'react'

export default class Instructions extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const screenOneText = `Quickly chose as many as you want - aiming for about 15-20. We'll refine it later. Click the menu for more details.`
    const screenTwoTextTop = `These are your values so far. Any you don't like? ... tap to remove.`
    const screenTwoInputText = `I missed one? Add it below:`
    const screenTwoTextBottom = `Want any of these back? ... tap to re-select. Play with them for a while.`
    const screenThreeText = `Drag and drop to sort your values from MOST important at the top, to less at the bottom. Take your time. Save and return if you wish. The top 5 are the most important.`
    const screenThreeUpdateText = `Almost there. We want the top 3`
    const screenFinalTop = `Here are your personal values`
    let text = ''
    if (this.props.text === 'screenOne') { //change to switch
    text = screenOneText
    } else if (this.props.text === 'screenTwoTop') {
      text = screenTwoTextTop
    } else if (this.props.text === 'screenTwoBottom') {
      text = screenTwoTextBottom
    } else if (this.props.text === 'screenThree') {
      text = screenThreeText
    } else if (this.props.text === 'screenThreeUpdate') {
      text = screenThreeUpdateText
    } else if (this.props.text === 'screenTwoInput') {
      text = screenTwoInputText
    } else if (this.props.text === 'screenFinalTop') {
      text = screenFinalTop
    }

    return (
      <div className={`instructionsWrapper ${this.props.className}`}><p>{text}</p></div>
    )
  }
}
