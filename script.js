// ASIDE CARD
const cardName = document.querySelector('.card__aside-name');
const cardNumber = document.querySelector('.card__aside-number');
const cardMonth = document.querySelector('.card__aside-month');
const cardYear = document.querySelector('.card__aside-year');
const cardCvc = document.querySelector('.cvc');

// FORM INPUT

const formInputName = document.querySelector('.card__form-name');
const formInputNumber = document.querySelector('.card__form-number');
const formInputMonth = document.querySelector('.card__form-month');
const formInputYear = document.querySelector('.card__form-year');
const formInputCvc = document.querySelector('.card__form-cvc');
const inputNameContainer = document.querySelector('.form__input-name');
const inputNumberContainer = document.querySelector('.form__input-number');
const inputMonthContainer = document.querySelector('.form__input-month');
const inputYearContainer = document.querySelector('.form__input-year');
const inputCvcContainer = document.querySelector('.form__input-cvc');
const button = document.querySelector('.button');
const buttonContinue = document.querySelector('.button--continue');
const form = document.querySelector('.card__form');
const success = document.querySelector('.thank-you');

let validationError = false;

const restrictInputLength = (input) => {
  if (input.value.length > input.maxLength) {
    input.value = input.value.slice(0, input.maxLength);
  }
};

// update aside card details based on form data
const updateCard = (input, card) => {
  input.addEventListener('input', function () {
    if (input != formInputName) {
      restrictInputLength(input);
    }
    card.textContent = input.value;
  });
};
// update aside card number based on form input
const updateNumber = (input, card) => {
  input.addEventListener('input', function (e) {
    restrictInputLength(input);
    const newInput =
      input.value.slice(0, 4) +
      ' ' +
      input.value.slice(4, 8) +
      ' ' +
      input.value.slice(8, 12) +
      ' ' +
      input.value.slice(12, 16);
    card.textContent = newInput;
  });
};

// calling fn to update card details
updateCard(formInputName, cardName);
updateNumber(formInputNumber, cardNumber);
updateCard(formInputMonth, cardMonth);
updateCard(formInputYear, cardYear);
updateCard(formInputCvc, cardCvc);

// FORM ERROR

const showError = (message, input) => {
  validationError = true;
  const newDiv = document.createElement('div');
  newDiv.textContent = message;
  newDiv.classList.add('error');
  input.appendChild(newDiv);
  newDiv.parentElement.classList.add('border');
};

const hideError = () => {
  if (document.querySelector('.error')) {
    const errorEl = document.querySelectorAll('.error');
    const borderEl = document.querySelectorAll('.border');
    errorEl.forEach((el) => {
      el.remove();
    });

    borderEl.forEach((el) => {
      el.classList.remove('border');
    });
    validationError = false;
  }
};

// CHECK IS FORM FIELD EMPTY

const checkIsFormEmpty = (...input) => {
  input.forEach((el) => {
    Object.values(el).forEach(([currentInput, container]) => {
      currentInput.value.length === 0
        ? showError("Can't be blank", container)
        : false;
    });
  });
};

const checkCardNumberLength = (input, container) => {
  if (input.value.length > 0 && input.value.length < 16) {
    showError('Card number length must be 16 digit', container);
  }
};

const checkIsMonthValid = (input, container) => {
  if (input.value < 1 || input.value > 12) {
    showError('Must be in past', container);
  }
};

const checkIsYearValid = (input, container) => {
  const currentYear = new Date(Date.now()).getFullYear();
  const year = currentYear + '';
  const yearLastTwoDigit = year.slice(2);
  if (Number(input.value) < yearLastTwoDigit) {
    showError('Must be in future', container);
  }
};

// FORM OBJECT

const formInput = {
  name: [formInputName, inputNameContainer],
  number: [formInputNumber, inputNumberContainer],
  month: [formInputMonth, inputMonthContainer],
  year: [formInputYear, inputYearContainer],
  cvc: [formInputCvc, inputCvcContainer],
};

// FORM SUBMISSION
button.addEventListener('click', (e) => {
  e.preventDefault();
  // check for any previous error
  hideError();
  checkIsFormEmpty({ ...formInput });
  checkCardNumberLength(formInputNumber, inputNumberContainer);
  if (formInputMonth.value.length > 0) {
    checkIsMonthValid(formInputMonth, inputMonthContainer);
  }

  if (formInputYear.value.length > 0) {
    checkIsYearValid(formInputYear, inputYearContainer);
  }

  if (!validationError) {
    success.classList.remove('hidden');
    form.classList.add('hidden');
  }
});

// Redirect to homepage

const formReset = () => {
  Object.values(formInput).forEach(([input]) => {
    input.value = '';
  });
};

buttonContinue.addEventListener('click', () => {
  form.classList.remove('hidden');
  success.classList.add('hidden');
  formReset();
});
