import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import serializeForm from 'form-serialize';
import * as InventoryAPI from '../utils/InventoryAPI';

class ItemDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      details: {},
      token: props.token,
      isEditing: false,
      title: '',
      description: '',
      imageURL: '',
    };
  }

  componentDidMount() {
    console.log('ItemDetails componentDidMount');
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
      this.setState( {
        details: item,
        title: item.title,
        description: item.description,
      } );
    });
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    console.log(values);
    // this.props.onRegisterUser(values);
  }

  _handleInputChange = (e) => {
    const target = e.target;
    console.log(target.type);
    const name = target.name;
    console.log(name);
  }

  _onClick = (e) => {
    console.log(e.target.name + ' clicked');
    if (e.target.name === 'editButton') {
      // toggle edit form visibility
      const editing = this.state.isEditing;
      this.setState( {isEditing: !editing} );
    }
  }

  _renderEditForm = () => {
    return (
      <div className="card card-primary">
        <div className="card-block">
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <fieldset>
              <div className="form-group">
                <label htmlFor="inputTitle" className="col-md-2 control-label">Title</label>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    id="inputTitle"
                    placeholder="Title"
                    value={this.state.title}
                    name='email'
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputName" className="col-md-2 control-label">Description</label>
                <div className="col-md-9">
                  <textarea
                    type="text"
                    className="form-control"
                    id="inputName"
                    placeholder="Description"
                    value={this.state.description}
                    name='name'
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputPassword" className="col-md-2 control-label">Password</label>
                <div className="col-md-9">
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    placeholder="Password"
                    name='password'
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 col-md-offset-8">
                  <button
                    className="btn btn-raised btn-primary btn-block mt-4"
                    type='submit'
                  >Register Now</button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    )
  }

  render() {
    const details = this.state.details;
    console.log('details', details);
    const isEditing = this.state.isEditing;

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
            { isEditing ? this._renderEditForm() : ''}
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
                <button
                  className="btn btn-primary btn-block btn-raised mt-2 no-mb"
                  onClick={this._onClick}
                  name='editButton'
                >Edit Item</button>
                {/* <Link
                  to={`/edit/${details._id}`}
                  className='btn btn-primary btn-block btn-raised mt-2 no-mb'
                >Edit Item</Link> */}
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
