console.log("EXTENSÃO SIENGE ATIVA");

(function () {
  function inserirLogos() {
    const divLogin = document.querySelector('#divLogin');
    if (!divLogin) return;

    const titulo = divLogin.querySelector('h2');
    if (!titulo) return;

    // evita duplicar
    if (document.querySelector('.logos-wrapper')) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'logos-wrapper';

    // tenta achar logo do Sienge na página inteira (IMG ou SVG)
    // (aqui a gente não limita ao #divLogin porque seu teste deu 0 img/svg lá)
    const siengeLogo = document.querySelector('img[src*="logo"], img[alt*="sienge"], svg');

    if (siengeLogo) {
      wrapper.appendChild(siengeLogo);
    }

    const lupema = document.createElement('img');
    lupema.className = 'lupema-logo';
    lupema.alt = 'Lupema';
    lupema.src = chrome.runtime.getURL('images/logo-lupema.png');
    wrapper.appendChild(lupema);

    // insere acima do título
    titulo.parentElement.insertBefore(wrapper, titulo);

    console.log("Logos inseridas.");
  }

  inserirLogos();
  new MutationObserver(inserirLogos).observe(document.body, { childList: true, subtree: true });
})();

// ===== FUNDO PERSONALIZADO =====
const style = document.createElement("style");
style.innerHTML = `
  .Login {
    background-image: url("${chrome.runtime.getURL("images/fundo-login.jpg")}") !important;
    background-size: cover !important;
    background-position: center center !important;
    background-repeat: no-repeat !important;
  }
`;
document.head.appendChild(style);
