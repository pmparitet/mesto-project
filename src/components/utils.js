// для ф. createCard()
const cardTemplate = document.querySelector("#card-template").content;
// секция для вставки карточек
const elements = document.querySelector(".elements");


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

// для ф. openEditForm(), handleProfileFormSubmit()
const titleEditForm = main.querySelector(".profile__title");
const subtitleEditForm = main.querySelector(".profile__subtitle");
const nameInputEditForm = editPopupElement.querySelector(
  ".popup__field[name='nameInput']"
);
const jobeInputEditForm = editPopupElement.querySelector(
  ".popup__field[name='jobeInput']"
);

// для ф. handleImgOpen()
const imgPopup = document.querySelector("#img-popup");
const popupImage = imgPopup.querySelector(".popup__image");
const popupTitile = imgPopup.querySelector(".popup__image-name");

// для Аватара
const profileOverlay = main.querySelector(".profile__overlay");
const profileAvatar = profileOverlay.querySelector(".profile__avatar");
const editAvatarPopupElement = document.querySelector("#editAvatar");
const avatarUrlInput = editAvatarPopupElement.querySelector(
  ".popup__field[name='avatarUrlInput']"
);
const btnCloseEditAvatarPopup = editAvatarPopupElement.querySelector(".popup__close-button");
const btnSubmitAvatarPopup = editAvatarPopupElement.querySelector(".popup__submit-button");

const btnSubmitEditForm = editPopupElement.querySelector(".popup__submit-button");
const btnCloseEditPopup = editPopupElement.querySelector(".popup__close-button");
const btnCloseAddPopup = addCardPopupElement.querySelector(".popup__close-button");
const btnCloseImgPopup = imgPopup.querySelector(".popup__close-button");


export {
  cardTemplate,
  elements,
  editButton,
  addButton,
  editPopupElement,
  addCardPopupElement,
  nameInputAddCardForm,
  urlInputAddCardForm,
  btnSubmitAddCardForm,
  titleEditForm,
  subtitleEditForm,
  nameInputEditForm,
  jobeInputEditForm,
  imgPopup,
  popupImage,
  popupTitile,
  profileOverlay,
  profileAvatar,
  editAvatarPopupElement,
  avatarUrlInput,
  btnCloseEditAvatarPopup,
  btnSubmitAvatarPopup,
  btnSubmitEditForm,
  btnCloseEditPopup,
  btnCloseAddPopup,
  btnCloseImgPopup
 };
