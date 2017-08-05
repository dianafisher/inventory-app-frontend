import React from 'react';
import { Link } from 'react-router-dom';

// stateless functional Component
function Item (props) {
  console.log('props', props);
  return (
      <div className='card ms-feature' style={styles.card} >
        <div className='card-block text-center'>
          <Link to={`/item/${props.item._id}`}>
            <img src={props.item.image} alt='product' className='img-responsive center-block' style={styles.itemImage}></img>
          </Link>
          <h4 className='text-normal text-center'>{props.item.title}</h4>
        </div>
      </div>
  )
}

const styles = {
  card: {
    display: 'inline-block',
    width: '260px',
    height: '360px'
  },
  itemImage: {
    maxHeight: '220px',
    maxWidth: '220px'
  }
}


export default Item;
