'use strict';

(function () {
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var userDialog = document.querySelector('.setup');

  var coatWizardElement = userDialog.querySelector('.wizard-coat');
  var eyesWizardElement = userDialog.querySelector('.wizard-eyes');
  var fireballWizardElement = userDialog.querySelector('.setup-fireball-wrap');

  var coatInputElement = userDialog.querySelector('#coat-color');
  var eyesInputElement = userDialog.querySelector('#eyes-color');
  var fireballInputElement = userDialog.querySelector('#fireball-color');

  document.addEventListener('DOMContentLoaded', function () {
    // Загружает данные
    window.backend.load(window.dialog.add, onError, window.wizard.create);
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
    // Управляет внешним видом персонажа
    window.colorize.change(coatWizardElement, coatInputElement, WIZARD_COAT_COLORS, 'fill');
    window.colorize.change(eyesWizardElement, eyesInputElement, WIZARD_EYES_COLORS, 'fill');
    window.colorize.change(fireballWizardElement, fireballInputElement, WIZARD_FIREBALL_COLORS, 'background-color');
  });
})();
