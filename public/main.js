const API_URL = "https://api.quotable.io/quotes/random";

const title = document.getElementById("title");
const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");

let loadingQuote = false;

setTimeout(
  () => document.getElementById("loading-screen").classList.add("inactive"),
  800
);

async function fetchQuote() {
  if (loadingQuote) return;
  loadingQuote = true;

  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    renderQuote(data[0]);
  } catch {
    renderError();
  } finally {
    loadingQuote = false;
  }
}

function renderQuote({ content, author }) {
  quoteEl.textContent = `"${content}"`;
  authorEl.textContent = `- ${author}`;
  animateQuote();
}

function renderError() {
  quoteEl.textContent = "[#] > Error";
  authorEl.textContent = "bugged-code";
}

function animateTitle() {
  gsap.to("#title p", {
    y: () => gsap.utils.random(-8, 8),
    rotation: () => gsap.utils.random(-5, 5),
    duration: () => gsap.utils.random(0.5, 1.2),
    ease: "sine.inOut",
    stagger: {
      each: 0.05,
      yoyo: true,
      repeat: -1,
    },
  });
}

function animateQuote() {
  quoteEl.innerHTML = quoteEl.textContent
    .split(" ")
    .map((word) => `<span>${word}</span>`)
    .join("&nbsp;");

  gsap.to("#quote span", {
    y: () => gsap.utils.random(-4, 4),
    duration: () => gsap.utils.random(0.2, 0.8),
    ease: "sine.inOut",
    stagger: {
      each: 0.06,
      yoyo: true,
      repeat: -1,
    },
    repeat: -1,
    yoyo: true,
  });
}

window.addEventListener("load", async () => {
  animateTitle();
  await fetchQuote();
});
newQuoteBtn.addEventListener("click", fetchQuote);
