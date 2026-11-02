/* BrightSmile: FAQ accordion + before/after slider */
(function () {
  'use strict';
  document.querySelectorAll('.acc-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      document.getElementById(btn.getAttribute('aria-controls')).hidden = open;
    });
  });

  var range = document.getElementById('ba-range');
  if (range) {
    var wrap = range.closest('.ba');
    var update = function () {
      wrap.style.setProperty('--pos', range.value + '%');
      range.setAttribute('aria-valuetext', range.value + '% before, ' + (100 - range.value) + '% after');
    };
    range.addEventListener('input', update);
    update();
  }
})();
