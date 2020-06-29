import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TodoContext from '../../context/todos/todoContext';

const Totals = ({ title, icon }) => {
  const todoContext = useContext(TodoContext);
  const {
    handleSort,
    handleFilter,
    displayModal,
    handleUndo,
    loadUser,
    logout,
    auth,
  } = todoContext;

  return (
    <div>

    </div>
  );
};

export default Totals;
