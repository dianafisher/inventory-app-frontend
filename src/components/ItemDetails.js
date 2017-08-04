import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as InventoryAPI from '../utils/InventoryAPI';

class ItemDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      details: {},
      token: props.token
    };
  }

  componentDidMount() {
    // get the item id from the match object params
    const itemId = this.props.match.params.id;
    console.log('componentDidMount: itemId', itemId);
    // call the inventory api to get the item details
    this._getItem(itemId);
  }

  _getItem = (itemId) => {
    const token = this.state.token;
    InventoryAPI.getItem(itemId, token).then((item) => {
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
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-block'>
                <h2>{details.title}</h2>
                <p className='lead'>{details.description}</p>
                <ul className='list-unstyled'>
                  <li><strong>Brand: </strong>{details.brand}</li>
                  <li><strong>Model: </strong>{details.model}</li>
                  <li><strong>UPC: </strong>{details.upc}</li>
                  <li><strong>Count: </strong>{details.count}</li>
                </ul>
                <Link
                  to={`edit/${details._id}`}
                  className='btn btn-primary btn-block btn-raised mt-2 no-mb'
                >Edit Item</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ItemDetails.propTypes = {
  token: PropTypes.string.isRequired
}

export default ItemDetails;
