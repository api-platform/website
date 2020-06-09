/* eslint-disable no-param-reassign */

const updateSelectors = (lang) => {
  document.querySelectorAll('.code-selector').forEach((selector) => {
    const langSelect = selector.querySelector(`.code-selector-select-${lang}`);
    const langCode = selector.querySelector(`.code-selector-code-${lang}`);
    if (langSelect && langCode) {
      selector.querySelectorAll('.code-selector-toolbar button').forEach((select) => {
        select.classList.remove('selected');
      });
      selector.querySelectorAll('[class^=code-selector-code-]').forEach((code) => {
        code.style.display = 'none';
      });
      langSelect.classList.add('selected');
      langCode.style.display = 'block';
    }
  });
};

const setLang = (lang) => {
  localStorage.setItem('selectedLang', lang);
  updateSelectors(lang);
};

exports.onRouteUpdate = () => {
  document
    .querySelectorAll('.code-selector-toolbar button')
    .forEach((select) => select.addEventListener('click', (event) => setLang(event.target.textContent)));

  const selectedLang = localStorage.getItem('selectedLang');
  if (selectedLang) {
    updateSelectors(selectedLang);
  }
};
