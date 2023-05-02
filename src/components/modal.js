import { openPopup, closePopup } from './utils.js'
import { addCard } from './card.js'

const main = document.querySelector(".main");
const editButton = main.querySelector(".profile__edit-button");
const addButton = main.querySelector(".profile__add-button");
const editFormElement = document.querySelector("#editForm");
const addCardFormElement = document.querySelector("#addCardForm");
// для ф. handleAddSubmit()
const nameInputAddCardForm = addCardFormElement.querySelector(
  ".popup__field[name='nameInput']"
);
const urlInputAddCardForm = addCardFormElement.querySelector(
  ".popup__field[name='urlInput']"
);
// для ф. handleImgOpen()
const imgPopup = document.querySelector("#img-popup");
const popupImage = imgPopup.querySelector(".popup__image");
const popupTitile = imgPopup.querySelector(".popup__image-name");
// для ф. openEditForm(), handleProfileFormSubmit()
const titleEditForm = main.querySelector(".profile__title");
const subtitleEditForm = main.querySelector(".profile__subtitle");
const nameInputEditForm = editFormElement.querySelector(
  ".popup__field[name='nameInput']"
);
const jobeInputEditForm = editFormElement.querySelector(
  ".popup__field[name='jobeInput']"
);
const closeEditForm = editFormElement.querySelector(".popup__close-button");
const closeAddForm = addCardFormElement.querySelector(".popup__close-button");
const closeImgPopup = imgPopup.querySelector(".popup__close-button");

// откр.формы профиля и подстановка значений в поля формы
function openEditForm() {
  nameInputEditForm.value = titleEditForm.textContent;
  jobeInputEditForm.value = subtitleEditForm.textContent;

  openPopup(editFormElement);
}

// сохр. значений полей формы в блок профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  titleEditForm.textContent = nameInputEditForm.value;
  subtitleEditForm.textContent = jobeInputEditForm.value;

  closePopup(editFormElement);
}

// откр. попапа с картинкой
function handleImgOpen(card) {
  const imgCard = card.querySelector(".element__mask-group");
  const titleCardImg = card.querySelector(".element__title");

  popupImage.src = imgCard.src;
  popupImage.alt = imgCard.alt;
  popupTitile.textContent = titleCardImg.textContent;

  openPopup(imgPopup);
}

// Форма добавления карточки
function addCardForm() {
  openPopup(addCardFormElement);
}

// создание карточки с картинкой и закрытие окна
function handleAddSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: nameInputAddCardForm.value,
    link: urlInputAddCardForm.value,
  };
  addCard(newCard, "prepend");

  closePopup(addCardFormElement);
  nameInputAddCardForm.value = "";
  urlInputAddCardForm.value = "";
}

export { addCardForm,
  editFormElement,
  addCardFormElement,
  openEditForm,
  handleProfileFormSubmit,
  handleAddSubmit,
  handleImgOpen,
  imgPopup,
  popupImage,
  popupTitile,
  editButton,
  addButton,
  closeEditForm,
  closeAddForm,
  closeImgPopup
}
