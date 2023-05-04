import { openPopup, closePopup } from './utils.js'
import { addCard } from './card.js'

const main = document.querySelector(".main");
const editButton = main.querySelector(".profile__edit-button");
const addButton = main.querySelector(".profile__add-button");
const editPopupElement = document.querySelector("#editForm");
const addCardPopupElement = document.querySelector("#addCardForm");
// для ф. handleAddSubmit()
const nameInputAddCardForm = addCardPopupElement.querySelector(
  ".popup__field[name='nameInput']"
);
const urlInputAddCardForm = addCardPopupElement.querySelector(
  ".popup__field[name='urlInput']"
);
const btnSubmitAddCardForm = addCardPopupElement.querySelector(
  ".popup__submit-button"
);
// для ф. handleImgOpen()
const imgPopup = document.querySelector("#img-popup");
const popupImage = imgPopup.querySelector(".popup__image");
const popupTitile = imgPopup.querySelector(".popup__image-name");
// для ф. openEditForm(), handleProfileFormSubmit()
const titleEditForm = main.querySelector(".profile__title");
const subtitleEditForm = main.querySelector(".profile__subtitle");
const nameInputEditForm = editPopupElement.querySelector(
  ".popup__field[name='nameInput']"
);
const jobeInputEditForm = editPopupElement.querySelector(
  ".popup__field[name='jobeInput']"
);
const btnCloseEditPopup = editPopupElement.querySelector(".popup__close-button");
const btnCloseAddPopup = addCardPopupElement.querySelector(".popup__close-button");
const btnCloseImgPopup = imgPopup.querySelector(".popup__close-button");

// откр.формы профиля и подстановка значений в поля формы
function openEditForm() {
  nameInputEditForm.value = titleEditForm.textContent;
  jobeInputEditForm.value = subtitleEditForm.textContent;

  openPopup(editPopupElement);
}

// сохр. значений полей формы в блок профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  titleEditForm.textContent = nameInputEditForm.value;
  subtitleEditForm.textContent = jobeInputEditForm.value;

  closePopup(editPopupElement);
}

// откр. попапа с картинкой
function handleImgOpen(imgCard, titleCardImg) {
  // очистка попапа после закрытия картинки
  popupImage.src = "";
  popupImage.alt = "";
  popupTitile.textContent = "";

  popupImage.src = imgCard.src;
  popupImage.alt = imgCard.alt;
  popupTitile.textContent = titleCardImg.textContent;

  openPopup(imgPopup);
}

// Форма добавления карточки
function openAddCardPopup() {

  openPopup(addCardPopupElement);
}

// создание карточки с картинкой и закрытие окна
function handleAddSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: nameInputAddCardForm.value,
    link: urlInputAddCardForm.value,
  };
  addCard(newCard, "prepend");

  closePopup(addCardPopupElement);
  nameInputAddCardForm.value = "";
  urlInputAddCardForm.value = "";
  btnSubmitAddCardForm.disabled = true;
  btnSubmitAddCardForm.classList.add('popup__submit-button_inactive');
}

export { openAddCardPopup,
  editPopupElement,
  addCardPopupElement,
  openEditForm,
  handleProfileFormSubmit,
  handleAddSubmit,
  handleImgOpen,
  imgPopup,
  popupImage,
  popupTitile,
  editButton,
  addButton,
  btnCloseEditPopup,
  btnCloseAddPopup,
  btnCloseImgPopup
}
