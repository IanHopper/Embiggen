import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import TodoContext from '../../context/todos/todoContext';

const Register = () => {
  const todoContext = useContext(TodoContext);
  const { register, handleRegisterChange, registration, auth } = todoContext;

  if(auth.isAuthenticated){
    return <Redirect to="/" />
  }

  return (
    <div className='account-form'>
      <div>
        <h2>Register</h2>
        <form onSubmit={(e,registration) => register(e)}>
          <div>
            <label>Username</label>
            <input
              id='username'
              type='text'
              className='form-control'
              name='username'
              onChange={handleRegisterChange}
              value={registration.username ? registration.username : ''}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              id="email"
              type='email'
              className='form-control'
              name='email'
              onChange={handleRegisterChange}
              value={registration.email ? registration.email : ''}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              id="password"
              type='password'
              className='form-control'
              name='password'
              onChange={handleRegisterChange}
              value={registration.password ? registration.password : ''}
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              id="password2"
              type='password'
              className='form-control'
              name='password2'
              onChange={handleRegisterChange}
              value={registration.password2 ? registration.password2 : ''}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='button btn-account'>
              Register
            </button>
          </div>
          <p>
            Already have an account? <Link to='/register'>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
