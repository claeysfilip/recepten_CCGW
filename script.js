let allRecipes = [];
let activeCategory = 'Alle';
let searchTerm = '';

const grid = document.getElementById('card-grid');
const emptyState = document.getElementById('empty-state');
const tabsEl = document.getElementById('tabs');
const searchInput = document.getElementById('search');
const overlay = document.getElementById('overlay');
const detailPanel = document.getElementById('recipe-detail');
const detailContent = document.getElementById('detail-content');
const closeBtn = document.getElementById('close-btn');

init();

async function init() {
  try {
    const res = await fetch('recipes.json', { cache: 'no-store' });
    allRecipes = await res.json();
  } catch (err) {
    console.error('Could not load recipes.json', err);
    allRecipes = [];
  }
  buildTabs();
  render();

  searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value.trim().toLowerCase();
    render();
  });

  closeBtn.addEventListener('click', closeDetail);
  overlay.addEventListener('click', closeDetail);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDetail();
  });
}

function buildTabs() {
  const categories = ['Alle', ...new Set(allRecipes.map(r => r.category).filter(Boolean))];
  tabsEl.innerHTML = '';
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'tab' + (cat === activeCategory ? ' active' : '');
    btn.textContent = cat;
    btn.dataset.category = cat;
    btn.addEventListener('click', () => {
      activeCategory = cat;
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      render();
    });
    tabsEl.appendChild(btn);
  });
}

function matchesSearch(recipe, term) {
  if (!term) return true;
  const haystack = [
    recipe.title,
    recipe.category,
    ...(recipe.tags || []),
    ...(recipe.ingredients || [])
  ].join(' ').toLowerCase();
  return haystack.includes(term);
}

function render() {
  const filtered = allRecipes.filter(r =>
    (activeCategory === 'Alle' || r.category === activeCategory) &&
    matchesSearch(r, searchTerm)
  );

  grid.innerHTML = '';

  if (filtered.length === 0) {
    emptyState.hidden = false;
    return;
  }
  emptyState.hidden = true;

  filtered.forEach(recipe => {
    const card = document.createElement('article');
    card.className = 'recipe-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Bekijk recept: ${recipe.title}`);

    card.innerHTML = `
      ${recipe.image ? `<img class="card-image" src="${escapeHtml(recipe.image)}" alt="${escapeHtml(recipe.title)}" loading="lazy">` : ''}
      <p class="card-category">${escapeHtml(recipe.category || 'Recept')}</p>
      <h2 class="card-title">${escapeHtml(recipe.title)}</h2>
      <p class="card-meta">
        ${recipe.time ? `<span>&#9202; ${escapeHtml(recipe.time)}</span>` : ''}
        ${recipe.servings ? `<span>&#127860; Voor ${escapeHtml(String(recipe.servings))} personen</span>` : ''}
      </p>
    `;

    card.addEventListener('click', () => openDetail(recipe));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDetail(recipe);
      }
    });

    grid.appendChild(card);
  });
}

function openDetail(recipe) {
  detailContent.innerHTML = `
    ${recipe.image ? `<img class="detail-image" src="${escapeHtml(recipe.image)}" alt="${escapeHtml(recipe.title)}">` : ''}
    <p class="detail-category">${escapeHtml(recipe.category || 'Recept')}</p>
    <h2 class="detail-title">${escapeHtml(recipe.title)}</h2>
    <div class="detail-meta">
      ${recipe.time ? `<span>&#9202; ${escapeHtml(recipe.time)}</span>` : ''}
      ${recipe.servings ? `<span>&#127860; Voor ${escapeHtml(String(recipe.servings))} personen</span>` : ''}
    </div>

    <h3 class="detail-section-title">Ingrediënten</h3>
    <ul class="ingredient-list">
      ${(recipe.ingredients || []).map(i => `<li>${escapeHtml(i)}</li>`).join('')}
    </ul>

    <h3 class="detail-section-title">Bereiding</h3>
    <ol class="step-list">
      ${(recipe.steps || []).map(s => `<li>${escapeHtml(s)}</li>`).join('')}
    </ol>

    ${recipe.notes ? `<div class="detail-notes">${escapeHtml(recipe.notes)}</div>` : ''}
  `;
  overlay.classList.add('visible');
  detailPanel.classList.add('open');
  closeBtn.focus();
}

function closeDetail() {
  overlay.classList.remove('visible');
  detailPanel.classList.remove('open');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
