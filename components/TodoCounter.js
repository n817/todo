class TodoCounter {
  constructor(todos, selector) { // todos should be the array of initial todos
    this._element = document.querySelector(selector);
    this._completed = todos.filter((item) => item.completed).length; // .filter returns an array of completed todos
    this._total = todos.length;
    this._updateText();
  }

  updateCompleted = (increment) => {
    this._completed += increment ? 1 : -1;
    this._updateText();
  }

  updateTotal = (increment) => { 
    this._total += increment ? 1 : -1;
    this._updateText();
  }

  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }

}

export default TodoCounter;