import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import TodoContext from '../../context/todos/todoContext';

const Register = () => {
  const todoContext = useContext(TodoContext);
  const { handleRegister, handleRegisterChange, register } = todoContext;

  return (
    <div className='account-form'>
      <div>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div>
            <label>Username</label>
            <input
              id='username'
              type='text'
              className='form-control'
              name='username'
              onChange={handleRegisterChange}
              value={register.username ? register.username : ''}
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
              value={register.email ? register.email : ''}
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
              value={register.password ? register.password : ''}
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
              value={register.password2 ? register.password2 : ''}
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
