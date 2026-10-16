// Çevrimdışı önbellek: ilk açılışta tüm dosyaları indirir, sonra internetsiz çalışır.
const CACHE = 'japonca-v19';
const FILES = [
 "./",
 "index.html",
 "manifest.json",
 "icons/icon-192.png",
 "icons/icon-512.png",
 "icons/apple-touch-icon.png",
 "japonca-defterim/offline.html",
 "japonca-defterim/index.html",
 "tabi-kaiwa-defteri-offline.html",
 "tabi-kaiwa-defteri.html",
 "offline/kuromoji.js",
 "offline/jmdict-common.js",
 "offline/kanjidic.js",
 "offline/vocab-extra.js",
 "offline/kanji-extra.js",
 "offline/grammar-extra.js",
 "offline/grammar-all.js",
 "offline/lookup.js",
 "offline/kaliplar.js",
 "offline/konular.js",
 "offline/cekimler.html",
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
// Yazı tipleri (Google Fonts) de önbelleğe alınır; internetsizken de aynı görünsün.
const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, {cache: 'reload'})))).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
// sayfa adresinden ?… ve #… atılır, böylece her arama için ayrı kopya birikmez
const pageKey = url => { const u = new URL(url); u.search = ''; u.hash = ''; return u.href; };
const offlineReply = () => new Response('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width"><p style="font:16px sans-serif;padding:24px">İnternet yok ve bu sayfa henüz önbellekte değil. Uygulamayı bir kez internetliyken açın.</p>', {status: 503, headers: {'Content-Type': 'text/html; charset=utf-8'}});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin && !FONT_HOSTS.includes(url.hostname)) return;   // dış bağlantılar: tarayıcıya bırak
  const isPage = e.request.mode === 'navigate' || (url.origin === location.origin && /\.html?$|\/$/.test(url.pathname));
  if (isPage){
    // sayfalar: önce ağ (güncellemeler görünsün), 4 sn içinde cevap yoksa ya da internet yoksa önbellek
    e.respondWith(new Promise(resolve => {
      let done = false;
      const fromCache = () => caches.match(pageKey(e.request.url), {ignoreSearch: true}).then(hit => hit || offlineReply());
      // yavaş bağlantı: önbellekte varsa onu göster; yoksa ağı beklemeye devam et
      const timer = setTimeout(() => caches.match(pageKey(e.request.url), {ignoreSearch: true}).then(hit => { if (hit && !done){ done = true; resolve(hit); } }), 4000);
      fetch(e.request.url, {cache: 'no-cache', credentials: 'same-origin'}).then(r => {
        if (r.ok){ const c = r.clone(); caches.open(CACHE).then(x => x.put(pageKey(e.request.url), c)); }
        if (!done){ done = true; clearTimeout(timer); resolve(r); }
      }).catch(() => fromCache().then(r => { if (!done){ done = true; clearTimeout(timer); resolve(r); } }));
    }));
    return;
  }
  const font = FONT_HOSTS.includes(url.hostname);
  if (url.origin !== location.origin && !font) return;
  e.respondWith(caches.match(e.request, {ignoreSearch: !font}).then(hit => hit || fetch(e.request).then(r => {
    if (r.ok || (font && r.type === 'opaque')) { const c = r.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); }
    return r;
  }).catch(() => new Response('', {status: 504}))));
});
