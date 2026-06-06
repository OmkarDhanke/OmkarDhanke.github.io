const tabs    = document.querySelectorAll('.proj-tab');
const cards   = document.querySelectorAll('.proj-catalog-card');
const empty   = document.getElementById('projEmptyState');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const filter = tab.dataset.filter;

    // Update active tab
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Show/hide cards
    let visible = 0;
    cards.forEach(card => {
      const tags = card.dataset.tags || '';
      const show = filter === 'all' || tags.includes(filter);
      card.classList.toggle('hidden', !show);
      if (show) visible++;
    });

    // Empty state
    empty.style.display = visible === 0 ? 'block' : 'none';
  });
});