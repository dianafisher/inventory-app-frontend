import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import * as InventoryAPI from '../utils/InventoryAPI';

class ListItems extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      pageNumber: 1
    };
  }



  _getItems = (pageNumber) => {
    // get the token from our state
    console.log('_getItems, props', this.props);
    const token = this.props.token;
    console.log('_getItems, token:', token);
    InventoryAPI.getItems(token, pageNumber).then((items) => {
      console.log(items);
      this.setState({ items })
    });
  }


  componentDidMount() {
    this._getItems(this.state.pageNumber);
  }

  _renderItems = (items) => {
    return (
      <div className='row'>
        { this._renderFilters() }
        <div className='col-md-9'>
          <div className='row' id='Container' style={styles.container}>
            {items.map((item) => (
              <div className='col-lg-4 col-md-6 col-xs-12 mix laptop apple' style={styles.card} key={item.upc}>
                <Item item={item}></Item>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  _renderFilters = () => {
    return (
      <div className='col-md-3'>
        <div className='card card-primary'>
          <div className='card-header'>
            <h3 className='card-title'>Filter List</h3>
          </div>
          <div className='card-block'>
            <form className='form-horizontal'>
              <h4 className='mb-1 no-mt'>Brands</h4>
              <fieldset>
                <div className='form-group no-mt'>
                  <div className='checkbox ml-2'>
                    <label>
                      <input type='checkbox' value='.funko' />
                      <span className='checkbox-material'>
                        <span className='check'></span>
                      </span>
                      Funko
                    </label>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const items = this.state.items;
    console.log('items', items);
    let div = null;
    if (items.length > 0) {
      div = this._renderItems(items)
    } else {
      div = <div>Nothing to see here</div>
    }
    return (
      <div className='container'>
        {div}
      </div>
    )
  }

}

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  card: {
    display: 'inline-block'
  }
}

ListItems.propTypes = {
  token: PropTypes.string.isRequired
}

export default ListItems;
