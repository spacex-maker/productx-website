class Header {
  constructor() {
    this.headerContainer = document.querySelector('#header-container');
    this.isLoggedIn = this.checkLoginStatus();
  }

  async init() {
    this.initializeComponents();
    this.handleAuthDisplay();
  }

  checkLoginStatus() {
    // 检查登录状态，可以从 localStorage 或 cookie 中获取
    return localStorage.getItem('user') !== null;
  }

  handleAuthDisplay() {
    const guestButtons = document.querySelector('.guest-buttons');
    const userMenu = document.querySelector('.user-menu');
    
    if (this.isLoggedIn) {
      guestButtons?.classList.add('d-none');
      userMenu?.classList.remove('d-none');
      // 设置用户信息
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        document.querySelector('.username').textContent = user.name;
      }
    } else {
      guestButtons?.classList.remove('d-none');
      userMenu?.classList.add('d-none');
    }
  }

  initializeComponents() {
    // 初始化下拉菜单
    const dropdowns = document.querySelectorAll('.dropdown-toggle');
    dropdowns.forEach(dropdown => {
      new bootstrap.Dropdown(dropdown);
    });

    // 退出登录
    document.querySelector('#logoutBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.handleLogout();
    });
  }

  handleLogout() {
    localStorage.removeItem('user');
    window.location.href = '/login.html';
  }
} 