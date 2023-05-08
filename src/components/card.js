import { addLike, deleteLike, deleteCard } from './api.js';
import { handleImgOpen } from '../index.js'
import { userId, cardTemplate } from './utils.js'


// добавление класса кнопке лайк
function activeLikeBtn(likeCard) {
  likeCard.classList.add("element__like-btn_active");
}

// удаление класса кнопке лайк
function inactiveLikeBtn(likeCard) {
  likeCard.classList.remove("element__like-btn_active");
}

// добавление лайка
function addlikeCard(id, likeCard, likeCountCard) {
  addLike(id)
    .then((res) => {
      activeLikeBtn(likeCard)
      likeCountCard.textContent = res.likes.length
    })
    .catch((err) => {
      console.log(err, likeCard)
    })
}

// удаление лайка
function deleteLikeCard(id, likeCard, likeCountCard) {
  deleteLike(id)
    .then((res) => {
      inactiveLikeBtn(likeCard)
      likeCountCard.textContent = res.likes.length
    })
    .catch((err) => {
      console.log(err, likeCard)
    })
}

// поиск userId в массиве лайков карточки
function likeCheck(card) {
  const idAllUser = card.likes.map(el => el._id)

  return idAllUser.includes(userId)
}

// создание карточки
function createCard(card) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const imgCardElement = cardElement.querySelector(".element__mask-group");
  const titleCardElement = cardElement.querySelector(".element__title");
  const likeCard = cardElement.querySelector(".element__like-btn");
  const deleteCardBtn = cardElement.querySelector(".element__delete-btn");
  const likeCountCard = cardElement.querySelector(".element__like-count");

  imgCardElement.setAttribute("src", card.link);
  imgCardElement.setAttribute("alt", card.name);
  titleCardElement.textContent = card.name;
  likeCountCard.textContent = card.likes.length


  // проверка лайка в обьекте карточки
  if (likeCheck(card)) {
    activeLikeBtn(likeCard)
  }

  likeCard.addEventListener("click", function () {
    if (!likeCard.classList.contains('element__like-btn_active')) {
      addlikeCard(card._id, likeCard, likeCountCard)
    } else {
      deleteLikeCard(card._id, likeCard, likeCountCard)
    }

  });

  // показывает кнопку удаления карточки только на своих карточках
  if (userId === card.owner._id) {
    deleteCardBtn.addEventListener("click", function () {
      // удаление карточки на сервере
      deleteCard(card._id)
        .then(() => {
          cardElement.remove();
        })
        .catch((err) => {
          console.log(err)
        })
    });
  } else {
    deleteCardBtn.classList.add('element__delete-btn_hidden')
  }



  imgCardElement.addEventListener("click", function () {
    handleImgOpen(imgCardElement, titleCardElement);
  });

  return cardElement;
}

export { createCard }
