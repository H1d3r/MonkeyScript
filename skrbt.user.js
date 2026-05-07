// ==UserScript==
// @name         SKR磁力链接自动下载并关闭标签页
// @namespace    https://github.com/H1d3r/MonkeyScript/raw/refs/heads/master/skrbt.user.js
// @version      0.2
// @description  自动点击ID为magnet的链接，弹窗显示内容，5秒后关闭标签页
// @author       H1d3r
// @match        *://skrbttv.top/detail/*
// @match        *://skrbtso.cc/detail/*  
// @downloadURL https://github.com/H1d3r/MonkeyScript/raw/refs/heads/master/skrbt.user.js
// @updateURL https://github.com/H1d3r/MonkeyScript/raw/refs/heads/master/skrbt.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 主逻辑函数
    const executeAction = () => {
        // 1. 查找 id 为 "magnet" 的元素
        const targetLink = document.getElementById('magnet');

        if (targetLink && targetLink.href) {
            // 2. 点击该链接
            // 注意：有些浏览器可能会拦截自动点击，或者直接在当前页跳转
            window.location.href = targetLink.href; 
            
            // 3. 1 秒后关闭当前标签页
            setTimeout(() => {
                window.close();
            }, 1);

            return true;
        }
        return false;
    };

    // 尝试立即执行
    if (!executeAction()) {
        // 如果元素未加载，使用 MutationObserver 监听 DOM 变化
        const observer = new MutationObserver((mutations, obs) => {
            if (executeAction()) {
                obs.disconnect(); // 执行成功后停止监听
            }
        });

        // 开始监听整个 document 的变化
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
})();
