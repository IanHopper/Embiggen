import React, { useState, useLayoutEffect, useContext } from 'react';
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import TodoList from './components/todos/TodoList';
import Modal from './components/todos/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoState from './context/todos/TodoState';
import TodoContext from './context/todos/todoContext';
import './App.css';

const App = () => {
  const todoContext = useContext(TodoContext);

  // console.log(todoContext.provider)
  
  const [todos, setTodos] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalNew, setModalNew] = useState(true);
  const [todo, setTodo] = useState({});

  // Blank todo default to prevent errors in rendering modal
  const defaultTodo = {
    username: 1,
    task_name: '',
    description: '',
    due_date: null,
    priority: 4,
    cost: null,
    duration: null,
  };


  useLayoutEffect(() => {
    fetchTodos();
  });

  const fetchTodos = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/');
    setTodos(res.data);
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/${id}`);
  };

  // Open and close modal for create or udpate task
  const displayModal = (currentTodo) => {
    // Open and close the task modal; modalType update for create or update
    if (!modal) {
      setTodo(defaultTodo);
      setModal(true);
      if (currentTodo) {
        setTodo(currentTodo);
        setModalNew(false);
      }
    } else {
      setModal(false);
      setTodo(defaultTodo);
      setModalNew(true);
    }
  };

  return (
    <TodoState>
      <div className='App'>
        <Modal
          displayModal={displayModal}
          todo={todo}
          modal={modal}
          modalNew={modalNew}
        />
        <Navbar
          title='Embiggen'
          icon='fas fa-tree brand'
          displayModal={displayModal}
        />
        <header className='App-header'>
          <div className='container'>
            <TodoList
              todos={todos}
              deleteTodo={deleteTodo}
              displayModal={displayModal}
              fetchTodos={fetchTodos}
            />
          </div>
        </header>
      </div>
    </TodoState>
  );
};

export default App;
