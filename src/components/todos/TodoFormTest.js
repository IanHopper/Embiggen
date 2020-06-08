import React from 'react';

const TodoFormTest = () => {
  const message = 'Happy Days are Here Again'
  const onSubmit =()=> {
    console.log('Hi, there')
  }

  return <div id='add-log-modal' className='modal' style={modalStyle}>
  <div class="modal-content">
    <h4>Enter System Log</h4>
    <div className="row">
      <div className="input-field">
        <input type="text" name="message" value={message}/>
        <label htmlFor="message">Log Message</label>
      </div>
      <div className="modal-footer">
        <a href="#!" onClick={onSubmit} className="modal-close">Enter</a>
      </div>
    </div>
  </div>
  </div>;
};

const modalStyle = {
  width: '75%',
  height: '75%',
};
export default TodoFormTest;
