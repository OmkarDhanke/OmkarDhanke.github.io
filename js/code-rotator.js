const SLIDES = [
  {
    filename: 'revenue_analysis.sql',
    badge: 'SQL · Power BI',
    result1: 'Query returned 247 rows',
    result2: '38 HIGH RISK flagged',
    metricVal: '$18,348',
    metricLabel: 'Leakage Identified',
    trendLine: 'M4 23L22 23L40 19L58 20L76 14L94 12L116 7',
    trendDot: { cx: '116', cy: '7' },
    code:
`<span class="sql-comment">-- Revenue leakage by category</span>
<span class="sql-keyword">WITH</span> leakage_cte <span class="sql-keyword">AS</span> (
  <span class="sql-keyword">SELECT</span>
    customer_id,
    contract_type,
    <span class="sql-func">SUM</span>(expected_revenue)
      - <span class="sql-func">SUM</span>(actual_revenue)
      <span class="sql-keyword">AS</span> leakage_amount
  <span class="sql-keyword">FROM</span> billing_data
  <span class="sql-keyword">WHERE</span> billing_status != <span class="sql-string">'PAID'</span>
  <span class="sql-keyword">GROUP BY</span> <span class="sql-number">1</span>, <span class="sql-number">2</span>
)
<span class="sql-keyword">SELECT</span> *,
  <span class="sql-keyword">CASE</span>
    <span class="sql-keyword">WHEN</span> leakage_amount > <span class="sql-number">1000</span>
    <span class="sql-keyword">THEN</span> <span class="sql-string">'HIGH RISK'</span>
    <span class="sql-keyword">ELSE</span> <span class="sql-string">'MONITOR'</span>
  <span class="sql-keyword">END</span> <span class="sql-keyword">AS</span> risk_flag
<span class="sql-keyword">FROM</span> leakage_cte
<span class="sql-keyword">ORDER BY</span> leakage_amount <span class="sql-keyword">DESC</span>;`
  },
  {
    filename: 'support_forecast.py',
    badge: 'Python · Power BI',
    result1: '100,000 tickets analyzed',
    result2: '10.58% SLA breach rate',
    metricVal: '80 Agents',
    metricLabel: 'Workload Mapped',
    trendLine: 'M4 26L22 24L40 22L58 18L76 15L94 11L116 9',
    trendDot: { cx: '116', cy: '9' },
    code:
`<span class="sql-comment"># SLA breach rate by priority tier</span>
<span class="sql-keyword">import</span> pandas <span class="sql-keyword">as</span> pd

df = pd.read_csv(<span class="sql-string">'tickets.csv'</span>)
df[<span class="sql-string">'breach'</span>] = (
  df[<span class="sql-string">'resolution_hrs'</span>]
  > df[<span class="sql-string">'sla_target_hrs'</span>]
)

breach_rate = (
  df.groupby(<span class="sql-string">'priority'</span>)[<span class="sql-string">'breach'</span>]
    .mean()
    .mul(<span class="sql-number">100</span>)
    .round(<span class="sql-number">2</span>)
)

<span class="sql-keyword">print</span>(breach_rate)`
  },
  {
    filename: 'backlog_aging.xlsx',
    badge: 'Excel · Power Query',
    result1: '100K+ records cleaned',
    result2: '90+ day delays flagged',
    metricVal: '4-Page',
    metricLabel: 'Excel Dashboard',
    trendLine: 'M4 28L22 26L40 24L58 22L76 19L94 16L116 12',
    trendDot: { cx: '116', cy: '12' },
    code:
`<span class="sql-comment">// Dynamic aging bucket — LET formula</span>
=<span class="sql-func">LET</span>(
  age, <span class="sql-func">TODAY</span>() - [@OpenDate],
  bucket, <span class="sql-func">IFS</span>(
    age&lt;=<span class="sql-number">7</span>,  <span class="sql-string">"0–7 days"</span>,
    age&lt;=<span class="sql-number">30</span>, <span class="sql-string">"8–30 days"</span>,
    age&lt;=<span class="sql-number">90</span>, <span class="sql-string">"31–90 days"</span>,
    <span class="sql-keyword">TRUE</span>,    <span class="sql-string">"90+ days"</span>
  ),
  bucket
)`
  },
  {
    filename: 'churn_analysis.sql',
    badge: 'SQL · CTEs',
    result1: '43% churn in MTM contracts',
    result2: 'Top 10% customers segmented',
    metricVal: '7,043',
    metricLabel: 'Customers Analyzed',
    trendLine: 'M4 28L22 25L40 23L58 21L76 17L94 13L116 8',
    trendDot: { cx: '116', cy: '8' },
    code:
`<span class="sql-comment">-- Churn rate by contract type</span>
<span class="sql-keyword">SELECT</span>
  contract_type,
  <span class="sql-func">COUNT</span>(*) <span class="sql-keyword">AS</span> total,
  <span class="sql-func">SUM</span>(<span class="sql-keyword">CASE WHEN</span>
    churn = <span class="sql-string">'Yes'</span>
    <span class="sql-keyword">THEN</span> <span class="sql-number">1</span> <span class="sql-keyword">ELSE</span> <span class="sql-number">0</span>
  <span class="sql-keyword">END</span>) <span class="sql-keyword">AS</span> churned,
  <span class="sql-func">ROUND</span>(<span class="sql-number">100.0</span> *
    <span class="sql-func">SUM</span>(<span class="sql-keyword">CASE WHEN</span> churn=<span class="sql-string">'Yes'</span>
    <span class="sql-keyword">THEN</span> <span class="sql-number">1</span> <span class="sql-keyword">ELSE</span> <span class="sql-number">0</span> <span class="sql-keyword">END</span>)
    / <span class="sql-func">COUNT</span>(*), <span class="sql-number">1</span>)
    <span class="sql-keyword">AS</span> churn_pct
<span class="sql-keyword">FROM</span> telco_customers
<span class="sql-keyword">GROUP BY</span> contract_type
<span class="sql-keyword">ORDER BY</span> churn_pct <span class="sql-keyword">DESC</span>;`
  }
];

let current = 0;
let timer = null;

const body     = document.getElementById('codeCardBody');
const codeEl   = document.getElementById('codeCardContent');
const filename = document.getElementById('codeCardFilename');
const result1  = document.getElementById('codeCardResult1');
const result2  = document.getElementById('codeCardResult2');
const metricV  = document.getElementById('codeCardMetricVal');
const metricL  = document.getElementById('codeCardMetricLabel');
const badge    = document.getElementById('codeCardBadge');
const trendL   = document.getElementById('codeCardTrendLine');
const trendD   = document.getElementById('codeCardTrendDot');
const dots     = document.querySelectorAll('.code-dot');
const card     = document.getElementById('heroCodeCard');

function applySlide(idx) {
  const s = SLIDES[idx];
  codeEl.innerHTML    = s.code;
  filename.textContent = s.filename;
  result1.textContent = s.result1;
  result2.textContent = s.result2;
  metricV.textContent = s.metricVal;
  metricL.textContent = s.metricLabel;
  badge.textContent   = s.badge;
  trendL.setAttribute('d', s.trendLine);
  trendD.setAttribute('cx', s.trendDot.cx);
  trendD.setAttribute('cy', s.trendDot.cy);
  dots.forEach((d, i) => d.classList.toggle('active', i === idx));
}

function goTo(idx, skipAnim) {
  if (skipAnim) { applySlide(idx); return; }
  body.classList.add('code-exit');
  setTimeout(() => {
    applySlide(idx);
    body.classList.remove('code-exit');
    body.classList.add('code-enter');
    setTimeout(() => body.classList.remove('code-enter'), 400);
  }, 280);
}

function next() {
  current = (current + 1) % SLIDES.length;
  goTo(current);
}

function startTimer() { timer = setInterval(next, 4500); }
function stopTimer()  { clearInterval(timer); }

// Dot click
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    stopTimer();
    current = +dot.dataset.idx;
    goTo(current);
    startTimer();
  });
});

// Pause on hover
card.addEventListener('mouseenter', stopTimer);
card.addEventListener('mouseleave', startTimer);

// Init
goTo(0, true);
startTimer();