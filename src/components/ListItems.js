import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

class ListItems extends Component {

  componentDidMount() {
    console.log('ListItems componentDidMount');
    console.log('props', this.props);
    this.props.getItems(1);
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
  }

  _onPageClick = (e) => {
    console.log(e.target);
    const name = e.target.name;
    console.log(name);
    const page = parseInt(name, 10);
    this.props.getItems(page);
  }

  _onPreviousPage = (e) => {
    const currentPage = this.props.page;
    if (currentPage > 1) {
      this.props.getItems(currentPage - 1);
    }
  }

  _onNextPage = (e) => {
    const currentPage = this.props.page;
    const pageCount = this.props.pages;
    if (currentPage < pageCount) {
      this.props.getItems(currentPage + 1);
    }
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
          <nav aria-label="Page navigation">
            <ul className='pagination'>
              <li>
                <a aria-label="Previous" onClick={this._onPreviousPage}>
                  <span aria-hidden='true'>«</span>
                  <div className='ripple-container'></div>
                </a>
              </li>

              {this._renderPageNavigation()}

              <li>
                <a aria-label="Next" onClick={this._onNextPage}>
                  <span aria-hidden='true'>»</span>
                  <div className='ripple-container'></div>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }

  _renderPageNavigation = () => {
    let pages = [];
    const currentPage = this.props.page;
    for(var i = 0; i < this.props.pages; i++) {
      let pageNum = i+1;
      let className = (pageNum == currentPage) ? 'active' : '';

      pages.push((<li key={i} className={className}>
        <a
          name={pageNum}
          onClick={this._onPageClick}
        >{pageNum}</a></li>));
    }
    return pages;
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
    const items = this.props.items;
    console.log('items', items);
    let div = null;
    if (items && items.length > 0) {
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

// ListItems.propTypes = {
//   token: PropTypes.string.isRequired
// }

export default ListItems;
