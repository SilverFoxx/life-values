import React from 'react'
import PropTypes from 'prop-types'

const Counter = (props) =>
<section id={props.id} className={`counter ${props.className}`}>
  <p className="cj">
    {props.total}
  </p>
</section>

Counter.propTypes = {
  id: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired
}

export default Counter
