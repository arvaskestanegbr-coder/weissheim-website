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
  var canvas = document.getElementById('folge');
  var ctx = null;
  if (!ruhig && window.gsap && window.ScrollTrigger && canvas) {
    try { ctx = canvas.getContext('2d', { alpha: false }); } catch (fehler) { /* Standbilder bleiben verfügbar. */ }
  }
  if (!ctx) {
    html.classList.remove('bewegt', 'bereit');
    return;
  }
  html.classList.add('bewegt');

  // ------------------------------------------------------------ Bühne: Hero und Bildfolge
  var N = 140;            // Bilder der Folge (assets/seq/…/0000.webp bis 0139.webp)
  var HERO = 0.13;        // Anteil des Scrollwegs, in dem nur das Licht angeht
  var FORMAT = 0.8;       // Seitenverhältnis der Bilder (1080 × 1350)
  // Wann welche Textzeile steht, als Anteil der Bildfolge. Passt zum Ablauf in pipeline/dunkel_extra.py:
  // Ablage hebt ab · Taschen kommen heraus · Bügel lösen sich · Gestell hebt von den Rollen ab · alles setzt sich zusammen
  var FENSTER = [[0.05, 0.19], [0.21, 0.44], [0.47, 0.60], [0.61, 0.75], [0.80, 1]];

  var fest = canvas.parentElement;
  var buehne = document.getElementById('buehne');
  var claim = document.querySelector('.hero__claim');
  // Kleinere Bilder fürs Handy. Den Wert legt das Skript im Seitenkopf fest (index.html), weil es die beiden Bilder
  // des ersten Anblicks vorab anfordert; beide Stellen müssen denselben Bildsatz meinen.
  var klein = window.wb4KleineBilder === true;
  var ordner = 'wb4/assets/seq/' + (klein ? 'm' : 'd') + '/';
  var bilder = new Array(N);
  var kante = new Image();                    // Bild 0 nur mit Kantenlicht
  var LICHT_START = 0.48;  // so viel Hauptlicht liegt schon beim Laden auf dem Produkt
  var st = { licht: LICHT_START, bild: 0, cx: 0.5, cy: 0.5, skala: 1 };
  var schmutzig = true;

  function schmal() { return window.matchMedia('(max-width: 1023px), (max-height: 560px)').matches; }
  // Lage des Bildes auf der Bühne: Mitte (Anteil von Breite/Höhe) und Bildhöhe (Anteil der Bühnenhöhe)
  function lage() {
    if (window.matchMedia('(max-height: 560px) and (min-aspect-ratio: 4/3)').matches) {
      return { hero: { cx: 0.73, cy: 0.56, skala: 0.88 }, folge: { cx: 0.69, cy: 0.55, skala: 0.88 } };
    }
    if (schmal()) {
      // Auf kurzen Handydisplays braucht der umgebrochene Text mehr Platz. Die
      // freien Ränder des gerenderten Motivs liegen schon innerhalb des Bildes.
      var hoehe = Math.max(1, fest.clientHeight);
      var textEnde = (claim.offsetTop + claim.offsetHeight + 8) / hoehe;
      var unten = 1 - 42 / hoehe;
      var skala = Math.max(0, Math.min(0.74, (unten - textEnde) / 0.83));
      return { hero: { cx: 0.5, cy: (textEnde + unten) / 2, skala: skala }, folge: { cx: 0.5, cy: 0.43, skala: 0.82 } };
    }
    return { hero: { cx: 0.7, cy: 0.525, skala: 0.94 }, folge: { cx: 0.585, cy: 0.515, skala: 0.99 } };
  }

  function groesse() {
    var r = fest.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(r.width * dpr));
    canvas.height = Math.max(1, Math.round(r.height * dpr));
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    schmutzig = true;
  }

  // Solange noch nicht alle Bilder da sind, das nächstgelegene geladene zeigen
  function naechstes(i) {
    if (bilder[i]) return bilder[i];
    for (var d = 1; d < N; d++) {
      if (i - d >= 0 && bilder[i - d]) return bilder[i - d];
      if (i + d < N && bilder[i + d]) return bilder[i + d];
    }
    return kante.naturalWidth ? kante : null;
  }

  function male() {
    if (!schmutzig) return;
    schmutzig = false;
    var W = canvas.width, H = canvas.height;
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);
    var h = H * st.skala, w = h * FORMAT, x = W * st.cx - w / 2, y = H * st.cy - h / 2;
    var i = Math.max(0, Math.min(N - 1, Math.round(st.bild)));
    var imHero = st.licht < 0.999;
    if (imHero && kante.naturalWidth) {
      // Licht geht an: Bild mit Kantenlicht, darüber das voll ausgeleuchtete Bild 0 mit wachsender Deckkraft
      ctx.drawImage(kante, x, y, w, h);
      if (bilder[0]) { ctx.globalAlpha = st.licht; ctx.drawImage(bilder[0], x, y, w, h); ctx.globalAlpha = 1; }
      return;
    }
    var bild = naechstes(i);
    if (bild) ctx.drawImage(bild, x, y, w, h);
    vorwaermen(i);
  }

  // Die nächsten Bilder in Scrollrichtung vorab dekodieren. Sonst dekodiert der Browser ein Bild erst beim ersten
  // Zeichnen, und das kostet auf dem Hauptfaden einige Millisekunden je Bild.
  var warm = new Array(N), zuletzt = 0;
  function vorwaermen(i) {
    var richtung = i >= zuletzt ? 1 : -1;
    zuletzt = i;
    for (var k = 1; k <= 5; k++) {
      var j = i + richtung * k;
      if (j < 0 || j >= N || warm[j] || !bilder[j] || !bilder[j].decode) continue;
      warm[j] = true;
      bilder[j].decode().catch(function () {});
    }
  }

  // Ladereihenfolge: erst Bild 0, dann jedes 8., 4., 2., zuletzt der Rest. So lässt sich früh durchscrollen.
  var liste = (function () {
    var gesehen = {}, out = [];
    [N, 8, 4, 2, 1].forEach(function (schritt) {
      for (var i = 0; i < N; i += schritt) if (!gesehen[i]) { gesehen[i] = true; out.push(i); }
    });
    return out;
  })();
  var PARALLEL = 32;      // so viele Bilder der Folge laden gleichzeitig (über HTTP/2 und HTTP/3 eine Verbindung)
  var zeiger = 0, geladen = 0, versucht = 0;
  var startbilderFertig = 0, animationAktiv = false, laeuft = false;
  var seiteDa = document.readyState === 'complete';
  var lade = document.getElementById('lade');
  var balken = lade.querySelector('span');
  lade.style.visibility = 'hidden';

  function startbildFertig() {
    startbilderFertig++;
    if (!animationAktiv && (bilder[0] || kante.naturalWidth)) {
      animationAktiv = true;
      starteAnimation();
      html.classList.add('bereit');
    }
    if (startbilderFertig === 2 && !animationAktiv) {
      html.classList.remove('bewegt', 'bereit');
      document.getElementById('ansicht').hidden = true;
      window.wb4Animation = false;
      return;
    }
    schmutzig = true;
    starteBildfolge();
  }

  function hole(kette) {
    if (zeiger >= liste.length) return;
    var i = liste[zeiger++];
    var im = new Image();
    im.decoding = 'async';
    im.onload = im.onerror = function () {
      versucht++;
      if (im.naturalWidth) {
        bilder[i] = im;
        geladen++;
        schmutzig = true;
      }
      balken.style.width = (geladen / N * 100) + '%';
      if (versucht === N) lade.classList.add('lade--fertig');
      if (i === 0) startbildFertig();
      if (kette) hole(true);
    };
    im.src = ordner + ('000' + i).slice(-4) + '.webp';
  }

  // Direkte Sprünge zu Maßen und Farben verlassen die Bühne. Nur innerhalb ihres
  // Scrollwegs laden die übrigen 139 Bilder, frühestens nach dem load-Ereignis.
  function starteBildfolge() {
    if (laeuft || !animationAktiv || !seiteDa || startbilderFertig < 2) return;
    var rand = buehne.getBoundingClientRect();
    if (!(rand.top < -1 && rand.bottom > window.innerHeight)) return;
    laeuft = true;
    window.removeEventListener('scroll', starteBildfolge);
    lade.style.visibility = '';
    for (var k = 0; k < PARALLEL; k++) hole(true);
  }

  function seiteGeladen() {
    seiteDa = true;
    starteBildfolge();
    if (animationAktiv) ScrollTrigger.refresh();
  }

  window.addEventListener('scroll', starteBildfolge, { passive: true });
  window.addEventListener('hashchange', starteBildfolge);
  window.addEventListener('load', seiteGeladen, { once: true });
  if (seiteDa) seiteGeladen();
  kante.onload = kante.onerror = function () {
    startbildFertig();
  };
  kante.src = 'wb4/assets/hero-kante' + (klein ? '-m' : '') + '.webp';
  hole(false);

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
    gsap.from('.abschluss__text > *', { y: 26, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power2.out', scrollTrigger: { trigger: '#abschluss', start: 'top 52%', once: true } });

    // ------------------------------------------------------------ Fenstergröße
    var warten;
    window.addEventListener('resize', function () {
      clearTimeout(warten);
      warten = setTimeout(function () {
        groesse();
        ScrollTrigger.refresh();
        // Vor dem Start der Fahrt steht das Produkt an der Hero-Stelle der neuen Fenstergröße
        if (tl.scrollTrigger.progress < HERO * 0.32) { gsap.set(st, lage().hero); schmutzig = true; }
      }, 160);
    });
  }
})();
