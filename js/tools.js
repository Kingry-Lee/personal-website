/* ============================================
   工具箱 - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    const toolCards = document.getElementById('toolCards');
    const toolDetail = document.getElementById('toolDetail');
    const toolBack = document.getElementById('toolBack');

    /* ---- 点击卡片进入工具详情 ---- */
    document.querySelectorAll('.tool-card').forEach(card => {
        card.addEventListener('click', () => {
            const tool = card.dataset.tool;

            // 隐藏卡片网格，显示详情
            toolCards.style.display = 'none';
            toolDetail.style.display = 'block';

            // 隐藏所有详情面板
            document.querySelectorAll('.tool-detail-panel').forEach(p => p.classList.remove('active'));

            // 显示对应面板
            const panel = document.getElementById('detail-' + tool);
            if (panel) panel.classList.add('active');

            // 滚动到顶部
            document.getElementById('tools').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    /* ---- 返回工具箱 ---- */
    toolBack.addEventListener('click', () => {
        toolDetail.style.display = 'none';
        toolCards.style.display = 'grid';
        document.getElementById('tools').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

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

        // 确保每种选中类型至少包含一个字符
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

    function updateStrength(pw) {
        const score = calcStrength(pw);
        pwStrengthFill.style.width = score + '%';

        if (score < 30) {
            pwStrengthFill.style.background = '#ff4757';
            pwStrengthLabel.textContent = '弱';
            pwStrengthLabel.style.color = '#ff4757';
        } else if (score < 60) {
            pwStrengthFill.style.background = '#ffa502';
            pwStrengthLabel.textContent = '中';
            pwStrengthLabel.style.color = '#ffa502';
        } else if (score < 80) {
            pwStrengthFill.style.background = '#2ed573';
            pwStrengthLabel.textContent = '强';
            pwStrengthLabel.style.color = '#2ed573';
        } else {
            pwStrengthFill.style.background = '#1e90ff';
            pwStrengthLabel.textContent = '非常强';
            pwStrengthLabel.style.color = '#1e90ff';
        }
    }

    pwGenerate.addEventListener('click', () => {
        const pw = generatePassword();
        pwResult.value = pw;
        updateStrength(pw);
    });

    pwCopy.addEventListener('click', () => {
        pwResult.select();
        navigator.clipboard.writeText(pwResult.value).then(() => {
            pwCopy.textContent = '✅ 已复制';
            setTimeout(() => { pwCopy.textContent = '复制'; }, 1500);
        }).catch(() => {
            document.execCommand('copy');
            pwCopy.textContent = '✅ 已复制';
            setTimeout(() => { pwCopy.textContent = '复制'; }, 1500);
        });
    });

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
        }
    });

    b64Decode.addEventListener('click', () => {
        try {
            b64Output.value = decodeURIComponent(escape(atob(b64Input.value)));
        } catch (e) {
            b64Output.value = '❌ 解码失败：请确认输入是有效的 Base64 字符串';
        }
    });

    b64Clear.addEventListener('click', () => {
        b64Input.value = '';
        b64Output.value = '';
    });

    b64Copy.addEventListener('click', () => {
        b64Output.select();
        navigator.clipboard.writeText(b64Output.value).then(() => {
            b64Copy.textContent = '✅ 已复制';
            setTimeout(() => { b64Copy.textContent = '复制结果'; }, 1500);
        }).catch(() => {
            document.execCommand('copy');
            b64Copy.textContent = '✅ 已复制';
            setTimeout(() => { b64Copy.textContent = '复制结果'; }, 1500);
        });
    });

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
            jsonStatus.textContent = '✅ JSON 格式正确 ✅';
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

    jsonCopy.addEventListener('click', () => {
        jsonOutput.select();
        navigator.clipboard.writeText(jsonOutput.value).then(() => {
            jsonCopy.textContent = '✅ 已复制';
            setTimeout(() => { jsonCopy.textContent = '复制结果'; }, 1500);
        }).catch(() => {
            document.execCommand('copy');
            jsonCopy.textContent = '✅ 已复制';
            setTimeout(() => { jsonCopy.textContent = '复制结果'; }, 1500);
        });
    });

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
});
