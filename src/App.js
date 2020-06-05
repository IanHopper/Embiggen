import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import TodoList from './components/todos/TodoList';
import AddTodo from './components/todos/AddTodo';

import './App.css';

class App extends Component {
  state = {
    todos: [],
    loading: false,
  };

  async componentDidMount() {
    this.fetchTodos();
    this.timer = setInterval(() => this.fetchTodos(), 3000);
  }

  async fetchTodos() {
    const res = await axios.get('http://127.0.0.1:8000/api/');
    this.setState({ todos: res.data });
  }
  render() {
    return (
      <div className='App'>
        <Navbar title='Embiggen' icon='fas fa-tree brand' />
        <header className='App-header'>
        <div className='container'>
          <AddTodo fetchTodos={this.fetchTodos} />
          <TodoList todos={this.state.todos} />
        </div>
        </header>
      </div>
    );
  }
}

export default App;
