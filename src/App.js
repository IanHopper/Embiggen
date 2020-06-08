import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import TodoList from './components/todos/TodoList';
import TodoForm from './components/todos/TodoForm';
import TodoFormTest from './components/todos/TodoFormTest';

import './App.css';

class App extends Component {
  state = {
    todos: [],
    loading: false,
    todoFormVisible: false,
  };

  toggleTodoForm = () => {
    this.setState({
      todoFormVisible: !this.state.todoFormVisible,
    });
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
        <Navbar
          title='Embiggen'
          icon='fas fa-tree brand'
          toggleTodoForm={this.toggleTodoForm}
        />
        <header className='App-header'>
          <div className='container'>
            <TodoList todos={this.state.todos} />
          </div>
          <div>
            {this.state.todoFormVisible ? (
              <TodoFormTest toggle={this.toggleTodoForm} />
            ) : null}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
