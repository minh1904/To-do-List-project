'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.querySelector('form');
  const todoInput = document.getElementById('todo-input');
  const todoListUl = document.getElementById('todo-list');

  let allTodos = [];
  todoForm.addEventListener('submit', function (e) {
    e.preventDefault();
    addTodo();
  });

  const addTodo = function () {
    const todoText = todoInput.value.trim();

    if (todoText.length > 0) {
      allTodos.push(todoText);
      todoInput.value = '';
    }
  };
});
