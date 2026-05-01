(function () {
  const KEY = 'bk-name-typed';
  const RETIRE_MS = 15000;

  setTimeout(function () {
    const caret = document.querySelector('.caret');
    if (caret) caret.classList.add('retired');
  }, RETIRE_MS);

  if (sessionStorage.getItem(KEY)) return;

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    sessionStorage.setItem(KEY, '1');
    return;
  }

  const el = document.querySelector('h1.name');
  if (!el || !el.firstChild || el.firstChild.nodeType !== 3) return;

  const text = el.firstChild.nodeValue;
  el.firstChild.nodeValue = '';

  const TYPE_MS = 100;
  const START_MS = 200;
  let i = 0;

  function tick() {
    el.firstChild.nodeValue = text.slice(0, ++i);
    if (i >= text.length) {
      sessionStorage.setItem(KEY, '1');
      return;
    }
    setTimeout(tick, TYPE_MS);
  }

  setTimeout(tick, START_MS);
})();
