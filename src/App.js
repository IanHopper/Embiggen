import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import TodoList from './components/todos/TodoList';
import Modal from './components/todos/Modal';
import DeleteModal from './components/todos/DeleteModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoState from './context/todos/TodoState';
import './App.css';

const App = () => {
  return (
    <TodoState>
      <div className='App'>
        <Modal
        />
        <DeleteModal />
        <Navbar
          title='Embiggen'
          icon='fas fa-tree brand'
        />
        <header className='App-header'>
          <div className='container'>
            <TodoList/>
          </div>
        </header>
      </div>
      <Footer />
    </TodoState>
  );
};

export default App;
