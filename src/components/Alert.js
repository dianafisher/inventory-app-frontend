import React from 'react';


function Alert (props) {
  console.log(props);
  const type = props.type;
  let className, text, iconClassName;
  if (type === 'success') {
    className = 'alert alert-success alert dimissible';    
    iconClassName = 'zmdi zmdi-check';
  } else if (type === 'error') {
    className = 'alert alert-danger alert dimissible';
    iconClassName = 'zmdi zmdi-close-circle';
  }
  return (
      <div className={className} role='alert'>
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
          <i className={iconClassName}></i>
          {/* {text} */}
        </strong>
        {`  ${props.msg}`}
      </div>
  )
}

export default Alert;
