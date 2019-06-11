'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
var wizardList = document.querySelector('.setup-similar-list');

// Функция генерации случайных данных
var generateRandom = function (names, lastNames, mantleСolors, pupilColors) {
  var items = [];

  var getRandom = function (randoms) {
    var randomValue = randoms[Math.floor(Math.random() * randoms.length)];
    return randomValue;
  };

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
