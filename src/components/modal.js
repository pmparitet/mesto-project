// закрытие мод. окна по клавише Esc
function closePopupFromKey(evt) {
  if (evt.key === 'Escape') {
    const el = document.querySelector('.popup_opened')
    closePopup(el)
  }
}

function openPopup(el) {
  el.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupFromKey);
}

function closePopup(el) {
  el.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupFromKey)
}

function closePopupFromOverlay(evt, form) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(form)
  }
}


export {
  openPopup,
  closePopup,
  closePopupFromOverlay
}
