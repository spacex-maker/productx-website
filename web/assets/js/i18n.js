class I18n {
  constructor() {
    this.translations = {};
    this.currentLang = 'zh';
    this.defaultTranslations = {
      "home": "首页",
      "aboutUs": "关于我们",
      "services": "服务",
      "contact": "联系我们",
      "categories": "商品分类",
      "electronics": "电子产品",
      "fashion": "服饰箱包",
      "login": "登录",
      "register": "注册",
      "membershipPlans": "会员方案",
      "memberBenefits": "会员特权",
      "help": "帮助中心",
      "portfolio": "作品集",
      "currentLanguage": "当前语言"
    };
    console.log('I18n initialized');
  }

  async init() {
    console.log('Starting initialization...');
    const urlParams = new URLSearchParams(window.location.search);
    this.currentLang = urlParams.get('lang') || 
                      (navigator.language.startsWith('zh') ? 'zh' : navigator.language.split('-')[0]) || 
                      'zh';
    console.log('Selected language:', this.currentLang);
    
    this.translations = { ...this.defaultTranslations };
    this.updateContent();
    
    await this.loadTranslations();
    this.initLanguageSelector();
    console.log('Initialization completed');
  }

  async loadTranslations() {
    try {
      const response = await fetch(`locales/${this.currentLang}/translations.json`);
      if (!response.ok) throw new Error('Translation file not found');
      this.translations = await response.json();
      this.updateContent();
    } catch (error) {
      console.error('Failed to load translations:', error);
      try {
        const response = await fetch('locales/en/translations.json');
        if (!response.ok) throw new Error('Fallback translation file not found');
        this.translations = await response.json();
        this.updateContent();
      } catch (err) {
        console.error('Failed to load fallback translations:', err);
        console.log('Using default translations');
      }
    }
    console.log('Loaded translations:', this.translations);
  }

  t(key) {
    const translation = this.translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key} in language: ${this.currentLang}`);
      return this.defaultTranslations[key] || key;
    }
    return translation;
  }

  updateContent() {
    console.log('Updating content with language:', this.currentLang);
    console.log('Current translations:', this.translations);
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const oldText = element.textContent;
      const newText = this.t(key);
      if (oldText !== newText) {
        element.textContent = newText;
        console.log(`Updated ${key}: ${oldText} -> ${newText}`);
      }
    });

    const currentLangElement = document.querySelector('.current-lang');
    const languageNames = {
      ar: 'العربية',
      de: 'Deutsch',
      en: 'English',
      es: 'Español',
      fr: 'Français',
      it: 'Italiano',
      ja: '日本語',
      ko: '한국어',
      ru: 'Русский',
      zh: '中文'
    };
    if (currentLangElement) {
      currentLangElement.textContent = languageNames[this.currentLang] || 'English';
    }
  }

  initLanguageSelector() {
    document.querySelectorAll('.dropdown-item[data-lang]').forEach(item => {
      item.addEventListener('click', async (e) => {
        e.preventDefault();
        const newLang = e.currentTarget.getAttribute('data-lang');
        console.log('Language selected:', newLang);
        if (newLang !== this.currentLang) {
          this.currentLang = newLang;
          const url = new URL(window.location);
          url.searchParams.set('lang', newLang);
          window.history.pushState({}, '', url);
          await this.loadTranslations();
          this.updateContent();
        }
      });
    });
  }
}

// 初始化国际化
const i18n = new I18n();
window.addEventListener('load', () => {
  i18n.init().catch(err => console.error('Failed to initialize i18n:', err));
}); 