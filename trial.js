let canvas;
let agents = [];
let gameState = 0;
let phase = 'idle'; // 'idle', 'matches', 'evolution'
let animationTimer = 0;

let storyTextEl, stepIndicatorEl, btnNextEl;
let storyPanelEl, controlPanelEl;
let btnStartEvo;

// Types: 0: Romantik, 1: Nihilist, 2: Aynaci, 3: Kirik
const COLORS = [
  [255, 209, 220], // 0: Romantik (Pembe)
  [255, 77, 77],   // 1: Nihilist (Kırmızı)
  [135, 206, 235], // 2: Aynacı (Mavi)
  [209, 179, 255]  // 3: Kırık Kalp (Mor)
];

let currentLang = 'tr';

const langData = {
  tr: {
    matrix_title: "Varoluşsal Kesişimler",
    matrix_inst: "İki farklı bilincin karşılaştığında ne yapacağını görmek için tablodan bir kesişime tıklayın. Tüm olasılıkları keşfettikten sonra evrim simülasyonuna geçebilirsiniz.",
    matrix_wait: "Kesişim seç bekleniyor...",
    btn_proceed: "Simülasyona Geç",
    vars_title: "Varoluşsal Değişkenler",
    vars_desc: "Karanlık okyanustaki varoluşsal matrisin ilkelerini belirleyin. Hangi felsefenin hayatta kalacağını, hangisinin karanlığa gömüleceğini kendi gözlerinizle izleyin.",
    char_name_0: "Romantik (Saf)",
    char_desc_0: "Koşulsuz güvenir, hep affeder.",
    char_name_1: "Nihilist (Kötü)",
    char_desc_1: "Sadece kendini düşünür, ihanet eder.",
    char_name_2: "Aynacı (Kopyacı)",
    char_desc_2: "İlk adımı dostçadır, sonra kopyalar.",
    char_name_3: "Kırık Kalp (Kinci)",
    char_desc_3: "Kırılırsa dünyayı yakar, affetmez.",
    btn_evo: "Evrimsel Seçilimi Uygula",
    acad_title: "Evrimsel Oyun Teorisi Analizi",
    btn_close: "Raporu Kapat",
    report_title: "Popülasyon Frekansları:",
    report_win: "Tüm ekosistem tek bir felsefe tarafından ele geçirildi:"
  },
  en: {
    matrix_title: "Existential Intersections",
    matrix_inst: "Click an intersection on the table to see what happens when two different consciousnesses meet. After exploring all possibilities, you can proceed to the evolution simulation.",
    matrix_wait: "Waiting for selection...",
    btn_proceed: "Enter Simulation",
    vars_title: "Existential Variables",
    vars_desc: "Define the principles of the existential matrix in the dark ocean. Watch with your own eyes which philosophy survives and which fades into darkness.",
    char_name_0: "Naive (Cooperator)",
    char_desc_0: "Trusts unconditionally, always forgives.",
    char_name_1: "Defector (Evil)",
    char_desc_1: "Only thinks of itself, betrays.",
    char_name_2: "Tit-for-Tat (Copycat)",
    char_desc_2: "Friendly at first, then copies you.",
    char_name_3: "Grudger",
    char_desc_3: "If broken, burns the world, never forgives.",
    btn_evo: "Apply Evolutionary Selection",
    acad_title: "Evolutionary Game Theory Analysis",
    btn_close: "Close Report",
    report_title: "Population Frequencies:",
    report_win: "The entire ecosystem has been taken over by a single philosophy:"
  }
};

const NAMES_TR = ["Romantik", "Nihilist", "Aynacı", "Kırık Kalp"];
const NAMES_EN = ["Naive", "Defector", "Tit-for-Tat", "Grudger"];
let NAMES = NAMES_TR;

const DESCRIPTIONS_TR = [
  "Koşulsuz güvenir, hep affeder.",
  "Sadece kendini düşünür, ihanet eder.",
  "İlk adımı dostçadır, sonra kopyalar.",
  "Kırılırsa dünyayı yakar, affetmez."
];
const DESCRIPTIONS_EN = [
  "Trusts unconditionally, always forgives.",
  "Only thinks of itself, betrays.",
  "Friendly at first, then copies you.",
  "If broken, burns the world, never forgives."
];
let DESCRIPTIONS = DESCRIPTIONS_TR;

const MATRIX_TEXTS = {
  "0,0": "İki Romantik karşılaştığında, karşılıksız umut sonsuz bir yankıya dönüşür. Her ikisi de birbirini besler (+2). Saf bir ütopya.",
  "0,1": "Romantik, umutla elini uzatır. Nihilist ise bu umudu tereddütsüz yutar (+3). Romantik tükenirken (-1), acımasız gerçeklik kazanır.",
  "0,2": "Romantik umut eder, Aynacı da bu umudu yansıtır (+2). Şartsız iyilik, adaleti bile şefkate dönüştürür.",
  "0,3": "Kırık Kalp başlangıçta umutludur. Romantik ile karşılaştığında güven içinde kalır (+2). Travması asla tetiklenmez.",
  "1,0": "Romantik, umutla elini uzatır. Nihilist ise bu umudu tereddütsüz yutar (+3). Romantik tükenirken (-1), acımasız gerçeklik kazanır.",
  "1,1": "İki Nihilist karanlıkta çarpışır. Kimse diğerine bir şey vermediği için (0), ikisi de kendi yarattıkları boşlukta açlıktan tükenir.",
  "1,2": "Aynacı başlangıçta güvenir ama Nihilist onu sömürür (+3). Fakat sonraki rauntlarda Aynacı duvar örer. Kısa vadeli kazanç, uzun vadeli izolasyon getirir.",
  "1,3": "Nihilist, saf Kırık Kalp'i acımasızca sömürür (+3). Ancak bu sömürü, Kırık Kalp'in donmasına ve intikam almasına sebep olur.",
  "2,0": "Romantik umut eder, Aynacı da bu umudu yansıtır (+2). Şartsız iyilik, adaleti bile şefkate dönüştürür.",
  "2,1": "Aynacı başlangıçta güvenir ama Nihilist onu sömürür (+3). Fakat sonraki rauntlarda Aynacı duvar örer. Kısa vadeli kazanç, uzun vadeli izolasyon getirir.",
  "2,2": "İki Aynacı karşılaştığında, ilk adımı güvenle atarlar (+2). Adalet ve denge, hiç bozulmadan sonsuza kadar sürer.",
  "2,3": "Aynacı ve Kırık Kalp, her ikisi de ilk adımı umutla atar (+2). Okyanusu bulandıracak bir ihanet olmadığı için, huzur içinde yüzerler.",
  "3,0": "Kırık Kalp başlangıçta umutludur. Romantik ile karşılaştığında güven içinde kalır (+2). Travması asla tetiklenmez.",
  "3,1": "Nihilist, saf Kırık Kalp'i acımasızca sömürür (+3). Ancak bu sömürü, Kırık Kalp'in donmasına ve intikam almasına sebep olur.",
  "3,2": "Aynacı ve Kırık Kalp, her ikisi de ilk adımı umutla atar (+2). Okyanusu bulandıracak bir ihanet olmadığı için, huzur içinde yüzerler.",
  "3,3": "İki Kırık Kalp karşılaştığında, ikisi de birbirine şefkatle yaklaşır (+2). Travmaları asla tetiklenmez, karanlık sular geçici bir cennete döner."
};

let matrixViewed = 0;
const PAYOFF = {
  "0,0": [2, 2],
  "0,1": [-1, 3],
  "1,0": [3, -1],
  "1,1": [0, 0]
};

function getPayoff(i, j) {
  if (i === 0 && j === 0) return [2, 2];
  if (i === 0 && j === 1) return [-1, 3];
  if (i === 1 && j === 0) return [3, -1];
  if (i === 1 && j === 1) return [0, 0];
  // Logic expanded for other types
  return [0,0];
}

function setLanguage(lang) {
  currentLang = lang;
  document.getElementById('lang-tr').classList.toggle('active', lang === 'tr');
  document.getElementById('lang-en').classList.toggle('active', lang === 'en');
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    let key = el.getAttribute('data-i18n');
    if (langData[lang][key]) {
      el.innerHTML = langData[lang][key];
    }
  });
  
  NAMES = lang === 'tr' ? NAMES_TR : NAMES_EN;
  DESCRIPTIONS = lang === 'tr' ? DESCRIPTIONS_TR : DESCRIPTIONS_EN;
  
  let cells = document.querySelectorAll('.matrix-cell');
  cells.forEach(cell => {
    let i = cell.getAttribute('data-i');
    let j = cell.getAttribute('data-j');
    if (i !== null && j !== null) {
      cell.innerHTML = `<div>${NAMES[i]}</div><div>${NAMES[j]}</div>`;
    }
  });
}

let globalScale = 1;
let targetScale = 1;

let currentBgR = 10, currentBgG = 20, currentBgB = 40;
let targetBgR = 10, targetBgG = 20, targetBgB = 40;

let matchesToPlay = [];
let matchIndex = 0;
let evosToRemove = [];
let evosToAdd = [];
let particles = [];
let planktons = [];

class Plankton {
  constructor() {
    this.reset();
    this.y = random(-height, height); 
  }
  
  reset() {
    this.x = random(-width/2, width/2);
    let centerY = windowWidth < 768 ? height * 0.28 : height / 2;
    this.y = (height - centerY) + random(10, 100); 
    this.size = random(0.5, 2.5);
    this.speedY = random(0.1, 0.4);
    this.noiseOffsetX = random(1000);
    this.alpha = random(30, 120);
  }
  
  update() {
    this.y -= this.speedY; 
    this.noiseOffsetX += 0.005;
    let sway = map(noise(this.noiseOffsetX), 0, 1, -0.5, 0.5);
    this.x += sway; 
    
    let centerY = windowWidth < 768 ? height * 0.28 : height / 2;
    if (this.y < -centerY - 10) {
      this.reset();
    }
  }
  
  show() {
    noStroke();
    fill(200, 230, 255, this.alpha);
    circle(this.x, this.y, this.size);
  }
}

class Particle {
  constructor(pos, type) {
    this.pos = pos.copy();
    this.type = type;
    this.alpha = 255;
    this.radius = 15;
  }
  update() {
    this.alpha -= 5;
    this.radius += 0.5;
  }
  draw() {
    fill(COLORS[this.type][0], COLORS[this.type][1], COLORS[this.type][2], this.alpha);
    noStroke();
    circle(this.pos.x, this.pos.y, this.radius);
  }
}

class Agent {
  constructor(type) {
    this.type = type;
    this.score = 0;
    this.history = []; 
    this.broken = false; 
    this.angle = random(TWO_PI);
    this.targetAngle = this.angle;
    this.radius = 15;
    this.pulse = 0;
    this.spawnScale = 0; 
    this.noiseOffset = random(1000); 
  }

  play(opponentHistory) {
    if (this.type === 0) return 0; 
    if (this.type === 1) return 1; 
    if (this.type === 2) {
      if (opponentHistory.length === 0) return 0;
      return opponentHistory[opponentHistory.length - 1];
    }
    if (this.type === 3) {
      if (this.broken) return 1;
      if (opponentHistory.includes(1)) {
        this.broken = true;
        return 1;
      }
      return 0;
    }
  }
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container');
  
  controlPanelEl = select('#control-panel');
  btnStartEvo = select('#btn-start-evolution');
  
  document.getElementById('lang-tr').addEventListener('click', () => setLanguage('tr'));
  document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
  
  btnStartEvo.mousePressed(startEvolutionCycle);

  document.getElementById('btn-proceed').addEventListener('click', () => {
    document.getElementById('matrix-panel').style.display = 'none';
    document.querySelector('.grain-overlay').style.opacity = '0.03';
    controlPanelEl.style('display', 'block');
    document.getElementById('academic-panel').style.display = 'block';
    
    let ambientAudio = document.getElementById('ambient-audio');
    if (ambientAudio) {
      ambientAudio.volume = 0.3;
      ambientAudio.play().catch(err => console.log("Audio play blocked by browser.", err));
    }
    
    gameState = 1;
    buildSandboxAgents();
  });
  
  initPlanktons();
  
  document.getElementById('btn-academic-close').addEventListener('click', () => {
    document.getElementById('academic-panel').style.display = 'none';
  });
  
  selectAll('input[type="range"]').forEach(slider => {
    slider.input(() => {
      let typeStr = slider.attribute('data-type');
      select('#count-' + typeStr).html(slider.value());
      buildSandboxAgents();
      updateBackgroundColor();
    });
  });

  let savedMatrix = localStorage.getItem('matrixViewedCount');
  if (savedMatrix === '16') {
    document.getElementById('matrix-panel').style.display = 'none';
    controlPanelEl.style('display', 'block');
    gameState = 1;
    matrixViewed = 16;
    buildSandboxAgents();
    updateBackgroundColor();
  } else {
    buildMatrix();
  }
}

function initPlanktons() {
  planktons = [];
  let count = windowWidth < 768 ? 60 : 150;
  for(let i = 0; i < count; i++) {
    planktons.push(new Plankton());
  }
}

function updateBackgroundColor() {
  let c0 = parseInt(select('#slider-romantik').value());
  let c1 = parseInt(select('#slider-nihilist').value());
  let c2 = parseInt(select('#slider-aynaci').value());
  let c3 = parseInt(select('#slider-kirik').value());
  
  let total = c0 + c1 + c2 + c3;
  if (total === 0) {
    document.body.style.backgroundColor = '#050508';
    return;
  }
  
  let r = (c0 * COLORS[0][0] + c1 * COLORS[1][0] + c2 * COLORS[2][0] + c3 * COLORS[3][0]) / total;
  let g = (c0 * COLORS[0][1] + c1 * COLORS[1][1] + c2 * COLORS[2][1] + c3 * COLORS[3][1]) / total;
  let b = (c0*220 + c1*77 + c2*235 + c3*255) / total;
  
  targetBgR = r * 0.15;
  targetBgG = g * 0.15;
  targetBgB = b * 0.15;
}

function buildMatrix() {
  const container = document.getElementById('matrix-grid-container');
  let empty = document.createElement('div');
  empty.className = 'matrix-cell matrix-header';
  container.appendChild(empty);
  
  for(let i=0; i<4; i++) {
    let col = document.createElement('div');
    col.className = 'matrix-cell matrix-header';
    col.innerHTML = NAMES[i];
    col.style.color = `rgb(${COLORS[i][0]}, ${COLORS[i][1]}, ${COLORS[i][2]})`;
    container.appendChild(col);
  }
  
  for(let r=0; r<4; r++) {
    let rowH = document.createElement('div');
    rowH.className = 'matrix-cell matrix-header';
    rowH.innerHTML = NAMES[r];
    rowH.style.color = `rgb(${COLORS[r][0]}, ${COLORS[r][1]}, ${COLORS[r][2]})`;
    container.appendChild(rowH);
    
    for(let c=0; c<4; c++) {
      let cell = document.createElement('button');
      cell.className = 'matrix-cell matrix-btn';
      cell.innerHTML = '?';
      cell.setAttribute('data-i', r);
      cell.setAttribute('data-j', c);
      cell.onclick = () => {
        let descEl = document.getElementById('matrix-desc-text');
        let payout = getPayoff(r, c);
        descEl.innerHTML = `${NAMES[r]} / ${NAMES[c]} ${langData[currentLang].matrix_click} ${payout[0]}, ${payout[1]}`;
        
        if (!cell.classList.contains('viewed')) {
          cell.classList.add('viewed');
          matrixViewed++;
          cell.innerHTML = '✓';
          if (matrixViewed >= 16) {
            document.getElementById('btn-proceed').style.display = 'block';
            localStorage.setItem('matrixViewedCount', '16');
          }
        }
        playMatrixMatch(r, c);
      };
      container.appendChild(cell);
    }
  }
}

function playMatrixMatch(typeA, typeB) {
  agents = [];
  let a = new Agent(typeA);
  let b = new Agent(typeB);
  a.pos = createVector(width/2 - 50, height/2);
  b.pos = createVector(width/2 + 50, height/2);
  agents.push(a);
  agents.push(b);
  playMatch(a, b);
  if (typeA === 2 || typeA === 3 || typeB === 2 || typeB === 3) {
    setTimeout(() => playMatch(a, b), 800);
  }
}

function draw() {
  clear();
  currentBgR = lerp(currentBgR, targetBgR, 0.02);
  currentBgG = lerp(currentBgG, targetBgG, 0.02);
  currentBgB = lerp(currentBgB, targetBgB, 0.02);
  document.documentElement.style.setProperty('--bg-r', Math.round(currentBgR));
  document.documentElement.style.setProperty('--bg-g', Math.round(currentBgG));
  document.documentElement.style.setProperty('--bg-b', Math.round(currentBgB));
  
  let centerY = windowWidth < 768 ? height * 0.28 : height / 2;
  translate(width/2, centerY);
  globalScale = lerp(globalScale, targetScale, 0.05);
  scale(globalScale);
  
  for (let p of planktons) {
    p.update();
    p.show();
  }
  
  noFill();
  stroke(255, 20);
  strokeWeight(1);
  let baseSize = min(width, height);
  let ringSize = windowWidth < 768 ? baseSize * 0.75 : baseSize * 0.6;
  circle(0, 0, ringSize);
  circle(0, 0, ringSize + 40);

  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.draw();
    if (p.alpha <= 0) particles.splice(i, 1);
  }

  let R = windowWidth < 768 ? baseSize * 0.38 : baseSize * 0.3;
  let agentBaseRadius = windowWidth < 768 ? 9 : 15; 
  
  for (let i = 0; i < agents.length; i++) {
    let a = agents[i];
    a.targetAngle = (TWO_PI / agents.length) * i;
    a.angle = lerp(a.angle, a.targetAngle, 0.1);
    a.noiseOffset += 0.01;
    let floatMag = windowWidth < 768 ? 15 : 10;
    let floatX = map(noise(a.noiseOffset), 0, 1, -floatMag, floatMag);
    let floatY = map(noise(a.noiseOffset + 1000), 0, 1, -floatMag, floatMag);
    let x = R * cos(a.angle) + floatX;
    let y = R * sin(a.angle) + floatY;
    a.pos = createVector(x, y); 
    if (a.spawnScale < 1) a.spawnScale += 0.05;
    if (a.spawnScale > 1) a.spawnScale = 1;
    let currentRadius = (agentBaseRadius + a.pulse) * a.spawnScale;
    fill(COLORS[a.type][0], COLORS[a.type][1], COLORS[a.type][2], 200 + a.pulse);
    noStroke();
    circle(x, y, currentRadius);
    if (gameState === 0) {
      fill(200);
      textAlign(CENTER);
      textSize(12);
      text(NAMES[a.type], x, y + currentRadius + 15);
    }
    if (a.pulse > 0) a.pulse -= 2;
  }
  
  if (gameState === 0 && agents.length === 2 && (agents[0].pulse > 0 || agents[1].pulse > 0)) {
     let cA = COLORS[agents[0].type];
     let cB = COLORS[agents[1].type];
     stroke((cA[0]+cB[0])/2, (cA[1]+cB[1])/2, (cA[2]+cB[2])/2, 100 + agents[0].pulse * 5);
     strokeWeight(3);
     noFill();
     bezier(agents[0].pos.x, agents[0].pos.y, 0, 0, 0, 0, agents[1].pos.x, agents[1].pos.y);
  }
  
  if (gameState === 1) {
    let mx = (mouseX - width/2) / globalScale;
    let my = (mouseY - centerY) / globalScale;
    for (let a of agents) {
      let hitRadius = windowWidth < 768 ? agentBaseRadius * 3.5 : agentBaseRadius * 1.5;
      if (dist(mx, my, a.pos.x, a.pos.y) < hitRadius) {
        push();
        fill(15, 15, 18, 240);
        stroke(255, 40);
        rectMode(CENTER);
        rect(a.pos.x, a.pos.y - 55, 210, 70, 6);
        fill(255);
        noStroke();
        textAlign(CENTER, CENTER);
        text(NAMES[a.type], a.pos.x, a.pos.y - 72);
        text(DESCRIPTIONS[a.type], a.pos.x, a.pos.y - 55);
        pop();
        break;
      }
    }
  }
  handleAnimation();
}

function handleAnimation() {
  if (phase === 'matches') {
    for (let k = 0; k < 30; k++) {
      if (matchIndex < matchesToPlay.length) {
        let m = matchesToPlay[matchIndex];
        playMatch(m.a, m.b);
        matchIndex++;
      }
    }
    if (matchIndex >= matchesToPlay.length) {
      phase = 'evolution';
      animationTimer = 60;
      prepareEvolution();
    }
    
    // Draw trailing matches for organic neural network effect
    if (matchIndex > 0) {
      let startIdx = max(0, matchIndex - 8);
      for (let k = startIdx; k < min(matchIndex, matchesToPlay.length); k++) {
        let m = matchesToPlay[k];
        if(!m.a.pos || !m.b.pos) continue; // Safety check
        
        let cA = COLORS[m.a.type];
        let cB = COLORS[m.b.type];
        
        let trailAlpha = map(k, startIdx, matchIndex, 20, 150);
        
        stroke((cA[0]+cB[0])/2, (cA[1]+cB[1])/2, (cA[2]+cB[2])/2, trailAlpha);
        strokeWeight(1.5);
        noFill();
        bezier(m.a.pos.x, m.a.pos.y, 
               m.a.pos.x*0.3, m.a.pos.y*0.3, 
               m.b.pos.x*0.3, m.b.pos.y*0.3, 
               m.b.pos.x, m.b.pos.y);
      }
    }
  } else if (phase === 'evolution') {
    if (animationTimer <= 0) {
      applyEvolution();
      let totalA = agents.length;
      let counts = [0, 0, 0, 0];
      for(let a of agents) counts[a.type]++;
      showAcademicReport(counts, totalA);
      phase = 'idle';
      btnStartEvo.removeAttribute('disabled');
    }
  }
  animationTimer--;
}

function playMatch(a, b) {
  let moveA = a.play(b.history);
  let moveB = b.play(a.history);
  a.history.push(moveB);
  b.history.push(moveA);
  let payoff = PAYOFF[`${moveA},${moveB}`];
  a.score += payoff[0];
  b.score += payoff[1];
  a.pulse = 20;
  b.pulse = 20;
}

function startEvolutionCycle() {
  if (phase !== 'idle' || agents.length < 2) return;
  btnStartEvo.attribute('disabled', 'true');
  matchesToPlay = [];
  for (let i=0; i<agents.length; i++) {
    for (let j=i+1; j<agents.length; j++) {
      for (let r=0; r<5; r++) matchesToPlay.push({a: agents[i], b: agents[j]});
    }
  }
  matchesToPlay.sort(() => random() - 0.5);
  matchIndex = 0;
  phase = 'matches';
}

function prepareEvolution() {
  agents.sort((a, b) => b.score - a.score);
  let count = Math.max(1, Math.floor(agents.length * 0.2));
  evosToRemove = agents.slice(-count);
  evosToAdd = agents.slice(0, count).map(w => new Agent(w.type));
}

function applyEvolution() {
  for (let loser of evosToRemove) {
    if (loser.pos) particles.push(new Particle(loser.pos, loser.type));
  }
  agents = agents.filter(a => !evosToRemove.includes(a)).concat(evosToAdd);
  for (let a of agents) { a.score = 0; a.history = []; a.broken = false; }
  let counts = [0,0,0,0];
  for (let a of agents) counts[a.type]++;
  select('#count-romantik').html(counts[0]);
  select('#count-nihilist').html(counts[1]);
  select('#count-aynaci').html(counts[2]);
  select('#count-kirik').html(counts[3]);
  updateBackgroundColor();
}

function buildSandboxAgents() {
  let counts = [parseInt(select('#slider-romantik').value()), parseInt(select('#slider-nihilist').value()), parseInt(select('#slider-aynaci').value()), parseInt(select('#slider-kirik').value())];
  agents = [];
  for(let t=0; t<4; t++) {
    for(let i=0; i<counts[t]; i++) agents.push(new Agent(t));
  }
  for(let a of agents) a.angle = random(TWO_PI);
}

function showAcademicReport(counts, totalAgents) {
  document.getElementById('academic-panel').style.display = 'block';
  let mathEl = document.getElementById('academic-math');
  let contentEl = document.getElementById('academic-content');
  let maxCount = Math.max(...counts);
  let winningIndex = counts.indexOf(maxCount);
  let winnerName = NAMES[winningIndex];
  
  let cR = counts[0]; let cN = counts[1]; let cA = counts[2]; let cK = counts[3];
  
  if (typeof katex !== 'undefined') {
    katex.render("R=2,\\; S=-1,\\; T=3,\\; P=0 \\quad | \\quad \\Delta x_i = x_i (f_i - \\bar{f})", mathEl, {displayMode: true});
  }
  
  let text = `<b>${langData[currentLang].report_title}</b><br>`;
  text += `${NAMES[0]}: %${Math.round((cR/totalAgents)*100)} <br>`;
  text += `${NAMES[1]}: %${Math.round((cN/totalAgents)*100)} <br>`;
  text += `${NAMES[2]}: %${Math.round((cA/totalAgents)*100)} <br>`;
  text += `${NAMES[3]}: %${Math.round((cK/totalAgents)*100)} <br><br>`;
  
  if (cR === totalAgents) {
    text += `<span style="color:#ffd1dc;">${langData[currentLang].report_win} ${NAMES[0]}</span><br><br>`;
    text += "<b>Evrimsel Kararsız Durum (Evolutionarily Unstable State)</b><br>";
    text += "Sistem tamamen Pareto Optimal (R=2) bir noktaya ulaşmış gibi görünse de, bu durum bir Evrimsel Kararlı Strateji (ESS) değildir. Mutasyona uğrayan veya popülasyona sızan tek bir 'Sömürücü' (Defector, T=3), Replicator Dynamics uyarınca hızla çoğalacak ve tüm kooperatif sistemi çökertecektir.";
  } else if (cN === totalAgents) {
    text += `<span style="color:#ff4d4d;">${langData[currentLang].report_win} ${NAMES[1]}</span><br><br>`;
    text += "<b>Katı Nash Dengesi (Strict Nash Equilibrium)</b><br>";
    text += "Sistem, 'İhanet' (Defect) etrafında optimize olmuştur. Hiçbir ajan stratejisini tek taraflı değiştirerek faydasını (payoff) artıramaz. Kooperasyon (P=0) tamamen elenmiş ve sistem alt-optimal bir dengede kilitlenmiştir.";
  } else if (cA === totalAgents) {
    text += `<span style="color:#87ceeb;">${langData[currentLang].report_win} ${NAMES[2]}</span><br><br>`;
    text += "<b>Evrimsel Kararlı Strateji (ESS)</b><br>";
    text += "Aynacı (Tit-for-Tat) popülasyonu, dışarıdan gelen sömürücü mutasyonlara karşı dirençlidir. İlk hamlede işbirliği yapıp sonra rakibi kopyalaması, sömürücülerin (T=3) ortalama faydasını düşürerek popülasyona sızmalarını matematiksel olarak engeller.";
  } else if (cK === totalAgents) {
    text += `<span style="color:#d1b3ff;">${langData[currentLang].report_win} ${NAMES[3]}</span><br><br>`;
    text += "<b>Kırılgan İşbirliği (Fragile Cooperation)</b><br>";
    text += "Kinci (Grim Trigger) stratejiler başlangıçta işbirliği (R=2) yapsa da, en ufak bir hata veya dış müdahalede kalıcı olarak cezalandırmaya geçerler. Bu durum teorik olarak kooperatif olsa da, gürültülü (noisy) bir sistemde hızla çökmeye mahkumdur.";
  } else if (cR + cA === totalAgents && cR > 0 && cA > 0) {
    text += "<b>Simbiyotik Denge (Symbiotic Equilibrium)</b><br>";
    text += "Aynacılar ve Romantikler birbirlerinden ayırt edilemez şekilde davranarak (daima R=2 elde ederek) ortak bir havuz oluşturmuştur. Aynacıların varlığı, sistemi dış tehditlere karşı koruyan görünmez bir kalkan görevi görür.";
  } else if (cN > totalAgents * 0.5) {
    text += "<b>Sömürücü Baskınlığı (Defector Dominance)</b><br>";
    text += "Replicator Dynamics denkleminde, sömürücülerin beklenen faydası popülasyon ortalamasının üzerinde kalmıştır. İşbirliğine dayalı stratejiler hızla elenmekte ve sistem Nash Dengesine doğru kaymaktadır.";
  } else if (cA > totalAgents * 0.5) {
    text += "<b>Karşılıklılık İlkesinin Yükselişi (Rise of Reciprocity)</b><br>";
    text += "Aynacılar (Tit-for-Tat), sömürücülerin büyüme hızını (\\(\\Delta x_i\\)) negatifte tutarak onları popülasyondan izole etmektedir. İşbirliği matematiksel olarak kendini kanıtlayıp evrimsel süreci domine etmektedir.";
  } else {
    text += "<b>Geçiş Durumu (Transient State)</b><br>";
    text += "Popülasyon henüz kararlı bir faza (Attractor) ulaşmamıştır. Stratejiler arası fayda matrisinin (Payoff Matrix) karmaşık etkileşimleri nedeniyle evrimsel süreç devam etmektedir.";
  }
  
  contentEl.innerHTML = text;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initPlanktons();
}

// Panel Toggle Logic
document.getElementById('panel-toggle').addEventListener('click', function() {
  let body = document.getElementById('control-panel-body');
  if (body.style.display === 'none') {
    body.style.display = 'block';
    this.innerHTML = '▼';
  } else {
    body.style.display = 'none';
    this.innerHTML = '▲';
  }
});
