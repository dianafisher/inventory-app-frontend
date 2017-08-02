import React, {Component} from 'react';
import Item from './Item';

class ListItems extends Component {

  render() {

    return (
      <div className='container'>
        <div className='row'>
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
          <div className='col-md-9'>
            <div className='row' id='Container' style={styles.container}>
              {this.props.items.map((item) => (
                <div className='col-lg-4 col-md-6 col-xs-12 mix laptop apple' style={styles.card} key={item.upc}>
                  <Item item={item}></Item>
                </div>
              ))}
            </div>
          </div>
        </div>
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
export default ListItems;
