class Todo {
  constructor(data, todoTemplate, handleCheck, handleDelete) {
    this._data = data;
    this._templateElement = todoTemplate;
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._toggleCompletion();
      this._handleCheck(this._data.completed);
    });
    this._todoDeleteBtn.addEventListener("click", () => {
      this._remove();
      this._handleDelete(this._data.completed);
    });
  }

  _toggleCompletion = () => {
    this._data.completed = !this._data.completed;
  }

  _remove = () => {
    this._todoElement.remove();
    this._todoElement = null; // Cleaning up after the DOM element is removed - the browser can free up memory.
  }

  _generateCheckboxEl() {
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`); // Assign "for" attribute for the <label> tag and "id" attribute for the <input> tag (checkbox)
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
  }

  _generateDateEl() {
    this._todoDate = this._todoElement.querySelector(".todo__date");
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      this._todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    todoNameEl.textContent = this._data.name; 
    
    this._generateCheckboxEl();
    this._generateDateEl();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;