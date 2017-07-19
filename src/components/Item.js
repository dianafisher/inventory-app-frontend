import React from 'react';

// stateless functional Component
function Item (props) {
  return (
      <div className='col-lg-4 col-md-6 col-xs-12 mix laptop apple'>
        <div className='card ms-feature'>
          <div className='card-block text-center'>
            <img src={props.item.productImage} alt='product' className='img-responsive center-block'></img>
            <h4 className='text-normal text-center'>{props.item.title}</h4>
          </div>
        </div>
      </div>
  )
}

export default Item;
