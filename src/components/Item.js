import React from 'react';
import { Link } from 'react-router-dom';

// stateless functional Component
function Item (props) {  
  return (
      <div className='card ms-feature' style={styles.card} >
        <div className='card-block text-center'>
          <Link to={`/item/${props.item._id}`}>
            <img src={props.item.image} alt='product' className='img-responsive center-block' style={styles.itemImage}></img>
          </Link>
          <h5 className='text-normal text-center'>{props.item.title}</h5>
        </div>
      </div>
  )
}

const styles = {
  card: {
    display: 'inline-block',
    width: '260px',
    height: '330px'
  },
  itemImage: {
    maxHeight: '200px',
    maxWidth: '220px'
  }
}


export default Item;
