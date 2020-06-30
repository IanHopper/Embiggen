import React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  // Redirect,
} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import TodoList from './components/todos/TodoList';
import Modal from './components/todos/Modal';
import DeleteModal from './components/todos/DeleteModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoState from './context/todos/TodoState';
import Login from './components/accounts/Login';
import Register from './components/accounts/Register';
import PrivateRoute from './components/common/PrivateRoute';
import './App.css';

const App = () => {
  return (
    <TodoState>
      <Router>
        <div className='App'>
          <Modal />
          <DeleteModal />
          <Navbar title='Embiggen' icon='fas fa-tree brand' />

          <header className='App-header'>
            <div className='container'>
              <Switch>
                <PrivateRoute exact path='/' component={TodoList} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
              </Switch>
            </div>
          </header>
        </div>
        <Footer />
      </Router>
    </TodoState>
  );
};

export default App;
