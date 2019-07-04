'use strict';

// Модуль генерации цветов внешнего вида персонажа
(function () {
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var userDialog = document.querySelector('.setup');

  // Функция генерации случайного цвета
  var getRandomColor = function (colors) {
    var randomColorIndex = Math.floor(Math.random() * colors.length);
    return colors[randomColorIndex];
  }

  var currentCoatColor;
  var coatWizardElement = userDialog.querySelector('.wizard-coat');
  var coatInputElement = userDialog.querySelector('#coat-color');
  coatWizardElement.addEventListener('click', function () {
    var newColor = getRandomColor(WIZARD_COAT_COLORS);
    coatWizardElement.style.fill = newColor;
    coatInputElement.value = newColor;
    currentCoatColor = newColor;
    updateWizards();
  });

  var currentEyesColor;
  var eyesWizardElement = userDialog.querySelector('.wizard-eyes');
  var eyesInputElement = userDialog.querySelector('#eyes-color');
  eyesWizardElement.addEventListener('click', function () {
    var newColor = getRandomColor(WIZARD_EYES_COLORS);
    eyesWizardElement.style.fill = newColor;
    eyesInputElement.value = newColor;
    currentEyesColor = newColor;
    updateWizards();
  });

  var fireballWizardElement = userDialog.querySelector('.setup-fireball-wrap');
  var fireballInputElement = userDialog.querySelector('#fireball-color');
  fireballWizardElement.addEventListener('click', function () {
    var newColor = getRandomColor(WIZARD_FIREBALL_COLORS);
    fireballWizardElement.style = 'background-color: ' + newColor;
    fireballInputElement.value = newColor;
  });

  var wizards = [];

  // Функция фильтрации похожих песронажей
  var updateWizards = function () {
    var sameCoatAndEyesWizards = wizards.filter(function (it) {
      return it.colorCoat === currentCoatColor &&
        it.colorEyes === currentEyesColor;
    });

    var sameCoatWizards = wizards.filter(function (it) {
      return it.colorCoat === currentCoatColor;
    });

    var sameEyesWizards = wizards.filter(function (it) {
      return it.colorEyes === currentEyesColor;
    });

    var filteredWizards = sameCoatAndEyesWizards;
    filteredWizards = filteredWizards.concat(sameCoatWizards);
    filteredWizards = filteredWizards.concat(sameEyesWizards);
    filteredWizards = filteredWizards.concat(wizards);

    var uniqueWizards = filteredWizards.filter(function (it, i) {
      return filteredWizards.indexOf(it) === i;
    });

    renderData(uniqueWizards);
  };

  // Callback для добавления метода отрисовки песронажей
  var renderData = null;
  var addMethod = function (method) {
    renderData = method;
  }

  // Метод отрисовки похожих персонажей
  var successHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  window.colorize = {
    init: addMethod,
    filter: successHandler
  }
})();
