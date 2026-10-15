# Çevrimdışı kullanım

Orijinal dosyalar değişmedi. Çevrimdışı sürümler ayrı dosyalardır:

- `japonca-defterim/offline.html`
- `tabi-kaiwa-defteri-offline.html`

Her ikisinde sağ altta **📚 Kütüphane** düğmesi vardır (kelime, kanji, gramer; romaji ve İngilizceyle de aranır).

## Nasıl açılır
1. Repoyu bilgisayara indir (Code → Download ZIP ya da `git clone`).
2. Mac'te `baslat.command` dosyasına çift tıkla. Yerel sunucu açılır, internet gerekmez.
   (İlk seferde sağ tık → Aç demen gerekebilir.)
3. Tabi Kaiwa dosyasını doğrudan çift tıklayıp da açabilirsin. Japonca Defterim'in kuromoji sözlüğü için sunucu şarttır.

## İçerik (`offline/`)
- `kuromoji.js`: morfolojik analiz kütüphanesi (CDN yerine yerel). Sözlüğü `japonca-defterim/dict/` içinde.
- `jmdict-common.js`: JMdict yaygın kelimeler, 22.645 giriş, İngilizce anlamlı.
- `kanjidic.js`: KANJIDIC2, 10.384 kanji (okunuşlar, anlam, JLPT, çizgi sayısı).
- `lookup.js`: arama paneli. Gramer sekmesinde N5–N3 temel kalıpları var.

Çevrimdışıyken çalışmayanlar (Japonca Defterim): Google/MyMemory çevirisi, Google IME kanji önerisi, Aozora ses bağlantıları.

Kaynaklar: JMdict ve KANJIDIC2 © EDRDG (CC BY-SA 4.0), jmdict-simplified çevirisi; kuromoji (Apache 2.0).
