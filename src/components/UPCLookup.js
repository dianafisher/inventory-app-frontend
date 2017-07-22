import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import serializeForm from 'form-serialize';

class UPCLookup extends Component {

  constructor(props) {
    super(props);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    console.log(values);
    this.props.onUPCLookup(values);
  }

  handleInputChange = (e) => {
    const target = e.target;
    console.log(target.type);
    const name = target.name;
    console.log(name);
  }

  render() {
    return(
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
  }
}

export default UPCLookup;
