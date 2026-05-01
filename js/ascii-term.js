(function () {
  const target = document.getElementById('asciiCmd');
  if (!target) return;

  const commands = [
    'open gitbar',
    'hooked',
    'flo setup',
    'npx clean-pack',
    'pnpm dev'
  ];

  const TYPE_MS = 70;
  const BACK_MS = 30;
  const HOLD_MS = 1400;
  const BETWEEN_MS = 350;

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  (async function loop() {
    let i = 0;
    while (true) {
      const cmd = commands[i % commands.length];
      for (let j = 0; j <= cmd.length; j++) {
        target.textContent = cmd.slice(0, j);
        await sleep(TYPE_MS);
      }
      await sleep(HOLD_MS);
      for (let j = cmd.length; j >= 0; j--) {
        target.textContent = cmd.slice(0, j);
        await sleep(BACK_MS);
      }
      await sleep(BETWEEN_MS);
      i++;
    }
  })();
})();
