function openPopup(el) {
  el.classList.add("popup_opened");
  // закрытие мод. окна по клавише Esc
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      closePopup(el)
    }
  });
}

function closePopup(el) {
  el.classList.remove("popup_opened");
}

function closePopupFromOverlay(evt, form) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(form)
  }
}

export { openPopup, closePopup, closePopupFromOverlay };
