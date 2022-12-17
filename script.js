// п.1 Работа модальных окон
const main = document.querySelector(".main");
// const popupForm = document.querySelectorAll(".popup");
const editFormElement = document.querySelector("#editForm");
const addCardFormElement = document.querySelector("#addCardForm");

const editButton = main.querySelector(".profile__edit-button");
const addButton = main.querySelector(".profile__add-button");

const closeEditForm = editFormElement.querySelector(".popup__close-button");
const closeAddForm = addCardFormElement.querySelector(".popup__close-button");

function openPopup(el) {
  el.classList.add("popup_opened");
}
function closePopup(el) {
  el.classList.remove("popup_opened");
}

function editForm() {
  const title = main.querySelector(".profile__title");
  const subtitle = main.querySelector(".profile__subtitle");
  const nameInput = editFormElement.querySelector(
    ".popup__field[name='nameInput']"
  );
  const jobeInput = editFormElement.querySelector(
    ".popup__field[name='jobeInput']"
  );

  nameInput.value = title.textContent;
  jobeInput.value = subtitle.textContent;

  openPopup(editFormElement);
}

function editSubmitHandler(evt) {
  evt.preventDefault();

  const title = main.querySelector(".profile__title");
  const subtitle = main.querySelector(".profile__subtitle");
  const nameInput = editFormElement.querySelector(
    ".popup__field[name='nameInput']"
  );
  const jobeInput = editFormElement.querySelector(
    ".popup__field[name='jobeInput']"
  );

  title.textContent = nameInput.value;
  subtitle.textContent = jobeInput.value;

  closePopup(editFormElement);
}

editButton.addEventListener("click", editForm);
closeEditForm.addEventListener("click", function () {
  closePopup(editFormElement);
});
editFormElement.addEventListener("submit", editSubmitHandler);

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

function addCard(card, addMethod) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);

  cardElement
    .querySelector(".element__mask-group")
    .setAttribute("src", card.link);
  cardElement
    .querySelector(".element__mask-group")
    .setAttribute("alt", card.name);
  cardElement.querySelector(".element__title").textContent = card.name;

  const likeCard = cardElement.querySelector(".element__like-btn");
  likeCard.addEventListener("click", function (evt) {
    evt.target.classList.toggle("element__like-btn_active");
  });
  const deleteCardBtn = cardElement.querySelector(".element__delete-btn");
  deleteCardBtn.addEventListener("click", function () {
    const deleteItem = deleteCardBtn.closest(".element");
    deleteItem.remove();
  });

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

function addSubmitHandler(evt) {
  evt.preventDefault();

  const nameInput = addCardFormElement.querySelector(
    ".popup__field[name='nameInput']"
  );
  const urlInput = addCardFormElement.querySelector(
    ".popup__field[name='urlInput']"
  );

  const newCard = { name: nameInput.value, link: urlInput.value };
  initialCards.unshift(newCard);
  addCard(newCard, "prepend");

  closePopup(addCardFormElement);
}

addButton.addEventListener("click", addCardForm);
closeAddForm.addEventListener("click", function () {
  closePopup(addCardFormElement);
});
addCardFormElement.addEventListener("submit", addSubmitHandler);
