// Parse query param ?type=tp|fp|fn|tn
function getParam(name){
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

const DATA = {
  tp: {
    title: 'TP — True Positive',
    color: '#10b981',
    badge: 'TP',
    desc: 'Gerçek pozitif örneğin doğru şekilde pozitif tahmin edilmesi. Modelin doğru tespit ettiği pozitiflerdir.',
    uses: [
      'Model doğruluğunu (accuracy) ve duyarlılığı (recall) arttırır',
      'Hassas tespit gereken medikal/astro tespitlerde başarı göstergesidir',
      'Alarm sistemlerinde doğru alarm örnekleridir'
    ],
    code: "# TP sayımı (Python)\ny_true = [1,1,0,1,0]\ny_pred = [1,0,0,1,1]\n\ntp = sum(1 for yt, yp in zip(y_true, y_pred) if yt==1 and yp==1)\nprint('TP:', tp)"
  },
  fp: {
    title: 'FP — False Positive',
    color: '#fb923c',
    badge: 'FP',
    desc: 'Gerçekte negatif olan örneğin pozitif tahmin edilmesi. Yanlış alarm olarak da adlandırılır.',
    uses: [
      'Güvenlik/uyarı sistemlerinde gereksiz alarm maliyetini artırır',
      'Precision (kesinlik) metriğini düşürür',
      'Filtrelemenin fazla agresif olduğu durumları gösterir'
    ],
    code: "# FP sayımı\ny_true = [0,1,0,0,1]\ny_pred = [1,1,0,1,1]\n\nfp = sum(1 for yt, yp in zip(y_true, y_pred) if yt==0 and yp==1)\nprint('FP:', fp)"
  },
  fn: {
    title: 'FN — False Negative',
    color: '#ef4444',
    badge: 'FN',
    desc: 'Gerçekte pozitif olan örneğin negatif tahmin edilmesi. Kaçan tespitlerdir.',
    uses: [
      'Kritik olay kaçırma riskini gösterir (sağlık, sızıntı, astronomi)',
      'Recall (duyarlılık) metriğini düşürür',
      'Eşik değerini düşürme ihtiyacını işaret edebilir'
    ],
    code: "# FN sayımı\ny_true = [1,1,1,0,1]\ny_pred = [0,1,0,0,1]\n\nfn = sum(1 for yt, yp in zip(y_true, y_pred) if yt==1 and yp==0)\nprint('FN:', fn)"
  },
  tn: {
    title: 'TN — True Negative',
    color: '#38bdf8',
    badge: 'TN',
    desc: 'Gerçek negatif örneğin doğru şekilde negatif tahmin edilmesi. Doğru reddetmelerdir.',
    uses: [
      'Gereksiz işlem/alarm maliyetini azaltır',
      'Precision ve Accuracy üzerinde pozitif etkisi vardır',
      'Arkaplan/gürültü filtrelemenin başarısını yansıtır'
    ],
    code: "# TN sayımı\ny_true = [0,0,1,0,0]\ny_pred = [0,0,1,0,1]\n\ntn = sum(1 for yt, yp in zip(y_true, y_pred) if yt==0 and yp==0)\nprint('TN:', tn)"
  }
};

function render(){
  const type = (getParam('type')||'tp').toLowerCase();
  const d = DATA[type] || DATA.tp;
  document.getElementById('title').textContent = d.title;
  document.getElementById('desc').textContent = d.desc;
  document.getElementById('code').textContent = d.code;
  const badge = document.getElementById('badge');
  badge.textContent = d.badge;
  badge.style.color = d.color;
  const uses = document.getElementById('uses');
  uses.innerHTML = '';
  d.uses.forEach((u,i)=>{
    const li = document.createElement('li');
    li.textContent = u;
    li.style.animationDelay = `${i*0.1}s`;
    uses.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', render);


