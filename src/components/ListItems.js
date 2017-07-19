import React, {Component} from 'react';
import Item from './Item';

class ListItems extends Component {

  render() {

    return (
      <div className='card ms-feature'>
        {this.props.items.map((item) => (
          <div key={item.upc}>
            <Item item={item}></Item>
          </div>
        ))}
      </div>
    )
  }

}

export default ListItems;
