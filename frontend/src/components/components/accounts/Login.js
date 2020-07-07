import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import TodoContext from '../../context/todos/todoContext';

const Login = () => {
  const todoContext = useContext(TodoContext);
  const { login, handleLoginChange, loginCredentials, auth } = todoContext;

  // Redirect to main if user is already logged in
  if (auth.isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <div className='account-form'>
      <div>
        <h2>Login</h2>
        <form
          onSubmit={(e) =>
            login(e, loginCredentials.username, loginCredentials.password)
          }
        >
          <div>
            <label>Username</label>
            <input
              id='username'
              type='text'
              className='form-control'
              name='username'
              value={loginCredentials.username ? loginCredentials.username : ''}
              onChange={handleLoginChange}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              id='password'
              type='password'
              className='form-control'
              name='password'
              value={loginCredentials.password ? loginCredentials.password : ''}
              onChange={handleLoginChange}
              required
            />
          </div>
          <div className='form-group'>
            <button
              type='submit'
              className='button btn-account'
            >
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
