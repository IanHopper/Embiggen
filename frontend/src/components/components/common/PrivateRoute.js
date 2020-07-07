import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import TodoContext from '../../context/todos/todoContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const todoContext = useContext(TodoContext);
  const { auth } = todoContext;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isLoading) {
          return <h2 className="loading">Loading...</h2>;
        } else if (!auth.isAuthenticated) {
          return <Redirect to='/login' />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};


export default PrivateRoute;
