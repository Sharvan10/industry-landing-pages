/* Shared helpers: mobile nav, sticky header, reveal-on-scroll, form validation, image fallback. */
(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');

  /* Sticky header shadow */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Mobile navigation */
  var toggle = document.querySelector('.nav-toggle');
  var nav = toggle && document.getElementById(toggle.getAttribute('aria-controls'));
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('open', open);
      document.body.classList.toggle('nav-open', open);
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) { setOpen(false); toggle.focus(); }
    });
    window.matchMedia('(min-width: 900px)').addEventListener('change', function (m) { if (m.matches) setOpen(false); });
  }

  /* Reveal on scroll */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* Image fallback: if a remote photo fails, hide it and let the styled container show through */
  document.querySelectorAll('img').forEach(function (img) {
    var fail = function () {
      if (img.classList.contains('img-fail')) return;
      img.classList.add('img-fail');
      img.removeAttribute('srcset');
      img.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22/%3E';
    };
    if (img.loading !== 'lazy' && img.complete && img.naturalWidth === 0) fail();
    else img.addEventListener('error', fail);
  });

  /* Footer year */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* Date inputs: no past dates */
  var today = new Date();
  var iso = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  document.querySelectorAll('input[type="date"][data-future]').forEach(function (d) { d.min = iso; });

  /* Form validation */
  function message(f) {
    var v = f.validity;
    if (v.valueMissing) return f.dataset.requiredMsg || (f.tagName === 'SELECT' ? 'Please choose an option.' : 'This field is required.');
    if (v.typeMismatch && f.type === 'email') return 'Please enter a valid email address, like name@example.com.';
    if (v.patternMismatch) return f.dataset.patternMsg || 'Please check the format.';
    if (v.tooShort) return 'Please enter at least ' + f.minLength + ' characters.';
    if (v.rangeUnderflow) return f.type === 'date' ? 'Please choose today or a future date.' : 'Value must be at least ' + f.min + '.';
    if (v.rangeOverflow) return 'Value must be at most ' + f.max + '.';
    if (!v.valid) return 'Please check this field.';
    return '';
  }
  function validate(f) {
    if (!f.willValidate) return true;
    var msg = message(f);
    var err = document.getElementById(f.id + '-error');
    if (err) err.textContent = msg;
    if (msg) f.setAttribute('aria-invalid', 'true'); else f.removeAttribute('aria-invalid');
    return !msg;
  }
  document.querySelectorAll('form[novalidate]').forEach(function (form) {
    var fields = form.querySelectorAll('input, select, textarea');
    fields.forEach(function (f) {
      f.addEventListener('blur', function () { if (f.value) validate(f); });
      f.addEventListener('input', function () { if (f.getAttribute('aria-invalid')) validate(f); });
      f.addEventListener('change', function () { if (f.getAttribute('aria-invalid')) validate(f); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var first = null;
      fields.forEach(function (f) { if (!validate(f) && !first) first = f; });
      var ok = form.querySelector('.form-success');
      if (first) { if (ok) ok.hidden = true; first.focus(); return; }
      var nameField = form.querySelector('[name="name"]');
      var name = nameField && nameField.value.trim().split(' ')[0];
      var tpl = form.dataset.success || 'Thanks{name}! Your request has been received. We\'ll be in touch shortly.';
      if (ok) {
        ok.textContent = tpl.replace('{name}', name ? ', ' + name : '');
        ok.hidden = false;
      }
      form.reset();
      fields.forEach(function (f) { f.removeAttribute('aria-invalid'); });
      form.dispatchEvent(new CustomEvent('formsuccess'));
    });
  });
})();
