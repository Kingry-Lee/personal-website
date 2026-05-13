/* ============================================
   工具箱 - JavaScript (v5)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    const toolCards = document.getElementById('toolCards');
    const toolDetail = document.getElementById('toolDetail');
    const toolBack = document.getElementById('toolBack');

    /* ---- 点击卡片进入工具详情 ---- */
    document.querySelectorAll('.tool-card').forEach(card => {
        card.addEventListener('click', () => {
            const tool = card.dataset.tool;

            toolCards.style.display = 'none';
            toolDetail.style.display = 'block';

            document.querySelectorAll('.tool-detail-panel').forEach(p => p.classList.remove('active'));

            const panel = document.getElementById('detail-' + tool);
            if (panel) panel.classList.add('active');

            document.getElementById('tools').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    /* ---- 返回工具箱 ---- */
    toolBack.addEventListener('click', () => {
        toolDetail.style.display = 'none';
        toolCards.style.display = 'grid';
        document.getElementById('tools').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    /* ---- 通用复制（带 toast 反馈） ---- */
    function doCopy(text) {
        if (!text) {
            window.showToast && window.showToast('没有可复制的内容', 'info');
            return;
        }
        window.copyToClipboard
            ? window.copyToClipboard(text)
            : navigator.clipboard.writeText(text);
    }

    /* ============================================
       1. 密码生成器
       ============================================ */
    const pwLength = document.getElementById('pw-length');
    const pwLengthVal = document.getElementById('pw-length-val');
    const pwUpper = document.getElementById('pw-upper');
    const pwLower = document.getElementById('pw-lower');
    const pwDigits = document.getElementById('pw-digits');
    const pwSymbols = document.getElementById('pw-symbols');
    const pwResult = document.getElementById('pw-result');
    const pwGenerate = document.getElementById('pw-generate');
    const pwCopy = document.getElementById('pw-copy');
    const pwStrengthFill = document.getElementById('pw-strength-fill');
    const pwStrengthLabel = document.getElementById('pw-strength-label');

    pwLength.addEventListener('input', () => {
        pwLengthVal.textContent = pwLength.value;
    });

    function generatePassword() {
        const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lower = 'abcdefghijklmnopqrstuvwxyz';
        const digits = '0123456789';
        const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

        let chars = '';

        if (!pwUpper.checked && !pwLower.checked && !pwDigits.checked && !pwSymbols.checked) {
            pwUpper.checked = true;
        }

        if (pwUpper.checked) chars += upper;
        if (pwLower.checked) chars += lower;
        if (pwDigits.checked) chars += digits;
        if (pwSymbols.checked) chars += symbols;

        const length = parseInt(pwLength.value);
        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars[Math.floor(Math.random() * chars.length)];
        }

        let result = password;
        const types = [];
        if (pwUpper.checked) types.push(upper);
        if (pwLower.checked) types.push(lower);
        if (pwDigits.checked) types.push(digits);
        if (pwSymbols.checked) types.push(symbols);

        types.forEach(type => {
            const pos = Math.floor(Math.random() * length);
            result = result.substring(0, pos) + type[Math.floor(Math.random() * type.length)] + result.substring(pos + 1);
        });

        return result;
    }

    function calcStrength(pw) {
        let score = 0;
        if (pw.length >= 8) score += 25;
        if (pw.length >= 12) score += 10;
        if (pw.length >= 16) score += 10;
        if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score += 15;
        if (/\d/.test(pw)) score += 10;
        if (/[^a-zA-Z0-9]/.test(pw)) score += 20;
        if (pw.length >= 20) score += 10;
        return Math.min(100, score);
    }

    function tt(key, fallback) {
        return (typeof t === 'function') ? t(key) : fallback;
    }

    function updateStrength(pw) {
        const score = calcStrength(pw);
        pwStrengthFill.style.width = score + '%';

        if (score < 30) {
            pwStrengthFill.style.background = '#ff4757';
            pwStrengthLabel.textContent = tt('tool_pw_weak', '弱');
            pwStrengthLabel.style.color = '#ff4757';
        } else if (score < 60) {
            pwStrengthFill.style.background = '#ffa502';
            pwStrengthLabel.textContent = tt('tool_pw_medium', '中');
            pwStrengthLabel.style.color = '#ffa502';
        } else if (score < 80) {
            pwStrengthFill.style.background = '#2ed573';
            pwStrengthLabel.textContent = tt('tool_pw_strong', '强');
            pwStrengthLabel.style.color = '#2ed573';
        } else {
            pwStrengthFill.style.background = '#1e90ff';
            pwStrengthLabel.textContent = tt('tool_pw_verystrong', '非常强');
            pwStrengthLabel.style.color = '#1e90ff';
        }
    }

    pwGenerate.addEventListener('click', () => {
        const pw = generatePassword();
        pwResult.value = pw;
        updateStrength(pw);
    });

    pwCopy.addEventListener('click', () => doCopy(pwResult.value));

    // 初始化
    const initialPw = generatePassword();
    pwResult.value = initialPw;
    updateStrength(initialPw);

    /* ============================================
       2. 文本统计
       ============================================ */
    const counterInput = document.getElementById('counter-input');
    const counterChars = document.getElementById('counter-chars');
    const counterCharsNosp = document.getElementById('counter-chars-nosp');
    const counterWords = document.getElementById('counter-words');
    const counterLines = document.getElementById('counter-lines');
    const counterLimit = document.getElementById('counter-limit');
    const counterLimitStatus = document.getElementById('counter-limit-status');

    function updateCounter() {
        const text = counterInput.value;
        const chars = text.length;
        const charsNoSp = text.replace(/[\s]/g, '').length;
        const words = text.trim() ? text.trim().split(/[\s]+/).length : 0;
        const lines = text ? text.split('\n').length : 0;

        counterChars.textContent = chars;
        counterCharsNosp.textContent = charsNoSp;
        counterWords.textContent = words;
        counterLines.textContent = lines;

        const limit = parseInt(counterLimit.value);
        counterLimitStatus.textContent = `${chars} / ${limit}`;

        if (chars > limit && limit > 0) {
            counterLimitStatus.style.color = '#ff4757';
        } else {
            counterLimitStatus.style.color = 'var(--text-secondary)';
        }
    }

    counterInput.addEventListener('input', updateCounter);
    counterLimit.addEventListener('input', updateCounter);

    /* ============================================
       3. Base64 编解码
       ============================================ */
    const b64Input = document.getElementById('b64-input');
    const b64Output = document.getElementById('b64-output');
    const b64Encode = document.getElementById('b64-encode');
    const b64Decode = document.getElementById('b64-decode');
    const b64Clear = document.getElementById('b64-clear');
    const b64Copy = document.getElementById('b64-copy');

    b64Encode.addEventListener('click', () => {
        try {
            b64Output.value = btoa(unescape(encodeURIComponent(b64Input.value)));
        } catch (e) {
            b64Output.value = '❌ 编码失败';
            window.showToast && window.showToast('编码失败', 'error');
        }
    });

    b64Decode.addEventListener('click', () => {
        try {
            b64Output.value = decodeURIComponent(escape(atob(b64Input.value)));
        } catch (e) {
            b64Output.value = '❌ 解码失败：请确认输入是有效的 Base64 字符串';
            window.showToast && window.showToast('解码失败：非法 Base64', 'error');
        }
    });

    b64Clear.addEventListener('click', () => {
        b64Input.value = '';
        b64Output.value = '';
    });

    b64Copy.addEventListener('click', () => doCopy(b64Output.value));

    /* ============================================
       4. JSON 格式化
       ============================================ */
    const jsonInput = document.getElementById('json-input');
    const jsonOutput = document.getElementById('json-output');
    const jsonFormat = document.getElementById('json-format');
    const jsonCompress = document.getElementById('json-compress');
    const jsonValidate = document.getElementById('json-validate');
    const jsonClear = document.getElementById('json-clear');
    const jsonCopy = document.getElementById('json-copy');
    const jsonStatus = document.getElementById('json-status');

    function processJson(action) {
        const input = jsonInput.value.trim();
        if (!input) {
            jsonStatus.textContent = '⚠️ 请输入 JSON 字符串';
            jsonStatus.style.color = '#ffa502';
            return;
        }
        try {
            const parsed = JSON.parse(input);
            if (action === 'format') {
                jsonOutput.value = JSON.stringify(parsed, null, 4);
                jsonStatus.textContent = '✅ 格式化成功！';
                jsonStatus.style.color = '#2ed573';
            } else if (action === 'compress') {
                jsonOutput.value = JSON.stringify(parsed);
                jsonStatus.textContent = '✅ 压缩成功！';
                jsonStatus.style.color = '#2ed573';
            }
        } catch (e) {
            jsonOutput.value = '';
            jsonStatus.textContent = '❌ JSON 格式错误：' + e.message;
            jsonStatus.style.color = '#ff4757';
        }
    }

    jsonFormat.addEventListener('click', () => processJson('format'));
    jsonCompress.addEventListener('click', () => processJson('compress'));

    jsonValidate.addEventListener('click', () => {
        const input = jsonInput.value.trim();
        if (!input) {
            jsonStatus.textContent = '⚠️ 请输入 JSON 字符串';
            jsonStatus.style.color = '#ffa502';
            return;
        }
        try {
            JSON.parse(input);
            jsonStatus.textContent = '✅ JSON 格式正确';
            jsonStatus.style.color = '#2ed573';
        } catch (e) {
            jsonStatus.textContent = '❌ JSON 格式错误：' + e.message;
            jsonStatus.style.color = '#ff4757';
        }
    });

    jsonClear.addEventListener('click', () => {
        jsonInput.value = '';
        jsonOutput.value = '';
        jsonStatus.textContent = '';
    });

    jsonCopy.addEventListener('click', () => doCopy(jsonOutput.value));

    /* ============================================
       5. 时间戳转换
       ============================================ */
    const tsDatetime = document.getElementById('ts-datetime');
    const tsUnixResult = document.getElementById('ts-unix-result');
    const tsToUnix = document.getElementById('ts-to-unix');
    const tsUnixInput = document.getElementById('ts-unix-input');
    const tsDateResult = document.getElementById('ts-date-result');
    const tsToDate = document.getElementById('ts-to-date');
    const tsNow = document.getElementById('ts-now');
    const tsToday = document.getElementById('ts-today');

    function setDefaultDatetime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        tsDatetime.value = `${year}-${month}-${day}T${hours}:${minutes}`;
    }
    setDefaultDatetime();

    tsToUnix.addEventListener('click', () => {
        if (tsDatetime.value) {
            const timestamp = Math.floor(new Date(tsDatetime.value).getTime() / 1000);
            tsUnixResult.textContent = `${timestamp} 秒  (毫秒: ${timestamp * 1000})`;
        }
    });

    tsToDate.addEventListener('click', () => {
        const input = tsUnixInput.value.trim();
        if (input) {
            const ts = parseInt(input);
            if (isNaN(ts)) {
                tsDateResult.textContent = '❌ 请输入有效数字';
                return;
            }
            const date = ts > 10000000000 ? new Date(ts) : new Date(ts * 1000);
            tsDateResult.textContent = date.toLocaleString('zh-CN', {
                timeZone: 'Asia/Shanghai',
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', second: '2-digit',
                hour12: false
            }) + ' (北京时间)';
        }
    });

    tsNow.addEventListener('click', () => {
        const now = Math.floor(Date.now() / 1000);
        tsUnixInput.value = now;
        const date = new Date();
        tsDateResult.textContent = date.toLocaleString('zh-CN', {
            timeZone: 'Asia/Shanghai',
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            hour12: false
        }) + ' (北京时间)';
    });

    tsToday.addEventListener('click', () => {
        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const ts = Math.floor(todayStart.getTime() / 1000);
        tsUnixInput.value = ts;
        tsDateResult.textContent = todayStart.toLocaleString('zh-CN', {
            timeZone: 'Asia/Shanghai',
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            hour12: false
        }) + ' (北京时间)';
    });

    /* ============================================
       6. URL 编解码
       ============================================ */
    const urlInput = document.getElementById('url-input');
    const urlOutput = document.getElementById('url-output');
    const urlEncode = document.getElementById('url-encode');
    const urlDecode = document.getElementById('url-decode');
    const urlClear = document.getElementById('url-clear');
    const urlCopy = document.getElementById('url-copy');

    if (urlEncode) {
        urlEncode.addEventListener('click', () => {
            try {
                urlOutput.value = encodeURIComponent(urlInput.value);
            } catch (e) {
                urlOutput.value = '❌ 编码失败';
                window.showToast && window.showToast('URL 编码失败', 'error');
            }
        });

        urlDecode.addEventListener('click', () => {
            try {
                urlOutput.value = decodeURIComponent(urlInput.value);
            } catch (e) {
                urlOutput.value = '❌ 解码失败：含非法编码序列';
                window.showToast && window.showToast('URL 解码失败', 'error');
            }
        });

        urlClear.addEventListener('click', () => {
            urlInput.value = '';
            urlOutput.value = '';
        });

        urlCopy.addEventListener('click', () => doCopy(urlOutput.value));
    }

    /* ============================================
       7. UUID v4 生成器
       ============================================ */
    const uuidCount = document.getElementById('uuid-count');
    const uuidUpper = document.getElementById('uuid-upper');
    const uuidDash = document.getElementById('uuid-dash');
    const uuidGenerate = document.getElementById('uuid-generate');
    const uuidCopy = document.getElementById('uuid-copy');
    const uuidClear = document.getElementById('uuid-clear');
    const uuidList = document.getElementById('uuid-list');

    function generateUUIDv4() {
        // 优先使用浏览器原生（更安全的随机源）
        if (window.crypto && typeof window.crypto.randomUUID === 'function') {
            return window.crypto.randomUUID();
        }
        // 降级实现（兼容老浏览器）
        if (window.crypto && window.crypto.getRandomValues) {
            const buf = new Uint8Array(16);
            window.crypto.getRandomValues(buf);
            buf[6] = (buf[6] & 0x0f) | 0x40; // version 4
            buf[8] = (buf[8] & 0x3f) | 0x80; // variant
            const hex = [];
            for (let i = 0; i < 16; i++) hex.push(buf[i].toString(16).padStart(2, '0'));
            return `${hex.slice(0,4).join('')}-${hex.slice(4,6).join('')}-${hex.slice(6,8).join('')}-${hex.slice(8,10).join('')}-${hex.slice(10,16).join('')}`;
        }
        // 最弱兜底
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function renderUUIDList() {
        const n = Math.max(1, Math.min(100, parseInt(uuidCount.value) || 5));
        uuidCount.value = n;
        uuidList.innerHTML = '';
        const frag = document.createDocumentFragment();
        for (let i = 0; i < n; i++) {
            let uuid = generateUUIDv4();
            if (!uuidDash.checked) uuid = uuid.replace(/-/g, '');
            if (uuidUpper.checked) uuid = uuid.toUpperCase();

            const item = document.createElement('div');
            item.className = 'uuid-item';

            const span = document.createElement('span');
            span.className = 'uuid-text';
            span.textContent = uuid;

            const btn = document.createElement('button');
            btn.className = 'uuid-copy-btn';
            btn.type = 'button';
            btn.textContent = '复制';
            btn.addEventListener('click', () => doCopy(uuid));

            item.appendChild(span);
            item.appendChild(btn);
            frag.appendChild(item);
        }
        uuidList.appendChild(frag);
    }

    if (uuidGenerate) {
        uuidGenerate.addEventListener('click', renderUUIDList);

        uuidCopy.addEventListener('click', () => {
            const all = Array.from(uuidList.querySelectorAll('.uuid-text'))
                .map(el => el.textContent)
                .join('\n');
            doCopy(all);
        });

        uuidClear.addEventListener('click', () => {
            uuidList.innerHTML = '';
        });

        // 切换格式时实时刷新（如果列表非空）
        uuidUpper.addEventListener('change', () => {
            if (uuidList.children.length) renderUUIDList();
        });
        uuidDash.addEventListener('change', () => {
            if (uuidList.children.length) renderUUIDList();
        });

        // 首次进入工具时生成一批，让界面不空
        renderUUIDList();
    }

    /* ---- 语言切换时刷新工具内部硬编码文案 ---- */
    document.addEventListener('langchange', () => {
        // 重新评估当前密码强度，让标签按新语言显示
        if (pwResult && pwResult.value) updateStrength(pwResult.value);
        // 重新生成 UUID copy 按钮文本
        document.querySelectorAll('.uuid-copy-btn').forEach(b => {
            b.textContent = tt('tool_pw_copy', '复制');
        });
    });
});
