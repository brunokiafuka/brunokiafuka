(function () {
  const anchors = document.querySelectorAll('h2.sec .anchor');
  if (!anchors.length) return;

  anchors.forEach(function (a) {
    a.addEventListener('click', function () {
      if (!navigator.clipboard || !navigator.clipboard.writeText) return;
      navigator.clipboard.writeText(a.href).catch(function () {});
    });
  });
})();
