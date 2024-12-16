// 获取token的函数
function getToken() {
    return localStorage.getItem('merchantToken'); // 使用merchantToken而不是token
}

// 检查登录状态的函数
function checkLogin() {
    const token = getToken();
    const merchantInfo = localStorage.getItem('merchantInfo');
    return !!(token && merchantInfo); // 同时检查token和商户信息
}

// 页面加载时执行
document.addEventListener('DOMContentLoaded', function() {
    if (typeof loadHeader === 'function') {
        loadHeader();
    }
}); 