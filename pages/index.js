import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

import Section from "../components/Section.js";
import TodoCounter from "../components/TodoCounter.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupSelector = "#add-todo-popup";
const addTodoPopupElement = document.querySelector(addTodoPopupSelector);
const addTodoForm = addTodoPopupElement.querySelector(".popup__form");
const todoTemplate = document.querySelector("#todo-template");
const todosListSelector = ".todos__list";

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
} 

function handleDelete(completed) {
  todoCounter.updateTotal(false); // decrement total count when deleting
  if (completed) {
    todoCounter.updateCompleted(false); // and decrement completed count only if todo was completed
  }
}

const generateTodo = (data) => {
  const todo = new Todo(data, todoTemplate, handleCheck, handleDelete);
  const todoElement = todo.getView();
  return todoElement;
}

const handleFormSubmit = (inputValues) => {
  const id = uuidv4();
  const name = inputValues.name;
  const date = new Date(inputValues.date);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  const values = { id, name, date };
  const todo = generateTodo(values);
  section.addItem(todo);
  todoCounter.updateTotal(true); // increment completed counter
  addTodoPopup.close();
}

const section = new Section({ 
  items: initialTodos, 
  renderer: (item) => {
    const todo = generateTodo(item);
    section.addItem(todo);
  }, 
  containerSelector: todosListSelector,
});

section.renderItems();

const addTodoPopup = new PopupWithForm({ 
  popupSelector: addTodoPopupSelector,
  handleFormSubmit,
 });

 addTodoPopup.setEventListeners();


addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const addTodoFormValidator = new FormValidator(validationConfig, addTodoForm);
addTodoFormValidator.enableValidation();