'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.querySelector('form');
  const todoInput = document.getElementById('todo-input');
  const todoListUl = document.getElementById('todo-list');
  const deleteButton = document.querySelector('.delete-button');

  let allTodos = getTodos();
  displayTodoListUL(allTodos);
  todoForm.addEventListener('submit', function (e) {
    e.preventDefault();
    addTodo();
  });
  function addTodo() {
    const todoText = todoInput.value.trim();

    if (todoText.length > 0) {
      allTodos.push(todoText);
      todoInput.value = '';
    }
    saveTodos();
    displayTodoListUL(allTodos);
  }
  function displayTodoListUL(allTodos) {
    todoListUl.innerHTML = '';
    allTodos.forEach(function (value, id) {
      const html = `<li class="todo">
            <input type="checkbox" id="todo-${id + 1}" />
            <label for="todo-${id + 1}" class="custom-checkbox"
              ><i class="fa-solid fa-check"></i
            ></label>
            <label for="todo-${id + 1}" class="todo-text">${value}</label>
            <label class="delete-button"
              ><i class="fa-regular fa-trash-can"></i
            ></label>
          </li>`;
      todoListUl.insertAdjacentHTML('afterbegin', html);
    });
  }
  deleteButton.addEventListener('click', () => {
    deleteTodoItem(todoIndex);
  });

  function deleteTodoItem(todoIndex) {}
  allTodos = allTodos.filter((_, i) => i !== todoIndex);
  saveTodos();
  displayTodoListUL(allTodos);
  function saveTodos() {
    const todoJson = JSON.stringify(allTodos);
    localStorage.setItem('todos', todoJson);
  }
  function getTodos() {
    const todos = localStorage.getItem('todos') || [];
    return JSON.parse(todos);
  }
});
