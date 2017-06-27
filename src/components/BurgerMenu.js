import React, { Component } from 'react'
import { push as Menu } from 'react-burger-menu'
import menuIcon from '../img/menu.svg'
// class Menu extends React.Component {
//   showSettings (event) {
//     event.preventDefault();
//   }
//
//   render () {
//     return (
//       <Menu>
//         <a id="home" className="menu-item" href="/">Home</a>
//         <a id="about" className="menu-item" href="/about">About</a>
//         <a id="contact" className="menu-item" href="/contact">Contact</a>
//         <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
//       </Menu>
//     );
//   }
// }
// export default Menu


export default class BurgerMenu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Menu pageWrapId={"page-wrap"} outerContainerId={"outer-container"} width={ '62%' } customBurgerIcon={ <img src={menuIcon} /> }>
        <p>Instructions</p>
        <p>https://linearicons.com/</p>
      </Menu>
    )
  }
}

// const Menu =
// export default Menu
