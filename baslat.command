#!/bin/bash
# Çevrimdışı başlatıcı: bu klasörü yerel sunucuyla açar (internet gerekmez).
cd "$(dirname "$0")"
PORT=8765
echo "Sunucu: http://localhost:$PORT  (kapatmak için bu pencereyi kapat)"
( sleep 1; open "http://localhost:$PORT/" ) &
python3 -m http.server $PORT
