    const PIR_SLIDES = [
    {
        src:   'assets/Dashboard/Executive_Overview.png',
        alt:   'CloudFlow — Executive Overview',
        file:  'Executive Overview',
        page:  'Page 1 — Executive Overview'
    },
        {
        src:   'assets/Dashboard/Classification.png',
        alt:   'CloudFlow — Executive Overview',
        file:  'Executive Overview',
        page:  'Page 2 — Classification & Failure Modes'
    },
    {
        src:   'assets/Dashboard/Risk_Concentration.png',
        alt:   'CloudFlow — Risk Concentration Analysis',
        file:  'Risk Concentration',
        page:  'Page 3 — Risk Concentration Analysis'
    },
    {
        src:   'assets/Dashboard/Operational_Exposure.png',
        alt:   'CloudFlow — Operational Exposure',
        file:  'Operational Exposure',
        page:  'Page 4 — Operational Exposure'
    },
    {
    src: 'assets/Dashboard/Monitoring_Control.png',
    alt: 'CloudFlow — Monitoring & Regression Control',
    file: 'Monitoring & Control',
    page: 'Page 5 — Monitoring & Control'
    }
    ];

let pirCurrent = 0;
let pirTimer   = null;

const pirImg       = document.getElementById('pirImg');
const pirFilename  = document.getElementById('pirFilename');
const pirCounter   = document.getElementById('pirCounter');
const pirPageLabel = document.getElementById('pirPageLabel');
const pirDots      = document.querySelectorAll('.pir-dot');
const pirStage     = document.querySelector('.pir-stage');

function pirApply(idx) {
  const s = PIR_SLIDES[idx];
  pirImg.src        = s.src;
  pirImg.alt        = s.alt;
  pirFilename.textContent  = s.file;
  pirCounter.textContent   = `${idx + 1} / ${PIR_SLIDES.length}`;
  pirPageLabel.textContent = s.page;
  pirDots.forEach((d, i) => d.classList.toggle('active', i === idx));
}

function pirGoTo(idx) {
  pirImg.classList.add('pir-exit');
  setTimeout(() => {
    pirCurrent = (idx + PIR_SLIDES.length) % PIR_SLIDES.length;
    pirApply(pirCurrent);
    pirImg.classList.remove('pir-exit');
    pirImg.classList.add('pir-enter');
    setTimeout(() => pirImg.classList.remove('pir-enter'), 400);
  }, 250);
}

function pirNext() { pirGoTo(pirCurrent + 1); }
function pirPrev() { pirGoTo(pirCurrent - 1); }

function pirStart() { pirTimer = setInterval(pirNext, 4000); }
function pirStop()  { clearInterval(pirTimer); }

document.getElementById('pirNext').addEventListener('click', () => { pirStop(); pirNext(); pirStart(); });
document.getElementById('pirPrev').addEventListener('click', () => { pirStop(); pirPrev(); pirStart(); });

pirDots.forEach(dot => {
  dot.addEventListener('click', () => {
    pirStop();
    pirGoTo(+dot.dataset.idx);
    pirStart();
  });
});

const pirCard = document.querySelector('.project-img-rotator');

if (pirCard) {
  pirCard.addEventListener('mouseenter', pirStop);
  pirCard.addEventListener('mouseleave', pirStart);
}

// Init
pirApply(0);
pirStart();