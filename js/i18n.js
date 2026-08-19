(function(){
  const KEY='teaching-tracker-language-v1';
  const stored=localStorage.getItem(KEY);
  let language=stored==='en'||stored==='zh'?stored:((navigator.language||'').toLowerCase().startsWith('zh')?'zh':'en');
  function normalize(v){return v==='en'?'en':'zh'}
  function getLanguage(){return language}
  function locale(){return language==='zh'?'zh-CN':'en-US'}
  function pick(zh,en){return language==='zh'?zh:en}
  function apply(root=document){
    document.documentElement.lang=language==='zh'?'zh-CN':'en';
    root.querySelectorAll?.('[data-zh][data-en]').forEach(el=>{el.textContent=language==='zh'?el.dataset.zh:el.dataset.en});
    root.querySelectorAll?.('[data-zh-placeholder][data-en-placeholder]').forEach(el=>{el.placeholder=language==='zh'?el.dataset.zhPlaceholder:el.dataset.enPlaceholder});
    root.querySelectorAll?.('[data-zh-title][data-en-title]').forEach(el=>{el.title=language==='zh'?el.dataset.zhTitle:el.dataset.enTitle});
    root.querySelectorAll?.('[data-lang]').forEach(el=>el.classList.toggle('active',el.dataset.lang===language));
  }
  function setLanguage(next){
    const n=normalize(next);if(n===language){apply();return language}
    language=n;localStorage.setItem(KEY,language);apply();window.dispatchEvent(new CustomEvent('teaching:languagechange',{detail:{language}}));return language
  }
  window.I18n={getLanguage,setLanguage,locale,pick,apply};
})();
