import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import TodoList from './components/todos/TodoList';
// import TodoForm from './components/todos/TodoForm';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
    };
  }

  async componentDidMount() {
    this.fetchTodos();
    this.timer = setInterval(() => this.fetchTodos(), 3000);
  }

  async fetchTodos() {
    const res = await axios.get('http://127.0.0.1:8000/api/');
    this.setState({ todos: res.data });
  }

  async deleteTodo(id, e) {
    e.preventDefault();
    await axios.delete(`http://127.0.0.1:8000/api/${id}`);
  }

  render() {
    return (
      <div className='App'>
        <Navbar title='Embiggen' icon='fas fa-tree brand' />
        <header className='App-header'>
          <div className='container'>
            <TodoList todos={this.state.todos} deleteTodo={this.deleteTodo} />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
