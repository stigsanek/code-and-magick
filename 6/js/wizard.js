'use strict';

// Модуль создания похожих персонажей
(function () {
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var createWizard = function (objectWizard) {
    var newWizard = wizardTemplate.cloneNode(true);
    newWizard.querySelector('.setup-similar-label').textContent = objectWizard.name;
    newWizard.querySelector('.wizard-coat').style.fill = objectWizard.coatColor;
    newWizard.querySelector('.wizard-eyes').style.fill = objectWizard.eyesColor;

    return newWizard;
  };

  window.wizard = {
    create: createWizard
  };
})();
