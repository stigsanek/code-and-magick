'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var userDialog = document.querySelector('.setup');
var wizardList = document.querySelector('.setup-similar-list');

// Функция генерации случайных данных
var getRandom = function (randoms) {
  var randomValue = randoms[Math.floor(Math.random() * randoms.length)];
  return randomValue;
};

var generateRandom = function (names, lastNames, mantleСolors, pupilColors) {
  var items = [];

  for (var i = 0; i < 4; i++) {
    items[i] = {
      name: '',
      coatColor: '',
      eyesColor: ''
    };

    items[i].name = getRandom(names) + ' ' + getRandom(lastNames);
    items[i].coatColor = getRandom(mantleСolors);
    items[i].eyesColor = getRandom(pupilColors);
  }

  return items;
};

var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// Функция создания персонажа
var createWizard = function (objectWizard) {
  var newWizard = wizardTemplate.cloneNode(true);
  newWizard.querySelector('.setup-similar-label').textContent = objectWizard.name;
  newWizard.querySelector('.wizard-coat').style.fill = objectWizard.coatColor;
  newWizard.querySelector('.wizard-eyes').style.fill = objectWizard.eyesColor;

  return newWizard;
};

//  Функция добавления персонажей в разметку
var addWizard = function (wizardElements) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizardElements.length; i++) {
    var newWizardElement = createWizard(wizardElements[i]);
    fragment.appendChild(newWizardElement);
  }

  wizardList.appendChild(fragment);
};

// Генерируем массив данных и добавляем персонажей
var randomData = generateRandom(WIZARD_NAMES, WIZARD_LAST_NAMES, WIZARD_COAT_COLORS, WIZARD_EYES_COLORS);
addWizard(randomData);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

// Логика открытия и закрытия окна настройки персонажа
var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var userNameInput = userDialog.querySelector('.setup-user-name');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && userNameInput !== document.activeElement) {
    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// Изменение вншнего вида персонажа по клику
var coatWizardElement = userDialog.querySelector('.wizard-coat');
var eyesWizardElement = userDialog.querySelector('.wizard-eyes');
var fireballWizardElement = userDialog.querySelector('.setup-fireball-wrap');

var coatInputElement = userDialog.querySelector('#coat-color');
var eyesInputElement = userDialog.querySelector('#eyes-color');
var fireballInputElement = userDialog.querySelector('#fireball-color');

var changeWizard = function (wizardAttribute, wizzardInputHidden, color, wizardStyle) {
  var randomColor = getRandom(color);
  wizardAttribute.style = wizardStyle + ': ' + randomColor;
  wizzardInputHidden.value = randomColor;
};

coatWizardElement.addEventListener('click', function () {
  changeWizard(coatWizardElement, coatInputElement, WIZARD_COAT_COLORS, 'fill');
});

eyesWizardElement.addEventListener('click', function () {
  changeWizard(eyesWizardElement, eyesInputElement, WIZARD_EYES_COLORS, 'fill');
});

fireballWizardElement.addEventListener('click', function () {
  changeWizard(fireballWizardElement, fireballInputElement, WIZARD_FIREBALL_COLORS, 'background-color');
});