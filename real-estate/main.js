/* UrbanNest: listing filters, hero search, stats counter, mortgage calculator */
(function () {
  'use strict';
  var fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  /* ---- Listing filters ---- */
  var items = Array.prototype.slice.call(document.querySelectorAll('.listing'));
  var chips = document.querySelectorAll('.chip');
  var priceSel = document.getElementById('f-price');
  var countEl = document.getElementById('result-count');
  var emptyEl = document.getElementById('empty-state');
  var state = { type: 'all', max: 'any', q: '' };

  function apply() {
    var shown = 0;
    items.forEach(function (li) {
      var ok = (state.type === 'all' || li.dataset.type === state.type) &&
               (state.max === 'any' || Number(li.dataset.price) <= Number(state.max)) &&
               (!state.q || li.dataset.area.toLowerCase().indexOf(state.q) !== -1 || li.querySelector('h3').textContent.toLowerCase().indexOf(state.q) !== -1);
      li.hidden = !ok;
      if (ok) shown++;
    });
    chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.type === state.type)); });
    priceSel.value = state.max;
    countEl.textContent = 'Showing ' + shown + (shown === 1 ? ' property' : ' properties') + (state.q ? ' matching "' + state.q + '"' : '');
    emptyEl.hidden = shown !== 0;
  }
  chips.forEach(function (c) { c.addEventListener('click', function () { state.type = c.dataset.type; apply(); }); });
  priceSel.addEventListener('change', function () { state.max = priceSel.value; apply(); });
  document.getElementById('reset-filters').addEventListener('click', function () {
    state = { type: 'all', max: 'any', q: '' };
    document.getElementById('s-location').value = '';
    apply();
  });

  document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    state.type = document.getElementById('s-type').value;
    state.max = document.getElementById('s-price').value;
    state.q = document.getElementById('s-location').value.trim().toLowerCase();
    apply();
    var target = document.getElementById('listings');
    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    document.getElementById('listings-title').setAttribute('tabindex', '-1');
    document.getElementById('listings-title').focus({ preventScroll: true });
  });

  /* ---- Stats counter ---- */
  var counters = document.querySelectorAll('[data-count]');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function run(el) {
    var end = Number(el.dataset.count), start = performance.now(), dur = 1400;
    (function tick(now) {
      var t = Math.min((now - start) / dur, 1), eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(end * eased).toLocaleString('en-US');
      if (t < 1) requestAnimationFrame(tick);
    })(start);
  }
  if ('IntersectionObserver' in window && !reduce) {
    counters.forEach(function (el) { el.textContent = '0'; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { io.observe(el); });
  }

  /* ---- Mortgage calculator ---- */
  var $ = function (id) { return document.getElementById(id); };
  var price = $('m-price'), down = $('m-down'), rate = $('m-rate'), term = $('m-term');
  function calc() {
    var p = Math.max(0, Number(price.value) || 0);
    var dPct = Number(down.value) || 0;
    var dAmt = p * dPct / 100;
    var loan = p - dAmt;
    var n = Number(term.value) * 12;
    var r = Math.max(0, Number(rate.value) || 0) / 100 / 12;
    var monthly = loan === 0 ? 0 : r === 0 ? loan / n : loan * r / (1 - Math.pow(1 + r, -n));
    var total = monthly * n;
    var interest = Math.max(0, total - loan);
    $('m-down-out').textContent = dPct + '% (' + fmt.format(dAmt) + ')';
    $('r-monthly').textContent = fmt.format(monthly);
    $('r-loan').textContent = fmt.format(loan);
    $('r-interest').textContent = fmt.format(interest);
    $('r-down').textContent = fmt.format(dAmt);
    $('r-total').textContent = fmt.format(total);
    var pct = total > 0 ? Math.round(loan / total * 100) : 100;
    var donut = $('donut');
    donut.style.setProperty('--p', pct);
    donut.setAttribute('aria-label', 'Monthly payment ' + fmt.format(monthly) + '. Principal is ' + pct + '% of total payments, interest is ' + (100 - pct) + '%.');
  }
  [price, down, rate, term].forEach(function (el) { el.addEventListener('input', calc); });
  $('mortgage-form').addEventListener('submit', function (e) { e.preventDefault(); });
  calc();
})();
