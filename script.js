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
