// п.1 Работа модальных окон
const main = document.querySelector(".main");
const editFormElement = document.querySelector("#editForm");
const addCardFormElement = document.querySelector("#addCardForm");
const nameInputAddCardForm = addCardFormElement.querySelector(
  ".popup__field[name='nameInput']"
);
const urlInputAddCardForm = addCardFormElement.querySelector(
  ".popup__field[name='urlInput']"
);

const editButton = main.querySelector(".profile__edit-button");
const addButton = main.querySelector(".profile__add-button");

const closeEditForm = editFormElement.querySelector(".popup__close-button");
const closeAddForm = addCardFormElement.querySelector(".popup__close-button");

// для ф. openEditForm(), handleProfileFormSubmit()
const titleEditForm = main.querySelector(".profile__title");
const subtitleEditForm = main.querySelector(".profile__subtitle");
const nameInputEditForm = editFormElement.querySelector(
  ".popup__field[name='nameInput']"
);
const jobeInputEditForm = editFormElement.querySelector(
  ".popup__field[name='jobeInput']"
);

// для ф. handleImgOpen()
const imgPopup = document.querySelector("#img-popup");
const closeImgPopup = imgPopup.querySelector(".popup__close-button");
const popupImage = imgPopup.querySelector(".popup__image");
const popupTitile = imgPopup.querySelector(".popup__image-name");

// для ф. createCard()
const cardTemplate = document.querySelector("#card-template").content;

function openPopup(el) {
  el.classList.add("popup_opened");
}
function closePopup(el) {
  el.classList.remove("popup_opened");
}

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

editButton.addEventListener("click", openEditForm);
closeEditForm.addEventListener("click", function () {
  closePopup(editFormElement);
});
editFormElement.addEventListener("submit", handleProfileFormSubmit);

// откр. попапа с картинкой
function handleImgOpen(card) {
  const imgCard = card.querySelector(".element__mask-group");
  const titleCardImg = card.querySelector(".element__title");

  popupImage.src = imgCard.src;
  popupImage.alt = imgCard.alt;
  popupTitile.textContent = titleCardImg.textContent;

  openPopup(imgPopup);
}

closeImgPopup.addEventListener("click", function () {
  closePopup(imgPopup);
  // очистка попапа после закрытия картинки
  popupImage.src = "";
  popupImage.alt = "";
  popupTitile.textContent = "";
});

// п.2 Шесть карточек «из коробки» + п.5 Лайк карточки + п.6 Удаление карточки
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

const elements = document.querySelector(".elements");

// создание карточки
function createCard(card) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const imgCardElement = cardElement.querySelector(".element__mask-group");
  const titleCardElement = cardElement.querySelector(".element__title");
  const likeCard = cardElement.querySelector(".element__like-btn");
  const deleteCardBtn = cardElement.querySelector(".element__delete-btn");

  imgCardElement.setAttribute("src", card.link);
  imgCardElement.setAttribute("alt", card.name);
  titleCardElement.textContent = card.name;

  likeCard.addEventListener("click", function (evt) {
    evt.target.classList.toggle("element__like-btn_active");
  });

  deleteCardBtn.addEventListener("click", function () {
    cardElement.remove();
  });

  imgCardElement.addEventListener("click", function () {
    handleImgOpen(cardElement);
  });

  return cardElement;
}

// доб. карточки на страницу
function addCard(card, addMethod) {
  const cardElement = createCard(card);

  switch (addMethod) {
    case "append":
      elements.append(cardElement);
      break;
    case "prepend":
      elements.prepend(cardElement);
      break;
  }
}

initialCards.forEach((card) => {
  addCard(card, "append");
});

// п.3 Форма добавления карточки + п.4 Добавление карточки
function addCardForm() {
  openPopup(addCardFormElement);
}

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

addButton.addEventListener("click", addCardForm);
closeAddForm.addEventListener("click", function () {
  closePopup(addCardFormElement);
});
addCardFormElement.addEventListener("submit", handleAddSubmit);
