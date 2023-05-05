// Функция, которая добавляет класс с ошибкой
const showInputError = (options, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(options.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(options.errorClass)
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (options, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(options.inputErrorClass);
  errorElement.classList.remove(options.errorClass)
  errorElement.textContent = ''
};

// Функция, которая проверяет валидность поля
const isValid = (options, formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(options, formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(options, formElement, inputElement);
  }
};

// проверка всех полей на валидность
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const changeButtonClass = (direction, disabled, buttonElement, inactiveButtonClass) => {
  buttonElement.disabled = disabled;
  switch (direction) {
    case 'add':
      buttonElement.classList.add(inactiveButtonClass);
      break;
    case 'remove':
      buttonElement.classList.remove(inactiveButtonClass);
      break;
    default:
      console.log('changeButtonClass-default')
      break;
  }
}

const toggleButtonState = (options, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    changeButtonClass('add', true, buttonElement, options.inactiveButtonClass)
  } else {
    changeButtonClass('remove', false, buttonElement, options.inactiveButtonClass)
  }
};

// установка слушателей на поля ввода
const setEventListeners = (options, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
  const buttonElement = formElement.querySelector(options.submitButtonSelector);

  toggleButtonState(options, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(options, formElement, inputElement);
      toggleButtonState(options, inputList, buttonElement);
    });
  });
};

// поиск всех форм на странице
const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(options, formElement);
  });
};

export { enableValidation, changeButtonClass }
