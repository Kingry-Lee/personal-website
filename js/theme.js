/* ============================================
   主题切换 (Dark / Light / System)
   注：首次绘制前的主题应用由 index.html <head> 内联脚本完成（消除 FOUC）
   本文件仅负责：暴露 applyTheme/switchLang、监听系统变化、同步按钮 active
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

  // 同步浏览器 UI 颜色（地址栏等）
  const metaTheme = document.querySelector('meta[name="theme-color"]:not([media])');
  if (metaTheme) {
    metaTheme.setAttribute('content', effective === DARK ? '#0a0a0f' : '#f5f5fa');
  }
}

function switchLang(lang) {
  if (typeof setLang === 'function') {
    setLang(lang);
  }
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (getSavedTheme() === SYSTEM) {
    applyTheme(SYSTEM);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = getSavedTheme();
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === savedTheme);
  });

  const savedLang = (typeof getCurrentLang === 'function' && getCurrentLang()) ||
                    localStorage.getItem('lang') || 'zh';
  if (typeof setLang === 'function') {
    setLang(savedLang);
  }
});
