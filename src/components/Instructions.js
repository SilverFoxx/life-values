import React, {Component} from 'react'

export default class Instructions extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const screenOneText = `{<p>}Quickly chose as many as you want - aiming for about 15-20. We'll refine it later.`
    const screenTwoTextTop = `Click to reject`
    const screenTwoTextBottom = `Click to accept`
    const screenThreeText = `Drag and drop to sort your values from MOST important at the top, to less at the bottom. Take your time. Save and return if you wish`
    const screenThreeUpdate = `Almost there. We want the top 3`
    let text = ''
    if (this.props.text === 'screenOne') { //change to switch
    text = screenOneText
    } else if (this.props.text === 'screenTwoTop') {
      text = screenTwoTextTop
    } else if (this.props.text === 'screenTwoBottom') {
      text = screenTwoTextBottom
    } else if (this.props.text === 'screenThree') {
      text = screenThreeText
    }
    return (
      <div className="center">{text}</div>
    )
  }
}
