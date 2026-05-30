const PS_PROJECTS = [
  {
    number: '01',
    tag: 'SaaS · FinOps · SQL · Python · Power BI',
    title: 'Revenue Leakage Detection',
    desc: 'Designed and validated analytical controls to detect, classify, and monitor revenue leakage inside a simulated SaaS billing system. Reconciled subscriptions, invoices, and payments across multiple billing entities, transforming transaction-level inconsistencies into actionable revenue integrity insights through SQL, Python, and Power BI.',
    outcomes: [
      '$18,348 in simulated leakage exposure identified across FY2024',
      '3 leakage categories: Zombie Accounts, Partial Payments, Ghost Subscribers',
      '5-page executive monitoring dashboard with regression detection',
      'Enterprise plans flagged as 70.8% of total exposure concentrated risk'
    ],
    github: 'https://github.com/OmkarDhanke/Revenue-leakage-subscription-analytics',
    images: [
      { src: 'assets/ProjectImg/Revenue_Leakage_Detection/Executive_Overview.png',    label: 'Executive Overview',            page: 'Page 1 — Executive Overview' },
      { src: 'assets/ProjectImg/Revenue_Leakage_Detection/Classification.png',        label: 'Classification & Failure Modes', page: 'Page 2 — Classification & Failure Modes' },
      { src: 'assets/ProjectImg/Revenue_Leakage_Detection/Risk_Concentration.png',    label: 'Risk Concentration',            page: 'Page 3 — Risk Concentration Analysis' },
      { src: 'assets/ProjectImg/Revenue_Leakage_Detection/Operational_Exposure.png',  label: 'Operational Exposure',          page: 'Page 4 — Operational Exposure' },
      { src: 'assets/ProjectImg/Revenue_Leakage_Detection/Monitoring_Control.png',    label: 'Monitoring & Control',          page: 'Page 5 — Monitoring & Control' }
    ]
  },
  {
    number: '02',
    tag: 'Customer Ops · Python · Power BI',
    title: 'Customer Support Operations Intelligence',
    desc: 'Built an end-to-end operational analytics system to monitor customer support demand, workload distribution, service efficiency, and SLA risk exposure. Analyzed 100,000 support tickets across multiple teams and regions, transforming raw operational data into actionable performance insights through Python and Power BI dashboards. Based on findings from the project documentation.',
    outcomes: [
      '100,000 support tickets analyzed across 80 agents and 6 countries',
      '5-page operational intelligence dashboard covering demand, workload, and SLA risk',
      '10.58% SLA breach rate monitored through performance tracking analytics',
      'Geographic demand and workload imbalance identified for resource planning'
    ],
    github: 'https://github.com/OmkarDhanke/supportpulse-customer-support-load-forecasting',
    images: [
      { src: 'assets/ProjectImg/Customer_Support_Operations_Intelligence/Operations_Overview.png', label: 'Operations Overview', page: 'Page 1 — Operations Overview' },
      { src: 'assets/ProjectImg/Customer_Support_Operations_Intelligence/Ticket_Analysis.png',     label: 'Ticket Analysis',     page: 'Page 2 — Ticket Analysis' },
      { src: 'assets/ProjectImg/Customer_Support_Operations_Intelligence/Team_Performance.png',    label: 'Team Performance',    page: 'Page 3 — Team Performance' },
      { src: 'assets/ProjectImg/Customer_Support_Operations_Intelligence/Resolution.png',          label: 'Resolution',          page: 'Page 4 — Resolution' },
      { src: 'assets/ProjectImg/Customer_Support_Operations_Intelligence/Geo.png',                 label: 'Geo Distribution',    page: 'Page 5 — Geo Distribution' }
    ]
  },
  {
    number: '03',
    tag: 'Operations · Excel · Power Query',
    title: 'Operational Backlog Monitoring & Risk Analysis',
    desc: 'Transformed 100,000+ NYC 311 service records into a structured Excel reporting system designed to monitor operational performance, backlog aging, and resolution efficiency. Built a four-page navigable dashboard using Power Query, PivotTables, and data modeling techniques to support operational decision-making without external BI tools. Based on the project documentation.',
    outcomes: [
      '100K+ records cleaned via Power Query',
      '4-page Excel reporting system with interactive navigation and filtering',
      'Backlog aging and 90+ day delay exposure tracked across agencies',
      'End-to-end data preparation, modeling, and dashboard design completed in Excel'
    ],
    github: 'https://github.com/OmkarDhanke/Operational-backlog-monitoring-system',
    images: [
      { src: 'assets/ProjectImg/Operational_Backlog_Monitoring/OperationalOverview.png',      label: 'Operational Overview',    page: 'Page 1 — Operational Overview' },
      { src: 'assets/ProjectImg/Operational_Backlog_Monitoring/RequestVolume.png',            label: 'Request Volume',          page: 'Page 2 — Request Volume' },
      { src: 'assets/ProjectImg/Operational_Backlog_Monitoring/ResolutionPerformance.png',    label: 'Resolution Performance',  page: 'Page 3 — Resolution Performance' },
      { src: 'assets/ProjectImg/Operational_Backlog_Monitoring/BacklogRisk.png',              label: 'Backlog Risk',            page: 'Page 4 — Backlog Risk' }
    ]
  }
];

// ── DOM refs ──
const psNumber   = document.getElementById('psNumber');
const psTag      = document.getElementById('psTag');
const psTitle    = document.getElementById('psTitle');
const psDesc     = document.getElementById('psDesc');
const psOutcomes = document.getElementById('psOutcomes');
const psGithub   = document.getElementById('psGithubLink');
const psImg      = document.getElementById('psImg');
const psImgLabel = document.getElementById('psImgLabel');
const psImgCtr   = document.getElementById('psImgCounter');
const psPageLbl  = document.getElementById('psPageLabel');
const psImgDots  = document.getElementById('psImgDots');
const psLeft     = document.getElementById('psLeft');
const showcase   = document.getElementById('projectShowcase');
const psDots     = document.querySelectorAll('.ps-dot');

let psCurrent  = 0;
let imgCurrent = 0;
let psTimer    = null;
let imgTimer   = null;

function buildImgDots(images) {
  psImgDots.innerHTML = '';
  images.forEach((_, i) => {
    const d = document.createElement('span');
    d.className = 'pir-dot' + (i === 0 ? ' active' : '');
    d.dataset.idx = i;
    d.addEventListener('click', () => { stopImgTimer(); goToImg(i); startImgTimer(); });
    psImgDots.appendChild(d);
  });
}

function applyImg(idx) {
  const images = PS_PROJECTS[psCurrent].images;
  const im = images[idx];
  psImg.src              = im.src;
  psImg.alt              = im.label;
  psImgLabel.textContent = im.label;
  psImgCtr.textContent   = `${idx + 1} / ${images.length}`;
  psPageLbl.textContent  = im.page;
  psImgDots.querySelectorAll('.pir-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
}

function goToImg(idx) {
  const images = PS_PROJECTS[psCurrent].images;
  psImg.classList.add('pir-exit');
  setTimeout(() => {
    imgCurrent = (idx + images.length) % images.length;
    applyImg(imgCurrent);
    psImg.classList.remove('pir-exit');
    psImg.classList.add('pir-enter');
    setTimeout(() => psImg.classList.remove('pir-enter'), 400);
  }, 250);
}

function startImgTimer() {
  clearInterval(imgTimer);
  imgTimer = null;
  const images = PS_PROJECTS[psCurrent].images;
  if (images.length <= 1) return;
  imgTimer = setInterval(() => goToImg(imgCurrent + 1), 3500);
}
function stopImgTimer() {
  clearInterval(imgTimer);
  imgTimer = null;
}

document.getElementById('psImgPrev').addEventListener('click', () => { stopImgTimer(); goToImg(imgCurrent - 1); startImgTimer(); });
document.getElementById('psImgNext').addEventListener('click', () => { stopImgTimer(); goToImg(imgCurrent + 1); startImgTimer(); });

function applyProject(idx, skipAnim) {
  const p = PS_PROJECTS[idx];

  const doApply = () => {
    psNumber.textContent = p.number;
    psTag.textContent    = p.tag;
    psTitle.textContent  = p.title;
    psDesc.textContent   = p.desc;
    psGithub.href        = p.github;
    psOutcomes.innerHTML = p.outcomes
      .map(o => `<li><span class="outcome-dot"></span>${o}</li>`)
      .join('');
    imgCurrent = 0;
    buildImgDots(p.images);
    applyImg(0);
    psDots.forEach((d, i) => d.classList.toggle('active', i === idx));
    stopImgTimer();
    startImgTimer();
  };

  if (skipAnim) { doApply(); return; }

  psLeft.classList.add('ps-exit');
  psImg.classList.add('pir-exit');
  setTimeout(() => {
    doApply();
    psLeft.classList.remove('ps-exit');
    psLeft.classList.add('ps-enter');
    psImg.classList.remove('pir-exit');
    psImg.classList.add('pir-enter');
    setTimeout(() => {
      psLeft.classList.remove('ps-enter');
      psImg.classList.remove('pir-enter');
    }, 400);
  }, 280);
}

function goToProject(idx) {
  psCurrent = (idx + PS_PROJECTS.length) % PS_PROJECTS.length;
  applyProject(psCurrent);
}

function startPsTimer() {
  clearInterval(psTimer);
  psTimer = null;
  psTimer = setInterval(() => goToProject(psCurrent + 1), 6000);
}
function stopPsTimer() {
  clearInterval(psTimer);
  psTimer = null;
}

document.getElementById('psPrev').addEventListener('click', () => { stopPsTimer(); goToProject(psCurrent - 1); startPsTimer(); });
document.getElementById('psNext').addEventListener('click', () => { stopPsTimer(); goToProject(psCurrent + 1); startPsTimer(); });

psDots.forEach(dot => {
  dot.addEventListener('click', () => { stopPsTimer(); goToProject(+dot.dataset.idx); startPsTimer(); });
});

showcase.addEventListener('mouseenter', () => { stopPsTimer(); stopImgTimer(); });
showcase.addEventListener('mouseleave', () => { startPsTimer(); startImgTimer(); });

applyProject(0, true);
startPsTimer();