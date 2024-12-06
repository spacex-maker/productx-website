// 加载公共头部
async function loadHeader() {
  try {
    const response = await fetch('./includes/header.html');
    const html = await response.text();
    document.body.insertAdjacentHTML('afterbegin', html);
    // 头部加载完成后初始化功能
    initApp();
  } catch (error) {
    console.error('Failed to load header:', error);
  }
}

// 页面加载时执行
document.addEventListener('DOMContentLoaded', loadHeader); 