/* ============================================
   主题切换 (Dark / Light / System)
   ============================================ */

const THEME_KEY = 'theme';
const DARK = 'dark';
const LIGHT = 'light';
const SYSTEM = 'system';

function getSavedTheme() {
  return localStorage.getItem(THEME_KEY) || SYSTEM;
}

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
}

function getEffectiveTheme() {
  const saved = getSavedTheme();
  return saved === SYSTEM ? getSystemTheme() : saved;
}

function applyTheme(theme) {
  const effective = theme === SYSTEM ? getSystemTheme() : theme;
  document.documentElement.setAttribute('data-theme', effective);
  document.documentElement.setAttribute('data-theme-mode', theme);
  localStorage.setItem(THEME_KEY, theme);
  updateThemeBtnText();
}

function cycleTheme() {
  const current = getSavedTheme();
  const next = current === DARK ? LIGHT : current === LIGHT ? SYSTEM : DARK;
  applyTheme(next);
}

function updateThemeBtnText() {
  const theme = getSavedTheme();
  document.querySelectorAll('.theme-btn').forEach(btn => {
    const mode = btn.dataset.theme;
    btn.classList.toggle('active', mode === theme);
  });
}

// 监听系统主题变化
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (getSavedTheme() === SYSTEM) {
    applyTheme(SYSTEM);
  }
});

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(getSavedTheme());
});
