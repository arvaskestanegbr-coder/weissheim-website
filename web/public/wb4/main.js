/* WEISSHEIM – WB4 Produktseite
   Vanilla JS mit GSAP/ScrollTrigger und Lenis. Die erste Sektion ist eine feststehende Bühne: Ein Canvas zeigt
   140 vorgerenderte Bilder, die Scrollposition bestimmt das Bild. Bei „Bewegung reduzieren“ oder ohne GSAP
   bleibt die ruhige Fassung der Seite stehen (siehe css/style.css). */
(function () {
  'use strict';

  var html = document.documentElement;
  var jahr = document.getElementById('jahr');
  if (jahr) jahr.textContent = String(new Date().getFullYear());

  // Die ruhige Fassung lässt sich zum Ansehen auch mit ?ruhig oder #ruhig an der Adresse erzwingen
  var ruhig = window.wb4Standbilder || window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    /[?&]ruhig\b/.test(window.location.search) || window.location.hash === '#ruhig' ||
    (navigator.connection && navigator.connection.saveData);
  var startmotiv = window.wb4Startmotiv;
  var canvas = document.getElementById('folge');
  var ctx = null;
  if (!ruhig && startmotiv && window.gsap && window.ScrollTrigger && canvas) {
    try { ctx = canvas.getContext('2d', { alpha: false }); } catch (fehler) { /* Standbilder bleiben verfügbar. */ }
  }
  if (!ctx) {
    if (startmotiv) startmotiv.stop();
    html.classList.remove('bewegt', 'bereit');
    return;
  }
  html.classList.add('bewegt');

  // ------------------------------------------------------------ Bühne: Hero und Bildfolge
  var N = 140;            // Bilder der Folge (assets/seq/…/0000.webp bis 0139.webp)
  var HERO = startmotiv.hero;        // Anteil des Scrollwegs, in dem nur das Licht angeht
  var FORMAT = 0.8;       // Seitenverhältnis der Bilder (1080 × 1350)
  // Wann welche Textzeile steht, als Anteil der Bildfolge. Passt zum Ablauf in pipeline/dunkel_extra.py:
  // Ablage hebt ab · Taschen kommen heraus · Bügel lösen sich · Gestell hebt von den Rollen ab · alles setzt sich zusammen
  var FENSTER = [[0.05, 0.19], [0.21, 0.44], [0.47, 0.60], [0.61, 0.75], [0.80, 1]];

  var fest = canvas.parentElement;
  var buehne = document.getElementById('buehne');
  // Kleinere Bilder fürs Handy. Den Wert legt das Skript im Seitenkopf fest (index.html), weil es die beiden Bilder
  // des ersten Anblicks vorab anfordert; beide Stellen müssen denselben Bildsatz meinen.
  var klein = window.wb4KleineBilder === true;
  var mobilbild = window.wb4MobilesOriginal === true;
  var ordner = 'wb4/assets/seq/' + (mobilbild ? 'm' : 'd') + '/';
  var bilder = new Array(N);
  var kante = startmotiv.kante;                    // Bild 0 nur mit Kantenlicht
  var LICHT_START = startmotiv.licht;  // so viel Hauptlicht liegt schon beim Laden auf dem Produkt
  var st = { licht: LICHT_START, bild: 0, cx: 0.5, cy: 0.5, skala: 1 };
  var schmutzig = true;

  var lage = startmotiv.lage;

  function groesse() {
    startmotiv.groesse();
    letzteQuelle = null;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    schmutzig = true;
  }

  // Die Bildbögen entfernen nur den leeren Rand des 720 × 900 großen Originals.
  // Der Ausschnitt (160, 48, 448, 832) wird auf 336 × 624 verkleinert. Am Haltepunkt
  // ersetzt ein einzeln geladenes Original das Bewegungsbild.
  var QUELLE_W = 720, QUELLE_H = 900, AUSSCHNITT_X = 160, AUSSCHNITT_Y = 48;
  var AUSSCHNITT_W = 448, AUSSCHNITT_H = 832, KACHEL_W = 336, KACHEL_H = 624, SPALTEN = 6;
  var BLOCK = 24, vorschau = new Array(N);
  var fahrt = [0, 4, 2, 6].map(function (rest) {
    var nummern = [];
    for (var i = 1; i < N; i++) if (i % 8 === rest || (rest === 0 && i === N - 1)) nummern.push(i);
    return { name: 'fahrt-' + rest, nummern: nummern, zustand: 'neu', global: true };
  });
  var bloecke = [];
  for (var start = 0; start < N; start += BLOCK) {
    var nummern = [];
    for (var n = start + 1; n < Math.min(N - 1, start + BLOCK); n += 2) nummern.push(n);
    bloecke.push({ name: 'bewegung-' + String(start).padStart(3, '0'), nummern: nummern, zustand: 'neu' });
  }
  var tempo = 0, letzterWechsel = 0, abrufdauer = 400;
  var ziel = 0, richtung = 1, gezeigt = 0;
  var letzteQuelle = null, letztesX, letztesY, letzteHoehe;
  var angefordert = new Array(N);
  var offeneOriginale = 0, imScrollweg = false, offeneBloecke = 0;
  var bogenBereit = false, bogenFehler = 0, letztesBlatt = 0, scharfTimer, ausweichTimer;
  var schnelleBilder = false, ausweichen = false, fahrtBegonnen = false;
  var startbilderFertig = 0, animationAktiv = false;
  var lade = document.getElementById('lade');
  var balken = lade.querySelector('span');
  lade.style.visibility = 'hidden';

  // Von der Sollposition zur zuletzt gezeigten Pose suchen: Fertige Bilder dürfen
  // die Fahrt verfeinern, aber eine nachträglich geladene Phase nie zurückspringen lassen.
  function passendeNummer(i) {
    var schritt = i >= gezeigt ? -1 : 1;
    for (var j = i; j !== gezeigt; j += schritt) {
      if (bilder[j] || vorschau[j]) return j;
    }
    return gezeigt;
  }

  function male() {
    if (!schmutzig) return;
    schmutzig = false;
    var W = canvas.width, H = canvas.height;
    var h = H * st.skala, w = h * FORMAT, x = W * st.cx - w / 2, y = H * st.cy - h / 2;
    var i = Math.max(0, Math.min(N - 1, Math.round(st.bild)));
    if (i !== ziel) {
      var jetzt = performance.now(), vergangen = jetzt - letzterWechsel;
      var v = (i - ziel) / Math.max(vergangen, 1);
      tempo = vergangen > 150 || v * tempo < 0 ? v : 0.65 * tempo + 0.35 * v;
      letzterWechsel = jetzt;
      richtung = i > ziel ? 1 : -1;
      ziel = i;
      planeScharfesZiel();
      planeBloecke();
      originaleNachladen();
    }
    if (st.licht < 0.999 && (kante.naturalWidth || bilder[0])) {
      gezeigt = 0;
      letzteQuelle = null;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);
      startmotiv.zeichneLicht(st.licht, x, y, w, h);
      return;
    }
    var nummer = passendeNummer(i);
    var original = bilder[nummer], kachel = vorschau[nummer];
    var quelle = original || (kachel && kachel.blatt) || kante;
    if (!quelle.naturalWidth) return;
    if (quelle === letzteQuelle && nummer === gezeigt && x === letztesX && y === letztesY && h === letzteHoehe) return;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);
    if (!original && kachel) {
      ctx.drawImage(quelle, kachel.x, kachel.y, KACHEL_W, KACHEL_H,
        x + w * AUSSCHNITT_X / QUELLE_W, y + h * AUSSCHNITT_Y / QUELLE_H,
        w * AUSSCHNITT_W / QUELLE_W, h * AUSSCHNITT_H / QUELLE_H);
    } else {
      ctx.drawImage(quelle, x, y, w, h);
    }
    gezeigt = nummer;
    letzteQuelle = quelle;
    letztesX = x;
    letztesY = y;
    letzteHoehe = h;
  }

  function nachDekodierung(bild, fertig) {
    function geladen() {
      if (typeof bild.decode !== 'function') { fertig(!!bild.naturalWidth); return; }
      bild.decode().then(function () { fertig(true); }, function () { fertig(false); });
    }
    if (bild.getAttribute('src') && bild.complete) { geladen(); return; }
    bild.onerror = function () { fertig(false); };
    bild.onload = geladen;
  }

  function ladeBlatt(eintrag) {
    var bild = eintrag === fahrt[0] && startmotiv.bogen || new Image(), start = performance.now();
    eintrag.zustand = 'laedt';
    if (!eintrag.global) offeneBloecke++;
    bild.decoding = 'async';
    bild.fetchPriority = eintrag.global ? 'high' : 'auto';
    nachDekodierung(bild, function (ok) {
      if (!eintrag.global) offeneBloecke--;
      if (ok && bild.naturalWidth === SPALTEN * KACHEL_W && bild.naturalHeight === Math.ceil(eintrag.nummern.length / SPALTEN) * KACHEL_H) {
        eintrag.zustand = 'bereit';
        eintrag.nummern.forEach(function (nr, slot) {
          vorschau[nr] = { blatt: bild, x: (slot % SPALTEN) * KACHEL_W, y: Math.floor(slot / SPALTEN) * KACHEL_H };
        });
        if (eintrag === fahrt[1]) {
          abrufdauer = Math.max(120, Math.min(850, (performance.now() - start) * 0.8));
          schnelleBilder = performance.now() - start < 140;
        }
        bogenBereit = true;
        letztesBlatt = performance.now();
        ladeBereit();
        if (imScrollweg) schmutzig = true;
      } else {
        eintrag.zustand = 'fehler';
        bogenFehler++;
      }
      planeBloecke();
      originaleNachladen();
    });
    if (!bild.getAttribute('src')) bild.src = 'wb4/assets/seq/detail/' + eintrag.name + '.avif';
  }

  function ladeBereit() {
    if (lade.classList.contains('lade--fertig')) return;
    balken.style.width = '100%';
    lade.classList.add('lade--fertig');
  }

  function ohneBoegen() { return bogenFehler >= 2 && !bogenBereit; }

  function planeBloecke() {
    if (!imScrollweg || ohneBoegen()) return;
    // Erst die ganze Strecke in immer kürzeren Abständen abdecken. So läuft
    // die Animation auf langsamem Netz auch dann weiter, wenn der Finger einem
    // regionalen Bildbogen bereits mehrere Posen voraus ist.
    for (var stufe = 0; stufe < fahrt.length; stufe++) {
      var eintrag = fahrt[stufe];
      if (eintrag.zustand === 'neu') ladeBlatt(eintrag);
      if (eintrag.zustand === 'laedt' && stufe < 2) return;
    }
    if (fahrt.some(function (bogen) { return bogen.zustand === 'laedt'; })) return;
    var index = Math.floor(ziel / BLOCK);
    var vorlauf = performance.now() - letzterWechsel < 150 ? tempo * abrufdauer : 0;
    var dort = Math.max(0, Math.min(bloecke.length - 1, Math.floor((ziel + vorlauf) / BLOCK)));
    // Mobile Browser müssen die bereits durchfahrene Strecke nicht dekodiert im Speicher halten.
    bloecke.forEach(function (bogen, k) {
      if (bogen.zustand !== 'bereit' || Math.abs(k - index) <= 1 || k === dort || k === dort + richtung || k === Math.floor(gezeigt / BLOCK)) return;
      bogen.nummern.forEach(function (nr) { vorschau[nr] = null; });
      bogen.zustand = 'neu';
    });
    // Der erste freie Download gehört dem Abschnitt, der voraussichtlich bei
    // seiner Ankunft zu sehen ist. Nachwischen und Richtungswechsel zählen sofort.
    [dort, dort + richtung, index].forEach(function (k) {
      var bogen = bloecke[k];
      if (offeneBloecke < 2 && bogen && bogen.zustand === 'neu') ladeBlatt(bogen);
    });
  }

  function fordereOriginal(nr, prioritaet) {
    angefordert[nr] = true;
    if (nr !== 0) offeneOriginale++;
    var bild = nr === 0 ? startmotiv.original : new Image();
    bild.fetchPriority = prioritaet || 'auto';
    bild.decoding = 'async';
    nachDekodierung(bild, function (ok) {
      if (nr !== 0) offeneOriginale--;
      if (ok && bild.naturalWidth) {
        if (nr > 0) ladeBereit();
        // Außerhalb der aktuellen Umgebung genügt der Browsercache. Das Hero bleibt erhalten.
        if (nr === 0 || Math.abs(nr - ziel) <= 6) bilder[nr] = bild;
        else angefordert[nr] = false;
        if (imScrollweg && nr >= Math.min(gezeigt, ziel) && nr <= Math.max(gezeigt, ziel)) schmutzig = true;
      }
      if (nr === 0) startbildFertig();
      originaleNachladen();
    });
    if (!bild.getAttribute('src')) bild.src = ordner + String(nr).padStart(4, '0') + '.webp';
  }

  function originalLimit() {
    return schnelleBilder || ohneBoegen() ? (klein ? 3 : 6) : 1;
  }

  function planeScharfesZiel() {
    clearTimeout(scharfTimer);
    if (!imScrollweg || angefordert[ziel]) return;
    scharfTimer = setTimeout(function () {
      // Ein reservierter Platz neben den laufenden Abrufen ist für die exakte Halteposition.
      if (imScrollweg && !angefordert[ziel] && offeneOriginale < originalLimit() + 1) fordereOriginal(ziel, 'high');
    }, 110);
  }

  function originaleNachladen() {
    if (!imScrollweg) return;
    for (var j = 1; j < N; j++) {
      if (bilder[j] && j !== gezeigt && Math.abs(j - ziel) > 6) {
        bilder[j] = null;
        angefordert[j] = false;
      }
    }
    var block = bloecke[Math.floor(ziel / BLOCK)];
    var stockt = ausweichen && block.zustand !== 'bereit' && performance.now() - letztesBlatt > 1100;
    var ausfall = ohneBoegen() || block.zustand === 'fehler' || stockt;
    // Bei langsamem Empfang genügt während der Fahrt der Bogen. Das exakte
    // Original am Haltepunkt erhält in planeScharfesZiel einen eigenen Platz.
    if (!schnelleBilder && !ausfall && !(ausweichen && !bogenBereit)) return;
    var limit = originalLimit();
    if (offeneOriginale >= limit) return;
    // Keine wartende Downloadliste. Ein Richtungswechsel gilt für jeden freien Platz.
    var reichweite = limit === 1 ? 0 : 5;
    function versuche(nr) {
      if (offeneOriginale < limit && nr >= 0 && nr < N && !angefordert[nr]) {
        fordereOriginal(nr, ausfall ? 'auto' : 'low');
      }
    }
    versuche(ziel);
    for (var abstand = 1; abstand <= reichweite && offeneOriginale < limit; abstand++) {
      versuche(ziel + richtung * abstand);
      if (abstand <= 2) versuche(ziel - richtung * abstand);
    }
  }

  function pruefeScrollweg() {
    if (!animationAktiv) return;
    var rand = buehne.getBoundingClientRect();
    // Erst eine Fahrt in der Bühne startet die Folge. Ihr sichtbares Ende und ein Rücksprung bleiben aktiv.
    var sichtbar = rand.top < -1 && (rand.bottom >= window.innerHeight ||
      (fahrtBegonnen && rand.bottom > Math.min(200, window.innerHeight / 2)));
    if (sichtbar === imScrollweg) return;
    imScrollweg = sichtbar;
    clearTimeout(ausweichTimer);
    clearTimeout(scharfTimer);
    ausweichen = false;
    if (!imScrollweg) return;
    schmutzig = true;
    lade.style.visibility = '';
    fahrtBegonnen = true;
    letztesBlatt = performance.now();
    planeBloecke();
    planeScharfesZiel();
    ausweichTimer = setTimeout(function () {
      ausweichen = true;
      originaleNachladen();
    }, 550);
    originaleNachladen();
  }

  function startbildFertig() {
    startbilderFertig++;
    if (!animationAktiv && (bilder[0] || kante.naturalWidth)) {
      animationAktiv = true;
      startmotiv.stop();
      html.classList.add('bereit');
      starteAnimation();
    }
    if (startbilderFertig === 2 && !animationAktiv) {
      html.classList.remove('bewegt', 'bereit');
      document.getElementById('ansicht').hidden = true;
      window.wb4Animation = false;
      return;
    }
    schmutzig = true;
    pruefeScrollweg();
  }

  window.addEventListener('scroll', pruefeScrollweg, { passive: true });
  window.addEventListener('load', function () {
    if (animationAktiv) ScrollTrigger.refresh();
    pruefeScrollweg();
  }, { once: true });
  if (window.wb4StartOben) ladeBlatt(fahrt[0]);
  nachDekodierung(kante, startbildFertig);
  fordereOriginal(0);
  window.wb4Animation = true;

  function starteAnimation() {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    // ------------------------------------------------------------ weiches Scrollen
    if (window.Lenis) {
      var lenis = new Lenis({ lerp: 0.11, smoothWheel: true, autoRaf: false });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
    }
    var kopf = document.getElementById('kopf');
    ScrollTrigger.create({ start: 40, end: 'max', onToggle: function (s) { kopf.classList.toggle('kopf--fest', s.isActive); } });

    groesse();
    gsap.set(st, lage().hero);
    gsap.ticker.add(male);

    var von = function (teil, feld) { return function () { return lage()[teil][feld]; }; };
    var tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: '#buehne', start: 'top top', end: 'bottom bottom', scrub: 0.5, invalidateOnRefresh: true },
      onUpdate: function () { schmutzig = true; }
    });
    // Erst geht das Licht an und der Text verschwindet, dann rückt das Produkt an seinen Platz für die Bildfolge.
    tl.fromTo(st, { licht: LICHT_START }, { licht: 1, duration: HERO * 0.8 }, 0)
      .to('#scrollhinweis', { opacity: 0, duration: HERO * 0.2 }, 0)
      .to('#hero', { opacity: 0, y: -36, duration: HERO * 0.36 }, HERO * 0.04)
      .fromTo(st,
        { cx: von('hero', 'cx'), cy: von('hero', 'cy'), skala: von('hero', 'skala') },
        { cx: von('folge', 'cx'), cy: von('folge', 'cy'), skala: von('folge', 'skala'), duration: HERO * 0.68, ease: 'power2.inOut' }, HERO * 0.32)
      .fromTo(fest, { '--schleier': 0 }, { '--schleier': 1, duration: 0.03 }, HERO)
      .fromTo(st, { bild: 0 }, { bild: N - 1, duration: 1 - HERO }, HERO);

    // Alle Einblendungen laufen nur über die Deckkraft (opacity), nicht über visibility. So bleiben die Texte für
    // Screenreader lesbar, auch wenn sie gerade nicht zu sehen sind.
    var rest = 1 - HERO, blende = 0.028 * rest;
    gsap.utils.toArray('.schritt').forEach(function (el, k) {
      var a = HERO + FENSTER[k][0] * rest, b = HERO + FENSTER[k][1] * rest;
      tl.fromTo(el, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: blende, ease: 'power1.out' }, a);
      if (FENSTER[k][1] < 1) tl.to(el, { opacity: 0, y: -22, duration: blende, ease: 'power1.in' }, b - blende);   // die letzte Zeile bleibt stehen
    });

    // ------------------------------------------------------------ 3: Zahl zählt hoch
    var wert = document.getElementById('zahlwert');
    if (wert) {
      var ziel = 200, z = { v: 0 };
      wert.textContent = '0';
      gsap.to(z, {
        v: ziel, duration: 1.8, ease: 'power2.out',
        scrollTrigger: { trigger: '#zahl', start: 'top 60%', once: true },
        onUpdate: function () { wert.textContent = String(Math.round(z.v)); }
      });
      gsap.from('.zahl__text > :not(h2)', { y: 26, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: '#zahl', start: 'top 60%', once: true } });
    }

    // ------------------------------------------------------------ 4: Bild wird ruhig, Text gleitet seitlich ein
    gsap.utils.toArray('.reihe').forEach(function (reihe) {
      var vonLinks = reihe.classList.contains('reihe--links');
      gsap.fromTo(reihe.querySelector('.reihe__bild img'), { scale: 1.16 }, {
        scale: 1, ease: 'none', scrollTrigger: { trigger: reihe, start: 'top bottom', end: 'bottom top', scrub: true }
      });
      gsap.fromTo(reihe.querySelector('.reihe__text'), { x: vonLinks ? -90 : 90, opacity: 0 }, {
        x: 0, opacity: 1, ease: 'power2.out', scrollTrigger: { trigger: reihe, start: 'top 72%', end: 'top 20%', scrub: 0.6 }
      });
    });

    // ------------------------------------------------------------ 5: Karten wachsen beim Hereinscrollen
    gsap.utils.toArray('.karte').forEach(function (karte) {
      gsap.fromTo(karte, { scale: 0.9, opacity: 0.3 }, {
        scale: 1, opacity: 1, ease: 'none', scrollTrigger: { trigger: karte, start: 'top 98%', end: 'top 46%', scrub: 0.5 }
      });
    });
    gsap.from('.labels__liste li', { y: 16, opacity: 0, duration: 0.5, stagger: 0.045, ease: 'power2.out', scrollTrigger: { trigger: '.labels', start: 'top 82%', once: true } });

    // ------------------------------------------------------------ 6: Abschluss
    document.querySelectorAll('#hilfe details').forEach(function (frage) {
      frage.addEventListener('toggle', function () { ScrollTrigger.refresh(); });
    });
    gsap.fromTo('.abschluss__bild img', { y: 60, scale: 0.94, opacity: 0.2 }, {
      y: 0, scale: 1, opacity: 1, ease: 'none', scrollTrigger: { trigger: '#abschluss', start: 'top 92%', end: 'top 26%', scrub: 0.6 }
    });

    // Bei einem Wisch noch während des Seitenaufbaus direkt an der aktuellen Position übernehmen.
    tl.progress(tl.scrollTrigger.progress);
    male();

    // ------------------------------------------------------------ Fenstergröße
    var warten;
    window.addEventListener('resize', function () {
      clearTimeout(warten);
      warten = setTimeout(function () {
        groesse();
        ScrollTrigger.refresh();
        pruefeScrollweg();
        // Vor dem Start der Fahrt steht das Produkt an der Hero-Stelle der neuen Fenstergröße
        if (tl.scrollTrigger.progress < HERO * 0.32) { gsap.set(st, lage().hero); schmutzig = true; }
      }, 160);
    });
  }
})();
