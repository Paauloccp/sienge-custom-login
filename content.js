console.log("EXTENSÃO SIENGE ATIVA");

const host = location.hostname;

/* =========================================================
   Helpers
   ========================================================= */
function injectStyle(cssText) {
  const style = document.createElement("style");
  style.textContent = cssText;
  document.head.appendChild(style);
}

/* =========================================================
   TELA ANTIGA: lupema.sienge.com.br
   - logos (sienge + lupema)
   - fundo
   ========================================================= */
if (host === "lupema.sienge.com.br") {
  // ===== Logos (tela antiga) =====
  (function () {
    function inserirLogos() {
      const divLogin = document.querySelector("#divLogin");
      if (!divLogin) return;

      const titulo = divLogin.querySelector("h2");
      if (!titulo) return;

      // evita duplicar
      if (document.querySelector(".logos-wrapper")) return;

      const wrapper = document.createElement("div");
      wrapper.className = "logos-wrapper";

      // pega a logo do Sienge (img ou svg)
      const siengeLogo = document.querySelector(
        'img[src*="logo"], img[alt*="sienge" i], svg'
      );

      if (siengeLogo) {
        wrapper.appendChild(siengeLogo);
      }

      // logo Lupema
      const lupema = document.createElement("img");
      lupema.className = "lupema-logo";
      lupema.alt = "Lupema";
      lupema.src = chrome.runtime.getURL("images/logo-lupema.png");
      wrapper.appendChild(lupema);

      // insere acima do título
      titulo.parentElement.insertBefore(wrapper, titulo);

      console.log("Logos inseridas (tela antiga).");
    }

    inserirLogos();
    new MutationObserver(inserirLogos).observe(document.body, {
      childList: true,
      subtree: true,
    });

    // 3. funções de saudação
    function saudacaoPorHorario() {
      const agora = new Date();
      const hora = agora.getHours(); // 0–23
      const dia = agora.getDay();    // 0=Dom, 1=Seg, ..., 5=Sex, 6=Sáb
    
      // Sexta-feira ganha prioridade absoluta 😎
      if (dia === 5) return "Sextou! 🎉";
      if (dia === 1 && hora < 10) return "Boa semana! ☕"
    
      // Easter egg da madrugada
      if (hora >= 22 || hora < 5) return "Hora de dormir né? 😴";
    
      if (hora < 12) return "Bom dia!";
      if (hora < 18) return "Boa tarde!";
      return "Boa noite!";
    }
    

function trocarTituloBemVindo() {
  const titulo = document.querySelector('#divLogin h2');
  if (!titulo) return;

  const novo = saudacaoPorHorario();
  if (titulo.textContent.trim() === novo) return;

  titulo.textContent = novo;
}

// 4. ativa saudação
trocarTituloBemVindo();
new MutationObserver(trocarTituloBemVindo).observe(document.body, {
  childList: true,
  subtree: true
});

  })();

  // ===== Fundo (tela antiga) =====
  injectStyle(`
    .Login {
      background-image: url("${chrome.runtime.getURL("images/fundo-login.jpg")}") !important;
      background-size: cover !important;
      background-position: center center !important;
      background-repeat: no-repeat !important;
    }
  `);
}

/* =========================================================
   TELA NOVA: login.sienge.com.br
   - fundo
   - transparência do "card"
   - logo Lupema ao lado do logo Sienge
   ========================================================= */
if (host === "login.sienge.com.br") {
  // ===== Fundo (tela nova) =====
  injectStyle(`
    body {
      background-image: url("${chrome.runtime.getURL("images/fundo-login.jpg")}") !important;
      background-size: cover !important;
      background-position: center center !important;
      background-repeat: no-repeat !important;
    }
  `);

  // Alguns casos o fundo real está em um DIV grande (React). Força nele.
  function aplicarFundoNoWrapper() {
    const candidates = [...document.querySelectorAll("div")]
      .filter((el) => {
        const cs = getComputedStyle(el);
        return cs.backgroundImage && cs.backgroundImage !== "none";
      })
      .sort(
        (a, b) =>
          b.offsetWidth * b.offsetHeight - a.offsetWidth * a.offsetHeight
      );

    const target = candidates[0];
    if (!target) return false;

    target.style.setProperty(
      "background-image",
      `url("${chrome.runtime.getURL("images/fundo-login.jpg")}")`,
      "important"
    );
    target.style.setProperty("background-size", "cover", "important");
    target.style.setProperty("background-position", "center", "important");
    target.style.setProperty("background-repeat", "no-repeat", "important");

    console.log("Fundo aplicado no wrapper (tela nova).", target);
    return true;
  }

  if (!aplicarFundoNoWrapper()) {
    setTimeout(aplicarFundoNoWrapper, 500);
    setTimeout(aplicarFundoNoWrapper, 1500);
  }

  // ==== Card (tela nova) - replica o CSS da tela antiga ====
injectStyle(`
/* Card principal normalmente é Paper do Material UI */
.MuiPaper-root {
  background-color: rgba(244, 242, 238, 0.92) !important;
  border-radius: 48px 0 !important;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25) !important;
}
`);


  // ===== Logo Lupema (tela nova) =====
  function inserirLogoLupemaTelaNova() {
    // evita duplicar
    if (document.querySelector(".lupema-logo-tela-nova")) return;

    // tenta achar logo do Sienge como IMG
    const siengeImg = document.querySelector('img[alt*="Sienge" i], img[src*="sienge" i]');
    if (!siengeImg) return;

    const header = siengeImg.parentElement;
    if (!header) return;

    // garante que o container comporte itens lado a lado
    header.style.display = "flex";
    header.style.alignItems = "center";
    header.style.gap = "12px";

    const lupema = document.createElement("img");
    lupema.className = "lupema-logo-tela-nova";
    lupema.alt = "Lupema";
    lupema.src = chrome.runtime.getURL("images/logo-lupema.png");

    header.appendChild(lupema);

    console.log("Logo Lupema inserida (tela nova).");
  }

  injectStyle(`
    .lupema-logo-tela-nova {
      height: 40px !important;
      width: auto !important;
      display: inline-block !important;
    }
  `);

  inserirLogoLupemaTelaNova();
  new MutationObserver(inserirLogoLupemaTelaNova).observe(document.body, {
    childList: true,
    subtree: true,
  });
}
