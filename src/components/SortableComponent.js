import React, {Component} from 'react'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

export default class SortableComponent extends Component {
  constructor(props) {
    super(props)
    this.state = this.props.data
    // this.state = {
    //   valueName: [
    //     'peace', 'power', 'love'
    //   ],
    //   screen: 1
    // }
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      valueName: arrayMove(this.state.valueName, oldIndex, newIndex)
    });
  };

  render() {
    const SortableItem = SortableElement(({value}) => <li>{value}</li>);

    const SortableList = SortableContainer(({valueName}) => {
      return (
        <ul>
          {valueName.map((value, index) => (<SortableItem key={`item-${index}`} index={index} value={value}/>))}
        </ul>
      );
    });
    return <SortableList valueName={this.state.valueName} onSortEnd={this.onSortEnd}/>;
  }
}
