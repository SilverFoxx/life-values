import React, {Component} from 'react'
import {push as Menu} from 'react-burger-menu'
import menuIcon from '../img/menu.svg'

export default class BurgerMenu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Menu pageWrapId={"page-wrap"} outerContainerId={"outer-container"} width={'90%'} customBurgerIcon={< img src = {
        menuIcon
      } alt="Menu burger icon"/>}>
        <article>
          <h1>Personal Values Finder</h1>
          <h2>How to</h2>
          <p>If you are not logged in, you will be given your results at the end, but can't save and return. If you are logged in, your progress is auto-saved, and you can return anytime.</p>
          <p>On the first screen, you will see lots of possible values. Quickly chose about 15-20. Don't overthink it - go with your instincts.</p>
          <p>In the second screen, review and tune your choices, by tapping on each value. You can also add any of your own values that I missed.</p>
          <p>Next, you see a list of your current selections. Drag and drop into a rough order of priority, with the most important at the top.</p>
          <p>Do it again. Take your time. (It took me weeks to get this right).</p>
          <h2>Why Bother?</h2>
          <p>See
            <a href="http://reallylivelife.org/life-philosophy/why-you-need-a-personal-philosophy-of-life.html" title="External link"> here.</a>
          </p>
          <h2>Resources</h2>
          <p>Living an authentic life:
            <a href="http://reallylivelife.org/life-philosophy/" title="External link"> reallylivelife.org</a>
          </p>
          <p>Huge list of values:
            <a href="https://www.stevepavlina.com/blog/2004/11/list-of-values/"> stevepavlina.com</a>
          </p>
          <p>Applied to careers:
            <a href="https://www.mindtools.com/pages/article/newTED_85.htm"> mindtools.com</a>
          </p>
          <footer>
            <h2>About</h2>
            <p>Developed by
              <a href="http://cewl.io"> cewl.io</a>. &copy;2017 cewl.io</p>
            <p>Contact: webmaster (at) cewl.io</p>
          </footer>
        </article>
      </Menu>
    )
  }
}
