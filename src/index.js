import './pages/index.css'
import { enableValidation } from './components/validate.js'
import { closePopup, closePopupFromOverlay } from './components/utils.js'
import { addCard } from './components/card.js'
import { openAddCardPopup,
  editPopupElement,
  addCardPopupElement,
  openEditForm,
  handleProfileFormSubmit,
  handleAddSubmit,
  imgPopup,
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
} from './components/modal.js'
import { getInitialCards, getUserInfo, } from './components/api'


let userId = ''

// заполнение профиль при загрузке страницы
getUserInfo()
  .then((res) => {
    titleEditForm.textContent = res.name;
    subtitleEditForm.textContent = res.about;
    profileAvatar.src = res.avatar
    console.log('getUserInfo', res)
    userId = res._id
  })
  .catch((err) => {
    console.log(err)
  })

  // рендер карточек из массива
getInitialCards()
  .then((res) => {
    res.forEach((card) => {
      addCard(card, "append");
    });
  })
  .catch((err) => {
    console.log(err)
  })


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

export { userId }
