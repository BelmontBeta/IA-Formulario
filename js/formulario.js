import { supabase } from "./supabase.js";

const reportForm = document.querySelector("#reportForm");
const submitButton = document.querySelector("#submitButton");
const reportMessage = document.querySelector("#reportMessage");
const logoutButton = document.querySelector("#logoutButton");
const usageDateInput = document.querySelector("#usageDate");

let currentSession = null;

function showMessage(message, type) {
  reportMessage.textContent = message;
  reportMessage.className = `form-message visible ${type}`;
}

function setLoading(isLoading) {
  submitButton.disabled = isLoading;

  const buttonText = submitButton.querySelector("span:first-child");

  buttonText.textContent = isLoading
    ? "Salvando relatório..."
    : "Registrar relatório";
}

function getCurrentDateTime() {
  const now = new Date();

  const offset = now.getTimezoneOffset() * 60000;
  const localDate = new Date(now.getTime() - offset);

  return localDate.toISOString().slice(0, 16);
}

async function protectPage() {
  const {
    data: { session },
    error
  } = await supabase.auth.getSession();

  if (error || !session) {
    window.location.replace("index.html");
    return false;
  }

  currentSession = session;
  return true;
}

const isAuthenticated = await protectPage();

if (!isAuthenticated) {
  throw new Error("Usuário não autenticado.");
}

usageDateInput.value = getCurrentDateTime();

supabase.auth.onAuthStateChange((event, session) => {
  currentSession = session;

  if (!session) {
    window.location.replace("index.html");
  }
});

reportForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!currentSession) {
    showMessage("Sua sessão expirou. Faça login novamente.", "error");
    return;
  }

  const userName = document.querySelector("#userName").value.trim();
  const iaTool = document.querySelector("#iaTool").value; // Agora é um select
  const usagePurpose = document
    .querySelector("#usagePurpose")
    .value
    .trim();

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
    showMessage(
      "Preencha todos os campos obrigatórios.",
      "error"
    );

    return;
  }

  setLoading(true);
  reportMessage.className = "form-message";

  const report = {
    user_id: currentSession.user.id,
    user_name: userName,
    ia_tool: iaTool,
    usage_purpose: usagePurpose,
    usage_date: new Date(usageDate).toISOString(),
    result_quality: resultQuality,
    notes: notes || null
  };

  const { error } = await supabase
    .from("ia_reports")
    .insert(report);

  setLoading(false);

  if (error) {
    console.error("Erro ao salvar relatório:", error);

    showMessage(
      "Não foi possível salvar o relatório. Tente novamente.",
      "error"
    );

    return;
  }

  reportForm.reset();
  usageDateInput.value = getCurrentDateTime();

  showMessage(
    "Relatório registrado com sucesso.",
    "success"
  );
});

logoutButton.addEventListener("click", async () => {
  logoutButton.disabled = true;
  logoutButton.textContent = "Saindo...";

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Erro ao sair:", error);

    logoutButton.disabled = false;
    logoutButton.textContent = "Sair";

    showMessage(
      "Não foi possível sair da conta.",
      "error"
    );

    return;
  }

  window.location.replace("index.html");
});