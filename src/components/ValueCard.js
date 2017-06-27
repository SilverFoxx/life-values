import React from 'react'
import PropTypes from 'prop-types'

// export default class ValueCard extends Component {
//   constructor(props) {
// super(props)
//   }
//
//   render() {
//     return (
//       <section id="" className="valueCard">
//         <p>{this.props.name} </p>
//       </section>
//     )
//   }
// }

const ValueCard = ({ name }) =>
  <section className="valueCard">
    <p>{name}</p>
  </section>

ValueCard.propTypes = {
  name: PropTypes.string.isRequired
}

export default ValueCard

//WOW!! Go stateless functional components!

//TODO Tap to flip and show more info https://codepen.io/phantomesse/pen/uGHxn
