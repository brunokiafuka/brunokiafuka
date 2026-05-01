(function () {
  const KEY = 'bk-theme';
  const html = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const saved = localStorage.getItem(KEY);
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  let theme = saved || (prefersDark ? 'dark' : 'light');

  function apply(t) {
    html.setAttribute('data-theme', t);
    btn.textContent = t === 'dark' ? '○ Dark' : '● Light';
  }
  apply(theme);
  btn.addEventListener('click', function () {
    theme = (html.getAttribute('data-theme') === 'dark') ? 'light' : 'dark';
    localStorage.setItem(KEY, theme);
    apply(theme);
  });
})();
