/* Çevrimdışı Japonca kütüphanesi: kelime (JMdict), kanji (KANJIDIC2), gramer özeti.
   Veri dosyaları <script> ile yüklenir (window.JMDICT, window.KANJIDIC), bu yüzden file:// ile de çalışır.
   Uygulamanın kendi kodlarına dokunmaz; sağ altta bağımsız bir panel ekler. */
(function(){
  if (window.__offlineLib) return; window.__offlineLib = true;
  const BASE = (document.currentScript && document.currentScript.src || '').replace(/[^/]*$/, '');
  const IN_SHELL = (function(){ try{ return window.parent !== window && !!window.parent.document.getElementById('stage'); }catch(e){ return false; } })();
  function nav(to, q){ if (IN_SHELL){ window.parent.postMessage({type:'nav', to, q:q || '', kat:to === 'tabi'}, '*'); return; } const e = encodeURIComponent(q || ''); location.href = to === 'defter' ? BASE + '../japonca-defterim/offline.html' + (q ? '#q=' + e : '') : to === 'tabi' ? BASE + '../tabi-kaiwa-defteri-offline.html#kat' + (q ? ':' + e : '') : to === 'cekimler' ? BASE + 'cekimler.html' + (q ? '#v=' + e : '') : BASE + '../index.html'; }
  const GRAMMAR = [
    ['〜は〜です','N5','… …’dır (konu + isim cümlesi)','わたしは学生です。'],
    ['〜が好き / ほしい','N5','sevmek / istemek (nesne が alır)','ねこが好きです。'],
    ['〜ます / 〜ません','N5','nezaketli şimdiki-gelecek zaman, olumlu / olumsuz','毎日 水を飲みます。'],
    ['〜ました / 〜ませんでした','N5','nezaketli geçmiş zaman','きのう 映画を見ました。'],
    ['〜たい','N5','… istemek (fiil kökü + たい)','日本へ行きたいです。'],
    ['〜てください','N5','lütfen … (rica)','ゆっくり話してください。'],
    ['〜ている','N5','… -iyor (süregelen eylem / durum)','今、食べています。'],
    ['〜てもいいです','N5','… -ebilirsin / sakıncası yok (izin)','ここで写真をとってもいいですか。'],
    ['〜てはいけません','N5','… -memelisin (yasak)','ここで走ってはいけません。'],
    ['〜ないでください','N5','lütfen … -me','さわらないでください。'],
    ['〜から','N5','-dığı için (sebep)','雨ですから、行きません。'],
    ['〜が、〜','N5','ama / ancak','高いですが、おいしいです。'],
    ['〜と思います','N4','sanırım … / bence …','あした雨が降ると思います。'],
    ['〜ことができる','N4','… -ebilmek (yeterlilik)','日本語を話すことができます。'],
    ['〜たことがある','N4','… -miş olmak (deneyim)','京都に行ったことがあります。'],
    ['〜たり〜たりする','N4','bazen … bazen … (örnek eylemler)','休みの日は読んだり寝たりします。'],
    ['〜ながら','N4','… -erken (eşzamanlı iki eylem)','音楽を聞きながら勉強します。'],
    ['〜前に / 〜あとで','N4','… -meden önce / … -dikten sonra','食べる前に手を洗います。'],
    ['〜ので','N4','-dığı için (daha yumuşak sebep)','日本語が下手なので、ゆっくりお願いします。'],
    ['〜ために','N4','… için (amaç / sebep)','勉強するために日本へ行きます。'],
    ['〜ようにする','N4','… -meye çalışmak / dikkat etmek','毎日野菜を食べるようにしています。'],
    ['〜なければならない','N4','… -meli / -mak zorunda','早く寝なければなりません。'],
    ['〜たら','N4','-dığında / -se (koşul)','安かったら買います。'],
    ['〜ば','N4','-se (koşul, genel)','急げば間に合います。'],
    ['〜ても','N4','-se bile','雨が降っても行きます。'],
    ['〜そうだ','N4','gibi görünüyor / -ecek gibi','おいしそうですね。'],
    ['〜ようだ / 〜みたい','N4','-miş gibi, görünüşe göre','だれもいないようです。'],
    ['〜てもらう / 〜てくれる','N4','birinin benim için … yapması','友だちが教えてくれました。'],
    ['〜(ら)れる','N4','edilgen / saygı / yapabilme (bağlama göre)','先生に呼ばれました。'],
    ['〜させる','N4','-dirtmek (ettirgen)','子どもに野菜を食べさせます。'],
    ['〜つもり','N4','… niyetinde olmak','来年日本に住むつもりです。'],
    ['〜はずだ','N3','mutlaka … olmalı (beklenti)','もう着いているはずです。'],
    ['〜わけではない','N3','… demek değil','きらいなわけではありません。'],
    ['〜ことにする / 〜ことになる','N3','… karar vermek / … kararlaştırıldı','来月引っ越すことにしました。'],
    ['〜によって','N3','…’e göre, … sayesinde / tarafından','国によって文化が違います。'],
    ['〜として','N3','… olarak (sıfat)','留学生として日本に来ました。'],
    ['〜について','N3','… hakkında','日本の文化について話します。']
  ];
  const ROM = (function(){
    const t = {a:'あ',i:'い',u:'う',e:'え',o:'お',ka:'か',ki:'き',ku:'く',ke:'け',ko:'こ',sa:'さ',shi:'し',si:'し',su:'す',se:'せ',so:'そ',ta:'た',chi:'ち',ti:'ち',tsu:'つ',tu:'つ',te:'て',to:'と',na:'な',ni:'に',nu:'ぬ',ne:'ね',no:'の',ha:'は',hi:'ひ',fu:'ふ',hu:'ふ',he:'へ',ho:'ほ',ma:'ま',mi:'み',mu:'む',me:'め',mo:'も',ya:'や',yu:'ゆ',yo:'よ',ra:'ら',ri:'り',ru:'る',re:'れ',ro:'ろ',wa:'わ',wo:'を',ga:'が',gi:'ぎ',gu:'ぐ',ge:'げ',go:'ご',za:'ざ',ji:'じ',zi:'じ',zu:'ず',ze:'ぜ',zo:'ぞ',da:'だ',de:'で',do:'ど',ba:'ば',bi:'び',bu:'ぶ',be:'べ',bo:'ぼ',pa:'ぱ',pi:'ぴ',pu:'ぷ',pe:'ぺ',po:'ぽ',
      kya:'きゃ',kyu:'きゅ',kyo:'きょ',sha:'しゃ',shu:'しゅ',sho:'しょ',sya:'しゃ',syu:'しゅ',syo:'しょ',cha:'ちゃ',chu:'ちゅ',cho:'ちょ',tya:'ちゃ',tyu:'ちゅ',tyo:'ちょ',nya:'にゃ',nyu:'にゅ',nyo:'にょ',hya:'ひゃ',hyu:'ひゅ',hyo:'ひょ',mya:'みゃ',myu:'みゅ',myo:'みょ',rya:'りゃ',ryu:'りゅ',ryo:'りょ',gya:'ぎゃ',gyu:'ぎゅ',gyo:'ぎょ',ja:'じゃ',ju:'じゅ',jo:'じょ',jya:'じゃ',jyu:'じゅ',jyo:'じょ',bya:'びゃ',byu:'びゅ',byo:'びょ',pya:'ぴゃ',pyu:'ぴゅ',pyo:'ぴょ',n:'ん'};
    return function(s){
      s = s.toLowerCase().replace(/[^a-z'\-]/g,''); let out = '', i = 0;
      while (i < s.length){
        const c = s[i];
        if (c === '-'){ out += 'ー'; i++; continue; }
        if (c === "'"){ i++; continue; }
        if (c === s[i+1] && !'aiueon'.includes(c)){ out += 'っ'; i++; continue; }
        let hit = false;
        for (let l = 3; l >= 1; l--){
          const k = s.substr(i, l);
          if (t[k] && !(k === 'n' && /[aiueoy]/.test(s[i+1] || ''))){ out += t[k]; i += l; hit = true; break; }
        }
        if (!hit){ out += c; i++; }
      }
      return out;
    };
  })();
  const toHira = s => s.replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));
  const hasJp = s => /[぀-ヿ㐀-鿿]/.test(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  let loaded = null, index = null, TR = [], gramTried = false;
  function loadScript(src){ return new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = () => rej(new Error(src)); document.head.appendChild(s); }); }
  function ensureData(){
    if (loaded) return loaded;
    loaded = Promise.all([window.JMDICT ? 0 : loadScript(BASE + 'jmdict-common.js'), window.KANJIDIC ? 0 : loadScript(BASE + 'kanjidic.js'), window.VOCAB_EXTRA ? 0 : loadScript(BASE + 'vocab-extra.js').catch(() => 0)]).then(() => {
      TR = (window.VOCAB_EXTRA || []).map(v => ({ w: [[v[0]], v[1] ? [v[1]] : [], [v[4]], [v[2]]], f: v[0], k: toHira(v[1] || v[0]), t: v[2].toLowerCase() }));
      index = window.JMDICT.map((w, i) => ({ i, forms: w[0], kana: w[1].map(toHira), g: w[3].join(' ').toLowerCase() }));
    });
    return loaded;
  }

  function searchWords(q){
    const raw = q.trim(); if (!raw) return [];
    const jp = hasJp(raw);
    const kana = jp ? toHira(raw) : ROM(raw);
    const eng = !jp ? raw.toLowerCase() : null;
    const exact = [], pre = [], part = [];
    const trHits = [];
    for (const e of TR){
      if (jp ? (e.f === raw || e.k === kana) : (e.k === kana && /[ぁ-ん]/.test(kana) || e.t.split(/[,;] ?/).includes(raw.toLowerCase()))) trHits.push(e.w);
      else if (jp ? (e.f.startsWith(raw) || e.k.startsWith(kana)) : (e.t.includes(raw.toLowerCase()) && raw.length > 2)) part.push(e.w);
    }
    for (const w of trHits) exact.push(w);
    // the whole index is scanned so exact matches are never lost; only prefix / partial matches are capped
    const CAP = 400, hasKana = /[ぁ-ん]/.test(kana);
    const engRe = eng ? new RegExp('(^|[ ;(])' + eng.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '([ ;),]|$)') : null;
    for (const e of index){
      const w = window.JMDICT[e.i], full = pre.length + part.length >= CAP;
      if (jp){
        if (e.forms.includes(raw) || e.kana.includes(kana)) exact.push(w);
        else if (full) continue;
        else if (e.forms.some(f => f.startsWith(raw)) || e.kana.some(k => k.startsWith(kana))) pre.push(w);
        else if (e.forms.some(f => f.includes(raw)) || e.kana.some(k => k.includes(kana))) part.push(w);
      } else {
        if (hasKana && e.kana.includes(kana)) exact.push(w);
        else if (engRe.test(e.g)){ if (pre.length < CAP) pre.push(w); }
        else if (full) continue;
        else if (hasKana && e.kana.some(k => k.startsWith(kana))) part.push(w);
        else if (eng.length > 2 && e.g.includes(eng)) part.push(w);
      }
    }
    if (eng) pre.sort((x, y) => (y[3][0].toLowerCase().split('; ').includes(eng) ? 1 : 0) - (x[3][0].toLowerCase().split('; ').includes(eng) ? 1 : 0) || x[3][0].length - y[3][0].length);
    return exact.concat(pre, part).slice(0, 40);
  }
  function kanjiCards(q){
    const seen = new Set(), out = [];
    for (const ch of q){ if (window.KANJIDIC[ch] && !seen.has(ch)){ seen.add(ch); out.push(ch); } }
    if (!out.length && !hasJp(q) && q.trim().length > 2){
      const t = q.trim().toLowerCase();
      for (const ch in window.KANJIDIC){ if (window.KANJIDIC[ch][2].some(m => m.toLowerCase() === t)) out.push(ch); if (out.length >= 12) break; }
    }
    return out.slice(0, 12);
  }
  // KANJIDIC2 stores the old 4-level JLPT; map it to the nearest current level
  const JLPT_OLD = {4:'N5', 3:'N4', 2:'N3/N2', 1:'N1'};
  function kanjiHtml(ch){
    const k = window.KANJIDIC[ch];
    return '<div class="ol-k"><div class="ol-kc">' + esc(ch) + '</div><div><div class="ol-m">' + esc(k[2].join(', ')) + '</div>' +
      (k[0].length ? '<div class="ol-s">音 ' + esc(k[0].join('、')) + '</div>' : '') +
      (k[1].length ? '<div class="ol-s">訓 ' + esc(k[1].join('、')) + '</div>' : '') +
      '<div class="ol-s">' + (JLPT_OLD[k[4]] ? 'JLPT ' + JLPT_OLD[k[4]] + ' · ' : '') + (k[3] ? 'okul sınıfı ' + k[3] + ' · ' : '') + (k[5] ? k[5] + ' çizgi' : '') + '</div></div></div>';
  }
  function wordHtml(w){
    const head = w[0].length ? w[0][0] : w[1][0], isV = w[2].some(p => /^(v|fiil|adj|i-sıfat|na-sıfat)/.test(p));
    return '<div class="ol-w"><div class="ol-h"><b>' + esc(head) + '</b> <span>' + esc(w[1].join('、')) + '</span> <i>' + esc(w[2].join(', ')) + '</i></div><div class="ol-m">' +
      w[3].map((g, n) => (w[3].length > 1 ? (n + 1) + '. ' : '') + esc(g)).join('<br>') + '</div><div class="ol-act"><button data-nav="defter" data-q="' + esc(head) + '">帳 Defterde aç</button>' + (isV ? '<button data-nav="cekimler" data-q="' + esc(head) + '">変 Çek</button>' : '') + '</div></div>';
  }

  const css = document.createElement('style');
  css.textContent = '#ol-btn{position:fixed;right:14px;bottom:calc(14px + env(safe-area-inset-bottom,0px));z-index:9998;font:600 14px system-ui,sans-serif;border:none;border-radius:999px;padding:11px 16px;background:#26478a;color:#fff;box-shadow:0 4px 16px rgba(0,0,0,.28);cursor:pointer}' +
    '@media(max-width:640px){#ol-btn{font-size:0;padding:0;width:46px;height:46px;border-radius:50%}#ol-btn::before{content:"📚";font-size:20px}#ol-home{font-size:0!important;padding:0!important;width:46px;height:46px;border-radius:50%!important;display:grid;place-items:center}#ol-home::before{content:"🏠";font-size:20px}}' +
    '#ol-p{position:fixed;inset:0;z-index:9999;background:rgba(10,14,20,.55);display:flex;align-items:flex-end;justify-content:center}#ol-p[hidden]{display:none}' +
    '#ol-box{--b:#fff;--t:#18212f;--m:#5a6577;--l:#d5dce5;--a:#26478a;background:var(--b);color:var(--t);width:100%;max-width:680px;max-height:88vh;border-radius:16px 16px 0 0;display:flex;flex-direction:column;font:15px/1.5 -apple-system,"Hiragino Sans","Yu Gothic",system-ui,sans-serif}' +
    '@media(prefers-color-scheme:dark){#ol-box{--b:#171f2c;--t:#e6ebf2;--m:#98a3b5;--l:#2a3445;--a:#93b2ee}}' +
    '#ol-top{display:flex;gap:8px;padding:12px 14px 8px}#ol-q{flex:1;min-width:0;font:inherit;font-size:16px;padding:9px 12px;border:1px solid var(--l);border-radius:10px;background:transparent;color:var(--t)}' +
    '#ol-x{font:inherit;border:1px solid var(--l);background:transparent;color:var(--t);border-radius:10px;padding:0 12px;cursor:pointer}' +
    '#ol-tabs{display:flex;gap:6px;padding:0 14px 8px}#ol-tabs button{font:inherit;font-size:13px;font-weight:600;border:1px solid var(--l);background:transparent;color:var(--m);border-radius:999px;padding:4px 12px;cursor:pointer}#ol-tabs button[aria-pressed=true]{background:var(--a);border-color:var(--a);color:var(--b)}' +
    '#ol-out{overflow:auto;padding:0 14px 18px;flex:1}.ol-hint{color:var(--m);font-size:13px;margin:6px 0}' +
    '.ol-w,.ol-k,.ol-g{border-top:1px solid var(--l);padding:9px 0}.ol-h b{font-size:18px}.ol-h span{color:var(--m);margin-left:6px}.ol-h i{color:var(--a);font-size:12px;margin-left:6px}.ol-m{font-size:14px}' +
    '.ol-k{display:flex;gap:14px;align-items:flex-start}.ol-kc{font-size:44px;line-height:1.1;min-width:56px;text-align:center}.ol-s{color:var(--m);font-size:13px}.ol-g b{font-size:16px}.ol-g .ol-lv{font-size:11px;font-weight:700;color:var(--a);border:1px solid var(--a);border-radius:4px;padding:0 5px;margin-left:6px}.ol-g .ol-ex{color:var(--m);font-size:14px}.ol-act{display:flex;gap:6px;margin-top:5px}.ol-act button{font:600 12px system-ui,sans-serif;border:1px solid var(--l);background:transparent;color:var(--a);border-radius:999px;padding:3px 10px;cursor:pointer}#ol-home.hid{display:none}';
  document.head.appendChild(css);

  const home = document.createElement('a'); home.id = 'ol-home'; home.href = BASE + '../index.html'; home.textContent = '🏠 Ana sayfa';
  home.style.cssText = 'position:fixed;left:14px;bottom:calc(14px + env(safe-area-inset-bottom,0px));z-index:9998;font:600 14px system-ui,sans-serif;border-radius:999px;padding:11px 16px;background:#fff;color:#26478a;border:1px solid #26478a;box-shadow:0 4px 16px rgba(0,0,0,.2);text-decoration:none';
  const btn = document.createElement('button'); btn.id = 'ol-btn'; btn.type = 'button'; btn.textContent = '📚 Kütüphane';
  const pan = document.createElement('div'); pan.id = 'ol-p'; pan.hidden = true;
  pan.innerHTML = '<div id="ol-box" role="dialog" aria-label="Çevrimdışı Japonca kütüphanesi"><div id="ol-top"><input id="ol-q" type="search" placeholder="Kelime, kanji, romaji ya da İngilizce yaz…" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"><button id="ol-x" type="button">Kapat</button></div>' +
    '<div id="ol-tabs"><button data-t="word" aria-pressed="true" type="button">Kelime</button><button data-t="kanji" aria-pressed="false" type="button">Kanji</button><button data-t="gram" aria-pressed="false" type="button">Gramer</button><a id="ol-cek" href="#" style="font:600 13px system-ui,sans-serif;border:1px solid var(--l);color:var(--m);border-radius:999px;padding:4px 12px;text-decoration:none">📐 Çekimler</a></div><div id="ol-out"></div></div>';
  pan.querySelector('#ol-cek').href = BASE + 'cekimler.html';
  pan.querySelector('#ol-cek').addEventListener('click', e => { if (IN_SHELL){ e.preventDefault(); pan.hidden = true; nav('cekimler', ''); } });
  if (IN_SHELL) home.classList.add('hid');
  pan.addEventListener('click', e => { const b = e.target.closest('[data-nav]'); if (b){ pan.hidden = true; nav(b.dataset.nav, b.dataset.q); } });
  function mount(){ document.body.appendChild(home); document.body.appendChild(btn); document.body.appendChild(pan); }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);

  let tab = 'word';
  const out = () => pan.querySelector('#ol-out'), q = () => pan.querySelector('#ol-q');
  async function render(){
    const o = out(), text = q().value;
    if (tab === 'gram'){
      const t = text.trim().toLowerCase();
      if (!window.GRAMMAR_ALL && !gramTried){ gramTried = true; o.innerHTML = '<p class="ol-hint">Yükleniyor…</p>'; loadScript(BASE + 'grammar-all.js').catch(() => 0).then(render); return; }
      const src = window.GRAMMAR_ALL ? GRAMMAR_ALL.map(g => [g[0], g[2], g[1], g[3]]) : GRAMMAR;
      const list = src.filter(g => !t || (g[0] + g[1] + g[2] + g[3]).toLowerCase().includes(t)).slice(0, 400);
      o.innerHTML = '<p class="ol-hint">' + (window.GRAMMAR_ALL ? 'N5–N1 gramer kalıpları (' + GRAMMAR_ALL.length + ' kalıp, ' + list.length + ' gösteriliyor)' : 'Temel kalıplar (' + list.length + ')') + '. Kalıp, seviye (N3), anlam ya da konu (Koşul) yazarak filtrele.</p>' + list.map(g => '<div class="ol-g"><b>' + esc(g[0]) + '</b><span class="ol-lv">' + g[1] + '</span><div class="ol-m">' + esc(g[2]) + '</div><div class="ol-ex">' + esc(g[3]) + '</div><div class="ol-act"><button data-nav="tabi" data-q="' + esc(g[0].replace(/\s*\([^)]*\)\s*$/, '')) + '">旅 Kalıplarda bul</button></div></div>').join('');
      return;
    }
    o.innerHTML = '<p class="ol-hint">Yükleniyor…</p>';
    try { await ensureData(); } catch (e) { o.innerHTML = '<p class="ol-hint">Veri dosyaları yüklenemedi (' + esc(e.message) + '). libs klasörünün yanında olduğundan emin ol.</p>'; return; }
    if (!text.trim()){ o.innerHTML = '<p class="ol-hint">' + window.JMDICT.length.toLocaleString('tr') + ' yaygın kelime ve ' + Object.keys(window.KANJIDIC).length.toLocaleString('tr') + ' kanji, tamamen çevrimdışı. Japonca, romaji (taberu) ya da İngilizce (to eat) yazabilirsin.</p>'; return; }
    if (tab === 'kanji'){
      const ks = kanjiCards(text);
      o.innerHTML = ks.length ? ks.map(kanjiHtml).join('') : '<p class="ol-hint">Kanji bulunamadı. Bir kanji yaz ya da İngilizce anlamını yaz (water).</p>';
      return;
    }
    const ws = searchWords(text);
    o.innerHTML = ws.length ? ws.map(wordHtml).join('') : '<p class="ol-hint">Sonuç yok.</p>';
  }
  let timer;
  btn.addEventListener('click', () => { pan.hidden = false; q().focus(); render(); });
  pan.addEventListener('click', e => { if (e.target === pan || e.target.id === 'ol-x') pan.hidden = true; });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !pan.hidden) pan.hidden = true; });
  pan.addEventListener('input', e => { if (e.target.id === 'ol-q'){ clearTimeout(timer); timer = setTimeout(render, 160); } });
  pan.querySelector('#ol-tabs').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return; tab = b.dataset.t;
    pan.querySelectorAll('#ol-tabs button').forEach(x => x.setAttribute('aria-pressed', String(x === b))); render();
  });
})();
