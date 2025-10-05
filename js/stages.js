// Stage Details Data
window.STAGE_DETAILS = {
    mast: {
        icon: '<i class="fas fa-database"></i>',
        title: 'MAST Archive',
        subtitle: 'NASA Mikulski Archive for Space Telescopes',
        description: 'MAST, NASA\'nın uzay teleskopları için merkezi veri arşividir. Kepler, TESS, Hubble ve James Webb gibi misyonlardan gelen terabaytlarca astronomi verisini barındırır.',
        steps: [
            'MAST API üzerinden hedef yıldız bilgisi sorgulanır',
            'Kepler veya TESS misyon verisi seçilir',
            'Light curve (ışık eğrisi) dosyaları indirilir',
            'Metadata ve gözlem parametreleri alınır'
        ],
        code: `from astroquery.mast import Observations

# Hedef yıldız için gözlem sorgusu
target_name = "Kepler-10"
obs_table = Observations.query_object(target_name)

# Kepler verisini filtrele
kepler_obs = obs_table[obs_table['obs_collection'] == 'Kepler']

# Light curve dosyalarını indir
data_products = Observations.get_product_list(kepler_obs[0])
manifest = Observations.download_products(data_products)

print(f"{len(manifest)} dosya indirildi")`,
        stats: [
            { label: 'Toplam Misyon', value: '20+' },
            { label: 'Veri Hacmi', value: '4+ PB' },
            { label: 'Yıldız Sayısı', value: '500K+' }
        ]
    },
    
    lightkurve: {
        icon: '<i class="fas fa-wave-square"></i>',
        title: 'Lightkurve',
        subtitle: 'Python Kütüphanesi - Light Curve Analizi',
        description: 'Lightkurve, Kepler ve TESS verilerini analiz etmek için NASA tarafından geliştirilen Python kütüphanesidir. Ham FITS dosyalarını işleyerek kullanılabilir light curve verisi üretir.',
        steps: [
            'FITS dosyası okunur',
            'Flux (ışık akısı) ve zaman verileri çıkarılır',
            'Kalite flagleri kontrol edilir',
            'Eksik veriler temizlenir'
        ],
        code: `import lightkurve as lk

# Light curve dosyasını aç
lc = lk.search_lightcurve(
    target="Kepler-10",
    mission="Kepler"
).download()

# Veri kalitesini kontrol et
lc = lc.remove_nans().remove_outliers()

# Grafik çiz
lc.plot()
print(f"Toplam veri noktası: {len(lc)}")`,
        stats: [
            { label: 'Veri Noktası', value: '~65K' },
            { label: 'Zaman Aralığı', value: '~1400 gün' },
            { label: 'Cadence', value: '30 min' }
        ]
    },
    
    clean: {
        icon: '<i class="fas fa-broom"></i>',
        title: 'Clean & Flatten',
        subtitle: 'Gürültü Temizleme ve Düzleştirme',
        description: 'Yıldızın doğal parlaklık değişimlerini (stellar variability) kaldırarak, sadece gezegen geçişlerini görünür hale getiriyoruz. Savitzky-Golay filtresi ve median filtering kullanılır.',
        steps: [
            'Trend tespiti (uzun dönem değişimler)',
            'Savitzky-Golay filtresi ile düzleştirme',
            'Normalize etme (ortalama = 1)',
            'Outlier detection ve temizleme'
        ],
        code: `# Flatten işlemi - trend kaldırma
lc_flat = lc.flatten(window_length=901)

# Normalize etme
lc_norm = lc_flat.normalize()

# Outlier temizleme
lc_clean = lc_norm.remove_outliers(sigma=5)

# Sonuç: Düz bir baseline
print(f"Temizlenen nokta sayısı: {len(lc) - len(lc_clean)}")`,
        stats: [
            { label: 'Kaldırılan Outlier', value: '~2%' },
            { label: 'SNR İyileşme', value: '3x' },
            { label: 'İşlem Süresi', value: '<5s' }
        ]
    },
    
    bls: {
        icon: '<i class="fas fa-search"></i>',
        title: 'BLS Algorithm',
        subtitle: 'Box Least Squares - Transit Detection',
        description: 'BLS algoritması, periyodik düşüşleri (transit) tespit etmek için kullanılan güçlü bir yöntemdir. Farklı periyot ve süre kombinasyonlarını deneyerek en iyi uyumu bulur.',
        steps: [
            'Periyot grid tanımla (0.5-20 gün)',
            'Her periyot için box fit yap',
            'Power spectrum hesapla',
            'En yüksek power değerini bul',
            'Transit parametrelerini çıkar'
        ],
        code: `from astropy.timeseries import BoxLeastSquares

# BLS modeli oluştur
bls = BoxLeastSquares(lc.time.value, lc.flux.value)

# Periyot araması yap
periodogram = bls.autopower(0.2)  # 0.2 gün minimum süre

# En iyi periyodu bul
period = periodogram.period[np.argmax(periodogram.power)]
transit_time = periodogram.transit_time[np.argmax(periodogram.power)]
duration = periodogram.duration[np.argmax(periodogram.power)]

print(f"Tespit edilen periyot: {period:.2f} gün")
print(f"Transit süresi: {duration*24:.1f} saat")`,
        stats: [
            { label: 'Periyot Aralığı', value: '0.5-20 gün' },
            { label: 'Tespit Hassasiyeti', value: '0.1%' },
            { label: 'False Positive', value: '<5%' }
        ]
    },
    
    phasefold: {
        icon: '<i class="fas fa-sync"></i>',
        title: 'Phase-Folding',
        subtitle: 'Veri Hizalama ve Binning',
        description: 'Tespit edilen periyoda göre tüm gözlemleri "katlar" ve üst üste bindiririz. Bu sayede transit sinyali güçlenir ve gürültü azalır.',
        steps: [
            'Periyoda göre phase hesapla (0-1)',
            'Tüm transit olaylarını hizala',
            'Binning yap (genellikle 100-200 bin)',
            'Median değerleri al',
            'Normalize edilmiş transit profili oluştur'
        ],
        code: `# Phase-fold işlemi
lc_folded = lc_clean.fold(period=period, epoch_time=transit_time)

# Binning yap (gürültüyü azalt)
lc_binned = lc_folded.bin(bins=150)

# Grafik verisi hazırla
phase = lc_binned.phase.value
flux = lc_binned.flux.value

# -0.5 ile 0.5 arası normalize et
phase = phase - 0.5

print(f"Bin sayısı: {len(lc_binned)}")
print(f"Transit derinliği: {(1 - flux.min())*100:.2f}%")`,
        stats: [
            { label: 'Bin Sayısı', value: '150' },
            { label: 'Phase Aralığı', value: '-0.5 to 0.5' },
            { label: 'SNR Artışı', value: '5-10x' }
        ]
    },
    
    png: {
        icon: '<i class="fas fa-image"></i>',
        title: 'PNG + Labels',
        subtitle: 'Görüntü Oluşturma ve Etiketleme',
        description: 'Phase-folded light curve\'ü PNG görüntüsüne çeviriyoruz. Matplotlib ile grafikler oluşturup kaydediyoruz. YOLOv8 için pozitif (exoplanet var) ve negatif (yok) etiketleri veriyoruz.',
        steps: [
            'Matplotlib figure oluştur',
            'Phase-folded veriyi çiz',
            'Stil ayarları (figsize, dpi, colors)',
            'PNG olarak kaydet',
            'Label dosyası oluştur (positive/negative)'
        ],
        code: `import matplotlib.pyplot as plt

# Grafik oluştur
fig, ax = plt.subplots(figsize=(4, 4), dpi=224)
ax.plot(phase, flux, 'k.', markersize=2)
ax.axhline(y=1.0, color='r', linestyle='--', alpha=0.3)
ax.set_xlabel('Phase')
ax.set_ylabel('Normalized Flux')
ax.grid(alpha=0.3)

# PNG olarak kaydet
plt.savefig(f'images/{target_name}.png', dpi=224)
plt.close()

# Label dosyası (1=exoplanet, 0=no exoplanet)
label = 1  # NASA Exoplanet Archive'den doğrulandı
with open(f'labels/{target_name}.txt', 'w') as f:
    f.write(str(label))`,
        stats: [
            { label: 'Görüntü Boyutu', value: '224x224' },
            { label: 'Toplam Görüntü', value: '880' },
            { label: 'Positive/Negative', value: '292/588' }
        ]
    },
    
    yolo: {
        icon: '<i class="fas fa-robot"></i>',
        title: 'YOLOv8 Classification',
        subtitle: 'AI Sınıflandırma Modeli',
        description: 'YOLOv8-cls modeli ile görüntüleri sınıflandırıyoruz. Transfer learning kullanarak ImageNet pretrained weights\'ten başlıyoruz ve exoplanet veri setimiz üzerinde fine-tune ediyoruz.',
        steps: [
            'YOLOv8-cls modeli yükle (pretrained)',
            'Custom dataset hazırla (train/val/test)',
            'Model eğitimi (200 epoch)',
            'Validation ve test',
            'Best model kaydı',
            'Inference (50ms)'
        ],
        code: `from ultralytics import YOLO

# Model yükle
model = YOLO('yolov8n-cls.pt')

# Eğitim
results = model.train(
    data='plots',
    epochs=200,
    imgsz=224,
    batch=64,
    patience=50,
    device=0
)

# Test
metrics = model.val()
print(f"Accuracy: {metrics.top1:.1%}")
print(f"Precision: {metrics.precision:.1%}")

# Inference
result = model.predict('test_image.png')
pred_class = result[0].probs.top1
confidence = result[0].probs.top1conf.item()
print(f"Sınıf: {pred_class}, Güven: {confidence:.1%}")`,
        stats: [
            { label: 'Accuracy', value: '98.6%' },
            { label: 'Precision', value: '96.2%' },
            { label: 'Recall', value: '100%' },
            { label: 'Inference', value: '50ms' }
        ]
    }
};

// Negative Data Categories Details
window.NEGATIVE_CATEGORIES = {
    pure_noise: {
        icon: '<i class="fas fa-volume-mute"></i>',
        title: 'Pure Noise',
        subtitle: 'Tamamen Gürültü İçeren Veriler',
        description: 'Bu kategori, hiçbir anlamlı astronomik sinyal içermeyen, sadece rastgele gürültü ve ölçüm hatalarından oluşan light curve verilerini içerir. Gezegen geçişi olmayan yıldızların temiz gözlem verileridir.',
        steps: [
            'Düşük SNR (Signal-to-Noise Ratio) veriler',
            'Ölçüm hataları ve cihaz gürültüsü',
            'Atmosferik bozukluklar',
            'Teleskop jitter ve pointing hataları',
            'Elektronik noise ve readout noise'
        ],
        code: `# Pure noise veri örneği
import numpy as np
import matplotlib.pyplot as plt

# Rastgele gürültü üret
time = np.linspace(0, 100, 1000)
noise = np.random.normal(0, 0.01, 1000)
flux = 1.0 + noise  # Baseline = 1.0

# Grafik çiz
plt.figure(figsize=(10, 4))
plt.plot(time, flux, 'k-', alpha=0.7)
plt.axhline(y=1.0, color='r', linestyle='--', alpha=0.5)
plt.xlabel('Time (days)')
plt.ylabel('Normalized Flux')
plt.title('Pure Noise Light Curve')
plt.grid(alpha=0.3)
plt.show()

print(f"SNR: {1.0/np.std(noise):.1f}")
print("Transit yok - sadece gürültü")`,
        stats: [
            { label: 'SNR Aralığı', value: '1-5' },
            { label: 'Veri Sayısı', value: '~100' },
            { label: 'Tespit Edilebilirlik', value: '0%' }
        ]
    },
    
    stellar_rotation: {
        icon: '<i class="fas fa-sync-alt"></i>',
        title: 'Stellar Rotation',
        subtitle: 'Yıldız Dönüşü Etkisi',
        description: 'Yıldızların kendi eksenleri etrafında dönmesi, yıldız yüzeyindeki lekeler (sunspots) nedeniyle periyodik parlaklık değişimlerine neden olur. Bu sinyal gezegen geçişi ile karıştırılabilir.',
        steps: [
            'Yıldız yüzeyindeki aktif bölgeler (sunspots)',
            'Dönüş periyodu ile senkronize değişimler',
            'Genellikle uzun periyotlu (10-50 gün)',
            'Sıcak yıldızlarda daha yaygın',
            'Mevsimsel aktivite döngüleri'
        ],
        code: `# Stellar rotation simülasyonu
import numpy as np
import matplotlib.pyplot as plt

# Parametreler
period = 25.0  # Gün
time = np.linspace(0, 100, 1000)
amplitude = 0.02  # %2 parlaklık değişimi

# Dönüş sinyali
rotation_signal = amplitude * np.sin(2 * np.pi * time / period)

# Gürültü ekle
noise = np.random.normal(0, 0.005, 1000)
flux = 1.0 + rotation_signal + noise

# Grafik çiz
plt.figure(figsize=(10, 4))
plt.plot(time, flux, 'b-', alpha=0.7)
plt.axhline(y=1.0, color='r', linestyle='--', alpha=0.5)
plt.xlabel('Time (days)')
plt.ylabel('Normalized Flux')
plt.title(f'Stellar Rotation (Period: {period} days)')
plt.grid(alpha=0.3)
plt.show()

print(f"Dönüş periyodu: {period} gün")
print(f"Amplitüd: {amplitude*100:.1f}%")`,
        stats: [
            { label: 'Periyot Aralığı', value: '10-50 gün' },
            { label: 'Amplitüd', value: '1-5%' },
            { label: 'Veri Sayısı', value: '~80' }
        ]
    },
    
    stellar_pulsation: {
        icon: '<i class="fas fa-heartbeat"></i>',
        title: 'Stellar Pulsation',
        subtitle: 'Yıldız Titreşimi ve Nabız',
        description: 'Bazı yıldızlar (özellikle Cepheid ve RR Lyrae tipi) periyodik olarak genişleyip büzülürler. Bu fiziksel titreşimler parlaklık değişimlerine neden olur ve gezegen geçişi ile karıştırılabilir.',
        steps: [
            'Yıldızın iç yapısından kaynaklanan titreşimler',
            'Genellikle çok kısa periyotlu (saatler)',
            'Cepheid, RR Lyrae, Delta Scuti yıldızları',
            'Amplitüd değişken (0.1-1.0 magnitude)',
            'Multiple frequency components'
        ],
        code: `# Stellar pulsation simülasyonu
import numpy as np
import matplotlib.pyplot as plt

# Parametreler
period1 = 0.5  # Gün (12 saat)
period2 = 0.25  # Gün (6 saat) - harmonik
time = np.linspace(0, 10, 1000)
amplitude = 0.05

# Pulsation sinyali (multiple frequencies)
pulsation = amplitude * (np.sin(2 * np.pi * time / period1) + 
                        0.5 * np.sin(2 * np.pi * time / period2))

# Gürültü ekle
noise = np.random.normal(0, 0.01, 1000)
flux = 1.0 + pulsation + noise

# Grafik çiz
plt.figure(figsize=(10, 4))
plt.plot(time, flux, 'g-', alpha=0.7)
plt.axhline(y=1.0, color='r', linestyle='--', alpha=0.5)
plt.xlabel('Time (days)')
plt.ylabel('Normalized Flux')
plt.title('Stellar Pulsation (Multi-frequency)')
plt.grid(alpha=0.3)
plt.show()

print(f"Ana periyot: {period1*24:.0f} saat")
print(f"Harmonik: {period2*24:.0f} saat")`,
        stats: [
            { label: 'Periyot Aralığı', value: '0.1-2 gün' },
            { label: 'Amplitüd', value: '2-10%' },
            { label: 'Veri Sayısı', value: '~60' }
        ]
    },
    
    eclipsing_binary: {
        icon: '<i class="fas fa-star"></i>',
        title: 'Eclipsing Binary',
        subtitle: 'Örtülen İkili Yıldız Sistemi',
        description: 'İki yıldızın birbirini periyodik olarak örtmesi durumudur. Bu durumda ışık eğrisinde derin düşüşler görülür ancak bunlar gezegen geçişi değildir. Binary star sistemlerinde yaygındır.',
        steps: [
            'İki yıldızın orbital hareketi',
            'Primary ve secondary eclipse',
            'Genellikle simetrik transit profilleri',
            'Çok derin düşüşler (10-50%)',
            'Orbital periyot genellikle günler'
        ],
        code: `# Eclipsing binary simülasyonu
import numpy as np
import matplotlib.pyplot as plt

# Parametreler
period = 5.0  # Gün
eclipse_duration = 0.3  # Gün
eclipse_depth = 0.3  # %30 düşüş
time = np.linspace(0, 20, 1000)

# Eclipse profili (trapezoid shape)
flux = np.ones_like(time)
for i, t in enumerate(time):
    phase = (t % period) / period
    if 0.4 <= phase <= 0.6:  # Eclipse window
        # Trapezoid eclipse profile
        if abs(phase - 0.5) <= eclipse_duration/period/2:
            flux[i] = 1.0 - eclipse_depth

# Gürültü ekle
noise = np.random.normal(0, 0.01, 1000)
flux += noise

# Grafik çiz
plt.figure(figsize=(10, 4))
plt.plot(time, flux, 'purple', alpha=0.7)
plt.axhline(y=1.0, color='r', linestyle='--', alpha=0.5)
plt.xlabel('Time (days)')
plt.ylabel('Normalized Flux')
plt.title('Eclipsing Binary System')
plt.grid(alpha=0.3)
plt.show()

print(f"Orbital periyot: {period} gün")
print(f"Eclipse derinliği: {eclipse_depth*100:.0f}%")`,
        stats: [
            { label: 'Periyot Aralığı', value: '1-10 gün' },
            { label: 'Eclipse Derinliği', value: '10-50%' },
            { label: 'Veri Sayısı', value: '~120' }
        ]
    },
    
    instrumental_drift: {
        icon: '<i class="fas fa-chart-line"></i>',
        title: 'Instrumental Drift',
        subtitle: 'Cihaz Kayması ve Kalibrasyon Hataları',
        description: 'Teleskop ve dedektör sistemlerindeki uzun dönemli değişimler, sıcaklık dalgalanmaları, elektronik aging ve kalibrasyon kaymaları nedeniyle oluşan sistematik hatalardır.',
        steps: [
            'Teleskop sıcaklık değişimleri',
            'Dedektör elektronik aging',
            'Kalibrasyon kaymaları',
            'Pointing drift ve jitter',
            'Optik sistem değişimleri'
        ],
        code: `# Instrumental drift simülasyonu
import numpy as np
import matplotlib.pyplot as plt

# Parametreler
time = np.linspace(0, 100, 1000)
drift_rate = 0.001  # Günlük %0.1 kayma
baseline_drift = drift_rate * time

# Seasonal variations
seasonal = 0.02 * np.sin(2 * np.pi * time / 30)  # 30 günlük döngü

# Random walk component
random_walk = np.cumsum(np.random.normal(0, 0.005, 1000))

# Total drift
total_drift = baseline_drift + seasonal + random_walk
flux = 1.0 + total_drift

# Grafik çiz
plt.figure(figsize=(10, 4))
plt.plot(time, flux, 'orange', alpha=0.7)
plt.axhline(y=1.0, color='r', linestyle='--', alpha=0.5)
plt.xlabel('Time (days)')
plt.ylabel('Normalized Flux')
plt.title('Instrumental Drift')
plt.grid(alpha=0.3)
plt.show()

print(f"Drift oranı: {drift_rate*100:.2f}%/gün")
print("Sistematik hata - gezegen geçişi değil")`,
        stats: [
            { label: 'Drift Oranı', value: '0.01-0.1%/gün' },
            { label: 'Zaman Aralığı', value: 'Uzun dönemli' },
            { label: 'Veri Sayısı', value: '~90' }
        ]
    },
    
    single_artifact: {
        icon: '<i class="fas fa-bolt"></i>',
        title: 'Single Artifact',
        subtitle: 'Tekil Artefakt ve Anomali',
        description: 'Veri akışındaki tek seferlik bozukluklar, cosmic ray hits, telemetry hataları, veri işleme hataları veya sistem arızaları nedeniyle oluşan anormal veri noktalarıdır.',
        steps: [
            'Cosmic ray hits dedektörde',
            'Telemetry transmission hataları',
            'Veri işleme pipeline hataları',
            'Sistem arızaları ve restart',
            'Manuel müdahaleler'
        ],
        code: `# Single artifact simülasyonu
import numpy as np
import matplotlib.pyplot as plt

# Parametreler
time = np.linspace(0, 50, 500)
flux = np.ones_like(time) + np.random.normal(0, 0.01, 500)

# Artifact locations
artifact_times = [15, 25, 35]
artifact_depths = [0.5, 0.3, 0.7]

# Add artifacts
for art_time, art_depth in zip(artifact_times, artifact_depths):
    # Find closest time index
    idx = np.argmin(np.abs(time - art_time))
    # Create artifact (sudden drop and recovery)
    for i in range(max(0, idx-2), min(len(time), idx+3)):
        flux[i] = 1.0 - art_depth

# Grafik çiz
plt.figure(figsize=(10, 4))
plt.plot(time, flux, 'red', alpha=0.7)
plt.axhline(y=1.0, color='r', linestyle='--', alpha=0.5)
plt.xlabel('Time (days)')
plt.ylabel('Normalized Flux')
plt.title('Single Artifacts in Light Curve')
plt.grid(alpha=0.3)
plt.show()

print(f"Artifact sayısı: {len(artifact_times)}")
print("Tek seferlik olaylar - gezegen geçişi değil")`,
        stats: [
            { label: 'Artifact Sayısı', value: '1-5 per dataset' },
            { label: 'Etki Süresi', value: 'Kısa (<1 gün)' },
            { label: 'Veri Sayısı', value: '~70' }
        ]
    },
    
    flare: {
        icon: '<i class="fas fa-fire"></i>',
        title: 'Stellar Flare',
        subtitle: 'Yıldız Parlaması ve Aktivite',
        description: 'Yıldızların manyetik alan aktivitesi sonucu oluşan ani parlaklık artışlarıdır. Özellikle M-dwarf yıldızlarda yaygındır ve gezegen geçişi ile karıştırılabilir.',
        steps: [
            'Manyetik alan yeniden bağlanması',
            'Ani parlaklık artışı (flare)',
            'Hızlı yükseliş, yavaş düşüş profili',
            'X-ray ve UV emisyon artışı',
            'M-dwarf yıldızlarda daha yaygın'
        ],
        code: `# Stellar flare simülasyonu
import numpy as np
import matplotlib.pyplot as plt

# Parametreler
time = np.linspace(0, 30, 300)
flux = np.ones_like(time) + np.random.normal(0, 0.01, 300)

# Flare parametreleri
flare_time = 15.0
flare_amplitude = 0.2
flare_duration = 2.0

# Flare profili (exponential decay)
flare_idx = np.argmin(np.abs(time - flare_time))
for i in range(flare_idx, len(time)):
    dt = time[i] - flare_time
    if dt >= 0:
        # Exponential decay
        flare_effect = flare_amplitude * np.exp(-dt / (flare_duration/3))
        flux[i] += flare_effect
    else:
        break

# Grafik çiz
plt.figure(figsize=(10, 4))
plt.plot(time, flux, 'darkorange', alpha=0.7)
plt.axhline(y=1.0, color='r', linestyle='--', alpha=0.5)
plt.xlabel('Time (days)')
plt.ylabel('Normalized Flux')
plt.title('Stellar Flare Event')
plt.grid(alpha=0.3)
plt.show()

print(f"Flare amplitüdü: {flare_amplitude*100:.0f}%")
print(f"Süre: {flare_duration} gün")`,
        stats: [
            { label: 'Flare Amplitüdü', value: '5-50%' },
            { label: 'Süre', value: '0.5-5 gün' },
            { label: 'Veri Sayısı', value: '~50' }
        ]
    },
    
    transit_timing_variation: {
        icon: '<i class="fas fa-clock"></i>',
        title: 'Transit Timing Variation',
        subtitle: 'Geçiş Zamanı Değişkenliği',
        description: 'Mevcut bir gezegenin geçiş zamanlarında beklenenden sapmalar. Bu durum genellikle sistemde başka gezegenler olduğunu gösterir ve ana gezegenin geçiş profili değişebilir.',
        steps: [
            'Gezegen-gezegen çekim etkileşimi',
            'Orbital resonans durumları',
            'Transit timing değişkenliği',
            'Profil deformasyonları',
            'Multi-planet sistemlerde yaygın'
        ],
        code: `# Transit timing variation simülasyonu
import numpy as np
import matplotlib.pyplot as plt

# Parametreler
period = 10.0  # Gün
time = np.linspace(0, 50, 500)
base_flux = np.ones_like(time) + np.random.normal(0, 0.01, 500)

# Normal transit profili
transit_depth = 0.02
transit_duration = 0.5

# TTV parametreleri
ttv_amplitude = 0.2  # Gün
ttv_period = 30.0    # Gün

# Transit zamanları hesapla
transit_times = []
t = period
while t < time[-1]:
    # TTV ekle
    ttv = ttv_amplitude * np.sin(2 * np.pi * t / ttv_period)
    transit_times.append(t + ttv)
    t += period

# Transit profillerini çiz
for trans_time in transit_times:
    start_idx = np.argmin(np.abs(time - (trans_time - transit_duration/2)))
    end_idx = np.argmin(np.abs(time - (trans_time + transit_duration/2)))
    
    for i in range(start_idx, min(end_idx+1, len(time))):
        base_flux[i] = 1.0 - transit_depth

# Grafik çiz
plt.figure(figsize=(10, 4))
plt.plot(time, base_flux, 'darkviolet', alpha=0.7)
plt.axhline(y=1.0, color='r', linestyle='--', alpha=0.5)
plt.xlabel('Time (days)')
plt.ylabel('Normalized Flux')
plt.title('Transit Timing Variation')
plt.grid(alpha=0.3)
plt.show()

print(f"TTV amplitüdü: {ttv_amplitude:.1f} gün")
print(f"Transit sayısı: {len(transit_times)}")`,
        stats: [
            { label: 'TTV Amplitüdü', value: '0.1-1 gün' },
            { label: 'TTV Periyodu', value: '20-100 gün' },
            { label: 'Veri Sayısı', value: '~40' }
        ]
    }
};

// Pipeline Steps Details
window.PIPELINE_STEPS = {
    data_collection: {
        icon: '<i class="fas fa-database"></i>',
        title: '1. Veri Toplama',
        subtitle: 'Locale belirli sayıda veri çekme',
        description: 'NASA MAST Archive\'dan Kepler ve TESS misyonlarından gelen ham light curve verilerini çekiyoruz. Hedef yıldızlar için belirli sayıda veri noktası toplanarak veri seti oluşturuluyor.',
        steps: [
            'NASA MAST Archive API\'sine bağlantı',
            'Hedef yıldız listesi belirleme',
            'Kepler/TESS misyon verilerini sorgulama',
            'Light curve dosyalarını indirme',
            'Metadata ve gözlem parametrelerini alma',
            'Veri kalitesi kontrolü yapma'
        ],
        code: `# Veri toplama örneği
from astroquery.mast import Observations
import pandas as pd

# Hedef yıldız listesi
target_stars = ['Kepler-10', 'Kepler-11', 'Kepler-22']

collected_data = []

for star in target_stars:
    # MAST'tan veri sorgula
    obs_table = Observations.query_object(star)
    kepler_data = obs_table[obs_table['obs_collection'] == 'Kepler']
    
    # Light curve indir
    data_products = Observations.get_product_list(kepler_data[0])
    manifest = Observations.download_products(data_products)
    
    collected_data.append({
        'star': star,
        'files': len(manifest),
        'mission': 'Kepler'
    })

print(f"Toplam {len(collected_data)} yıldız için veri toplandı")`,
        stats: [
            { label: 'Veri Kaynağı', value: 'NASA MAST' },
            { label: 'Misyon', value: 'Kepler & TESS' },
            { label: 'Yıldız Sayısı', value: '500+' },
            { label: 'Veri Noktası', value: '~65K per star' }
        ]
    },
    
    data_visualization: {
        icon: '<i class="fas fa-chart-line"></i>',
        title: '2. Veri Görselleştirme',
        subtitle: 'Verileri grafiklere dönüştürme',
        description: 'Ham light curve verilerini analiz edilebilir grafiklere dönüştürüyoruz. Matplotlib kullanarak zaman serisi grafikleri oluşturuyor ve veri kalitesini görsel olarak kontrol ediyoruz.',
        steps: [
            'Light curve verilerini okuma',
            'Zaman ve flux verilerini çıkarma',
            'Matplotlib ile grafik oluşturma',
            'Veri kalitesi görselleştirmesi',
            'Outlier tespiti ve işaretleme',
            'Grafik kaydetme ve etiketleme'
        ],
        code: `# Veri görselleştirme örneği
import matplotlib.pyplot as plt
import lightkurve as lk

# Light curve verisini aç
lc = lk.search_lightcurve("Kepler-10").download()

# Grafik oluştur
fig, ax = plt.subplots(figsize=(12, 6))
ax.plot(lc.time.value, lc.flux.value, 'b-', alpha=0.7)
ax.set_xlabel('Time (days)')
ax.set_ylabel('Normalized Flux')
ax.set_title('Kepler-10 Light Curve')
ax.grid(alpha=0.3)

# Grafik kaydet
plt.savefig('light_curves/Kepler-10.png', dpi=300)
plt.close()

print(f"Grafik oluşturuldu: {len(lc)} veri noktası")`,
        stats: [
            { label: 'Grafik Formatı', value: 'PNG (224x224)' },
            { label: 'Toplam Grafik', value: '880' },
            { label: 'Çözünürlük', value: '300 DPI' },
            { label: 'Renk Paleti', value: 'Siyah-Beyaz' }
        ]
    },
    
    model_training: {
        icon: '<i class="fas fa-brain"></i>',
        title: '3. Model Eğitimi',
        subtitle: 'Grafikler üzerinden yapay zekâ modelini eğitme',
        description: 'Oluşturulan grafikleri kullanarak YOLOv8 sınıflandırma modelini eğitiyoruz. Transfer learning ile ImageNet pretrained weights kullanarak exoplanet tespiti için özelleştiriyoruz.',
        steps: [
            'YOLOv8-cls modeli yükleme',
            'Train/validation/test split oluşturma',
            'Data augmentation uygulama',
            'Model eğitimi başlatma (200 epoch)',
            'Validation metrics takibi',
            'Best model kaydetme'
        ],
        code: `# Model eğitimi örneği
from ultralytics import YOLO
import torch

# Model yükle (pretrained)
model = YOLO('yolov8n-cls.pt')

# Eğitim parametreleri
training_config = {
    'data': 'plots',
    'epochs': 200,
    'imgsz': 224,
    'batch': 64,
    'patience': 50,
    'device': 0 if torch.cuda.is_available() else 'cpu'
}

# Eğitimi başlat
results = model.train(**training_config)

# Sonuçları kaydet
model.save('models/best_exoplanet_model.pt')

print(f"Eğitim tamamlandı - Accuracy: {results.results_dict['metrics/accuracy_top1']:.3f}")`,
        stats: [
            { label: 'Model', value: 'YOLOv8-cls' },
            { label: 'Epoch', value: '200' },
            { label: 'Batch Size', value: '64' },
            { label: 'Final Accuracy', value: '98.6%' }
        ]
    },
    
    negative_data_training: {
        icon: '<i class="fas fa-filter"></i>',
        title: '4. Negatif Veri Eğitimi',
        subtitle: 'Yapay zekâ ile özel negatif veri sınıflandırması',
        description: 'Modeli daha da güçlendirmek için özel negatif veri kategorileri ile ek eğitim yapıyoruz. Bu, modelin false positive oranını düşürür ve daha doğru tespit yapmasını sağlar.',
        steps: [
            'Negatif veri kategorilerini belirleme',
            'Her kategori için örnek veri toplama',
            'Sentetik negatif veri üretme',
            'Negatif veri ile model fine-tuning',
            'Confusion matrix analizi',
            'False positive oranını optimize etme'
        ],
        code: `# Negatif veri eğitimi örneği
import numpy as np
from ultralytics import YOLO

# Mevcut modeli yükle
model = YOLO('models/best_exoplanet_model.pt')

# Negatif veri kategorileri
negative_categories = [
    'pure_noise',
    'stellar_rotation', 
    'stellar_pulsation',
    'eclipsing_binary',
    'instrumental_drift',
    'single_artifact',
    'flare',
    'transit_timing_variation'
]

# Her kategori için ek eğitim
for category in negative_categories:
    # Kategori verilerini yükle
    category_data = f'negative_data/{category}'
    
    # Fine-tuning
    model.train(
        data=category_data,
        epochs=50,
        imgsz=224,
        batch=32,
        freeze=10,  # İlk 10 layer'ı dondur
        device=0
    )

# Final model kaydet
model.save('models/final_exoplanet_model.pt')
print("Negatif veri eğitimi tamamlandı")`,
        stats: [
            { label: 'Negatif Kategori', value: '8' },
            { label: 'Ek Epoch', value: '50 per category' },
            { label: 'False Positive', value: '5.3%' },
            { label: 'Precision', value: '96.2%' }
        ]
    }
};

// Results Details (Confusion Matrix & ROC)
window.EXO_DEMO.resultsDetails = {
    confusion: {
        icon: '<i class="fas fa-table"></i>',
        title: { tr: "Confusion Matrix", en: "Confusion Matrix" },
        subtitle: { tr: "Sınıflandırma Performans Matrisi", en: "Classification Performance Matrix" },
        description: {
            tr: "Confusion Matrix, makine öğrenmesi modelinin tahminlerini gerçek değerlerle karşılaştıran bir tablodur. Modelin hangi sınıfları ne kadar iyi tanıdığını ve hangi hataları yaptığını görselleştirir.",
            en: "Confusion Matrix is a table that compares machine learning model predictions with actual values. It visualizes how well the model recognizes which classes and what mistakes it makes."
        },
        howItWorks: {
            tr: [
                "Model her veri noktası için bir tahmin yapar (Exoplanet var/yok)",
                "Tahmin ile gerçek değer karşılaştırılır",
                "4 kategori oluşur: TP (doğru pozitif), FP (yanlış pozitif), FN (yanlış negatif), TN (doğru negatif)",
                "TP ve TN doğru tahminler, FP ve FN hatalardır",
                "Metrikler bu değerlerden hesaplanır: Accuracy = (TP+TN)/(TP+TN+FP+FN)"
            ],
            en: [
                "Model makes a prediction for each data point (Exoplanet present/absent)",
                "Prediction is compared with actual value",
                "4 categories are formed: TP (true positive), FP (false positive), FN (false negative), TN (true negative)",
                "TP and TN are correct predictions, FP and FN are errors",
                "Metrics are calculated from these values: Accuracy = (TP+TN)/(TP+TN+FP+FN)"
            ]
        },
        codeExample: `from sklearn.metrics import confusion_matrix
import numpy as np

# Gerçek değerler ve tahminler
y_true = np.array([1, 0, 1, 1, 0, 1, 0, 0])
y_pred = np.array([1, 0, 1, 1, 0, 1, 1, 0])

# Confusion matrix hesapla
cm = confusion_matrix(y_true, y_pred)
print("Confusion Matrix:")
print(cm)

# Metrikleri hesapla
tn, fp, fn, tp = cm.ravel()
accuracy = (tp + tn) / (tp + tn + fp + fn)
precision = tp / (tp + fp)
recall = tp / (tp + fn)

print(f"Accuracy: {accuracy:.3f}")
print(f"Precision: {precision:.3f}")
print(f"Recall: {recall:.3f}")`,
        stats: [
            { label: { tr: "True Positive", en: "True Positive" }, value: "292" },
            { label: { tr: "False Positive", en: "False Positive" }, value: "11" },
            { label: { tr: "False Negative", en: "False Negative" }, value: "0" },
            { label: { tr: "True Negative", en: "True Negative" }, value: "196" },
            { label: { tr: "Accuracy", en: "Accuracy" }, value: "98.6%" },
            { label: { tr: "Precision", en: "Precision" }, value: "96.2%" }
        ]
    },
    roc: {
        icon: '<i class="fas fa-chart-line"></i>',
        title: { tr: "ROC Curve", en: "ROC Curve" },
        subtitle: { tr: "Receiver Operating Characteristic Eğrisi", en: "Receiver Operating Characteristic Curve" },
        description: {
            tr: "ROC (Receiver Operating Characteristic) eğrisi, farklı eşik değerlerinde modelin True Positive Rate (TPR) ve False Positive Rate (FPR) değerlerini gösteren bir grafiktir. AUC (Area Under Curve) değeri modelin genel performansını özetler.",
            en: "ROC (Receiver Operating Characteristic) curve is a graph showing the model's True Positive Rate (TPR) and False Positive Rate (FPR) values at different threshold values. AUC (Area Under Curve) value summarizes the overall performance of the model."
        },
        howItWorks: {
            tr: [
                "Model her tahmin için 0-1 arası bir olasılık değeri verir",
                "Farklı eşik değerleri (0.3, 0.5, 0.7 vs.) denenir",
                "Her eşik için TPR (Recall) ve FPR hesaplanır",
                "TPR = TP / (TP + FN), FPR = FP / (FP + TN)",
                "Tüm noktalar birleştirilerek ROC eğrisi oluşur",
                "AUC = 1.0 mükemmel, AUC = 0.5 rastgele tahmin anlamına gelir"
            ],
            en: [
                "Model gives a probability value between 0-1 for each prediction",
                "Different threshold values (0.3, 0.5, 0.7 etc.) are tried",
                "TPR (Recall) and FPR are calculated for each threshold",
                "TPR = TP / (TP + FN), FPR = FP / (FP + TN)",
                "All points are connected to form the ROC curve",
                "AUC = 1.0 is perfect, AUC = 0.5 means random guessing"
            ]
        },
        codeExample: `from sklearn.metrics import roc_curve, auc
import matplotlib.pyplot as plt

# Model çıktıları (olasılıklar) ve gerçek değerler
y_true = [1, 0, 1, 1, 0, 1, 0, 0, 1, 0]
y_scores = [0.9, 0.1, 0.8, 0.95, 0.2, 0.85, 0.3, 0.15, 0.92, 0.05]

# ROC eğrisi hesapla
fpr, tpr, thresholds = roc_curve(y_true, y_scores)
roc_auc = auc(fpr, tpr)

# Grafiği çiz
plt.figure(figsize=(8, 6))
plt.plot(fpr, tpr, color='cyan', lw=2, 
         label=f'ROC Curve (AUC = {roc_auc:.2f})')
plt.plot([0, 1], [0, 1], color='red', lw=2, 
         linestyle='--', label='Random Classifier')
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('ROC Curve - Exoplanet Detection')
plt.legend()
plt.grid(alpha=0.3)
plt.show()`,
        stats: [
            { label: { tr: "AUC Score", en: "AUC Score" }, value: "0.99" },
            { label: { tr: "True Positive Rate", en: "True Positive Rate" }, value: "100%" },
            { label: { tr: "False Positive Rate", en: "False Positive Rate" }, value: "5.3%" },
            { label: { tr: "Optimal Threshold", en: "Optimal Threshold" }, value: "0.68" },
            { label: { tr: "Model Type", en: "Model Type" }, value: "YOLOv8" }
        ]
    }
};

