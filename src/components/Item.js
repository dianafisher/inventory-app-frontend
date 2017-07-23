import React from 'react';
import { Link } from 'react-router-dom';

// stateless functional Component
function Item (props) {
  console.log('props', props);
  return (
    <div>
      <div className='col-md-3'>
        <Link className='thumbnail' to={`/item/${props.item.id}`}>
          <div className='thumbnail-container'>
            <img src={props.item.productImage} alt='product' className='img-responsive'></img>
          </div>
        </Link>
      </div>
      
    </div>
  )
}

export default Item;
