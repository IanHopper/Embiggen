import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import TodoContext from '../../context/todos/todoContext';

const Register = () => {
  const todoContext = useContext(TodoContext);
  const {
    register,
    handleRegisterChange,
    registration,
    auth,
    validateEmail,
  } = todoContext;

  // Redirect to main if user is already logged in
  if (auth.isAuthenticated) {
    return <Redirect to='/' />;
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
        <h2>Register</h2>
        <form onSubmit={(e) => register(e)} noValidate>
          <div>
            <label>Username <span className='form-warning invisible'> &nbsp; Required Field</span></label>
            <input
              id='username'
              type='text'
              className='form-control'
              name='username'
              onChange={handleRegisterChange}
              value={registration.username ? registration.username : ''}
              required
              autoFocus
            />
            <span className='form-warning'>
              {registration.username &&
              registration.username.length > 0 &&
              registration.username.length < 6 ? (
                'Username must be at least 6 characters'
              ) : (
                <br></br>
              )}
            </span>
          </div>
          <div>
            <label>Email <span className='form-warning invisible'> &nbsp; Required Field</span></label>
            <input
              id='email'
              type='email'
              className='form-control'
              name='email'
              onChange={handleRegisterChange}
              value={registration.email ? registration.email : ''}
              required
            />
            <span className='form-warning'>
              {registration.email && !validateEmail(registration.email) ? (
                'Enter a valid email address'
              ) : (
                <br></br>
              )}
            </span>
          </div>
          <div>
            <label>Password <span className='form-warning invisible'> &nbsp; Required Field</span></label>
            <input
              id='password'
              type='password'
              className='form-control'
              name='password'
              onChange={handleRegisterChange}
              value={registration.password ? registration.password : ''}
              required
            />
            <span className='form-warning'>
              {registration.password &&
              registration.password.length > 0 &&
              registration.password.length < 6 ? (
                'Password must be at lest 6 characters'
              ) : (
                <br></br>
              )}
            </span>
          </div>
          <div>
            <label>Confirm Password <span className='form-warning invisible'> &nbsp; Required Field</span></label>
            <input
              id='password2'
              type='password'
              className='form-control'
              name='password2'
              onChange={handleRegisterChange}
              value={registration.password2 ? registration.password2 : ''}
              required
            />
            <span className='form-warning'>
              {registration.password &&
              registration.password2 &&
              registration.password !== registration.password2 ? (
                'Passwords do not match'
              ) : (
                <br></br>
              )}
            </span>
          </div>
          <div className='form-group'>
            <button type='submit' className='button btn-account' onClick={()=>{emptyFieldWarning()}}>
              Register
            </button>
          </div>
          <p>
            Already have an account? <Link to='/login'>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
