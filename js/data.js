// Exoplanet Detection Demo Data
window.EXO_DEMO = {
    project: {
        title: "A World Away: Hunting for Exoplanets with AI",
        team: "Teskilat",
        links: {
            demo: "http://localhost:5000"
        }
    },
    metrics: {
        accuracy: 0.986,
        precision: 0.962,
        recall: 1.0,
        roc: {
            fpr: [0, 0.02, 0.05, 0.1, 0.15, 0.2, 0.3, 0.4, 0.5, 0.7, 0.9, 1],
            tpr: [0, 0.6, 0.75, 0.85, 0.90, 0.92, 0.95, 0.97, 0.98, 0.99, 1.0, 1]
        }
    },
    ui: {
        discoveryText: "Kepler-10b discovered by NASA (2011) via Transit Method",
        confirmed: true,
        gauge: 0.938,
        mission: "Kepler"
    },
    pipeline: ["MAST", "Lightkurve", "Clean/Flatten", "BLS", "Phase-Fold", "PNG/Labels", "YOLOv8"],
    roadmap: [
        "Dinamik veri entegrasyonu: Sadece local veri kullanmıyoruz; anlık veri çekip sonuç verebiliyoruz.",
        "Akıllı veri biriktirme: Kullanıcı sorguları API'den çekilip local veri setine kaydediliyor. Tekrar kullanımda işlem süresi kısalır, veri seti büyür.",
        "Sentetik negatif üretimi: Negatif veriler belirgin özelliklerine göre AI ile oluşturuluyor; model doğruluğu artıyor.",
        "Çoklu giriş desteği: Yıldız ismi yanında kullanıcının yüklediği grafikleri de analiz edebiliyoruz."
    ]
};

// I18N Translations
window.I18N = {
    tr: {
        title: "Uzak Bir Dünya: AI ile Ötegezegen Avcılığı",
        team: "Teskilat",
        openDemo: "Canlı Demo Aç",
        aiPowered: "AI-Powered",
        accuracy: "Doğruluk",
        datasets: "VeriSeti",
        inference: "Veri Çıkarma Hızı",
        
        motivationTitle: "Motivasyon",
        motivCard1Title: "Zorluk",
        motivCard1: "Binlerce yıldız, milyonlarca veri noktası. Manuel analiz imkansız.",
        motivCard2Title: "Problem",
        motivCard2: "Manuel analiz yavaş, hata eğilimli ve ölçeklenemiyor.",
        motivCard3Title: "Çözüm",
        motivCard3: "AI ile hızlı, doğru ve ölçeklenebilir otomatik tespit.",
        confirmedPlanets: "Onaylanmış Ötegezegen",
        humanError: "İnsan Hata Oranı",
        aiAccuracy: "AI Doğruluğu",
        
        pipelineTitle: "Veri Akışı",
        pipelineNote: "NASA arşivinden ham verilerin işlenmesi ve model eğitimi",
        stage1: "NASA veri arşivi",
        stage2: "Veri çıkarımı",
        stage3: "Gürültü temizleme",
        stage4: "Geçiş tespiti",
        stage5: "Veri hizalama",
        stage6: "Görüntü oluşturma",
        stage7: "AI Sınıflandırma",
        images: "görüntü",
        stages: "aşama",
        processing: "işleme süresi",
        processingTimePhrase: "dakika işleme süresi",
        
        methodTitle: "Yöntem",
        bls1: "Box Least Squares periyot araması",
        bls2: "Işık eğrilerinde geçiş tespiti",
        bls3: "Faz katlama optimizasyonu",
        yolo1: "Derin öğrenme sınıflandırma",
        yolo2: "Hızlı çıkarım (~50ms)",
        yolo3: "%98.6 doğruluk",
        
        trainingTitle: "Eğitim Sonuçları",
        
        webUITitle: "Web Arayüzü",
        uiSubtitle: "Kullanıcı dostu arayüz ile gerçek zamanlı analiz",
        sampleDataNote: "* Görseldeki veriler örnek olarak gösterilmiştir",
        discoveryCard: "Keşif Kartı",
        confidenceGauge: "Güven Göstergesi",
        missionBadge: "Görev Rozeti",
        nasaConfirmed: "NASA Onaylı",
        userDiscovery: "Kullanıcı Keşfi",
        viewArchive: "Arşivi Görüntüle",
        discoveredByNasa: "NASA tarafından keşfedildi",
        transitMethod: "Transit Yöntemi",
        verified: "Doğrulandı",
        spaceObservatory: "Uzay Gözlemevi",
        launch: "Fırlatma",
        planets: "Gezegenler",
        aiPowered: "AI ile Güçlendirilmiş",
        confidence: "Güven",
        confidenceLow: "Düşük",
        confidenceMedium: "Orta",
        confidenceHigh: "Yüksek",
        
        resultsTitle: "Sonuçlar",
        confusionMatrix: "Karmaşıklık Matrisi",
        accuracy: "Doğruluk",
        precision: "Kesinlik",
        recall: "Duyarlılık",
        
        roadmapTitle: "Gelecek Planları",
        highlightsTitle: "Bizi Öne Çıkaranlar",
        highlight1: "<strong>Dinamik canlı veri</strong>: Anlık kaynaklardan veri çekip hemen sonuç üretir.",
        highlight2: "<strong>Otomatik önbellekleme</strong>: Yeni sorgular API’den alınır, yerelde saklanır; tekrarında daha hızlıdır ve veri seti kullanıcıyla büyür.",
        highlight3: "<strong>Yapay negatif sentezi</strong>: Spesifik <span class='interactive-negative-data' data-popup='negative-categories'>negatif veriler</span> AI ile üretilir; pozitif benzerlik tuzaklarını azaltır, doğruluğu yükseltir.",
        highlight4: "<strong>Esnek giriş</strong>: Yalnızca yıldız adı değil, yüklenen grafikler de modele verilip sonuç alınır.",
        
        // Negative categories popup (TR)
        negativePopupButton: "Tipik Negatifler",
        negativePopupTitle: "Negatif Veri Kategorileri",
        negativePopupSubtitle: "Negatif verilerle yapılan ek eğitim → bizi diğer çalışmalardan öne çıkarıyor",
        catPureNoise: "Pure Noise",
        catStellarRotation: "Stellar Rotation",
        catStellarPulsation: "Stellar Pulsation",
        catEclipsingBinary: "Eclipsing Binary",
        catInstrumentalDrift: "Instrumental Drift",
        catSingleArtifact: "Single Artifact",
        catFlare: "Flare",
        catTTV: "Transit Timing Variation",
        
        // Credits
        creditsTitle: "Hazırlayanlar",
        referencesTitle: "Kaynakça",
        dataSources: "Veri Kaynakları",
        webTechnologies: "Web Teknolojileri",
        creditsSubtitle: "Bu projeyi hayata geçiren ekip",
        mainTeamTitle: "Proje Ekibi",
        bibliographyTitle: "Kaynakça",
        teamMember1Name: "Muhammed Yusuf TOSUN",
        teamMember1Role: "AI Developer & Data Scientist",
        teamMember1Desc: "Model geliştirme ve veri analizi",
        teamMember2Name: "Mustafa BOSNALI",
        teamMember2Role: "Full Stack Developer",
        teamMember2Desc: "Web arayüzü ve backend geliştirme",
        teamMember3Name: "Hikmet ALANLI",
        teamMember3Role: "Data Engineer & Researcher",
        teamMember3Desc: "Veri pipeline ve araştırma",
        nasaRef: "NASA MAST Archive",
        nasaRefDesc: "Kepler ve TESS veri arşivi",
        lightkurveRef: "Lightkurve Library",
        lightkurveRefDesc: "Kepler veri analizi kütüphanesi",
        yoloRef: "YOLOv8 Model",
        yoloRefDesc: "Object detection framework",
        projectYear: "2024-2025",
        projectInstitution: "Your University / Organization",
        projectCompetition: "NASA Space Apps",
        
        
        // Modal
        whatIsIt: "Nedir?",
        howWorks: "Nasıl Çalışır?",
        codeExample: "Kod Örneği",
        stats: "İstatistikler"
    },
    en: {
        title: "A World Away: Hunting for Exoplanets with AI",
        team: "Teskilat",
        openDemo: "Open Live Demo",
        aiPowered: "AI-Powered",
        accuracy: "Accuracy",
        datasets: "Datasets",
        inference: "Inference Speed",
        
        // Roadmap data for English
        roadmap: [
            "Dynamic data integration: We don't just use local data; we can fetch real-time data and deliver results.",
            "Smart data accumulation: User queries are fetched from API and stored in local dataset. Processing time shortens on reuse, dataset grows.",
            "Synthetic negative generation: Negative data is created by AI according to their distinct features; model accuracy increases.",
            "Multi-input support: Along with star names, we can also analyze user-uploaded graphs."
        ],
        
        motivationTitle: "Motivation",
        motivCard1Title: "The Challenge",
        motivCard1: "Thousands of stars, millions of data points. Manual analysis impossible.",
        motivCard2Title: "The Problem",
        motivCard2: "Manual analysis is slow, error-prone and doesn't scale.",
        motivCard3Title: "The Solution",
        motivCard3: "AI enables fast, accurate and scalable automatic detection.",
        confirmedPlanets: "CONFIRMED EXOPLANETS",
        humanError: "Human Error Rate",
        aiAccuracy: "AI Accuracy",
        
        pipelineTitle: "Data Pipeline",
        pipelineNote: "Processing raw data from NASA archive to model training",
        stage1: "NASA data archive",
        stage2: "Data extraction",
        stage3: "Noise removal",
        stage4: "Transit detection",
        stage5: "Data alignment",
        stage6: "Image generation",
        stage7: "AI Classification",
        images: "images",
        stages: "stages",
        processing: "processing time",
        processingTimePhrase: "minutes processing time",
        
        methodTitle: "Method",
        bls1: "Box Least Squares period search",
        bls2: "Transit detection in light curves",
        bls3: "Phase-folding optimization",
        yolo1: "Deep learning classification",
        yolo2: "Fast inference (~50ms)",
        yolo3: "98.6% accuracy",
        
        trainingTitle: "Training Results",
        
        webUITitle: "Web Interface",
        uiSubtitle: "User-friendly interface with real-time analysis",
        sampleDataNote: "* Data shown in the visuals are sample examples",
        discoveryCard: "Discovery Card",
        confidenceGauge: "Confidence Gauge",
        missionBadge: "Mission Badge",
        nasaConfirmed: "NASA Confirmed",
        userDiscovery: "User Discovery",
        viewArchive: "View Archive",
        discoveredByNasa: "Discovered by NASA",
        transitMethod: "Transit Method",
        verified: "Verified",
        spaceObservatory: "Space Observatory",
        launch: "Launch",
        planets: "Planets",
        aiPowered: "AI-Powered",
        confidence: "Confidence",
        confidenceLow: "Low",
        confidenceMedium: "Medium",
        confidenceHigh: "High",
        
        resultsTitle: "Results",
        confusionMatrix: "Confusion Matrix",
        accuracy: "Accuracy",
        precision: "Precision",
        recall: "Recall",
        
        roadmapTitle: "Future Roadmap",
        highlightsTitle: "What Sets Us Apart",
        highlight1: "<strong>Dynamic data integration</strong>: We don't just use local data; we can fetch real-time data and deliver results.",
        highlight2: "<strong>Smart data accumulation</strong>: User queries are fetched from API and stored in local dataset. Processing time shortens on reuse, dataset grows.",
        highlight3: "<strong>Synthetic negative generation</strong>: Specific <span class='interactive-negative-data' data-popup='negative-categories'>negative data</span> is created by AI according to their distinct features; model accuracy increases.",
        highlight4: "<strong>Multi-input support</strong>: Along with star names, we can also analyze user-uploaded graphs.",
        
        // Negative categories popup (EN)
        negativePopupButton: "Typical Negatives",
        negativePopupTitle: "Negative Data Categories",
        negativePopupSubtitle: "Additional training with negatives → sets us apart from prior work",
        catPureNoise: "Pure Noise",
        catStellarRotation: "Stellar Rotation",
        catStellarPulsation: "Stellar Pulsation",
        catEclipsingBinary: "Eclipsing Binary",
        catInstrumentalDrift: "Instrumental Drift",
        catSingleArtifact: "Single Artifact",
        catFlare: "Flare",
        catTTV: "Transit Timing Variation",
        
        // Credits
        creditsTitle: "Project Owners",
        referencesTitle: "References",
        dataSources: "Data Sources",
        webTechnologies: "Web Technologies",
        creditsSubtitle: "The team that brought this project to life",
        mainTeamTitle: "Project Team",
        bibliographyTitle: "Bibliography",
        teamMember1Name: "Muhammed Yusuf TOSUN",
        teamMember1Role: "AI Developer & Data Scientist",
        teamMember1Desc: "Model development and data analysis",
        teamMember2Name: "Mustafa BOSNALI",
        teamMember2Role: "Full Stack Developer",
        teamMember2Desc: "Web interface and backend development",
        teamMember3Name: "Hikmet ALANLI",
        teamMember3Role: "Data Engineer & Researcher",
        teamMember3Desc: "Data pipeline and research",
        nasaRef: "NASA MAST Archive",
        nasaRefDesc: "Kepler and TESS data archive",
        lightkurveRef: "Lightkurve Library",
        lightkurveRefDesc: "Kepler data analysis library",
        yoloRef: "YOLOv8 Model",
        yoloRefDesc: "Object detection framework",
        projectYear: "2024-2025",
        projectInstitution: "Your University / Organization",
        projectCompetition: "NASA Space Apps",
        
        
        // Modal
        whatIsIt: "What Is It?",
        howWorks: "How It Works?",
        codeExample: "Code Example",
        stats: "Statistics"
    }
};

// Negatif Veri Kategorileri Detay Bilgileri
window.NEGATIVE_CATEGORIES = {
    pure_noise: {
        icon: '<i class="fas fa-volume-mute"></i>',
        title: 'Pure Noise',
        subtitle: 'Saf Gürültü Sinyalleri',
        description: 'Astronomik gözlemlerde tespit edilen rastgele gürültü sinyalleri. Bu kategorideki veriler, ötegezegen geçişi olmayan, sadece cihaz gürültüsü veya atmosferik bozulmalardan kaynaklanan sinyalleri içerir.',
        steps: [
            'Kepler/TESS verilerinde gürültü tespiti',
            'İstatistiksel analiz ile rastgele sinyal ayrımı',
            'Filtreleme teknikleri ile temizleme',
            'Yapay zeka modeli için negatif örnek olarak etiketleme',
            'Model eğitiminde false positive önleme'
        ],
        code: `# Pure Noise Detection Example
import numpy as np
from scipy import stats

def detect_pure_noise(light_curve):
    # İstatistiksel gürültü analizi
    mean_flux = np.mean(light_curve)
    std_flux = np.std(light_curve)
    
    # Normal dağılım testi
    _, p_value = stats.normaltest(light_curve)
    
    # Gürültü kriteri
    is_noise = (p_value > 0.05) and (std_flux < 0.01)
    
    return {
        'is_pure_noise': is_noise,
        'noise_level': std_flux,
        'p_value': p_value
    }`,
        stats: [
            { label: 'Tespit Edilen Örnek Sayısı', value: '1,247' },
            { label: 'Ortalama Gürültü Seviyesi', value: '0.008%' },
            { label: 'False Positive Önleme Oranı', value: '94.2%' }
        ]
    },
    
    stellar_rotation: {
        icon: '<i class="fas fa-sync-alt"></i>',
        title: 'Stellar Rotation',
        subtitle: 'Yıldız Rotasyon Sinyalleri',
        description: 'Yıldızların kendi ekseni etrafında dönmesi nedeniyle oluşan periyodik parlaklık değişimleri. Bu sinyaller ötegezegen geçişlerinden farklı frekans ve amplitüd özelliklerine sahiptir.',
        steps: [
            'Yıldız yüzeyindeki lekelerin tespiti',
            'Rotasyon periyodu hesaplama',
            'Parçalı modellendirme ile analiz',
            'Ötegezegen geçişi ile karşılaştırma',
            'Fourier analizi ile frekans ayrımı'
        ],
        code: `# Stellar Rotation Detection
from astropy.timeseries import LombScargle

def detect_stellar_rotation(time, flux):
    # Lomb-Scargle periyodogram
    frequency, power = LombScargle(time, flux).autopower()
    
    # Rotasyon frekansı aralığı (0.1-100 gün)
    rotation_mask = (frequency > 0.01) & (frequency < 10)
    rotation_power = power[rotation_mask]
    
    # En güçlü rotasyon sinyali
    max_rotation_idx = np.argmax(rotation_power)
    rotation_period = 1 / frequency[rotation_mask][max_rotation_idx]
    
    return {
        'rotation_period': rotation_period,
        'rotation_power': rotation_power[max_rotation_idx],
        'is_stellar_rotation': rotation_power[max_rotation_idx] > 0.5
    }`,
        stats: [
            { label: 'Analiz Edilen Yıldız Sayısı', value: '2,156' },
            { label: 'Ortalama Rotasyon Periyodu', value: '12.4 gün' },
            { label: 'Tespit Doğruluğu', value: '91.7%' }
        ]
    },
    
    stellar_pulsation: {
        icon: '<i class="fas fa-heartbeat"></i>',
        title: 'Stellar Pulsation',
        subtitle: 'Yıldız Nabız Sinyalleri',
        description: 'Yıldızların iç yapısından kaynaklanan titreşimler sonucu oluşan periyodik parlaklık değişimleri. Bu sinyaller genellikle yüksek frekanslı ve çoklu harmonik içerir.',
        steps: [
            'Asteroseismoloji analizi',
            'Çoklu frekans tespiti',
            'Mode identifikasyonu',
            'Harmonik analiz',
            'Ötegezegen geçişi ile ayrım'
        ],
        code: `# Stellar Pulsation Analysis
from scipy.signal import find_peaks

def detect_stellar_pulsation(time, flux):
    # Fourier dönüşümü
    fft = np.fft.fft(flux)
    freqs = np.fft.fftfreq(len(time), np.diff(time)[0])
    
    # Güç spektrumu
    power = np.abs(fft)**2
    
    # Pulsasyon frekansları (yüksek frekans)
    pulsation_mask = freqs > 1.0  # 1 gün^-1'den yüksek
    pulsation_power = power[pulsation_mask]
    
    # Pik tespiti
    peaks, _ = find_peaks(pulsation_power, height=np.max(pulsation_power)*0.1)
    
    return {
        'pulsation_frequencies': freqs[pulsation_mask][peaks],
        'num_pulsation_modes': len(peaks),
        'is_pulsating_star': len(peaks) > 3
    }`,
        stats: [
            { label: 'Pulsasyonlu Yıldız Sayısı', value: '847' },
            { label: 'Ortalama Pulsasyon Frekansı', value: '5.2 gün⁻¹' },
            { label: 'Mode Sayısı Ortalaması', value: '12.3' }
        ]
    },
    
    eclipsing_binary: {
        icon: '<i class="fas fa-star"></i>',
        title: 'Eclipsing Binary',
        subtitle: 'Örtülü İkili Yıldız Sistemi',
        description: 'İki yıldızın birbirini örtmesi sonucu oluşan periyodik parlaklık değişimleri. Bu sinyaller ötegezegen geçişlerinden daha derin ve farklı şekilli olabilir.',
        steps: [
            'İkili yıldız tespiti',
            'Örtülme derinliği analizi',
            'Orbital parametre hesaplama',
            'Model fitting ile doğrulama',
            'Ötegezegen geçişi ile karşılaştırma'
        ],
        code: `# Eclipsing Binary Detection
from scipy.optimize import curve_fit

def detect_eclipsing_binary(time, flux):
    # Periyodogram analizi
    frequency, power = LombScargle(time, flux).autopower()
    
    # En güçlü periyot
    primary_period = 1 / frequency[np.argmax(power)]
    
    # Faz katlama
    phase = (time % primary_period) / primary_period
    
    # Örtülme modeli
    def eclipse_model(phase, depth, width):
        return 1 - depth * np.exp(-((phase - 0.5)**2) / (2 * width**2))
    
    # Model fitting
    try:
        popt, _ = curve_fit(eclipse_model, phase, flux)
        eclipse_depth, eclipse_width = popt
        
        return {
            'orbital_period': primary_period,
            'eclipse_depth': eclipse_depth,
            'eclipse_width': eclipse_width,
            'is_eclipsing_binary': eclipse_depth > 0.05
        }
    except:
        return {'is_eclipsing_binary': False}`,
        stats: [
            { label: 'Tespit Edilen Sistem Sayısı', value: '423' },
            { label: 'Ortalama Örtülme Derinliği', value: '0.12' },
            { label: 'Tespit Doğruluğu', value: '96.8%' }
        ]
    },
    
    instrumental_drift: {
        icon: '<i class="fas fa-chart-line"></i>',
        title: 'Instrumental Drift',
        subtitle: 'Cihaz Kayma Sinyalleri',
        description: 'Teleskop ve dedektör sistemlerindeki uzun dönemli değişimler nedeniyle oluşan yavaş parlaklık değişimleri. Bu sinyaller genellikle doğrusal veya polinom şeklindedir.',
        steps: [
            'Uzun dönem trend analizi',
            'Polinom fitting',
            'Cihaz kalibrasyonu kontrolü',
            'Sistematic hata tespiti',
            'Veri temizleme'
        ],
        code: `# Instrumental Drift Detection
from scipy.stats import linregress

def detect_instrumental_drift(time, flux):
    # Doğrusal trend analizi
    slope, intercept, r_value, p_value, std_err = linregress(time, flux)
    
    # Trend gücü
    trend_strength = abs(slope) * (time[-1] - time[0])
    
    # Detrend edilmiş veri
    trend = slope * time + intercept
    detrended_flux = flux - trend
    
    return {
        'drift_slope': slope,
        'trend_strength': trend_strength,
        'correlation_coefficient': r_value,
        'is_instrumental_drift': abs(r_value) > 0.7 and trend_strength > 0.01,
        'detrended_flux': detrended_flux
    }`,
        stats: [
            { label: 'Analiz Edilen Veri Seti', value: '15,678' },
            { label: 'Tespit Edilen Drift Sayısı', value: '2,341' },
            { label: 'Ortalama Drift Oranı', value: '0.003/gün' }
        ]
    },
    
    single_artifact: {
        icon: '<i class="fas fa-bolt"></i>',
        title: 'Single Artifact',
        subtitle: 'Tekil Anomali Sinyalleri',
        description: 'Tek seferlik olaylar, kozmik ışın etkileri, veri aktarım hataları veya diğer geçici anormallikler nedeniyle oluşan izole sinyal değişimleri.',
        steps: [
            'Anomali tespiti algoritması',
            'İstatistiksel outlier analizi',
            'Kozmik ışın filtreleme',
            'Veri kalitesi kontrolü',
            'Manuel inceleme ve etiketleme'
        ],
        code: `# Single Artifact Detection
from scipy.stats import zscore

def detect_single_artifacts(time, flux):
    # Z-score analizi
    z_scores = np.abs(zscore(flux))
    
    # Outlier threshold
    threshold = 3.0
    outliers = z_scores > threshold
    
    # Artifact özellikleri
    artifacts = []
    for i, is_outlier in enumerate(outliers):
        if is_outlier:
            artifacts.append({
                'time': time[i],
                'flux': flux[i],
                'z_score': z_scores[i],
                'magnitude': abs(flux[i] - np.median(flux))
            })
    
    return {
        'num_artifacts': len(artifacts),
        'artifacts': artifacts,
        'has_single_artifacts': len(artifacts) > 0
    }`,
        stats: [
            { label: 'Tespit Edilen Anomali', value: '8,923' },
            { label: 'Ortalama Z-Score', value: '4.2' },
            { label: 'Filtreleme Başarı Oranı', value: '98.1%' }
        ]
    },
    
    flare: {
        icon: '<i class="fas fa-fire"></i>',
        title: 'Stellar Flare',
        subtitle: 'Yıldız Parlama Sinyalleri',
        description: 'Yıldız yüzeyinde meydana gelen manyetik aktivite patlamaları sonucu oluşan ani ve kısa süreli parlaklık artışları. Bu sinyaller genellikle asimetrik şekilde hızlı yükselir ve yavaş düşer.',
        steps: [
            'Flare tespiti algoritması',
            'Parlama şekli analizi',
            'Enerji hesaplama',
            'Süre ve amplitüd ölçümü',
            'Manyetik aktivite korelasyonu'
        ],
        code: `# Stellar Flare Detection
def detect_stellar_flares(time, flux):
    # Türev analizi (hızlı değişim tespiti)
    flux_diff = np.diff(flux)
    time_diff = np.diff(time)
    flux_derivative = flux_diff / time_diff
    
    # Flare kriteri: ani artış + yavaş düşüş
    flare_candidates = []
    
    for i in range(1, len(flux_derivative) - 1):
        # Ani artış kontrolü
        if flux_derivative[i] > np.std(flux_derivative) * 3:
            # Yavaş düşüş kontrolü
            decay_window = min(10, len(flux_derivative) - i)
            if decay_window > 3:
                decay_slope = np.mean(flux_derivative[i:i+decay_window])
                if decay_slope < 0:  # Negatif slope = düşüş
                    flare_candidates.append({
                        'start_time': time[i],
                        'peak_flux': flux[i+1],
                        'rise_rate': flux_derivative[i],
                        'decay_rate': decay_slope
                    })
    
    return {
        'num_flares': len(flare_candidates),
        'flares': flare_candidates,
        'has_flares': len(flare_candidates) > 0
    }`,
        stats: [
            { label: 'Tespit Edilen Flare', value: '3,456' },
            { label: 'Ortalama Flare Süresi', value: '2.3 saat' },
            { label: 'Ortalama Parlama Gücü', value: '1.8x' }
        ]
    },
    
    transit_timing_variation: {
        icon: '<i class="fas fa-clock"></i>',
        title: 'Transit Timing Variation',
        subtitle: 'Geçiş Zaman Varyasyonu',
        description: 'Ötegezegen geçişlerinin beklenen zamanlarından sapma gösterdiği durumlar. Bu varyasyonlar genellikle ek gezegenlerin kütleçekim etkisi veya orbital rezonans nedeniyle oluşur.',
        steps: [
            'Geçiş zamanları hesaplama',
            'Beklenen zaman ile karşılaştırma',
            'TTV analizi',
            'Orbital dinamik modelleme',
            'Ek gezegen olasılığı değerlendirme'
        ],
        code: `# Transit Timing Variation Analysis
def analyze_transit_timing_variation(time, flux):
    # Geçiş tespiti
    transit_times = detect_transits(time, flux)
    
    if len(transit_times) < 3:
        return {'has_ttv': False}
    
    # Beklenen periyodik zamanlar
    period = np.median(np.diff(transit_times))
    expected_times = transit_times[0] + period * np.arange(len(transit_times))
    
    # Zaman sapmaları
    timing_offsets = transit_times - expected_times
    
    # TTV kriteri
    ttv_amplitude = np.std(timing_offsets)
    ttv_significance = ttv_amplitude / (period * 0.01)  # %1 periyod
    
    return {
        'transit_times': transit_times,
        'orbital_period': period,
        'ttv_amplitude': ttv_amplitude,
        'ttv_significance': ttv_significance,
        'has_significant_ttv': ttv_significance > 3.0
    }`,
        stats: [
            { label: 'Analiz Edilen Sistem', value: '1,234' },
            { label: 'TTV Tespit Edilen', value: '156' },
            { label: 'Ortalama TTV Genliği', value: '12.3 dk' }
        ]
    }
};

