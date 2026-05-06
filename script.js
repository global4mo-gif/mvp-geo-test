const formatRub = (value) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(value);

const steps = [
  {
    title: "Упаковка проекта",
    body: "Формируем минимальную маркетинговую основу, чтобы тестировать не абстрактную идею, а понятное предложение.",
    points: ["Название и роль бренда", "Позиционирование", "Оффер и ключевые смыслы"],
  },
  {
    title: "Лендинг",
    body: "Собираем посадочную страницу, которая объясняет ценность, снимает первые вопросы и ведёт к заявке.",
    points: ["Структура страницы", "Первичные креативы", "Сценарий конверсии"],
  },
  {
    title: "Предзаказ или заявки",
    body: "Подключаем форму, чтобы фиксировать не только клики, но и намерение пользователя оставить контакт.",
    points: ["Форма заявки", "События аналитики", "Передача лидов"],
  },
  {
    title: "Логика спроса",
    body: "Собираем ключевые запросы и гипотезы по каждой выбранной географии до запуска рекламы.",
    points: ["Запросы по локациям", "Сегменты аудитории", "Возражения и триггеры"],
  },
  {
    title: "Рекламный тест",
    body: "Запускаем кампании, следим за расходом, заявками и реакцией аудитории, затем оцениваем потенциал масштабирования.",
    points: ["Гео-настройки", "Контроль бюджета", "Выводы по масштабированию"],
  },
];

const previews = {
  landing: {
    title: "Первый экран лендинга",
    text: "Оффер, короткое объяснение ценности и CTA на заявку.",
    side: "Блок доверия с цифрами теста и ключевыми преимуществами.",
    bars: [42, 74, 58, 90, 64],
  },
  preorder: {
    title: "Страница предзаказа",
    text: "Форма контакта, выбор локации и понятное обещание следующего шага.",
    side: "Мини-квиз для уточнения потребности перед заявкой.",
    bars: [34, 48, 78, 52, 88],
  },
  report: {
    title: "Отчёт по тесту",
    text: "Сравнение локаций по расходу, заявкам, стоимости лида и качеству реакции.",
    side: "Рекомендации: остановить, доработать упаковку или масштабировать.",
    bars: [68, 44, 92, 56, 72],
  },
};

const stageDetail = document.querySelector("#stage-detail");
const stepButtons = document.querySelectorAll(".step");

function renderStep(index) {
  const step = steps[index];
  stageDetail.innerHTML = `
    <h3>${step.title}</h3>
    <p>${step.body}</p>
    <ul>${step.points.map((point) => `<li>${point}</li>`).join("")}</ul>
  `;
  stepButtons.forEach((button) => button.classList.toggle("is-active", Number(button.dataset.step) === index));
}

stepButtons.forEach((button) => {
  button.addEventListener("click", () => renderStep(Number(button.dataset.step)));
});

renderStep(0);

const adSlider = document.querySelector("#ad-slider");
const targetToggle = document.querySelector("#target-toggle");
const targetOptions = document.querySelector("#target-options");
const targetSlider = document.querySelector("#target-slider");
const targetBenefits = document.querySelector("#target-benefits");
const totalBudget = document.querySelector("#total-budget");
const adBudget = document.querySelector("#ad-budget");
const targetBudget = document.querySelector("#target-budget");
const confidenceLabel = document.querySelector("#confidence-label");
const confidenceBar = document.querySelector("#confidence-bar");
const teamBar = document.querySelector("#team-bar");
const landingBar = document.querySelector("#landing-bar");
const adBar = document.querySelector("#ad-bar");
const targetBar = document.querySelector("#target-bar");
const targetRow = document.querySelector("#target-row");
const locationNodes = [document.querySelector("#loc-a"), document.querySelector("#loc-b"), document.querySelector("#loc-c")];

function updateBudget() {
  const adValue = Number(adSlider.value);
  const targetingEnabled = targetToggle.checked;
  const targetValue = targetingEnabled ? Number(targetSlider.value) : 0;
  const team = 150000;
  const landing = 40000;
  const total = team + landing + adValue + targetValue;
  const max = Math.max(team, landing, adValue, targetValue || 1);
  const confidence = Math.min(100, Math.round(((adValue + targetValue) - 75000) / 175000 * 70 + 30));
  const label = confidence >= 80 ? "Высокая" : confidence >= 58 ? "Уверенная" : "Минимально рабочая";

  totalBudget.textContent = formatRub(total);
  adBudget.textContent = formatRub(adValue);
  targetBudget.textContent = formatRub(targetValue);
  confidenceLabel.textContent = label;
  confidenceBar.style.width = `${confidence}%`;
  teamBar.style.width = `${(team / max) * 100}%`;
  landingBar.style.width = `${(landing / max) * 100}%`;
  adBar.style.width = `${(adValue / max) * 100}%`;
  targetBar.style.width = `${(targetValue / max) * 100}%`;
  targetOptions.hidden = !targetingEnabled;
  targetBenefits.hidden = !targetingEnabled;
  targetRow.classList.toggle("is-muted", !targetingEnabled);

  locationNodes.forEach((node) => {
    node.textContent = formatRub((adValue + targetValue) / 3);
  });
}

adSlider.addEventListener("input", updateBudget);
targetSlider.addEventListener("input", updateBudget);
targetToggle.addEventListener("change", updateBudget);
updateBudget();

const preview = document.querySelector("#page-preview");
const tabs = document.querySelectorAll(".tab");

function renderPreview(key) {
  const page = previews[key];
  preview.innerHTML = `
    <div class="preview-frame">
      <div class="preview-top">
        <span class="preview-dot"></span>
        <span class="preview-dot"></span>
        <span class="preview-dot"></span>
      </div>
      <div class="preview-body">
        <div class="preview-block">
          <span class="badge">Page preview</span>
          <h3>${page.title}</h3>
          <p>${page.text}</p>
          <div class="mini-chart" aria-hidden="true">
            ${page.bars.map((height) => `<i style="height:${height}%"></i>`).join("")}
          </div>
        </div>
        <div class="preview-block">
          <span class="badge">Customer path</span>
          <h3>Что видит пользователь</h3>
          <p>${page.side}</p>
          <button class="button outline" type="button" data-modal="summary-modal">Открыть детали</button>
        </div>
      </div>
    </div>
  `;
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => {
      item.classList.toggle("is-active", item === tab);
      item.setAttribute("aria-selected", String(item === tab));
    });
    renderPreview(tab.dataset.page);
  });
});

renderPreview("landing");

document.addEventListener("click", (event) => {
  const modalButton = event.target.closest("[data-modal]");
  if (modalButton) {
    document.querySelector(`#${modalButton.dataset.modal}`)?.showModal();
  }

  if (event.target.matches("[data-close]")) {
    event.target.closest("dialog")?.close();
  }
});

document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
});

const tooltip = document.querySelector("#tooltip");

document.querySelectorAll("[data-tooltip]").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    const rect = element.getBoundingClientRect();
    tooltip.textContent = element.dataset.tooltip;
    tooltip.style.left = `${Math.min(rect.left, window.innerWidth - 280)}px`;
    tooltip.style.top = `${rect.bottom + 10}px`;
    tooltip.classList.add("is-visible");
  });
  element.addEventListener("mouseleave", () => tooltip.classList.remove("is-visible"));
  element.addEventListener("focus", () => element.dispatchEvent(new Event("mouseenter")));
  element.addEventListener("blur", () => tooltip.classList.remove("is-visible"));
});

const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");

navToggle.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!expanded));
  nav.classList.toggle("is-open");
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});
