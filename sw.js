// Çevrimdışı önbellek: ilk açılışta tüm dosyaları indirir, sonra internetsiz çalışır.
const CACHE = 'japonca-v8';
const FILES = [
 "./",
 "index.html",
 "japonca-defterim/offline.html",
 "tabi-kaiwa-defteri-offline.html",
 "offline/kuromoji.js",
 "offline/jmdict-common.js",
 "offline/kanjidic.js",
 "offline/vocab-extra.js",
 "offline/kanji-extra.js",
 "offline/lookup.js",
 "japonca-defterim/dict/base.dat.gz.wasm",
 "japonca-defterim/dict/cc.dat.gz.wasm",
 "japonca-defterim/dict/check.dat.gz.wasm",
 "japonca-defterim/dict/tid.dat.gz.wasm",
 "japonca-defterim/dict/tid_map.dat.gz.wasm",
 "japonca-defterim/dict/tid_pos.dat.gz.wasm",
 "japonca-defterim/dict/unk.dat.gz.wasm",
 "japonca-defterim/dict/unk_char.dat.gz.wasm",
 "japonca-defterim/dict/unk_compat.dat.gz.wasm",
 "japonca-defterim/dict/unk_invoke.dat.gz.wasm",
 "japonca-defterim/dict/unk_map.dat.gz.wasm",
 "japonca-defterim/dict/unk_pos.dat.gz.wasm"
];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, {ignoreSearch: true}).then(hit => hit || fetch(e.request).then(r => {
    if (r.ok && new URL(e.request.url).origin === location.origin) { const c = r.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); }
    return r;
  })));
});
