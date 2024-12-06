document.addEventListener('DOMContentLoaded', function() {
  // 表单切换逻辑
  const tabButtons = document.querySelectorAll('.auth-tab');
  const forms = document.querySelectorAll('.auth-form');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 移除所有active类
      tabButtons.forEach(btn => btn.classList.remove('active'));
      forms.forEach(form => form.classList.remove('active'));

      // 添加active类到当前选中的tab和form
      button.classList.add('active');
      const formId = button.getAttribute('data-form');
      document.getElementById(formId).classList.add('active');
    });
  });

  // 密码显示切换
  const toggleButtons = document.querySelectorAll('.toggle-password');
  toggleButtons.forEach(button => {
    button.addEventListener('click', function() {
      const input = this.previousElementSibling;
      const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
      input.setAttribute('type', type);
      this.classList.toggle('bi-eye');
      this.classList.toggle('bi-eye-slash');
    });
  });
}); 