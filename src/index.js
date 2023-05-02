import { enableValidation } from './components/validate.js'
import { closePopup, closePopupFromOverlay } from './components/utils.js'
import { addCard } from './components/card.js'
import { addCardForm,
  editFormElement,
  addCardFormElement,
  openEditForm,
  handleProfileFormSubmit,
  handleAddSubmit,
  imgPopup,
  popupImage,
  popupTitile,
  editButton,
  addButton,
  closeEditForm,
  closeAddForm,
  closeImgPopup
} from './components/modal.js'

// хардкод массив с карточками
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// рендер карточек из массива
initialCards.forEach((card) => {
  addCard(card, "append");
});

editButton.addEventListener("click", openEditForm);
closeEditForm.addEventListener("click", function () {
  closePopup(editFormElement);
});
editFormElement.addEventListener("submit", handleProfileFormSubmit);

// закрытие окна с картинкой
closeImgPopup.addEventListener("click", function () {
  closePopup(imgPopup);
  // очистка попапа после закрытия картинки
  popupImage.src = "";
  popupImage.alt = "";
  popupTitile.textContent = "";
});

addButton.addEventListener("click", addCardForm);
closeAddForm.addEventListener("click", function () {
  closePopup(addCardFormElement);
});
addCardFormElement.addEventListener("submit", handleAddSubmit);

// закрытие мод. окна при клике на Overlay
addCardFormElement.addEventListener("click", function (evt) {
  closePopupFromOverlay(evt, addCardFormElement)
})
editFormElement.addEventListener("click", function (evt) {
  closePopupFromOverlay(evt, editFormElement)
})
imgPopup.addEventListener("click", function (evt) {
  closePopupFromOverlay(evt, imgPopup)
})

// Вызов функции валидации
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__message-error_active'
});


