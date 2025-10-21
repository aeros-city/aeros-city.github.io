// ドロップダウン切り替え
function setupDropdown(buttonId, dropdownId) {
  const button = document.getElementById(buttonId);
  const dropdown = document.getElementById(dropdownId);

  button.addEventListener('click', () => {
    const isOpen = dropdown.style.display === 'flex';
    document.querySelectorAll('.dropdown').forEach(d => d.style.display = 'none');
    dropdown.style.display = isOpen ? 'none' : 'flex';
  });
}
setupDropdown('btn-intro', 'dropdown-intro');
setupDropdown('btn-menu', 'dropdown-menu');
document.addEventListener('click', (e) => {
  if (!e.target.closest('.btn-circle')) {
    document.querySelectorAll('.dropdown').forEach(d => d.style.display = 'none');
  }
});

// ページ読み込み
async function loadPage(pageName) {
  const content = document.getElementById('content-area');
  try {
    const res = await fetch(`data/${pageName}.html`);
    const html = await res.text();
    content.innerHTML = html;
    window.scrollTo(0, 0);
  } catch {
    content.innerHTML = `<p>ページが見つかりません。</p>`;
  }
}

// ナビリンクにイベント登録
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const page = e.target.getAttribute('data-page');
    loadPage(page);
  });
});

// 初期表示
loadPage('home');



