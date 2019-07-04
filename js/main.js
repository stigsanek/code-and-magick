'use strict';

(function () {
  window.colorize.init(window.wizard.render);

  document.addEventListener('DOMContentLoaded', function () {
    // Загружает данные
    window.backend.load(window.colorize.filter, window.error.add);
    document.querySelector('.setup').querySelector('.setup-similar').classList.remove('hidden');

    // Отправляет данные на сервер
    window.dialog.save(window.backend.save, window.error.add);
  });
})();
