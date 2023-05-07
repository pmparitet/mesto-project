import { openPopup, closePopup } from './utils.js'
import { addCard } from './card.js'
import { changeButtonClass } from './validate.js'
import { editAvatar, editProfil, saveCard } from './api.js';

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
const btnSubmitEditForm = editPopupElement.querySelector(".popup__submit-button");
const btnCloseEditPopup = editPopupElement.querySelector(".popup__close-button");
const btnCloseAddPopup = addCardPopupElement.querySelector(".popup__close-button");
const btnCloseImgPopup = imgPopup.querySelector(".popup__close-button");
// для Аватара
const profileOverlay = main.querySelector(".profile__overlay");
const profileAvatar = profileOverlay.querySelector(".profile__avatar");
const editAvatarPopupElement = document.querySelector("#editAvatar");
const avatarUrlInput = editAvatarPopupElement.querySelector(
  ".popup__field[name='avatarUrlInput']"
);
const btnCloseEditAvatarPopup = editAvatarPopupElement.querySelector(".popup__close-button");
const btnSubmitAvatarPopup = editAvatarPopupElement.querySelector(".popup__submit-button");

// откр.формы изм. аватара и подстановка значения в поле формы
function openEditAvatarPopup() {
  avatarUrlInput.value = profileAvatar.src;
  openPopup(editAvatarPopupElement);
}

// сохр. Аватара
function handleAvatarSubmit(evt) {
  evt.preventDefault();

  btnSubmitAvatarPopup.textContent = 'Сохранение...'

  // изм. аватара
  editAvatar({
    avatar: avatarUrlInput.value
  })
    .then((res) => {
      profileAvatar.src = res.avatar;

      closePopup(editAvatarPopupElement);

      btnSubmitAvatarPopup.textContent = 'Сохранить'
    })
    .catch((err) => {
      console.log(err)
      btnSubmitAvatarPopup.textContent = 'Сохранить'
    })
}

// откр.формы профиля и подстановка значений в поля формы
function openEditForm() {
  nameInputEditForm.value = titleEditForm.textContent;
  jobeInputEditForm.value = subtitleEditForm.textContent;

  openPopup(editPopupElement);
}

// сохр. значений полей формы в блок профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  btnSubmitEditForm.textContent = 'Сохранение...'

  // редактирование профиля
  editProfil({
    name: nameInputEditForm.value,
    about: jobeInputEditForm.value
  })
    .then((res) => {
      titleEditForm.textContent = res.name;
      subtitleEditForm.textContent = res.about;

      closePopup(editPopupElement);
      btnSubmitEditForm.textContent = 'Сохранить'
    })
    .catch((err) => {
      console.log(err)
      btnSubmitEditForm.textContent = 'Сохранить'
    })
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

  btnSubmitAddCardForm.textContent = 'Сохранение...'

  const newCard = {
    name: nameInputAddCardForm.value,
    link: urlInputAddCardForm.value,
  };

  // сохранение карточки на сервере
  saveCard(newCard)
    .then((res) => {
      addCard(res, "prepend");

      closePopup(addCardPopupElement);
      nameInputAddCardForm.value = "";
      urlInputAddCardForm.value = "";

      changeButtonClass('add', true, btnSubmitAddCardForm, 'popup__submit-button_inactive')

      btnSubmitAddCardForm.textContent = 'Создать'
    })
    .catch((err) => {
      console.log(err)
      btnSubmitAddCardForm.textContent = 'Создать'
    })
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
  btnCloseImgPopup,
  titleEditForm,
  subtitleEditForm,
  editAvatarPopupElement,
  profileOverlay,
  profileAvatar,
  openEditAvatarPopup,
  btnCloseEditAvatarPopup,
  handleAvatarSubmit
}
