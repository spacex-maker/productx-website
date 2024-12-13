document.addEventListener('DOMContentLoaded', function() {
  initFormTabs();
  initPasswordToggles();
  initFormValidation();
  initFormAnimations();
});

function initFormTabs() {
  const tabs = document.querySelectorAll('.auth-tab');
  const forms = document.querySelectorAll('.auth-form');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const formId = tab.dataset.form;
      
      // 切换标签活动状态
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // 切换表单显示
      forms.forEach(form => {
        form.classList.remove('active');
        if (form.id === formId) {
          form.classList.add('active');
        }
      });
    });
  });
}

function initPasswordToggles() {
  const toggleButtons = document.querySelectorAll('.toggle-password');
  toggleButtons.forEach(button => {
    button.addEventListener('click', function() {
      const input = this.previousElementSibling;
      const type = input.type === 'password' ? 'text' : 'password';
      input.type = type;
      this.classList.toggle('bi-eye');
      this.classList.toggle('bi-eye-slash');
    });
  });
}

function initFormValidation() {
  // 登录表单验证和提交
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
      // TODO: 实现登录逻辑
      console.log('Login attempt:', { email });
    } catch (error) {
      console.error('Login error:', error);
    }
  });

  // 注册表单验证和提交
  const registerForm = document.getElementById('registerForm');
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
      // TODO: 显示密码不匹配错误
      return;
    }
    
    try {
      // TODO: 实现注册逻辑
      console.log('Register attempt:', { email });
    } catch (error) {
      console.error('Register error:', error);
    }
  });
}

function initFormAnimations() {
  const tabs = document.querySelectorAll('.auth-tab');
  const forms = document.querySelectorAll('.auth-form');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const formId = tab.dataset.form;
      const targetForm = document.getElementById(formId);
      
      // 标签切换动画
      tabs.forEach(t => {
        t.classList.remove('active');
        t.style.transform = 'translateY(0)';
      });
      tab.classList.add('active');
      tab.style.transform = 'translateY(-2px)';
      
      // 表单切换动画
      forms.forEach(form => {
        if (form.id === formId) {
          // 新表单进入
          form.style.display = 'block';
          setTimeout(() => {
            form.classList.add('active');
            form.classList.remove('fade-out');
          }, 50);
        } else {
          // 当前表单退出
          form.classList.remove('active');
          form.classList.add('fade-out');
          setTimeout(() => {
            form.style.display = 'none';
          }, 600);
        }
      });
    });
  });

  // 输入框动画
  const inputs = document.querySelectorAll('.input-group input');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', () => {
      input.parentElement.style.transform = 'scale(1)';
    });
  });

  // 按钮点击波纹效果
  const buttons = document.querySelectorAll('.auth-button');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const x = e.clientX - e.target.offsetLeft;
      const y = e.clientY - e.target.offsetTop;
      
      const ripple = document.createElement('span');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
} 