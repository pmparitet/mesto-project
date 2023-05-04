import { handleImgOpen } from './modal.js'

// для ф. createCard()
const cardTemplate = document.querySelector("#card-template").content;
// секция для вставки карточек
const elements = document.querySelector(".elements");

function likeCardToggle(evt) {
  evt.target.classList.toggle("element__like-btn_active");
}

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

  likeCard.addEventListener("click", likeCardToggle);

  deleteCardBtn.addEventListener("click", function () {
    cardElement.remove();
  });

  imgCardElement.addEventListener("click", function () {
    handleImgOpen(imgCardElement, titleCardElement);
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



export { addCard }
