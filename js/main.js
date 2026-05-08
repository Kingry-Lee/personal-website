/* ============================================
   个人网站 - JavaScript
   ============================================ */

// DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', () => {

    /* ---- 导航栏滚动效果 ---- */
    const navbar = document.getElementById('navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        // 背景切换
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;

        // 高亮当前 section 的导航链接
        updateActiveLink();
    });

    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    /* ---- 移动端菜单 ---- */
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 点击导航链接后关闭菜单
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    /* ---- 滚动显示动画 ---- */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // 如果是技能条，触发宽度动画
                const skillFills = entry.target.querySelectorAll('.skill-fill');
                skillFills.forEach(fill => {
                    const width = fill.getAttribute('data-width');
                    setTimeout(() => {
                        fill.style.width = width + '%';
                    }, 200);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ---- 数字递增动画 ---- */
    const statNumbers = document.querySelectorAll('.stat-num[data-count]');

    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.getAttribute('data-count'));
                animateNumber(target, count);
                numberObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => numberObserver.observe(el));

    function animateNumber(element, target) {
        let current = 0;
        const increment = target > 50 ? Math.ceil(target / 60) : 1;
        const duration = 2000;
        const step = Math.max(1, Math.floor(duration / (target / increment)));

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = current + (target > 50 ? '+' : '');
        }, step);
    }

    /* ---- 鼠标移动视差效果 (Hero) ---- */
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            const bg = hero.querySelector('.hero-bg');
            bg.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
        });
    }

    /* ---- 平滑锚点滚动 (兼容 Safari) ---- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    console.log('🚀 个人网站已加载');
});
