const cuteMessages = [
    "🌸 今日也要元气满满哦！",
    "🌟 你是世界上最棒的人！",
    "💌 今天也要开开心心哒~",
    "🌈 生活明朗，万物可爱！",
    "🐾 每一步都值得被记录！",
    "🎈 愿你的每一天都充满惊喜！",
    "🐻 要像小熊一样温暖哦~",
    "🌼 小日子，要加油呀！",
    "🍓 甜甜的瞬间，甜甜的心情！",
    "🦄 保持童心，生活更有趣！",
    "💖 被爱包围的一天开始啦！",
    "🌞 阳光正好，适合微笑！",
    "🐰 蹦蹦跳跳，迎接美好！",
    "🎉 生活是自己的，尽情可爱！",
    "🍭 给生活加点甜吧~",
    "🐶 汪~今天也要努力哦！",
    "🌙 晚安，做个甜甜的梦！",
    "🎵 音乐响起，快乐开启！",
    "🧸 抱着小熊，烦恼走开！",
    "🌱 成长路上，温柔前行！",
    "💫 星星点灯，照亮好心情！",
    "🍦 夏天的快乐，冰淇淋给的！",
    "🐝 忙碌的日子也别忘了休息~",
    "🎁 生活中的小确幸来啦！",
    "🌊 一起奔向大海的怀抱！",
    "🍂 秋天的第一杯奶茶在哪？",
    "🐦 自由的鸟儿，自在的你！",
    "🎮 游戏时间，放松一下！",
    "🎨 用色彩描绘美好生活！",
    "🍪 甜甜的饼干，甜甜的你！",
    "🎀 少女心爆棚的一天！",
    "🌌 仰望星空，心怀梦想！",
    "🐾 跟着感觉，向前走！",
    "🍹 夏日特调，清凉一夏！",
    "🎯 目标明确，勇往直前！",
    "🦋 破茧成蝶，华丽蜕变！",
    "🍃 微风轻拂，心情舒畅！",
    "🎭 生活如戏，全靠演技！",
    "🌰 冬天的栗子香，好幸福！",
    "🐿️ 储存快乐，对抗烦恼！",
    "💍 戴上皇冠，你就是女王！",
    "🌾 麦田里的守望者~",
    "🎇 烟花绽放的瞬间，好美！",
    "🍓 草莓季，甜蜜来袭！",
    "🐚 听，大海的声音！",
    "🎵 音符在跳动，心也在跳舞！",
    "🌿 绿植相伴，生活更美好！",
    "🐾 走过的路，会变成光！",
    "🌞 太阳公公说：笑一个！",
    "💖 爱自己，是终身浪漫的开始！"
];

document.addEventListener('DOMContentLoaded', () => {
    // 设置欢迎消息时间
    document.getElementById('welcomeTime').textContent = new Date().toLocaleTimeString();

    // 字符计数
    const inputText = document.getElementById('inputText');
    const charCount = document.getElementById('charCount');
    
    inputText.addEventListener('input', () => {
        charCount.textContent = `${inputText.value.length} 字符`;
    });

    // 文件拖放功能
    const dropzone = document.getElementById('dropzone');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        dropzone.classList.add('border-primary', 'bg-primary/5');
    }
    
    function unhighlight() {
        dropzone.classList.remove('border-primary', 'bg-primary/5');
    }
    
    dropzone.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const file = dt.files[0];
        if (file && file.type === 'text/plain') {
            readFile(file);
        } else {
            addMessage('系统', '请上传有效的TXT文本文件', 'bot');
        }
    }
    
    document.getElementById('fileInput').addEventListener('change', function() {
        if (this.files.length) {
            if (this.files[0].type === 'text/plain') {
                readFile(this.files[0]);
            } else {
                addMessage('系统', '请上传有效的TXT文本文件', 'bot');
            }
        }
    });
    
    function readFile(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            inputText.value = e.target.result;
            charCount.textContent = `${inputText.value.length} 字符`;
            addMessage('系统', `已成功加载文件: ${file.name}`, 'bot');
        };
        reader.onerror = function() {
            addMessage('系统', '文件读取失败，请重试', 'bot');
        };
        reader.readAsText(file);
    }

    // 验证按钮点击事件
    document.getElementById('validateBtn').addEventListener('click', validateText);
    
    // 回车键触发验证
    inputText.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            validateText();
        }
    });

    // 清空聊天
    document.getElementById('clearChat').addEventListener('click', function() {
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML = `
            <div class="message-bubble bot-bubble">
                <p>欢迎使用GXT文本校验工具，请输入文本或上传文件开始验证。</p>
                <div class="message-meta">
                    <span>系统</span>
                    <span>${new Date().toLocaleTimeString()}</span>
                </div>
            </div>
        `;
        document.getElementById('validationSummary').textContent = '已清空验证历史';
        scrollChatToBottom();
    });

    // 验证文本
    function validateText() {
        const text = inputText.value.trim();
        if (!text) {
            // 随机选择可爱提示语
            const randomMessage = cuteMessages[Math.floor(Math.random() * cuteMessages.length)];
            addMessage('系统小助手', randomMessage, 'cute');
            // 添加文本框抖动动画
            inputText.parentElement.classList.add('animate-shake');
            setTimeout(() => {
                inputText.parentElement.classList.remove('animate-shake');
            }, 500);
            return;
        }

        if (!text) {
            addMessage('系统', '请输入要验证的文本内容', 'bot');
            return;
        }
        
        // 显示处理中状态
        document.getElementById('statusIndicator').style.display = 'flex';
        document.getElementById('validateBtn').disabled = true;
        document.getElementById('validateBtn').innerHTML = '<div class="loading-spinner"></div> 验证中...';
        
        // 模拟异步处理
        setTimeout(() => {
            const regexType = document.getElementById('regexType').value;
            const lines = text.split('\n');
            let regex;
            let errorLines = [];
            
            // 根据选择的类型设置正则表达式
            switch (regexType) {
                case 'III':
                    regex = /^(([0-9a-zA-Z_]{1,7})=(.*))$/;
                    break;
                case 'VC':
                    regex = /^(\[([0-9A-Z_]{1,7})\])$|^(([0-9A-Z_]{1,7})=(.*))$/;
                    break;
                case 'SA':
                    regex = /^(\[([0-9A-Z_]{1,7})\])$|^(([0-9a-fA-F]{1,8})=(.*))$/;
                    break;
            }
            
            // 检查每一行
            lines.forEach((line, index) => {
                // 忽略分号及后面的内容
                const cleanLine = line.split(';')[0].trim();
                if (cleanLine) {
                    // 检查波浪号个数
                    const tildeCount = (cleanLine.match(/~/g) || []).length;
                    if (tildeCount % 2 !== 0 || !regex.test(cleanLine)) {
                        errorLines.push({
                            lineNumber: index + 1,
                            originalLine: line,
                            errorType: tildeCount % 2 !== 0 ? '波浪号个数为奇数' : '格式不匹配'
                        });
                    }
                }
            });
            
            // 添加用户消息
            addMessage('你', `正在验证 ${lines.length} 行文本 (${regexType} 格式)`, 'user');
            
            // 添加结果消息
            if (errorLines.length === 0) {
                addMessage('系统', `✅ 验证通过！所有 ${lines.length} 行文本格式正确。`, 'bot');
            } else {
                let message = `❌ 验证发现 ${errorLines.length} 处错误：<br><br>`;
                errorLines.slice(0, 10).forEach(error => {
                    message += `<strong>第 ${error.lineNumber} 行</strong>: ${error.errorType}<br>`;
                });
                
                if (errorLines.length > 10) {
                    message += `...以及其他 ${errorLines.length - 10} 处错误`;
                }
                
                addMessage('系统', message, 'bot');
            }
            
            // 更新摘要
            document.getElementById('validationSummary').textContent = 
                errorLines.length === 0 
                    ? `验证通过: ${lines.length} 行全部符合要求` 
                    : `发现 ${errorLines.length} 处错误`;
            
            // 重置按钮状态
            document.getElementById('statusIndicator').style.display = 'none';
            document.getElementById('validateBtn').disabled = false;
            document.getElementById('validateBtn').innerHTML = '<i class="fa-solid fa-check"></i> 验证文本';
            
            // 滚动到底部
            scrollChatToBottom();
        }, 800); // 模拟处理延迟
    }

    // 添加消息到聊天窗口
function addMessage(sender, message, type) {
    const chatMessages = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    const isLongText = message.length > 300; // 超过300字符视为长文本
    
    // 基础类名
    let bubbleClass = `message-bubble ${type === 'user' ? 'user-bubble' : 'bot-bubble'}`;
    
    // 添加长文本类
    if (isLongText) bubbleClass += ' long-text';

    messageElement.className = bubbleClass;
    
    const timestamp = new Date().toLocaleTimeString();
    
    // 生成消息内容
    let contentHTML = `
        <p class="${isLongText ? 'collapsed' : ''}">${message.replace(/\n/g, '<br>')}</p>
        ${isLongText ? '<div class="message-toggle">展开全文 ▼</div>' : ''}
        <div class="message-meta">
            <span>${sender}</span>
            <span>${timestamp}</span>
        </div>
    `;

    // 特殊类型处理
    if (type === 'cute') {
        messageElement.classList.add('cute-bubble');
        contentHTML = `
            <div class="flex items-center">
                <span class="text-xl mr-2">✨</span>
                ${contentHTML}
            </div>
        `;
    }

    messageElement.innerHTML = contentHTML;

    // 添加展开/收起功能
    if (isLongText) {
        const toggleBtn = messageElement.querySelector('.message-toggle');
        const content = messageElement.querySelector('p');
        
        toggleBtn.addEventListener('click', () => {
            content.classList.toggle('collapsed');
            toggleBtn.textContent = content.classList.contains('collapsed') 
                ? '展开全文 ▼' 
                : '收起 ▲';
        });
    }

    chatMessages.appendChild(messageElement);
    scrollChatToBottom();
}

    // 滚动聊天窗口到底部
    function scrollChatToBottom() {
        const chatMessages = document.getElementById('chatMessages');
        // 使用平滑滚动
        chatMessages.scrollTo({
            top: chatMessages.scrollHeight,
            behavior: 'smooth'
        });
    }
});