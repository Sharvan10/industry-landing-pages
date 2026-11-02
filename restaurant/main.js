/* Spice Route: accessible menu tabs + live open/closed status */
(function () {
  'use strict';
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  function select(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tab.focus();
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { select(tab, false); });
    tab.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      else if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === 'Home') next = tabs[0];
      else if (e.key === 'End') next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); select(next, true); }
    });
  });

  /* Open / closed indicator (restaurant local hours, using visitor's clock for the demo) */
  var hours = { 0: [12, 21], 1: null, 2: [17, 22], 3: [17, 22], 4: [17, 22], 5: [12, 23], 6: [12, 23] };
  var el = document.getElementById('open-status');
  if (el) {
    var now = new Date(), h = now.getHours() + now.getMinutes() / 60, today = hours[now.getDay()];
    var open = today && h >= today[0] && h < today[1];
    el.textContent = open ? 'Open now, kitchen closes at ' + (today[1] - 12) + 'pm' : 'Closed right now. Reserve ahead for our next service.';
    el.classList.add(open ? 'is-open' : 'is-closed');
  }
})();
