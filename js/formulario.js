import { supabase } from "./supabase.js";

const reportForm = document.querySelector("#reportForm");
const submitButton = document.querySelector("#submitButton");
const reportMessage = document.querySelector("#reportMessage");
const logoutButton = document.querySelector("#logoutButton");

let currentSession = null;

function showMessage(message, type) {
  reportMessage.textContent = message;
  reportMessage.className = `form-message visible ${type}`;
}

function setLoading(isLoading) {
  submitButton.disabled = isLoading;

  submitButton.querySelector("span:first-child").textContent =
    isLoading ? "Salvando relatório..." : "Registrar relatório";
}

async function protectPage() {
  const { data, error } = await supabase.auth.getSession();

  if (error || !data.session) {
    window.location.href = "index.html";
    return;
  }

  currentSession = data.session;
}

protectPage();

supabase.auth.onAuthStateChange((event, session) => {
  if (!session) {
    window.location.href = "index.html";
  }

  currentSession = session;
});

reportForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!currentSession) {
    showMessage("Sua sessão expirou. Faça login novamente.", "error");
    return;
  }

  const userName = document.querySelector("#userName").value.trim();
  const iaTool = document.querySelector("#iaTool").value.trim();
  const usagePurpose = document.querySelector("#usagePurpose").value.trim();
  const usageDate = document.querySelector("#usageDate").value;
  const resultQuality = document.querySelector("#resultQuality").value;
  const notes = document.querySelector("#notes").value.trim();

  if (
    !userName ||
    !iaTool ||
    !usagePurpose ||
    !usageDate ||
    !resultQuality
  ) {
    showMessage("Preencha todos os campos obrigatórios.", "error");
    return;
  }

  setLoading(true);
  reportMessage.className = "form-message";

  const { error } = await supabase
    .from("ia_reports")
    .insert({
      user_id: currentSession.user.id,
      user_name: userName,
      ia_tool: iaTool,
      usage_purpose: usagePurpose,

      // Converte o horário local do formulário para ISO.
      usage_date: new Date(usageDate).toISOString(),

      result_quality: resultQuality,
      notes: notes || null
    });

  if (error) {
    console.error(error);
    showMessage(
      "Não foi possível salvar o relatório. Verifique sua sessão e tente novamente.",
      "error"
    );

    setLoading(false);
    return;
  }

  reportForm.reset();
  showMessage("Relatório registrado com sucesso.", "success");
  setLoading(false);
});

logoutButton.addEventListener("click", async () => {
  await supabase.auth.signOut();
  window.location.href = "index.html";
});