# Japonca Defterlerim

Üç uygulama tek sayfada: 帳 Japonca Defterim (kelime, kanji), 旅 Tabi Kaiwa (seyahat konuşması), 変 Çekimler. Tamamen çevrimdışı çalışır. Ayrıntılar: [OFFLINE.md](OFFLINE.md).

## Bilgisayarda açmak
```
python3 -m http.server 8765
```
Sonra tarayıcıda: http://localhost:8765/

Mac'te `baslat.command` dosyasına çift tıklamak da yeter.

## Telefondan açmak
1. Telefon ve bilgisayar aynı Wi-Fi'da olsun.
2. Bilgisayarda sunucu açıkken telefonun tarayıcısına bilgisayarın yerel IP'sini yaz, örn. `http://192.168.1.163:8765/`
3. Safari'de Paylaş → "Ana Ekrana Ekle" dersen uygulama gibi açılır; ilk açılıştan sonra internetsiz de çalışır.
