# Claude Code — Görev Listesi
**Söylemesi Bizden · v1.0 · 28 Temmuz 2026 (TRT)**

## Değişmez kurallar

CC bu kuralları **her görevde** uygular. İhlal, görevin başarısız
sayılması demektir.

1. **Yasak komutlar** — açık "EVET" olmadan asla:
   `git commit`, `git push`, `git push -f`, `git rebase`,
   `prisma migrate deploy`, `prisma db push`, `prisma migrate reset`,
   dosya silme.
2. **Paralel ajan yasak.** Bu depoda tek oturum, tek ajan.
3. **Kanıt kuralı.** "Yaptım" yeterli değil. Her görev, kabul
   kriterindeki komutun **ham çıktısıyla** kapanır.
4. **Kapsam dışına çıkma yok.** Görevde "dokunma" denen dosyalar
   değiştirilmez. Fazladan iyileştirme yapılmaz.
5. **Sahte veri etiketlenir.** Mock EİDS'ten gelen her kayıt arayüzde
   "DOĞRULANMAMIŞ — TEST VERİSİ" rozetiyle gösterilir.
6. **Para her yerde `BigInt` kuruş.** `Float` kullanımı yasak.
7. **Production DB'ye dokunulmaz.** Migration yalnızca yerel/gölge
   veritabanında denenir.
8. **Test beklentisi çıktıdan türetilmez.** Beklenen değer, fonksiyon
   çalıştırılmadan gereksinimden belirlenir. Her `it()` bloğu korunan
   gereksinimi tek cümleyle yazar; yorumsuz test kabul edilmez.
   Gerekçe: 15.08.2026'da `ibanMaskele()` hatalı yazıldı ve testi o
   hatayı "doğru" diye kaydetti — 98 test yeşil yanarken hata
   görünmedi. Ayrıntı: `test/KURALLAR.md`.
9. **Yeni güven kuralı, mutasyon listesine eklenir.**
   `npm run test:mutasyon` kritik kuralları bilerek bozar ve testlerin
   yakaladığını doğrular. Hayatta kalan mutasyon = korumasız kural.

## Şu an geçerli durum

- Dal: `chore/next-security-upgrade`, HEAD `3a19dca`
- `prisma/v2/schema.v2.prisma` — geçerli, migration üretilmedi
- `lib/eids/` — arayüz + mock hazır, gerçek sağlayıcı yok
- Eski şema (`prisma/schema.prisma`) hâlâ yürürlükte, dokunulmadı
