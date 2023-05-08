import './pages/index.css'
import { enableValidation, changeButtonClass } from './components/validate.js'
import {
  elements,
  editButton,
  addButton,
  editPopupElement,
  addCardPopupElement,
  imgPopup,
  popupImage,
  popupTitile,
  editAvatarPopupElement,
  profileOverlay,
  profileAvatar,
  btnCloseEditAvatarPopup,
  btnCloseEditPopup,
  btnCloseAddPopup,
  btnCloseImgPopup,
  titleEditForm,
  subtitleEditForm,
  avatarUrlInput,
  btnSubmitAvatarPopup,
  nameInputEditForm,
  jobeInputEditForm,
  btnSubmitEditForm,
  btnSubmitAddCardForm,
  nameInputAddCardForm,
  urlInputAddCardForm,
} from './components/utils.js'
import {
  openPopup,
  closePopup,
  closePopupFromOverlay
} from './components/modal.js'
import { getInitialCards, getUserInfo, editAvatar, editProfil, saveCard } from './components/api'
import { createCard } from './components/card'

let userId = ''

// заполнение профиль при загрузке страницы
getUserInfo()
  .then((res) => {
    titleEditForm.textContent = res.name;
    subtitleEditForm.textContent = res.about;
    profileAvatar.src = res.avatar
    userId = res._id

    // рендер карточек из массива, после получения инф. о пользователе
    getInitialCards()
      .then((res) => {
        res.forEach((card) => {
          addCard(card, "append");
        });
      })
      .catch((err) => {
        console.log(err)
      })
  })
  .catch((err) => {
    console.log(err)
  })


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
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => btnSubmitAvatarPopup.textContent = 'Сохранить')
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
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => btnSubmitEditForm.textContent = 'Сохранить')
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
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => btnSubmitAddCardForm.textContent = 'Создать')
}


profileOverlay.addEventListener("click", openEditAvatarPopup);
btnCloseEditAvatarPopup.addEventListener("click", function () {
  closePopup(editAvatarPopupElement);
});
editAvatarPopupElement.addEventListener("submit", handleAvatarSubmit);

editButton.addEventListener("click", openEditForm);
btnCloseEditPopup.addEventListener("click", function () {
  closePopup(editPopupElement);
});
editPopupElement.addEventListener("submit", handleProfileFormSubmit);

// закрытие окна с картинкой
btnCloseImgPopup.addEventListener("click", function () {
  closePopup(imgPopup);
});

addButton.addEventListener("click", openAddCardPopup);
btnCloseAddPopup.addEventListener("click", function () {
  closePopup(addCardPopupElement);
});
addCardPopupElement.addEventListener("submit", handleAddSubmit);

// закрытие мод. окна при клике на Overlay
addCardPopupElement.addEventListener("click", function (evt) {
  closePopupFromOverlay(evt, addCardPopupElement)
})
editPopupElement.addEventListener("click", function (evt) {
  closePopupFromOverlay(evt, editPopupElement)
})
imgPopup.addEventListener("click", function (evt) {
  closePopupFromOverlay(evt, imgPopup)
})
editAvatarPopupElement.addEventListener("click", function (evt) {
  closePopupFromOverlay(evt, editAvatarPopupElement)
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

export { userId, addCard, handleImgOpen }
