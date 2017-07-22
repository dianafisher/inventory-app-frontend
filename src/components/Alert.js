import React from 'react';


function Alert (props) {
  return (
      <div className='alert alert-danger alert-dismissible' role='alert'>
        <button
          type='button'
          className='close'
          data-dismiss='alert'
          aria-label='Close'
          onClick={props.onCloseAlert}
        >
          <i className='zmdi zmdi-close'></i>
        </button>
        <strong>
          <i className='zmdi zmdi-close-circle'></i>
          Error!
        </strong>
        <div>{props.msg}</div>
      </div>
  )
}

export default Alert;
