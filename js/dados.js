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

const formLink = document.querySelector("#formLink");
const downloadPdfButton = document.querySelector("#downloadPdfButton");

let allReports = [];

function showState(element) {
  element.classList.add("visible");
}

function hideState(element) {
  element.classList.remove("visible");
}

function formatDate(dateValue) {
  if (!dateValue) {
    return "—";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  }).format(new Date(dateValue));
}

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function getQualityClass(quality) {
  return `quality-${normalizeText(quality)}`;
}

function createTextElement(tagName, className, text) {
  const element = document.createElement(tagName);

  element.className = className;
  element.textContent = text || "—";

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

  const responsibleRow = document.createElement("div");
  responsibleRow.className = "report-row";

  responsibleRow.append(
    createTextElement(
      "span",
      "report-label",
      "Responsável"
    ),
    createTextElement(
      "div",
      "report-value",
      report.user_name
    )
  );

  const purposeRow = document.createElement("div");
  purposeRow.className = "report-row";

  purposeRow.append(
    createTextElement(
      "span",
      "report-label",
      "Finalidade"
    ),
    createTextElement(
      "div",
      "report-value",
      report.usage_purpose
    )
  );

  content.append(responsibleRow, purposeRow);

  if (report.notes) {
    const notesRow = document.createElement("div");
    notesRow.className = "report-row";

    notesRow.append(
      createTextElement(
        "span",
        "report-label",
        "Observações"
      ),
      createTextElement(
        "div",
        "report-value",
        report.notes
      )
    );

    content.appendChild(notesRow);
  }

  const footer = document.createElement("footer");
  footer.className = "report-footer";

  footer.append(
    createTextElement(
      "span",
      "report-date",
      formatDate(report.usage_date)
    ),
    createTextElement(
      "span",
      "report-id",
      `ID ${String(report.id).slice(0, 8)}`
    )
  );

  card.append(top, content, footer);

  return card;
}

function updateStats(reports) {
  totalReports.textContent = reports.length;

  const uniqueTools = new Set(
    reports.map((report) => normalizeText(report.ia_tool))
  );

  totalTools.textContent = uniqueTools.size;

  lastUpdate.textContent = reports.length
    ? formatDate(reports[0].created_at || reports[0].usage_date)
    : "—";
}

function getFilteredReports() {
  const searchTerm = normalizeText(searchInput.value);
  const selectedQuality = qualityFilter.value;

  return allReports.filter((report) => {
    const searchableText = [
      report.ia_tool,
      report.user_name,
      report.usage_purpose,
      report.notes
    ]
      .map(normalizeText)
      .join(" ");

    const matchesSearch =
      !searchTerm || searchableText.includes(searchTerm);

    const matchesQuality =
      !selectedQuality ||
      report.result_quality === selectedQuality;

    return matchesSearch && matchesQuality;
  });
}

function renderReports() {
  const filteredReports = getFilteredReports();

  reportsGrid.replaceChildren();

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

async function showFormLinkForLoggedUser() {
  const {
    data: { session },
    error
  } = await supabase.auth.getSession();

  if (error) {
    console.error("Erro ao verificar sessão:", error);
    return;
  }

  if (session) {
    formLink.classList.remove("hidden");
  }
}

async function loadReports() {
  showState(loadingState);
  hideState(errorState);
  hideState(emptyState);

  const { data, error } = await supabase
    .from("ia_reports")
    .select(`
      id,
      user_name,
      ia_tool,
      usage_purpose,
      usage_date,
      result_quality,
      notes,
      created_at
    `)
    .order("usage_date", {
      ascending: false
    });

  hideState(loadingState);

  if (error) {
    console.error("Erro retornado pelo Supabase:", error);

    errorState.textContent =
      `Erro ao carregar os registros: ${error.message}`;

    showState(errorState);
    return;
  }

  allReports = data || [];

  updateStats(allReports);
  renderReports();

  console.log("Registros recebidos:", allReports);
}

function generatePdfReport() {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    alert("A biblioteca de PDF não foi carregada.");
    return;
  }

  const reports = getFilteredReports();

  if (!reports.length) {
    alert("Não existem registros para gerar o PDF.");
    return;
  }

  const { jsPDF } = window.jspdf;

  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4"
  });

  doc.setTextColor(5, 19, 39);
  doc.setFontSize(20);
  doc.text("Relatório de Uso de IA", 14, 18);

  doc.setFontSize(9);
  doc.setTextColor(90, 110, 130);
  doc.text(
    `Gerado em: ${formatDate(new Date())}`,
    14,
    25
  );

  const rows = reports.map((report, index) => [
    index + 1,
    report.user_name || "—",
    report.ia_tool || "—",
    report.usage_purpose || "—",
    formatDate(report.usage_date),
    report.result_quality || "—",
    report.notes || "—"
  ]);

  doc.autoTable({
    startY: 34,

    head: [[
      "#",
      "Responsável",
      "Ferramenta",
      "Finalidade",
      "Data",
      "Qualidade",
      "Observações"
    ]],

    body: rows,

    theme: "grid",

    styles: {
      fontSize: 8,
      textColor: [30, 45, 60],
      fillColor: [255, 255, 255],
      lineColor: [210, 220, 230],
      lineWidth: 0.25,
      cellPadding: 3,
      overflow: "linebreak",
      valign: "middle"
    },

    headStyles: {
      fillColor: [5, 19, 39],
      textColor: [255, 255, 255],
      fontStyle: "bold"
    },

    alternateRowStyles: {
      fillColor: [241, 247, 252]
    },

    columnStyles: {
      0: {
        cellWidth: 10,
        halign: "center"
      },
      1: {
        cellWidth: 35
      },
      2: {
        cellWidth: 35
      },
      3: {
        cellWidth: 75
      },
      4: {
        cellWidth: 28
      },
      5: {
        cellWidth: 28
      },
      6: {
        cellWidth: 65
      }
    }
  });

  const date = new Date()
    .toISOString()
    .slice(0, 10);

  doc.save(`relatorio-uso-ia-${date}.pdf`);
}

searchInput.addEventListener("input", renderReports);
qualityFilter.addEventListener("change", renderReports);
downloadPdfButton.addEventListener("click", generatePdfReport);

await showFormLinkForLoggedUser();
await loadReports();

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