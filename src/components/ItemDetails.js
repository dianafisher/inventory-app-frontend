import React, { Component } from 'react';
import PropTypes from 'prop-types';
import serializeForm from 'form-serialize';

class ItemDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      title: props.item.title,
      description: props.item.description,
      image: props.item.image,
      brand: props.item.brand,
      model: props.item.model,
      count: props.item.count
    };
  }

  componentDidMount() {
    console.log('ItemDetails componentDidMount');
    // get the item id from the match object params
    const itemId = this.props.id;
    console.log('componentDidMount: itemId', itemId);
    console.log(this.props);
    this.props.getItem(itemId);
    // // call the inventory api to get the item details
    // this._getItem(itemId);
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
    console.log(nextProps.item);
    this.setState( {
      title: nextProps.item.title,
      description: nextProps.item.description,
      image: '',
      brand: nextProps.item.brand,
      model: nextProps.item.model,
      count: nextProps.item.count
    } )
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    console.log(values);
    this.props.editItem(this.props.id, values);
  }

  _handleInputChange = (e) => {
    const target = e.target;
    console.log(target.type);
    const name = target.name;
    console.log(name);

    this.setState( {[name]: e.target.value} );

  }

  _onEditClick = (e) => {
    console.log(e.target.name + ' clicked');
    if (e.target.name === 'editButton') {
      // toggle edit form visibility
      const editing = this.state.isEditing;
      this.setState( {isEditing: !editing} );
    }
  }

  _onDeleteClick = (e) => {
    this.props.deleteItem(this.props.id);
  }

  _onCancelEdit = (e) => {
    const editing = this.state.isEditing;
    this.setState( {isEditing: !editing} );
  }

  _renderEditForm = () => {
    return (
      <div className="card card-block">
        <div className="carousel-inner">
          <form className="form-horizontal" onSubmit={this._handleSubmit}>
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
                    name='title'
                    onChange={this._handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputName" className="col-md-2 control-label">Description</label>
                <div className="col-md-9">
                  <textarea
                    style={styles.description}
                    className="form-control"
                    id="inputDescription"
                    placeholder="Description"
                    value={this.state.description}
                    name='description'
                    onChange={this._handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputBrand" className="col-md-2 control-label">Brand</label>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    id="inputBrand"
                    placeholder="Brand"
                    value={this.state.brand}
                    name='brand'
                    onChange={this._handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputModel" className="col-md-2 control-label">Model</label>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    id="inputModel"
                    placeholder="Model"
                    value={this.state.model}
                    name='model'
                    onChange={this._handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputCount" className="col-md-2 control-label">Count</label>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    id="inputCount"
                    placeholder="Count"
                    value={this.state.count}
                    name='count'
                    onChange={this._handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputImage" className="col-md-2 control-label">Image</label>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    id="inputImage"
                    placeholder="Image URL"
                    value={this.state.image}
                    name='image'
                    onChange={this._handleInputChange}
                  />
                </div>
              </div>
              <div className="row">
                <button
                  className="btn btn-primary btn-block btn-raised mt-2 no-mb"
                  type='submit'
                >Save Changes
                </button>
                <button
                  className="btn btn-primary btn-block btn-raised mt-2 no-mb"
                  onClick={this._onCancelEdit}
                >Cancel
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    )
  }

  _renderDetails = () => {
    const details = this.props.item;
    console.log('details', details);

    return (
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
            onClick={this._onEditClick}
            name='editButton'
          >Edit Item</button>
          <button
            className="btn btn-danger btn-block btn-raised mt-2 no-mb"
            onClick={this._onDeleteClick}
            name='deleteButton'
          >Delete Item</button>
          {/* <Link
            to={`/edit/${details._id}`}
            className='btn btn-primary btn-block btn-raised mt-2 no-mb'
          >Edit Item</Link> */}
        </div>
      </div>
    )
  }

  render() {

    const isEditing = this.state.isEditing;
    const details = this.props.item;
    console.log('details', details);
    let imageURL = this.state.image || details.image;
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='ms-carousel ms-carousel-thumb carousel'>
              <div className='card card-block'>
                <div className='carousel-inner'>
                  <div className='item active'>
                    <img
                      src={imageURL}
                      alt='product'
                      className='img-responsive center-block'
                      style={styles.itemImage}
                    ></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            { isEditing ? this._renderEditForm() : this._renderDetails() }
          </div>
        </div>
      </div>
    )
  }
}

ItemDetails.propTypes = {
  item: PropTypes.object.isRequired
}

const styles = {
  description: {
    minHeight: '250px'
  },
  itemImage: {
    maxHeight: 480,
    maxWidth: 480
  }
}

export default ItemDetails;
