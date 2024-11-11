'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.querySelector('form');
  const todoInput = document.getElementById('todo-input');
  const todoListUl = document.getElementById('todo-list');

  let allTodos = getTodos();
  displayTodoListUL(allTodos);
  todoForm.addEventListener('submit', function (e) {
    e.preventDefault();
    addTodo();
  });

  function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText.length > 0) {
      allTodos.push({ text: todoText, isChecked: false });
      todoInput.value = '';
    }
    saveTodos();
    displayTodoListUL(allTodos);
  }

  function displayTodoListUL(allTodos) {
    todoListUl.innerHTML = '';
    allTodos.forEach((todo, id) => {
      const isChecked = todo.isChecked ? 'checked' : '';
      const html = `<li class="todo" data-id="${id}">
                <input type="checkbox" id="todo-${id + 1}" ${isChecked} />
                <label for="todo-${id + 1}" class="custom-checkbox">
                  <i class="fa-solid fa-check"></i>
                </label>
                <label for="todo-${id + 1}" class="todo-text">${
        todo.text
      }</label>
                <label class="delete-button">
                  <i class="fa-regular fa-trash-can"></i>
                </label>
              </li>`;
      todoListUl.insertAdjacentHTML('afterbegin', html);

      const checkbox = document.getElementById(`todo-${id + 1}`);
      checkbox.addEventListener('change', () => {
        allTodos[id].isChecked = checkbox.checked;
        saveTodos();
      });
    });
  }

  todoListUl.addEventListener('click', (e) => {
    if (e.target.closest('.delete-button')) {
      const todoItem = e.target.closest('li');
      const todoIndex = parseInt(todoItem.getAttribute('data-id'));
      deleteTodoItem(todoIndex);
    }
  });

  function deleteTodoItem(todoIndex) {
    allTodos.splice(todoIndex, 1);
    saveTodos();
    displayTodoListUL(allTodos);
  }

  function saveTodos() {
    const todoJson = JSON.stringify(allTodos);
    localStorage.setItem('todos', todoJson);
  }
  function getTodos() {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
  }
});
