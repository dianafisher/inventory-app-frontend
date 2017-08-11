import React, { Component } from 'react';
import serializeForm from 'form-serialize';

class AddItem extends Component {

  constructor(props) {
    super(props);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    console.log(values);
    this.props.onAddItem(values);
  }

  handleInputChange = (e) => {
    const target = e.target;
    console.log(target.type);
    const name = target.name;
    console.log(name);
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
                        <input
                          className='form-control'
                          type='text'
                          id='ms-form-title'
                          name='title'
                          placeholder='Title'
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                    <div className='form-group'>
                      <label className='col-md-2 control-label' htmlFor='ms-form-upc'>UPC</label>
                      <div className='col-md-9'>
                        <input
                          className='form-control'
                          type='text' id='ms-form-upc'
                          name='upc' placeholder='UPC'
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                    <div className='form-group'>
                      <label className='col-md-2 control-label' htmlFor='ms-form-description'>Description</label>
                      <div className='col-md-9'>
                        <input
                          className='form-control'
                          type='text'
                          id='ms-form-description'
                          name='description'
                          placeholder='Description'
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                    <div className='form-group'>
                      <label className='col-md-2 control-label' htmlFor='ms-form-brand'>Brand</label>
                      <div className='col-md-9'>
                        <input
                          className='form-control'
                          type='text'
                          id='ms-form-brand'
                          name='brand'
                          placeholder='Brand'
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                    <div className='form-group'>
                      <label className='col-md-2 control-label' htmlFor='ms-form-image'>Image URL</label>
                      <div className='col-md-9'>
                        <input
                          className='form-control'
                          type='text'
                          name='imageUrl'
                          placeholder='Image URL'
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                    <div className='form-group'>
                      <div className='col-md-9 col-md-offset-2'>
                        <button type='submit' className='btn btn-raised btn-primary'>Submit</button>
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
