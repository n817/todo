import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

const todosList = document.querySelector(".todos__list");

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;
}

initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
});