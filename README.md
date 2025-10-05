# Exoplanet Detection AI Presentation

Bu proje, AI destekli ötegezegen tespiti konusunda Reveal.js tabanlı etkileşimli bir web sunumudur. Koyu uzay teması, yıldız animasyonları, Chart.js grafikleri ve çok dilli destek içerir.

## 🚀 Özellikler

- **Koyu Uzay Teması**: Koyu arka plan (#0a0e27) ve uzay renkleri
- **Yıldız Animasyonu**: CSS ile oluşturulmuş 3 katmanlı parallax yıldız alanı
- **Chart.js Grafikler**: Bar chart (accuracy/precision/recall) ve ROC eğrisi
- **Çok Dilli Destek**: TR/EN dil seçici
- **Klavye Kontrolü**: ← → tuşları ile slayt geçişi
- **PDF Çıktısı**: Print-PDF uyumlu
- **Live Demo Butonu**: Yeni sekmede demo açma
- **Dinamik Veri**: js/data.js'den gelen verilerle otomatik güncelleme

## 📁 Klasör Yapısı

```
presentation/
├── index.html          # Ana HTML dosyası
├── css/
│   ├── theme.css       # Koyu uzay teması
│   └── custom.css      # Özel bileşenler ve animasyonlar
├── js/
│   ├── data.js         # Dinamik veri objesi
│   └── init.js         # Reveal.js başlatma ve etkileşimler
└── README.md           # Bu dosya
```

## 🎯 Slayt Yapısı

1. **Başlık**: Proje tanıtımı ve istatistikler
2. **Motivasyon**: Projenin gerekliliği ve çözüm
3. **Veri Akışı**: MAST → YOLOv8 pipeline
4. **Yöntem**: BLS algoritması ve YOLOv8
5. **Eğitim**: Model performans grafikleri
6. **Web Arayüzü**: Discovery card, confidence gauge, mission badge
7. **Sonuçlar**: ROC eğrisi ve confusion matrix
8. **Gelecek Planları**: Roadmap ve teşekkürler

## 🛠️ Kurulum ve Çalıştırma

### Yerel HTTP Sunucu ile Çalıştırma

```bash
cd presentation

# Python HTTP sunucu
python -m http.server 8000

# Node.js http-server (alternatif)
npx http-server -p 8000

# PHP sunucu (alternatif)
php -S localhost:8000
```

Tarayıcıda açın: `http://localhost:8000`

### Live Demo Bağlantısı

Live Demo butonu varsayılan olarak `http://localhost:5000` adresini açar. Bu adresi değiştirmek için `js/data.js` dosyasındaki `EXO_DEMO.project.links.demo` değerini güncelleyin.

## 📊 Veri Güncelleme

Sunum içeriğini güncellemek için `js/data.js` dosyasını düzenleyin:

```javascript
window.EXO_DEMO = {
    project: {
        title: "Yeni Proje Başlığı",
        team: "Yeni Takım Adı",
        links: {
            demo: "http://yeni-demo-adresi.com"
        }
    },
    metrics: {
        accuracy: 0.99,  // Yeni doğruluk oranı
        precision: 0.98,
        recall: 1.0
    },
    // ... diğer veriler
};
```

## 🎨 Tema Özelleştirme

CSS değişkenleri ile renkleri özelleştirin (`css/theme.css`):

```css
:root {
    --bg: #0a0e27;        /* Arka plan rengi */
    --accent: #00d9ff;    /* Vurgu rengi */
    --violet: #7000ff;    /* Mor renk */
    --pink: #ff0080;      /* Pembe renk */
    --ok: #00ff88;        /* Başarı rengi */
    --err: #ff0044;       /* Hata rengi */
}
```

## 📄 PDF Çıktısı Alma

1. Tarayıcıda `http://localhost:8000/index.html?print-pdf` adresini açın
2. Chrome'da Ctrl+P (veya Cmd+P) ile yazdırma penceresini açın
3. "Hedef" olarak "PDF'ye Kaydet" seçin
4. "Ayarlar" → "Seçenekler" → "Arka plan grafikleri" işaretleyin
5. "Kaydet" butonuna tıklayın

## 🌟 Özellik Detayları

### Yıldız Animasyonu
- 150 adet rastgele konumlu yıldız
- 3 farklı animasyon katmanı (parallax efekti)
- CSS keyframes ile smooth animasyonlar

### Chart.js Entegrasyonu
- **Bar Chart**: Model performans metrikleri
- **Line Chart**: ROC eğrisi analizi
- Responsive tasarım ve koyu tema uyumlu renkler

### Çok Dilli Destek
- TR/EN dil seçici (sağ üst köşe)
- `data-i18n` attribute'ları ile otomatik çeviri
- Dinamik içerik güncelleme

### Responsive Tasarım
- Mobil ve tablet uyumlu
- Esnek grid sistemleri
- Touch-friendly kontroller

## 🔧 Geliştirme Notları

- **CDN Kullanımı**: Tüm harici kütüphaneler CDN'den yüklenir
- **Minimal Kod**: Gereksiz bağımlılıklar yok
- **Performans**: Optimize edilmiş animasyonlar
- **Erişilebilirlik**: Klavye navigasyonu ve screen reader uyumlu

## 📝 Lisans

Bu proje eğitim amaçlı oluşturulmuştur. NASA verileri ve açık kaynak kütüphaneler kullanılmıştır.

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 İletişim

- **Proje**: Exoplanet Detection with AI
- **Takım**: Teskilat
- **Demo**: http://localhost:5000

---

*Bu sunum, AI destekli ötegezegen tespiti projesinin teknik detaylarını ve sonuçlarını etkileşimli bir şekilde sunmak için tasarlanmıştır.*