import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import serializeForm from 'form-serialize';

class UPCLookup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      upc: '',
      item: null
    };
  }

  componentWillReceiveProps(nextProps) {
    
    this.setState( {item: nextProps.item} );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    console.log(values);

    // validate the UPC code entered

    this.props.onUPCLookup(values);
  }

  handleInputChange = (e) => {
    const target = e.target;
    // console.log(target.type);
    const name = target.name;
    // console.log(name);

    // TODO update state based on text entered in upc form input
  }

  /* A valid UPC-A code contains 12 numbers.  No letters, characters, or
    other content of any kind may appear.
    source: https://en.wikipedia.org/wiki/Universal_Product_Code
  */
  _isValidUPC = (value) => {
    if (!value) {
      return false;
    }
    const length = value.length;
    const numbers = /^\d+$/;

    return length === 12 && numbers.test(value);
  }

  render() {
    const item = this.state.item;

    return(
      item ? ( <Redirect to={`/item/${item._id}`} /> ) : (
        <div>
          <div className='container'>
            <div className='row'>
              <div className='card card-primary animated fadeInUp'>
                <div className='ms-hero-bg-primary ms-hero-img-mountain'>
                  <h2 className='text-center no-m pt-4 pb-4 color-white index-1'>UPC Lookup</h2>
                </div>
                <div className='card-block'>
                  <form onSubmit={this.handleSubmit} className='form-horizontal'>
                    <fieldset>
                      <div className='form-group'>
                        <label className='col-md-2 control-label' htmlFor='ms-form-upc'>UPC</label>
                        <div className='col-md-9'>
                          <input
                            className='form-control'
                            type='text'
                            id='ms-form-upc'
                            name='upc'
                            placeholder='UPC code'
                            onChange={this.handleInputChange}
                          />
                        </div>
                      </div>
                      <div className='form-group'>
                        <div className='col-md-9 col-md-offset-2'>
                          <button
                            type='submit'
                            className='btn btn-raised btn-primary'
                            name='submit'
                          >Submit</button>
                        </div>
                      </div>
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )

    )
  }
}

UPCLookup.propTypes = {
  onUPCLookup: PropTypes.func.isRequired
}

export default UPCLookup;
