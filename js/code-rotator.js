const SLIDES = [
  {
    filename: 'revenue_analysis.sql',
    badge: 'SQL · Power BI',
    result1: 'Query returned 247 rows',
    result2: '38 HIGH RISK flagged',
    metricVal: '$18,348',
    metricLabel: 'Leakage Identified',
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
    code:
`<span class="sql-comment">// Backlog risk score per request</span>
=<span class="sql-func">LET</span>(
  age,     <span class="sql-func">TODAY</span>() - [@OpenDate],
  volume,  [@RequestCount],
  bucket,  <span class="sql-func">IFS</span>(
    age &lt;= <span class="sql-number">7</span>,   <span class="sql-string">"0–7 days"</span>,
    age &lt;= <span class="sql-number">30</span>,  <span class="sql-string">"8–30 days"</span>,
    age &lt;= <span class="sql-number">90</span>,  <span class="sql-string">"31–90 days"</span>,
    <span class="sql-keyword">TRUE</span>,       <span class="sql-string">"90+ days"</span>
  ),
  weight,  <span class="sql-func">IFS</span>(
    age &lt;= <span class="sql-number">7</span>,   <span class="sql-number">1</span>,
    age &lt;= <span class="sql-number">30</span>,  <span class="sql-number">2</span>,
    age &lt;= <span class="sql-number">90</span>,  <span class="sql-number">4</span>,
    <span class="sql-keyword">TRUE</span>,       <span class="sql-number">8</span>
  ),
  risk_score, weight * volume,
  flag,    <span class="sql-func">IF</span>(
    risk_score > <span class="sql-number">500</span>,
    <span class="sql-string">"🔴 HIGH RISK"</span>,
    <span class="sql-func">IF</span>(
      risk_score > <span class="sql-number">200</span>,
      <span class="sql-string">"🟡 MONITOR"</span>,
      <span class="sql-string">"🟢 NORMAL"</span>
    )
  ),
  <span class="sql-func">CHOOSE</span>(<span class="sql-number">1</span>,
    bucket, risk_score, flag
  )
)`
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
const dots     = document.querySelectorAll('.code-dot');
const card     = document.getElementById('heroCodeCard');

function applySlide(idx) {
  const s = SLIDES[idx];
  codeEl.innerHTML     = s.code;
  filename.textContent = s.filename;
  result1.textContent  = s.result1;
  result2.textContent  = s.result2;
  metricV.textContent  = s.metricVal;
  metricL.textContent  = s.metricLabel;
  badge.textContent    = s.badge;
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

function startTimer() {
  clearInterval(timer);
  timer = setInterval(next, 4500);
}
function stopTimer() {
  clearInterval(timer);
  timer = null;
}

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    stopTimer();
    current = +dot.dataset.idx;
    goTo(current);
    startTimer();
  });
});

card.addEventListener('mouseenter', stopTimer);
card.addEventListener('mouseleave', startTimer);

goTo(0, true);
startTimer();