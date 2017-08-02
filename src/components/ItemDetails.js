import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as InventoryAPI from '../utils/InventoryAPI';

class ItemDetails extends Component {

  state = { details: {} };

  componentDidMount() {
    // get the item id from the match object params
    const itemId = this.props.match.params.id;
    console.log('componentDidMount: itemId', itemId);
    // call the inventory api to get the item details
    this._getItem(itemId);
  }

  _getItem = (itemId) => {
    InventoryAPI.getItem(itemId).then((item) => {
      console.log(item);
      this.setState( { details: item } );
    });
  }

  render() {
    const details = this.state.details;
    console.log('details', details);
    return (

      <div className='col-lg-4 col-md-6 col-xs-12 mix laptop apple'>
        <div className='card ms-feature'>
          <div className='card-block text-center'>
            <img src={details.image} alt='product' className='img-responsive center-block'></img>
            <h4 className='text-normal text-center'>{details.title}</h4>
          </div>
        </div>
        <Link className='close' to='/'>Close</Link>
      </div>

    )
  }
}

export default ItemDetails;
