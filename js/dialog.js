'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

// Логика открытия и закрытия окна настройки персонажа
var userDialog = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var userNameInput = userDialog.querySelector('.setup-user-name');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && userNameInput !== document.activeElement) {
    closePopup();
  }
};

var userDialogDeafaultX = 0;
var userDialogDeafaultY = 0;

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  // Сохраняем первоначальные координаты окна
  userDialogDeafaultX = userDialog.offsetLeft;
  userDialogDeafaultY = userDialog.offsetTop;
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  userDialog.style.top = userDialogDeafaultY + 'px';
  userDialog.style.left = userDialogDeafaultX + 'px';
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
  var randomColor = color[Math.floor(Math.random() * color.length)];
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

// Перемещение окна настройки персонажа

var dialogHandler = document.querySelector('.upload');

dialogHandler.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var dragged = false;

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
    userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    if (dragged) {
      var onClickPreventDefault = function (clickEvt) {
        clickEvt.preventDefault();
        dialogHandler.removeEventListener('click', onClickPreventDefault);
      };
      dialogHandler.addEventListener('click', onClickPreventDefault);
    }

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
