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

function applyTheme(theme) {
  const effective = theme === SYSTEM ? getSystemTheme() : theme;
  document.documentElement.setAttribute('data-theme', effective);
  document.documentElement.setAttribute('data-theme-mode', theme);
  localStorage.setItem(THEME_KEY, theme);

  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });
}

// 语言切换（供 onclick 调用）
function switchLang(lang) {
  if (typeof setLang === 'function') {
    setLang(lang);
  }
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
