// п.1 Работа модальных окон
let main = document.querySelector(".main");
let formElement = document.querySelector(".popup");
let editButton = main.querySelector(".profile__edit-button");
let closeButton = formElement.querySelector(".popup__close-button");

function openPopup() {
  let title = main.querySelector(".profile__title");
  let subtitle = main.querySelector(".profile__subtitle");
  let nameInput = formElement.querySelector(".popup__field[name='nameInput']");
  let jobeInput = formElement.querySelector(".popup__field[name='jobeInput']");

  nameInput.value = title.textContent;
  jobeInput.value = subtitle.textContent;
  formElement.classList.add("popup_opened");
}

function closePopup() {
  formElement.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  let title = main.querySelector(".profile__title");
  let subtitle = main.querySelector(".profile__subtitle");
  let nameInput = formElement.querySelector(".popup__field[name='nameInput']");
  let jobeInput = formElement.querySelector(".popup__field[name='jobeInput']");

  title.textContent = nameInput.value;
  subtitle.textContent = jobeInput.value;

  closePopup();
}

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
formElement.addEventListener("submit", formSubmitHandler);

// п.2 Шесть карточек «из коробки» + п.5 Лайк карточки
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

function addCard(card) {
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

  elements.append(cardElement);
}

initialCards.forEach((card) => {
  addCard(card);
});
