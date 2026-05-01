(async function () {
  const tpl = document.getElementById('row-template');

  function renderRow(item) {
    const fragment = tpl.content.cloneNode(true);

    fragment.querySelectorAll('[data-slot]').forEach(function (el) {
      const value = item[el.dataset.slot];
      if (value != null) el.textContent = value;
    });

    const link = fragment.querySelector('[data-link]');
    if (link && item.href) {
      link.href = item.href;
      if (item.href.indexOf('mailto:') !== 0) {
        link.target = '_blank';
        link.rel = 'noopener';
      }
    }

    return fragment;
  }

  function render(listId, items) {
    const list = document.getElementById(listId);
    if (!list || !items) return;
    const frag = document.createDocumentFragment();
    items.forEach(function (item) {
      frag.appendChild(renderRow(item));
    });
    list.appendChild(frag);
  }

  try {
    const res = await fetch('data/site.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error('site.json ' + res.status);
    const data = await res.json();
    render('tools-list', data.tools);
    render('writing-list', data.writing);
    render('elsewhere-list', data.elsewhere);
  } catch (err) {
    console.error('Failed to load site content:', err);
  }
})();
