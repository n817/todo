class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseButton = this._popupElement.querySelector(".popup__close");
  }

  open(){
    this._popupElement.classList.add("popup_visible");
  }

  close(){
    this._popupElement.classList.remove("popup_visible");
  }

  setEventListeners(){
    this._popupCloseButton.addEventListener("click", () => {
      this.close();
    });
  }

}

export default Popup;