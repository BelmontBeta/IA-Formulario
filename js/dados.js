import { supabase } from "./supabase.js";

const reportsGrid = document.querySelector("#reportsGrid");
const loadingState = document.querySelector("#loadingState");
const errorState = document.querySelector("#errorState");
const emptyState = document.querySelector("#emptyState");

const searchInput = document.querySelector("#searchInput");
const qualityFilter = document.querySelector("#qualityFilter");

const totalReports = document.querySelector("#totalReports");
const totalTools = document.querySelector("#totalTools");
const lastUpdate = document.querySelector("#lastUpdate");

let allReports = [];

function showState(element) {
  element.classList.add("visible");
}

function hideState(element) {
  element.classList.remove("visible");
}

function formatDate(dateValue) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  }).format(new Date(dateValue));
}

function getQualityClass(quality) {
  const normalized = quality
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return `quality-${normalized}`;
}

function createTextElement(tagName, className, text) {
  const element = document.createElement(tagName);

  element.className = className;
  element.textContent = text;

  return element;
}

function createReportCard(report) {
  const card = document.createElement("article");
  card.className = "report-item";

  const top = document.createElement("div");
  top.className = "report-top";

  const tool = createTextElement(
    "h3",
    "report-tool",
    report.ia_tool
  );

  const badge = createTextElement(
    "span",
    `quality-badge ${getQualityClass(report.result_quality)}`,
    report.result_quality
  );

  top.append(tool, badge);

  const content = document.createElement("div");
  content.className = "report-content";

  const personRow = document.createElement("div");
  personRow.className = "report-row";

  personRow.append(
    createTextElement("span", "report-label", "Responsável"),
    createTextElement("div", "report-value", report.user_name)
  );

  const purposeRow = document.createElement("div");
  purposeRow.className = "report-row";

  purposeRow.append(
    createTextElement("span", "report-label", "Finalidade"),
    createTextElement("div", "report-value", report.usage_purpose)
  );

  content.append(personRow, purposeRow);

  if (report.notes) {
    const notesRow = document.createElement("div");
    notesRow.className = "report-row";

    notesRow.append(
      createTextElement("span", "report-label", "Observações"),
      createTextElement("div", "report-value", report.notes)
    );

    content.append(notesRow);
  }

  const footer = document.createElement("footer");
  footer.className = "report-footer";

  footer.append(
    createTextElement("span", "report-date", formatDate(report.usage_date)),
    createTextElement("span", "report-id", `ID ${report.id.slice(0, 8)}`)
  );

  card.append(top, content, footer);

  return card;
}

function updateStats(reports) {
  totalReports.textContent = reports.length;

  const uniqueTools = new Set(
    reports.map((report) => report.ia_tool.toLowerCase())
  );

  totalTools.textContent = uniqueTools.size;

  if (reports.length > 0) {
    lastUpdate.textContent = formatDate(reports[0].created_at);
  } else {
    lastUpdate.textContent = "—";
  }
}

function renderReports() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedQuality = qualityFilter.value;

  const filteredReports = allReports.filter((report) => {
    const matchesSearch =
      !searchTerm ||
      report.ia_tool.toLowerCase().includes(searchTerm) ||
      report.user_name.toLowerCase().includes(searchTerm) ||
      report.usage_purpose.toLowerCase().includes(searchTerm);

    const matchesQuality =
      !selectedQuality ||
      report.result_quality === selectedQuality;

    return matchesSearch && matchesQuality;
  });

  reportsGrid.innerHTML = "";

  if (filteredReports.length === 0) {
    showState(emptyState);
    return;
  }

  hideState(emptyState);

  const fragment = document.createDocumentFragment();

  filteredReports.forEach((report) => {
    fragment.appendChild(createReportCard(report));
  });

  reportsGrid.appendChild(fragment);
}

async function loadReports() {
  showState(loadingState);
  hideState(errorState);
  hideState(emptyState);

  const { data, error } = await supabase
    .from("ia_reports")
    .select(
      "id, user_name, ia_tool, usage_purpose, usage_date, result_quality, notes, created_at"
    )
    .order("usage_date", { ascending: false });

  hideState(loadingState);

  if (error) {
    console.error(error);

    errorState.textContent =
      "Não foi possível carregar os registros. Tente novamente mais tarde.";

    showState(errorState);
    return;
  }

  allReports = data || [];

  updateStats(allReports);
  renderReports();
}

searchInput.addEventListener("input", renderReports);
qualityFilter.addEventListener("change", renderReports);

loadReports();

supabase
  .channel("ia-reports-updates")
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "ia_reports"
    },
    () => {
      loadReports();
    }
  )
  .subscribe();