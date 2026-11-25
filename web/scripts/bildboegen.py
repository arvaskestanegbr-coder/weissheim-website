"""Bildbögen aus den vorhandenen WEISSHEIM-WebP-Originalen erzeugen (ImageMagick und avifenc)."""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from tempfile import TemporaryDirectory
import subprocess

quelle = Path(__file__).resolve().parents[1] / 'public/wb4/assets/seq'
ziel = quelle / 'detail'
ziel.mkdir(exist_ok=True)

def bogen_erzeugen(auftrag):
    name, nummern, qualitaet = auftrag
    bilder = [str(quelle / 'm' / f'{n:04}.webp') for n in nummern]
    datei = ziel / f'{name}.avif'
    with TemporaryDirectory() as tmp:
        montage = str(Path(tmp) / 'bogen.png')
        subprocess.run(['magick', 'montage', '(', *bilder, '-crop', '448x832+160+48', '+repage',
                        '-filter', 'Lanczos', '-resize', '336x624!', ')', '-tile', '6x',
                        '-background', 'black', '-geometry', '+0+0', montage], check=True)
        subprocess.run(['avifenc', '-q', str(qualitaet), '--speed', '6', '--jobs', '3',
                        montage, str(datei)], stdout=subprocess.DEVNULL, check=True)
    return f'{name}: {len(nummern)} Posen, {datei.stat().st_size} Byte'

auftraege = []
for rest in [0, 4, 2, 6]:
    nummern = [n for n in range(1, 140) if n % 8 == rest or (rest == 0 and n == 139)]
    auftraege.append((f'fahrt-{rest}', nummern, 38))
for start in range(0, 140, 24):
    nummern = list(range(start + 1, min(start + 24, 139), 2))
    auftraege.append((f'bewegung-{start:03}', nummern, 37))
assert sorted(n for _, nummern, _ in auftraege for n in nummern) == list(range(1, 140))
with ThreadPoolExecutor(max_workers=3) as pool:
    for ergebnis in pool.map(bogen_erzeugen, auftraege):
        print(ergebnis)
