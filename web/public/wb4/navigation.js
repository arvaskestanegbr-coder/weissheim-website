(function () {
  'use strict';

  var kopf = document.getElementById('kopf');
  var menue = document.getElementById('kopf-menue');
  var taste = kopf.querySelector('.kopf__menutaste');
  var kompakt = window.matchMedia('(max-width: 600px)');

  function schliessen() {
    taste.setAttribute('aria-expanded', 'false');
    menue.hidden = kompakt.matches;
  }

  function anpassen() {
    var fokus = document.activeElement;
    kopf.classList.toggle('kopf--kompakt', kompakt.matches);
    taste.hidden = !kompakt.matches;
    schliessen();
    if (kompakt.matches && menue.contains(fokus)) taste.focus({ preventScroll: true });
    if (!kompakt.matches && fokus === taste) menue.querySelector('a').focus({ preventScroll: true });
  }

  taste.addEventListener('click', function () {
    if (!menue.hidden) { schliessen(); return; }
    menue.hidden = false;
    taste.setAttribute('aria-expanded', 'true');
  });
  document.addEventListener('keydown', function (event) {
    if (!kompakt.matches || menue.hidden || event.key !== 'Escape') return;
    event.preventDefault();
    schliessen();
    taste.focus({ preventScroll: true });
  });
  document.addEventListener('focusin', function (event) {
    if (kompakt.matches && !menue.hidden && event.target !== taste && !menue.contains(event.target)) schliessen();
  });
  document.addEventListener('click', function (event) {
    if (!kompakt.matches || menue.hidden || taste.contains(event.target)) return;
    if (!menue.contains(event.target) || event.target.closest('a, button')) schliessen();
  });
  kompakt.addEventListener('change', anpassen);
  anpassen();
})();
