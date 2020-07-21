import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import TodoContext from '../../context/todos/todoContext';

const Login = () => {
  const todoContext = useContext(TodoContext);
  const { login, handleLoginChange, loginCredentials, auth } = todoContext;
  
  // Redirect to main if user is already logged in
  if(auth.isAuthenticated){
    return <Redirect to="/" />
  }

  // Displays alert next to fields that are blank
  const emptyFieldWarning = ()=> {
    const inputs = document.querySelectorAll('input')
    inputs.forEach((input)=>{
      if (!input.value){
        input.previousElementSibling.firstElementChild.classList = 'form-warning'
      } else {
        input.previousElementSibling.firstElementChild.classList = 'form-warning invisible'
      }
    })
  }

  return (
    <div className='account-form'>
      <div>
        <h2>Login</h2>
        <form onSubmit={(e)=>login(e, loginCredentials.username, loginCredentials.password)} noValidate>
          <div>
            <label>Username <span className='form-warning invisible'> &nbsp; Required Field</span></label>
            <input
              id='username'
              type='text'
              className='form-control'
              name='username'
              value ={loginCredentials.username ? loginCredentials.username : ''}
              onChange={handleLoginChange}
              required
            />
            <span className='form-warning'>{loginCredentials.username && loginCredentials.username.length > 0 && loginCredentials.username.length < 6 ? 'Username must be at least 6 characters': <br></br>}</span>
          </div>
          <div>
            <label>Password<span className='form-warning invisible'>&nbsp; Required Field</span></label>
            <input
              id='password'
              type='password'
              className='form-control'
              name='password'
              value ={loginCredentials.password ? loginCredentials.password : ''}
              onChange={handleLoginChange}
              required
            />
           <span className='form-warning'>{loginCredentials.password && loginCredentials.password.length > 0 && loginCredentials.password.length < 6 ? 'Password must be at lest 6 characters': <br></br>}</span>
          </div>
          <div className='form-group'>
            <button type='submit' className='button btn-account' onClick={()=> emptyFieldWarning()}>
              Login
            </button>
          </div>
          <p>
            Don't have an account? <Link to='/register'>Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
