import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AddItem extends Component {

  handleSubmit = (e) => {
    e.preventDefault();

  }

  render() {
    return (
      <div>
        <div className='container'>
          <div className='row'>
            <div className='card card-primary animated fadeInUp'>
              <div className='ms-hero-bg-primary ms-hero-img-mountain'>
                <h2 className='text-center no-m pt-4 pb-4 color-white index-1'>New Item</h2>
              </div>
              <div className='card-block'>
                <form onSubmit={this.handleSubmit} className='form-horizontal'>
                  <fieldset>
                    <div className='form-group'>
                      <label className='col-md-2 control-label' htmlFor='ms-form-title'>Title</label>
                      <div className='col-md-9'>
                        <input className='form-control' type='text' id='ms-form-title' name='title' placeholder='Title' />
                      </div>
                    </div>
                    <div className='form-group'>
                      <label className='col-md-2 control-label' htmlFor='ms-form-image'>Image URL</label>
                      <div className='col-md-9'>
                        <input className='form-control' type='text' name='imageUrl' placeholder='Image URL' />
                      </div>
                    </div>
                    <div className='form-group'>
                      <div className='col-md-9 col-md-offset-2'>
                        <button type='submit' className='btn btn-raised btn-primary'>Submit</button>
                        <button type='submit' className='btn btn-raised btn-default'>Cancel</button>
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


export default AddItem;
