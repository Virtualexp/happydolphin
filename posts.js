const myPosts = [
  {
    id: 20,
    title: "Terk Edilmiş Tesis (Sektör 7G)",
    date: "28 Mayıs 2026",
    tags: ["Keşif", "Tehlike"],
    content: "<p>Bugün yanlışlıkla Sektör 7G'nin kapılarını açtım. İçerisi tamamen suyla kaplıydı, ama yerçekimi... farklı çalışıyordu. Su tavana doğru akıyordu. Kapıyı hemen kapattım ve gördüklerimi günlüğüme yazmadan önce sistem loglarını sildim. Dolphin.corp fizik kurallarını ne zaman satın aldı?</p>",
    image: ""
  },
  {
    id: 19,
    title: "Sonar İletişim Protokolü V2",
    date: "27 Mayıs 2026",
    tags: ["Ağ", "Geliştirme"],
    content: "<p>Yunuslarla doğrudan veri aktarımı için Sonar Protokolü V2'yi derledim. İlk testte, yunuslardan gelen paketler sadece `HELP` string'inden ibaretti. Sistem hatası olduğunu umarak paketi yoksaydım. İşimi seviyorum. İşimi seviyorum. İşimi seviyorum.</p>",
    image: ""
  },
  {
    id: 18,
    title: "Mavi Ekran ve Okyanus",
    date: "26 Mayıs 2026",
    tags: ["Sistem", "Hata"],
    content: "<p>Ana sunucu çöktüğünde klasik 'Blue Screen of Death' (BSOD) yerine, ekran sadece koyu bir okyanus mavisine döndü ve hoparlörlerden balina şarkıları çalmaya başladı. Reset tuşu çalışmıyor. Fişi çektim, müzik hala devam ediyor.</p>",
    image: ""
  },
  {
    id: 17,
    title: "Gözetim Altındayız",
    date: "25 Mayıs 2026",
    tags: ["Paranoya", "Güvenlik"],
    content: "<p>Kameramın ışığı yanmıyor ama merceğin içinden bana bakan siyah bir göz olduğundan eminim. Bazen ofiste yalnızken klavye sesime bir eko eşlik ediyor. Tıklamalarım yankılanıyor... sanki suyun altında yazıyormuşum gibi.</p>",
    image: ""
  },
  {
    id: 16,
    title: "Fiziksel Mutasyonlar?",
    date: "24 Mayıs 2026",
    tags: ["Kişisel", "Sağlık"],
    content: "<p>Ellerimdeki deri kurumaya ve tuhaf bir şekilde pürüzsüzleşmeye başladı. Dün gece rüyamda sadece sonar frekansları gördüm. Doktora gitmeliyim ama şirketin sigortası sadece 'Veteriner' masraflarını karşılıyor. Nedenini sormaya korkuyorum.</p>",
    image: ""
  },
  {
    id: 15,
    title: "Yönetim Kurulu Toplantısı",
    date: "24 Mayıs 2026",
    tags: ["Ofis", "Toplantı"],
    content: "<p>Bugün yönetim kurulu toplantısı vardı. Masanın etrafında sandalyeler yerine devasa su tankları bulunuyordu. Kararlar baloncuk sayılarına göre alınıyordu. Maaş zammı teklifim 3 baloncukla reddedildi.</p>",
    image: ""
  },
  {
    id: 14,
    title: "Yunusça Çeviri Hatası",
    date: "23 Mayıs 2026",
    tags: ["Teknik", "Çeviri"],
    content: "<p>Yapay Zeka modelimiz yunusların aralarındaki konuşmayı İngilizceye çevirmeyi başardı. İlk çeviri şuydu: <i>'Kuru olanları ne zaman denize çekiyoruz?'</i> Modeli acilen sildim ve CEO Flipper'a 'Veriler bozuktu' dedim.</p>",
    image: ""
  },
  {
    id: 13,
    title: "Derin Su Basıncı Testi",
    date: "23 Mayıs 2026",
    tags: ["Matematik", "Fizik"],
    content: "<p>Test odasındaki basıncı hesaplarken bir anomali fark ettim.</p><p>$$ P = \\rho g h $$</p><p>Sorun şu ki, bulunduğumuz derinlikte (`h`) suyun yoğunluğu (`\\rho`) negatif çıkıyor. Yani su bizi ezmiyor, bizi kendine çekiyor. Laboratuvardan çıkmak istemiyorum.</p>",
    image: ""
  },
  {
    id: 12,
    title: "Sunucu Odasındaki Sesler",
    date: "23 Mayıs 2026",
    tags: ["Sistem", "Gizli"],
    content: "<p>Sunucu odasına bakım için girdiğimde fan seslerinin ritmik bir şekilde değiştiğini fark ettim. Mors alfabesine benziyordu. Çözdüğüm kadarıyla mesaj şu: <code>--. . .-.. .. -.</code> (GELİN). Bir daha o odaya girmeyeceğim.</p>",
    image: ""
  },
  {
    id: 11,
    title: "Project LEVIATHAN (Gizlilik Seviyesi: Kırmızı)",
    date: "23 Mayıs 2026",
    tags: ["Gizli", "Projeler"],
    content: "<p>Bugün server odasında yine su sızıntısı vardı. Teknik servisi aradığımda bana sadece 'Okyanus genişlemeye devam ediyor' dendi. Eğer Dolphin.corp gerçekten su altı veri merkezlerini balinaların beyin dalgalarıyla senkronize ediyorsa, o zaman bizim yazdığımız algoritmalar aslında birer rüya tercümanı mı?</p><p>Aşağıdaki veritabanı çıktısını incelemem lazım. Sadece anlamsız frekanslar gibi duruyor.</p><pre><code>01000100 01100101 01100101 01110000 00100000 01010111 01100001 01110100 01100101 01110010</code></pre>",
    image: ""
  },
  {
    id: 10,
    title: "İleri Matematik ve Kuantum (LaTeX Test - FIXED)",
    date: "22 Mayıs 2026",
    tags: ["Matematik", "Akademik", "Gizli"],
    content: `
      <p>Sonunda aradığım formülü buldum. Eğer bu denklem doğruysa okyanustaki tüm titreşimleri hesaplayabiliriz.</p>
      <p>Öncelikle temel Schrödinger denklemini ele alalım:</p>
      <p>
        $$ i\\hbar \\frac{\\partial}{\\partial t} \\Psi(\\mathbf{r},t) = \\left[ -\\frac{\\hbar^2}{2m}\\nabla^2 + V(\\mathbf{r},t) \\right] \\Psi(\\mathbf{r},t) $$
      </p>
      <p>Eğer \\( V(\\mathbf{r},t) \\) bir yunus sürüsünün yarattığı hidrodinamik potansiyele eşitse, okyanus içi enerji dağılımı şu integral ile modellenebilir:</p>
      <p>
        $$ E = \\int_{0}^{\\infty} \\int_{-\\pi}^{\\pi} f(r,\\theta) e^{-r^2} dr d\\theta $$
      </p>
      <p>Bu hesaplamayı asla üst yönetime (özellikle de Flipper'a) bahsetmemeliyiz. Çünkü formüldeki enerji sonsuzluğa gidiyor.</p>
    `,
    image: ""
  },
  {
    id: 9,
    title: "Sonar Uyumsuzluğu",
    date: "21 Mayıs 2026",
    tags: ["Teknik Notlar", "Günlük"],
    content: "<p>Sonar cihazından aldığımız dönütler normal bir yankıya benzemiyor. Sürekli olarak asal sayı dizileri tekrarlanıyor. Yunuslar matematik biliyor mu? Yoksa bu okyanusun dibindeki başka bir şey mi?</p><p>Log Kayıtları:<br>2, 3, 5, 7, 11, 13, 17, 19, 23, 29... <br>Sonraki sayıyı tahmin etmeleri imkansız olmalıydı.</p>",
    image: ""
  },
  {
    id: 8,
    title: "Yeni Stajyer: ECHO-4",
    date: "18 Mayıs 2026",
    tags: ["Ofis", "İnsan Kaynakları"],
    content: "<p>Bugün ofise yeni bir stajyer geldi. Adı yok, sadece ECHO-4 yaka kartı var. Sürekli ıslak dolaşıyor ve klavyeye basmak yerine sadece ekrana bakıp mırıldanıyor. İşin garibi, kodu benden daha hızlı derleniyor.</p>",
    image: ""
  },
  {
    id: 7,
    title: "Aqua-Net Protokolü",
    date: "15 Mayıs 2026",
    tags: ["Ağ", "Geliştirme"],
    content: "<p>Standart TCP/IP yerine yunusların kullandığı düşük frekanslı ses dalgalarını dijital veriye çeviren Aqua-Net protokolüne geçiş yaptık. İlk ping atışımda paket kaybı yaşamadım ama cevap olarak 'AÇIK DENİZ' string'i döndü.</p>",
    image: ""
  },
  {
    id: 6,
    title: "Kahve Makinesi ve Tuzlu Su",
    date: "12 Mayıs 2026",
    tags: ["Günlük", "Ofis"],
    content: "<p>Biri kahve makinesinin su haznesini okyanus suyuyla değiştirmiş. İçtiğim şeyin espresso değil kelimenin tam anlamıyla plankton çorbası olduğunu fark etmem 3 saniye sürdü. İş güvenliği departmanına (yani akvaryumdaki mürekkep balığına) şikayet dilekçemi yazdım.</p>",
    image: "dolphin.jpg"
  },
  {
    id: 5,
    title: "Sonsuz Okyanus Paradoksu",
    date: "10 Mayıs 2026",
    tags: ["Teori", "Matematik"],
    content: `
      <p>Okyanusun dibi olmadığını varsayarsak, basınç denklemi bir noktadan sonra çöker. Newton mekaniği yerine Riemann geometrisi kullanmamız gerekecek.</p>
      <p>$$ \\lim_{d \\to \\infty} P(d) = \\infty $$</p>
      <p>Eğer basınç sonsuzsa, biz aslında fiziksel bir varlık mıyız, yoksa sadece yoğunlaşmış bir matematiksel hata mıyız?</p>
    `,
    image: ""
  },
  {
    id: 4,
    title: "Flipper'ın Gözleri",
    date: "05 Mayıs 2026",
    tags: ["Kişisel", "Tehlike"],
    content: "<p>CEO Flipper ile bugün göz göze geldik. O karanlık, dipsiz siyah gözlerinde tüm insanlık tarihini gördüm sanki. Ya da sadece benden raporları istiyordu. İkisi de aynı derecede korkutucu.</p>",
    image: ""
  },
  {
    id: 3,
    title: "Sürüm 0.9b - Dalgalanmalar",
    date: "01 Mayıs 2026",
    tags: ["Yama Notları", "Sistem"],
    content: "<p>Sistemdeki tüm 'error' kelimeleri 'ripple' (dalgalanma) olarak değiştirildi. Çünkü Dolphin.corp'ta hata yapmayız, sadece suda dalga yaratırız.</p>",
    image: ""
  },
  {
    id: 2,
    title: "Düşüncelerim",
    date: "28 Nisan 2026",
    tags: ["Düşünceler", "İlk Günler"],
    content: "<p>Bazen bu şirkette ne yaptığımızı gerçekten bilmiyorum. Sadece yunus resimlerine bakıp 'Aquatic Synergy' kelimesini tekrarlıyoruz. Oysa ben sadece matematikle uğraşmak istiyordum...</p>",
    image: ""
  },
  {
    id: 1,
    title: "Eski Matematik Notları",
    date: "20 Nisan 2026",
    tags: ["Matematik", "Eski"],
    content: "<p>Kuantum Echolocation Formülü (Eski Sürüm)</p><br><p>f(x) = ∫(sin(x) * krill) dx</p><br><p>Eğer x = yunus ise, limit sıfıra yaklaşırken okyanus sonsuzdur.</p>",
    image: ""
  }
];
