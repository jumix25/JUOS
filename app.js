const i18n = {
  de: {
    welcome: "Willkommen bei JUOS",
    choose_unlock: "Wähle Entsperrung",
    pattern_lock: "Muster-Lock",
    pin_lock: "PIN-Lock",
    pattern_hint: "Verbinde mindestens 4 Punkte (Demo-Muster: 1-2-3-6).",
    pin_hint: "Gib den 4-stelligen PIN ein (Demo-PIN: 1990).",
    unlock: "Entsperren",
    retro_mode: "Retro-Modus",
    next_gen: "Next Gen AI",
    ai_desc: "Stelle Fragen an deinen Assistenten.",
    ask_anything: "Frag mich alles...",
    send: "Senden",
    api_note: "API-Key aus Sicherheitsgründen nicht im Code gespeichert. Bitte nur per sichere Umgebung übergeben.",
    visual_title: "Glass Design",
    visual_desc: "Transparente Ebenen, weiche Schatten und smoothe Animationen.",
  },
  en: {
    welcome: "Welcome to JUOS",
    choose_unlock: "Choose unlock method",
    pattern_lock: "Pattern Lock",
    pin_lock: "PIN Lock",
    pattern_hint: "Connect at least 4 dots (Demo pattern: 1-2-3-6).",
    pin_hint: "Enter the 4-digit PIN (Demo PIN: 1990).",
    unlock: "Unlock",
    retro_mode: "Retro Mode",
    next_gen: "Next Gen AI",
    ai_desc: "Ask your assistant anything.",
    ask_anything: "Ask me anything...",
    send: "Send",
    api_note: "For security, API keys are not stored in code. Provide them via a secure environment.",
    visual_title: "Glass Design",
    visual_desc: "Transparent layers, soft shadows, and smooth animations.",
  },
};

let currentLang = "de";
let selectedPattern = [];

const expectedPattern = [1, 2, 3, 6];
const expectedPin = "1990";

const lockScreen = document.getElementById("lockScreen");
const homeScreen = document.getElementById("homeScreen");
const lockMessage = document.getElementById("lockMessage");

function setLanguage(lang) {
  currentLang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = i18n[lang][el.dataset.i18n] || el.textContent;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = i18n[lang][el.dataset.i18nPlaceholder] || el.placeholder;
  });
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
});

const patternGrid = document.getElementById("patternGrid");
for (let i = 1; i <= 9; i += 1) {
  const dot = document.createElement("button");
  dot.className = "dot";
  dot.textContent = i;
  dot.dataset.value = i;
  dot.addEventListener("click", () => {
    if (!selectedPattern.includes(i)) {
      selectedPattern.push(i);
      dot.classList.add("selected");
    }
  });
  patternGrid.appendChild(dot);
}

function resetPattern() {
  selectedPattern = [];
  document.querySelectorAll(".dot").forEach((d) => d.classList.remove("selected"));
}

function unlockSuccess() {
  lockScreen.classList.remove("active");
  homeScreen.classList.add("active");
}

function unlockFail() {
  lockMessage.textContent = currentLang === "de" ? "Falscher Code. Bitte erneut versuchen." : "Wrong code. Please try again.";
}

document.getElementById("unlockPattern").addEventListener("click", () => {
  const ok = JSON.stringify(selectedPattern) === JSON.stringify(expectedPattern);
  if (ok) unlockSuccess();
  else unlockFail();
  resetPattern();
});

document.getElementById("unlockPin").addEventListener("click", () => {
  const pin = document.getElementById("pinInput").value;
  if (pin === expectedPin) unlockSuccess();
  else unlockFail();
  document.getElementById("pinInput").value = "";
});

function showPane(type) {
  const pattern = type === "pattern";
  document.getElementById("patternPane").classList.toggle("active", pattern);
  document.getElementById("pinPane").classList.toggle("active", !pattern);
  document.getElementById("patternTab").classList.toggle("active", pattern);
  document.getElementById("pinTab").classList.toggle("active", !pattern);
  lockMessage.textContent = "";
}

document.getElementById("patternTab").addEventListener("click", () => showPane("pattern"));
document.getElementById("pinTab").addEventListener("click", () => showPane("pin"));

document.getElementById("retroToggle").addEventListener("click", () => {
  document.body.classList.toggle("retro");
});

document.getElementById("askAi").addEventListener("click", async () => {
  const prompt = document.getElementById("aiPrompt").value.trim();
  const out = document.getElementById("aiResponse");
  if (!prompt) return;

  out.textContent = currentLang === "de"
    ? "Next Gen (Demo): Sichere API-Integration aktivieren, um echte Antworten zu erhalten."
    : "Next Gen (Demo): Enable secure API integration to receive real responses.";
});

setInterval(() => {
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}, 1000);

setLanguage("de");
showPane("pattern");
