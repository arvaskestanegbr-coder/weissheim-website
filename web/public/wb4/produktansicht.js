(function () {
  'use strict';

  var wahl = document.getElementById('ansicht-wb4-wahl');
  var bild = document.getElementById('ansicht-wb4-bild');
  var masse = document.getElementById('ansicht-wb4-masse');
  if (!wahl || !bild || !masse) return;

  var angebot = document.getElementById('ausgewaehltes-angebot');

  function zeigeAuswahl() {
    var farbe = wahl.querySelector('input[name="wb4-farbe"]:checked').value;
    var datei = 'wb4/assets/farbe-' + farbe + '.webp';
    if (bild.src !== new URL(datei, document.baseURI).href) {
      bild.src = datei;
      bild.alt = farbe === 'beige'
        ? 'Wäschesammler in Beige mit vier Taschen und weißem Gestell, schräg von vorn'
        : 'Wäschesammler in Schwarz mit vier Taschen und schwarzem Gestell, schräg von vorn';
    }
    var farbangebot = document.getElementById('amazon-' + farbe);
    angebot.href = farbangebot.href;
    angebot.firstElementChild.textContent = (farbe === 'beige' ? 'Beige' : 'Schwarz') + ' auf Amazon ansehen';
    masse.hidden = wahl.querySelector('input[name="wb4-ansicht"]:checked').value === 'produkt';
  }

  wahl.addEventListener('change', zeigeAuswahl);
  window.addEventListener('pageshow', zeigeAuswahl);
  zeigeAuswahl();
  wahl.hidden = false;
})();
