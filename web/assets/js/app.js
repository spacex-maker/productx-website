// 初始化所有页面通用的功能
function initApp() {
  // 滚动控制
  initScrollControl();
  
  // 初始化下拉菜单
  initDropdowns();
  
  // 初始化其他通用功能
  initCommonFeatures();
  
  // 初始化第三方库
  initThirdPartyLibs();
}

// 滚动控制
function initScrollControl() {
  const searchForm = document.querySelector('.search-form');
  if (searchForm) {
    let lastScrollTop = 0;
    let scrollTimeout;

    window.addEventListener('scroll', function() {
      clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 200) {
          // 向下滚动
          searchForm.classList.add('hidden');
        } else {
          // 向上滚动或在顶部
          searchForm.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
      }, 50);
    });
  }
}

// 初始化下拉菜单
function initDropdowns() {
  document.querySelectorAll('.dropdown').forEach(dropdown => {
    const toggle = dropdown.querySelector('.toggle-dropdown');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    if (toggle && menu) {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        menu.classList.toggle('show');
      });
    }
  });

  // 点击外部关闭下拉菜单
  document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
      menu.classList.remove('show');
    });
  });
}

// 初始化其他通用功能
function initCommonFeatures() {
  // 移动端菜单切换
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.navmenu');
  
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-nav-active');
      mobileToggle.classList.toggle('bi-list');
      mobileToggle.classList.toggle('bi-x');
    });
  }

  // 平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

// 初始化第三方库
function initThirdPartyLibs() {
  // 初始化 AOS
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });
  
  // 初始化 GLightbox
  const lightbox = GLightbox({
    selector: '.glightbox'
  });
  
  // 初始化 Pure Counter
  new PureCounter();
  
  // 初始化 Isotope
  let portfolioContainer = document.querySelector('.isotope-container');
  if (portfolioContainer) {
    let portfolioIsotope = new Isotope(portfolioContainer, {
      itemSelector: '.isotope-item',
      layoutMode: 'masonry'
    });
    
    let portfolioFilters = document.querySelectorAll('.isotope-filters li');
    portfolioFilters.forEach(filter => {
      filter.addEventListener('click', e => {
        e.preventDefault();
        portfolioFilters.forEach(f => f.classList.remove('filter-active'));
        filter.classList.add('filter-active');
        portfolioIsotope.arrange({
          filter: filter.getAttribute('data-filter')
        });
      });
    });
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  initApp();
}); 