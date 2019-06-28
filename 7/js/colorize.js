'use strict';

// Модуль генерации цветов внешнего вида персонажа
(function () {
  var changeWizard = function (wizardAttribute, wizzardInputHidden, color, wizardStyle) {
    var randomColor = color[Math.floor(Math.random() * color.length)];
    wizardAttribute.style = wizardStyle + ': ' + randomColor;
    wizzardInputHidden.value = randomColor;
  };

  var onWizardClick = function (element, fiels, color, style) {
    element.addEventListener('click', function () {
      changeWizard(element, fiels, color, style);
    });
  };

  window.colorize = {
    change: onWizardClick
  };
})();
