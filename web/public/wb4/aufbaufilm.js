(function () {
  'use strict';

  var film = document.getElementById('aufbaufilm');
  if (!film) return;

  var schmalesHochformat = window.matchMedia('(max-width: 600px) and (orientation: portrait)');
  var begonnen = false;
  var startzeit = null;

  function formatAnpassen() {
    if (begonnen) return;
    var hoch = schmalesHochformat.matches;
    var basis = 'wb4/assets/aufbau-' + (hoch ? 'hoch' : 'quer');
    if (film.src === new URL(basis + '.mp4', document.baseURI).href) return;
    film.width = hoch ? 720 : 1280;
    film.height = hoch ? 1280 : 720;
    film.poster = basis + '.webp';
    film.src = basis + '.mp4';
  }

  formatAnpassen();
  schmalesHochformat.addEventListener('change', formatAnpassen);
  film.addEventListener('play', function () { begonnen = true; });
  film.addEventListener('loadedmetadata', function () {
    if (startzeit !== null) {
      film.currentTime = startzeit;
      startzeit = null;
    }
  });

  document.querySelectorAll('.aufbauschritte a').forEach(function (link) {
    link.addEventListener('click', function (event) {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || film.error) return;
      event.preventDefault();
      begonnen = true;
      var zeit = Number(link.hash.slice(3));
      if (film.readyState >= 1) film.currentTime = zeit;
      else startzeit = zeit;
      film.focus({ preventScroll: true });
      film.scrollIntoView({ block: 'start', behavior: 'instant' });
      // Manche Browser verlangen einen separaten Klick auf die Wiedergabetaste.
      film.play().catch(function () {});
    });
  });
})();
