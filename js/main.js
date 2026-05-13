/* ============================================
   个人网站 - 主交互脚本 (v5)
   ============================================ */

/* ---- Toast 通知系统（全局可用） ---- */
(function () {
    let toastContainer = null;
    let toastIdCounter = 0;

    window.showToast = function (message, type) {
        type = type || 'success';
        if (!toastContainer) {
            toastContainer = document.getElementById('toastContainer');
            if (!toastContainer) return; // DOM 还没就绪时静默返回
        }

        const id = ++toastIdCounter;
        const toast = document.createElement('div');
        toast.className = 'toast toast-' + type;
        toast.dataset.id = id;

        const iconMap = { success: '✅', error: '❌', info: 'ℹ️' };
        const icon = document.createElement('span');
        icon.className = 'toast-icon';
        icon.textContent = iconMap[type] || iconMap.info;

        const text = document.createElement('span');
        text.className = 'toast-text';
        text.textContent = message;

        toast.appendChild(icon);
        toast.appendChild(text);
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('hide');
            setTimeout(() => toast.remove(), 320);
        }, 2400);
    };

    // 简易剪贴板写入（带 toast 反馈）
    window.copyToClipboard = async function (text, successMsg, errorMsg) {
        successMsg = successMsg || (typeof t === 'function' ? t('toast_copied') : 'Copied');
        errorMsg = errorMsg || (typeof t === 'function' ? t('toast_copy_failed') : 'Copy failed');
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
            } else {
                // 降级方案：临时 textarea + execCommand
                const ta = document.createElement('textarea');
                ta.value = text;
                ta.style.position = 'fixed';
                ta.style.opacity = '0';
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
            }
            window.showToast(successMsg, 'success');
            return true;
        } catch (e) {
            window.showToast(errorMsg, 'error');
            return false;
        }
    };
})();

document.addEventListener('DOMContentLoaded', () => {

    const navbar = document.getElementById('navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollProgress = document.getElementById('scrollProgress');
    const backToTop = document.getElementById('backToTop');
    const sections = document.querySelectorAll('section[id]');

    /* ---- 统一滚动处理（rAF 节流） ---- */
    let scrollTicking = false;

    function onScrollFrame() {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? Math.min(1, scrollY / docHeight) : 0;

        if (navbar) {
            navbar.classList.toggle('scrolled', scrollY > 50);
        }

        if (scrollProgress) {
            scrollProgress.style.setProperty('--progress', progress.toFixed(4));
        }

        if (backToTop) {
            backToTop.classList.toggle('show', scrollY > 600);
        }

        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 150;
            const bottom = top + section.offsetHeight;
            if (scrollY >= top && scrollY < bottom) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === '#' + current);
        });

        scrollTicking = false;
    }

    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(onScrollFrame);
            scrollTicking = true;
        }
    }, { passive: true });

    onScrollFrame();

    /* ---- 移动端菜单 ---- */
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    /* ---- 滚动显示动画 ---- */
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                const skillFills = entry.target.querySelectorAll('.skill-fill');
                skillFills.forEach(fill => {
                    const width = fill.getAttribute('data-width');
                    setTimeout(() => { fill.style.width = width + '%'; }, 200);
                });
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ---- 数字递增动画（requestAnimationFrame + ease-out） ---- */
    const statNumbers = document.querySelectorAll('.stat-num[data-count]');
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target, parseInt(entry.target.dataset.count, 10));
                numberObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => numberObserver.observe(el));

    function animateNumber(element, target) {
        const duration = 1600;
        const start = performance.now();
        const suffix = target > 50 ? '+' : '';

        function step(now) {
            const elapsed = now - start;
            const p = Math.min(1, elapsed / duration);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - p, 3);
            const current = Math.round(target * eased);
            element.textContent = current + suffix;
            if (p < 1) requestAnimationFrame(step);
            else element.textContent = target + suffix;
        }
        requestAnimationFrame(step);
    }

    /* ---- Hero 鼠标视差：CSS 变量驱动 --mx / --my ---- */
    const hero = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg');
    if (hero && heroBg) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            heroBg.style.setProperty('--mx', x.toFixed(2));
            heroBg.style.setProperty('--my', y.toFixed(2));
        });
        hero.addEventListener('mouseleave', () => {
            heroBg.style.setProperty('--mx', '50');
            heroBg.style.setProperty('--my', '50');
        });
    }

    /* ---- 卡片鼠标光斑追随：所有 .spotlight 元素 ---- */
    const spotlights = document.querySelectorAll('.spotlight');
    spotlights.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            el.style.setProperty('--mx', x.toFixed(1));
            el.style.setProperty('--my', y.toFixed(1));
        });
    });

    /* ---- 平滑锚点滚动 ---- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    /* ---- 返回顶部按钮 ---- */
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    console.log('🚀 个人网站已加载 (v5)');
});
