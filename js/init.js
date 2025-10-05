// Reveal.js Initialization & Custom Logic

// Current language
let currentLang = 'tr';

// Initialize Reveal.js
Reveal.initialize({
    hash: true,
    slideNumber: true,
    keyboard: true,
    progress: true,
    transition: 'fade',
    backgroundTransition: 'fade',
    center: true,
    overview: true,
    controls: true,
    controlsLayout: 'bottom-right'
});

// Generate stars
function generateStars() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;
    
    const numStars = 150;
    
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 15 + 's';
        star.style.animationDuration = (Math.random() * 10 + 8) + 's';
        starsContainer.appendChild(star);
    }
}

// Language switcher
function switchLanguage(lang) {
    currentLang = lang;
    window.currentLanguage = lang; // Store globally for roadmap access
    
    // Update button states
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Update all i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (window.I18N[lang] && window.I18N[lang][key]) {
            // Use innerHTML for elements that might contain HTML (like interactive spans)
            if (window.I18N[lang][key].includes('<span') || window.I18N[lang][key].includes('<strong>')) {
                el.innerHTML = window.I18N[lang][key];
            } else {
                el.textContent = window.I18N[lang][key];
            }
        }
    });
    
    // Re-render roadmap with new language
    renderRoadmap();
    
    // Re-attach interactive elements after language change
    setTimeout(() => {
        attachInteractiveElements();
    }, 200);
}

// Setup language toggle
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        switchLanguage(btn.dataset.lang);
    });
});

// Open demo button
document.getElementById('openDemoBtn')?.addEventListener('click', () => {
    window.open(window.EXO_DEMO.project.links.demo, '_blank');
});

// Open archive button inside discovery card
document.getElementById('openArchive')?.addEventListener('click', () => {
    window.open('https://exoplanetarchive.ipac.caltech.edu/', '_blank');
});

// Update UI showcase with data
function updateUIShowcase() {
    // Update discovery badge
    const discoveryBadge = document.getElementById('discoveryBadge');
    if (discoveryBadge) {
        if (window.EXO_DEMO.ui.confirmed) {
            const label = (window.I18N[currentLang] && window.I18N[currentLang].nasaConfirmed) || 'NASA Confirmed';
            discoveryBadge.innerHTML = `<i class="fas fa-check-circle"></i><span data-i18n="nasaConfirmed">${label}</span>`;
        } else {
            const label = (window.I18N[currentLang] && window.I18N[currentLang].userDiscovery) || 'User Discovery';
            discoveryBadge.innerHTML = `<i class=\"fas fa-user\"></i><span data-i18n=\"userDiscovery\">${label}</span>`;
        }
    }
    
    // Update discovery text
    const discoveryText = document.getElementById('discoveryText');
    if (discoveryText) {
        discoveryText.textContent = window.EXO_DEMO.ui.discoveryText;
    }
    
    // Update gauge
    const gaugeNeedle = document.getElementById('gaugeNeedle');
    const gaugeValue = document.getElementById('gaugeValue');
    if (gaugeNeedle && gaugeValue) {
        const percentage = window.EXO_DEMO.ui.gauge * 100;
        const rotation = (window.EXO_DEMO.ui.gauge * 180) - 90; // 0-180 degrees
        gaugeNeedle.style.transform = `translateX(-50%) rotate(${rotation}deg)`;
        gaugeValue.textContent = `${percentage.toFixed(1)}%`;
    }
    
    // Update mission badge
    const missionBadge = document.getElementById('missionBadge');
    const missionName = document.getElementById('missionName');
    if (missionBadge && missionName) {
        const mission = window.EXO_DEMO.ui.mission;
        const badgeIcon = missionBadge.querySelector('.badge-icon');
        if (badgeIcon) {
            badgeIcon.textContent = mission === 'Kepler' ? '🔵' : '🔴';
        }
        missionName.textContent = mission;
    }
}

// Roadmap list renderer
function renderRoadmap() {
    const list = document.getElementById('roadmapList');
    if (!list) return;
    
    list.innerHTML = '';
    const currentLang = window.currentLanguage || 'tr';
    const roadmapData = window.I18N[currentLang]?.roadmap || window.EXO_DEMO.roadmap;
    
    roadmapData.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = item; // Use innerHTML to support HTML formatting
        li.style.animationDelay = `${index * 0.2}s`;
        list.appendChild(li);
    });
    
    // Re-attach interactive elements after rendering
    setTimeout(() => {
        attachInteractiveElements();
    }, 100);
}

// Chart.js: Metrics Bar Chart
function createMetricsChart() {
    const canvas = document.getElementById('metricsChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Accuracy', 'Precision', 'Recall'],
            datasets: [{
                label: 'Performance (%)',
                data: [
                    window.EXO_DEMO.metrics.accuracy * 100,
                    window.EXO_DEMO.metrics.precision * 100,
                    window.EXO_DEMO.metrics.recall * 100
                ],
                backgroundColor: [
                    'rgba(0, 217, 255, 0.6)',
                    'rgba(112, 0, 255, 0.6)',
                    'rgba(0, 255, 136, 0.6)'
                ],
                borderColor: [
                    'rgba(0, 217, 255, 1)',
                    'rgba(112, 0, 255, 1)',
                    'rgba(0, 255, 136, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        color: '#93a3c3',
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(147, 163, 195, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#93a3c3'
                    },
                    grid: {
                        color: 'rgba(147, 163, 195, 0.1)'
                    }
                }
            }
        }
    });
}

// Chart.js: ROC Curve
function createROCChart() {
    const canvas = document.getElementById('rocChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const rocData = window.EXO_DEMO.metrics.roc;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: rocData.fpr,
            datasets: [{
                label: 'ROC Curve',
                data: rocData.fpr.map((fpr, i) => ({ x: fpr, y: rocData.tpr[i] })),
                borderColor: 'rgba(0, 217, 255, 1)',
                backgroundColor: 'rgba(0, 217, 255, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: 'rgba(0, 217, 255, 1)'
            }, {
                label: 'Random Classifier',
                data: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
                borderColor: 'rgba(255, 0, 68, 0.5)',
                borderWidth: 2,
                borderDash: [5, 5],
                fill: false,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#93a3c3'
                    }
                },
                title: {
                    display: true,
                    text: 'ROC Curve (AUC ≈ 0.99)',
                    color: '#00d9ff',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    title: {
                        display: true,
                        text: 'False Positive Rate',
                        color: '#93a3c3'
                    },
                    ticks: {
                        color: '#93a3c3'
                    },
                    grid: {
                        color: 'rgba(147, 163, 195, 0.1)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'True Positive Rate',
                        color: '#93a3c3'
                    },
                    ticks: {
                        color: '#93a3c3'
                    },
                    grid: {
                        color: 'rgba(147, 163, 195, 0.1)'
                    }
                }
            }
        }
    });
}

// Animated Counter
function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format based on value and context
        const parentElement = element.closest('.stat-box');
        const isInferenceCard = parentElement && parentElement.querySelector('.stat-label[data-i18n="inference"]');
        const isAccuracyCard = parentElement && parentElement.querySelector('.stat-label[data-i18n="accuracy"]');
        
        if (isInferenceCard) {
            // For inference card, sadece değeri göster (etikette hız ismi var)
            element.textContent = Math.floor(current) + 'ms';
        } else if (isAccuracyCard || target <= 100) {
            // Percentage values
            element.textContent = current.toFixed(1) + '%';
        } else {
            // For large numbers
            element.textContent = Math.floor(current);
        }
    }, duration / steps);
}

// Initialize counters on first slide
function initCounters() {
    document.querySelectorAll('.stat-value[data-count]').forEach(el => {
        animateCounter(el);
    });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    generateStars();
    switchLanguage(currentLang);
    // Başlığı sayfanın üstüne biraz yaklaşsın diye küçük bir margin ayarı
    const lastSlide = document.querySelector('.roadmap-slide h2');
    if (lastSlide) lastSlide.style.marginTop = '0';
    renderRoadmap();
    updateUIShowcase();
    // Localize processing time phrase
    const procPhrase = document.getElementById('procPhrase');
    if (procPhrase) {
        const key = procPhrase.getAttribute('data-i18n') || 'processingTimePhrase';
        procPhrase.textContent = (window.I18N[currentLang] && window.I18N[currentLang][key]) || procPhrase.textContent;
    }
    
    // Start counters after a small delay
    setTimeout(initCounters, 500);
});

// Initialize charts when slide is shown
Reveal.on('slidechanged', event => {
    // Results slide new index after removals
    if (event.indexh === 4) {
        setTimeout(() => createROCChart(), 300);
    }
});

// PDF print detection
if (window.location.search.includes('print-pdf')) {
    console.log('PDF Print mode active. Use Chrome Print to PDF.');
    // Initialize charts immediately for PDF
    setTimeout(() => {
        createROCChart();
    }, 1000);
}

// Attach interactive elements
function attachInteractiveElements() {
    // Attach popup functionality to interactive negative data text
    const interactiveElements = document.querySelectorAll('.interactive-negative-data');
    console.log('Found interactive elements:', interactiveElements.length);
    
    interactiveElements.forEach((element, index) => {
        console.log(`Attaching events to element ${index}:`, element.textContent);
        
        // Remove existing event listeners
        element.removeEventListener('mouseenter', showNegativeCategoriesPopup);
        element.removeEventListener('mouseleave', hideNegativeCategoriesPopup);
        
        // Add new event listeners
        element.addEventListener('mouseenter', showNegativeCategoriesPopup);
        element.addEventListener('mouseleave', hideNegativeCategoriesPopup);
        
        // Add click event as backup
        element.addEventListener('click', showNegativeCategoriesPopup);
    });
}

// Show negative categories popup
function showNegativeCategoriesPopup() {
    const popup = document.getElementById('negative-categories-popup');
    if (popup) {
        popup.classList.add('active');
    }
}

// Hide negative categories popup
function hideNegativeCategoriesPopup() {
    const popup = document.getElementById('negative-categories-popup');
    if (popup) {
        popup.classList.remove('active');
    }
}

// Close popup function (for close button)
function closeNegativeCategoriesPopup() {
    const popup = document.getElementById('negative-categories-popup');
    if (popup) {
        popup.classList.remove('active');
    }
}

// Confusion matrix explanations
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.matrix-cell').forEach(cell => {
        cell.addEventListener('click', () => {
            const type = cell.classList.contains('tp') ? 'tp' :
                         cell.classList.contains('fp') ? 'fp' :
                         cell.classList.contains('fn') ? 'fn' : 'tn';
            window.open(`confusion-detail.html?type=${type}`, '_blank');
        });
    });
    
    // Attach interactive elements
    attachInteractiveElements();
    
    // Add ESC key listener for popup
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeNegativeCategoriesPopup();
        }
    });
    
    // Add click outside popup to close
    document.addEventListener('click', (e) => {
        const popup = document.getElementById('negative-categories-popup');
        if (popup && e.target === popup) {
            closeNegativeCategoriesPopup();
        }
    });
});