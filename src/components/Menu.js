import React, {Component} from 'react'

export default class Menu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <header>
        <section id="menu" className="clearfix">
          <a href="#" className="closeMenu"><h1>X</h1></a>
          <p>Detailed instructions</p>
          <p>
            <a href="http://reallylivelife.org/..">links</a>
          </p>
          <footer>
            <address>cewl.io</address>
          </footer>
        </section>
      </header>
    )
  }
}
// const Menu =
// export default Menu
