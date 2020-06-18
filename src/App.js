import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import TodoList from './components/todos/TodoList';
import Modal from './components/todos/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      modal: false,
      modalNew: true,
      todo: this.defaultTodo,
    };
  }
  // Blank todo default to prevent errors in rendering modal
  defaultTodo = {
    username: 1,
    task_name: '',
    description: '',
    due_date: null,
    priority: 4,
    cost: null,
    duration: null,
  };

  componentDidMount = async () => {
    this.fetchTodos();
    this.timer = setInterval(() => this.fetchTodos(), 3000);
  };

  fetchTodos = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/');
    this.setState({ todos: res.data });
  };

  deleteTodo = async (id) => {
    // e.preventDefault();
    await axios.delete(`http://127.0.0.1:8000/api/${id}`);
    this.fetchTodos();
  };

  // Open and close modal for create or udpate task
  displayModal = (currentTodo) => {
    // Open and close the task modal; modalType update for create or update
    if (!this.state.modal) {
      this.setState((state) => ({ modal: true }));
      if (currentTodo) {
        this.setState((state) => ({ todo: currentTodo }));
        this.setState((state) => ({ modalNew: false }));
      }
    } else {
      this.setState((state) => ({ modal: false }));
      this.setState((state) => ({ todo: this.defaultTodo }));
      this.setState((state) => ({ modalNew: true }));
    }
  };

  render() {
    return (
      <div className='App'>
        <Modal
          displayModal={this.displayModal}
          todo={this.state.todo}
          modal={this.state.modal}
          modalNew={this.state.modalNew}
          fetchTodos={this.fetchTodos}
        />
        <Navbar
          title='Embiggen'
          icon='fas fa-tree brand'
          displayModal={this.displayModal}
        />
        <header className='App-header'>
          <div className='container'>
            <TodoList
              todos={this.state.todos}
              deleteTodo={this.deleteTodo}
              displayModal={this.displayModal}
            />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
