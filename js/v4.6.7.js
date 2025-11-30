async function applyVersionLabel() {
  try {
    const res = await fetch('version.json');
    const { version } = await res.json();
    document.getElementById('version-label').textContent = `v${version}`;
  } catch {
    // Keep default label if manifest missing
  }
}

function setColorMode(mode) {
  document.body.classList.remove('mode-high-contrast', 'mode-dim');
  if (mode === 'high-contrast') document.body.classList.add('mode-high-contrast');
  if (mode === 'dim') document.body.classList.add('mode-dim');
}

function initForm() {
  const select = document.getElementById('color-mode');
  const status = document.querySelector('.status');

  select.addEventListener('change', (e) => {
    setColorMode(e.target.value);
    status.textContent = `Color mode set to: ${e.target.value}`;
  });

  const form = select.closest('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    status.textContent = username ? `Submitted: ${username}` : 'Please enter a username.';
  });
}

function checkContrast() {
  const cs = getComputedStyle(document.body);
  const fg = cs.getPropertyValue('--fg').trim();
  const bg = cs.getPropertyValue('--bg').trim();
  const results = document.getElementById('results');
  results.textContent = `Quick check — foreground ${fg} on background ${bg}. Verify AA ratios with tooling.`;
}

function checkFocus() {
  const results = document.getElementById('results');
  results.textContent = 'Focus uses :focus-visible with 3px outline and 2px offset. Tab through to verify.';
}

function checkAria() {
  const landmarks = [
    ...document.querySelectorAll('header, main, footer')
  ];
  const results = document.getElementById('results');
  results.textContent = `Landmarks detected: ${landmarks.length}. Ensure exactly one <main> landmark.`;
}

function wireChecks() {
  document.getElementById('check-contrast').addEventListener('click', checkContrast);
  document.getElementById('check-focus').addEventListener('click', checkFocus);
  document.getElementById('check-aria').addEventListener('click', checkAria);
}

document.addEventListener('DOMContentLoaded', () => {
  applyVersionLabel();
  initForm();
  wireChecks();
});
