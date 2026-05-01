(function () {
  const KEY = 'bk-theme';
  const html = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const favicon = document.getElementById('favicon');
  const mql = window.matchMedia('(prefers-color-scheme: dark)');

  const systemTheme = () => (mql.matches ? 'dark' : 'light');
  let theme = localStorage.getItem(KEY) || systemTheme();

  function buildFavicon(t) {
    const bg = t === 'dark' ? '#0e0e0e' : '#ffffff';
    const fg = t === 'dark' ? '#ededed' : '#111111';
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
        '<rect width="64" height="64" rx="8" fill="' + bg + '"/>' +
        '<text x="32" y="32" dy=".35em" text-anchor="middle" ' +
          'font-family="ui-monospace,Courier New,monospace" ' +
          'font-weight="700" font-size="30" letter-spacing="-1" ' +
          'fill="' + fg + '">BK</text>' +
      '</svg>';
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  function apply(t) {
    html.setAttribute('data-theme', t);
    btn.textContent = t === 'dark' ? '○ Dark' : '● Light';
    if (favicon) favicon.href = buildFavicon(t);
  }
  apply(theme);

  btn.addEventListener('click', function () {
    theme = (html.getAttribute('data-theme') === 'dark') ? 'light' : 'dark';
    if (theme === systemTheme()) {
      localStorage.removeItem(KEY);
    } else {
      localStorage.setItem(KEY, theme);
    }
    apply(theme);
  });

  mql.addEventListener('change', function () {
    if (!localStorage.getItem(KEY)) {
      theme = systemTheme();
      apply(theme);
    }
  });
})();
