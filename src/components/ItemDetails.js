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
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='ms-carousel ms-carousel-thumb carousel'>
              <div className='card card-block'>
                <div className='carousel-inner'>
                  <div className='item active'>
                    <img src={details.image} alt='product' className='img-responsive center-block'></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ItemDetails;
