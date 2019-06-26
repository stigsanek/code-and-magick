'use strict';

// Модуль генерации данных
(function () {
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

  window.data = {
    get: generateRandom
  };
})();
