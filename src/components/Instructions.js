import React, {Component} from 'react'

export default class Instructions extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const screenOneText = `<p>CHANGE FROM PAVLINA -THIS.PROPS.CHILDREN The following list of values will help you develop a clearer sense of what’s most important to you in life, as explained in the article Living Your Values. Simply copy or print this list, mark the values which most resonate with you, and then sort your list in order of priority.</p>

    While most values on this list will have little or no significance to you (and some may even seem negative to you), some values will surely call to you, and you’ll feel, “Yes, this value is a part of me.”

    Use this values list as a guide. It contains many synonyms but is not exhaustive, so feel free to add unlisted values to your list as well.
`
    const screenTwoTextTop = `Click to reject`
    const screenTwoTextBottom = `Click to accept`
    let text = ''
    if (this.props.text === 'screenOne') { //change to switch
    text = screenOneText
    } else if (this.props.text === 'screenTwoTop') {
      text = screenTwoTextTop
    } else if (this.props.text === 'screenTwoBottom') {
      text = screenTwoTextBottom
    }
    return (
      <div className="center">{text}</div>
    )
  }
}
