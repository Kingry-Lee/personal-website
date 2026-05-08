/* ============================================
   多语言翻译 (i18n)
   ============================================ */

const i18n = {
  zh: {
    /* 导航 */
    nav_home: '首页',
    nav_about: '关于',
    nav_skills: '技能',
    nav_tools: '工具箱',
    nav_projects: '项目',
    nav_contact: '联系',

    /* Hero */
    hero_greeting: '你好，我是',
    hero_name: '李志伟',
    hero_subtitle: '全栈工程师 / 技术探索者',
    hero_desc: '用代码构建数字世界，用技术解决实际问题',
    hero_btn_tools: '在线工具',
    hero_btn_contact: '联系我',
    scroll_hint: '向下滚动',

    /* 关于 */
    about_title: '关于我',
    about_p1: '你好！我是一名热爱技术的全栈工程师，热衷于探索新技术并将其应用于实际项目中。',
    about_p2: '从服务器架构到前端交互，从数据处理到自动化运维，我一直致力于构建高效、优雅的技术解决方案。',
    about_p3: '我相信好的代码不仅解决问题，更能创造价值。',
    stat_exp: '年+经验',
    stat_proj: '+项目',
    stat_online: '/7 在线',

    /* 技能 */
    skills_title: '技能栈',
    skill_backend: '后端开发',
    skill_frontend: '前端开发',
    skill_devops: 'DevOps & 运维',
    skill_ai: 'AI & 数据',

    /* 工具箱 */
    tools_title: '🛠️ 在线工具箱',
    tools_desc: '日常开发小工具，全部在浏览器本地运行，你的数据不会上传到服务器',
    tool_password: '密码生成器',
    tool_password_desc: '生成高强度随机密码，自定义长度和字符类型',
    tool_tag_popular: '常用',
    tool_counter: '文本统计',
    tool_counter_desc: '实时统计字符数、字数、行数，带字数限制提醒',
    tool_base64: 'Base64 编解码',
    tool_base64_desc: '字符串与 Base64 之间双向编码/解码',
    tool_json: 'JSON 格式化',
    tool_json_desc: '格式化、压缩、校验 JSON 字符串，定位错误',
    tool_timestamp: '时间戳转换',
    tool_timestamp_desc: 'Unix 时间戳与日期时间互转，快捷取当前时间',
    tool_back: '← 返回工具箱',
    tool_pw_title: '🔑 密码生成器',
    tool_pw_length: '密码长度',
    tool_pw_upper: '大写 A-Z',
    tool_pw_lower: '小写 a-z',
    tool_pw_digits: '数字 0-9',
    tool_pw_symbols: '符号 !@#$%',
    tool_pw_gen: '生成',
    tool_pw_copy: '复制',
    tool_pw_strength: '密码强度：',
    tool_pw_weak: '弱',
    tool_pw_medium: '中',
    tool_pw_strong: '强',
    tool_pw_verystrong: '非常强',
    tool_ct_title: '📝 文本统计',
    tool_ct_placeholder: '粘贴或输入文字，实时统计...',
    tool_ct_chars: '字符',
    tool_ct_chars_nosp: '字符(无空格)',
    tool_ct_words: '词语',
    tool_ct_lines: '行',
    tool_ct_limit: '字数限制',
    tool_b64_title: '🔐 Base64 编解码',
    tool_b64_placeholder: '输入要编码或解码的文字...',
    tool_b64_encode: '编码 →',
    tool_b64_decode: '解码 →',
    tool_b64_clear: '清空',
    tool_b64_result_placeholder: '结果...',
    tool_b64_copy: '复制结果',
    tool_json_title: '📋 JSON 格式化 / 压缩',
    tool_json_placeholder: '粘贴 JSON 字符串...',
    tool_json_format: '格式化',
    tool_json_compress: '压缩',
    tool_json_validate: '校验',
    tool_json_clear: '清空',
    tool_json_copy: '复制结果',
    tool_ts_title: '⏰ 时间戳转换器',
    tool_ts_to_unix: '📅 日期时间 → 时间戳',
    tool_ts_convert_unix: '转换为时间戳',
    tool_ts_to_date: '⏱️ 时间戳 → 日期时间',
    tool_ts_placeholder: '输入时间戳 (秒)',
    tool_ts_convert_date: '转换为日期',
    tool_ts_quick: '快捷：',
    tool_ts_now: '现在',
    tool_ts_today: '今天 00:00',

    /* 项目 */
    projects_title: '我的项目',
    proj1_title: '自动化运维平台',
    proj1_desc: '一站式服务器管理、监控告警、自动化部署平台',
    proj2_title: 'AI 智能助手',
    proj2_desc: '基于 LLM 的智能对话系统，支持多平台接入',
    proj3_title: '台账管理系统',
    proj3_desc: '高效的数据台账生成、导出与管理工具',
    proj4_title: '个人云盘',
    proj4_desc: '轻量级私有云存储方案，安全可靠',

    /* 联系 */
    contact_title: '联系我',
    contact_intro: '如果你有想法、合作或者只是想聊聊天，随时联系我！',
    contact_email: 'lizhiwei@example.com',
    contact_wechat: '微信：kingrylee0619',

    /* Footer */
    footer: '© 2026 李志伟. Built with ❤️',

    /* 主题 */
    theme_light: '☀️',
    theme_dark: '🌙',
    theme_system: '💻',
  },

  en: {
    nav_home: 'Home',
    nav_about: 'About',
    nav_skills: 'Skills',
    nav_tools: 'Tools',
    nav_projects: 'Projects',
    nav_contact: 'Contact',

    hero_greeting: "Hi, I'm",
    hero_name: 'KingryLee',
    hero_subtitle: 'Full-Stack Engineer / Tech Explorer',
    hero_desc: 'Building digital worlds with code, solving real problems with tech',
    hero_btn_tools: 'Online Tools',
    hero_btn_contact: 'Contact Me',
    scroll_hint: 'Scroll down',

    about_title: 'About Me',
    about_p1: "Hi! I'm a passionate full-stack engineer who loves exploring new technologies and applying them to real-world projects.",
    about_p2: 'From server architecture to frontend interactions, from data processing to automated operations, I strive to build efficient and elegant technical solutions.',
    about_p3: 'I believe good code not only solves problems but creates value.',
    stat_exp: '+ Years Exp',
    stat_proj: '+ Projects',
    stat_online: '/7 Online',

    skills_title: 'Skills',
    skill_backend: 'Backend',
    skill_frontend: 'Frontend',
    skill_devops: 'DevOps',
    skill_ai: 'AI & Data',

    tools_title: '🛠️ Online Tools',
    tools_desc: 'Daily dev tools. All run locally in your browser — your data never leaves your machine.',
    tool_password: 'Password Generator',
    tool_password_desc: 'Generate strong random passwords with custom length and character types',
    tool_tag_popular: 'Popular',
    tool_counter: 'Text Counter',
    tool_counter_desc: 'Real-time character, word, and line count with limit warnings',
    tool_base64: 'Base64 Encode/Decode',
    tool_base64_desc: 'Two-way encoding and decoding between text and Base64',
    tool_json: 'JSON Formatter',
    tool_json_desc: 'Format, minify, and validate JSON strings with error location',
    tool_timestamp: 'Timestamp Converter',
    tool_timestamp_desc: 'Convert between Unix timestamps and date/time',
    tool_back: '← Back to Tools',
    tool_pw_title: '🔑 Password Generator',
    tool_pw_length: 'Password Length',
    tool_pw_upper: 'Uppercase A-Z',
    tool_pw_lower: 'Lowercase a-z',
    tool_pw_digits: 'Digits 0-9',
    tool_pw_symbols: 'Symbols !@#$%',
    tool_pw_gen: 'Generate',
    tool_pw_copy: 'Copy',
    tool_pw_strength: 'Strength: ',
    tool_pw_weak: 'Weak',
    tool_pw_medium: 'Medium',
    tool_pw_strong: 'Strong',
    tool_pw_verystrong: 'Very Strong',
    tool_ct_title: '📝 Text Counter',
    tool_ct_placeholder: 'Paste or type text, real-time stats...',
    tool_ct_chars: 'Chars',
    tool_ct_chars_nosp: 'Chars(no space)',
    tool_ct_words: 'Words',
    tool_ct_lines: 'Lines',
    tool_ct_limit: 'Limit',
    tool_b64_title: '🔐 Base64 Encode/Decode',
    tool_b64_placeholder: 'Enter text to encode or decode...',
    tool_b64_encode: 'Encode →',
    tool_b64_decode: 'Decode →',
    tool_b64_clear: 'Clear',
    tool_b64_result_placeholder: 'Result...',
    tool_b64_copy: 'Copy Result',
    tool_json_title: '📋 JSON Formatter / Minify',
    tool_json_placeholder: 'Paste JSON string...',
    tool_json_format: 'Format',
    tool_json_compress: 'Minify',
    tool_json_validate: 'Validate',
    tool_json_clear: 'Clear',
    tool_json_copy: 'Copy Result',
    tool_ts_title: '⏰ Timestamp Converter',
    tool_ts_to_unix: '📅 Date/Time → Timestamp',
    tool_ts_convert_unix: 'Convert to Timestamp',
    tool_ts_to_date: '⏱️ Timestamp → Date/Time',
    tool_ts_placeholder: 'Enter timestamp (seconds)',
    tool_ts_convert_date: 'Convert to Date',
    tool_ts_quick: 'Quick: ',
    tool_ts_now: 'Now',
    tool_ts_today: 'Today 00:00',

    projects_title: 'Projects',
    proj1_title: 'Auto Ops Platform',
    proj1_desc: 'All-in-one server management, monitoring alerts, automated deployment',
    proj2_title: 'AI Assistant',
    proj2_desc: 'LLM-powered intelligent chat system with multi-platform access',
    proj3_title: 'Ledger Management',
    proj3_desc: 'Efficient data ledger generation, export and management tool',
    proj4_title: 'Personal Cloud',
    proj4_desc: 'Lightweight private cloud storage solution, secure and reliable',

    contact_title: 'Contact Me',
    contact_intro: 'If you have ideas, collaboration opportunities, or just want to chat, feel free to reach out!',
    contact_email: 'lizhiwei@example.com',
    contact_wechat: 'WeChat: kingrylee0619',

    footer: '© 2026 KingryLee. Built with ❤️',

    theme_light: '☀️',
    theme_dark: '🌙',
    theme_system: '💻',
  }
};

let currentLang = localStorage.getItem('lang') || 'zh';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  const t = i18n[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) {
      // 处理不同元素类型
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        if (el.type === 'text' || el.type === 'search') {
          el.value = t[key];
        } else {
          el.placeholder = t[key];
        }
      } else {
        el.textContent = t[key];
      }
    }
  });

  // 更新 html lang
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

  // 更新语言切换按钮
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // 更新主题按钮文字
  updateThemeBtnText();

  // 触发自定义事件，通知 tools.js 等
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

function getCurrentLang() {
  return currentLang;
}

function t(key) {
  return i18n[currentLang][key] || key;
}
