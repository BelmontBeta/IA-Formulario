import { supabase } from "./supabase.js";

const loginForm = document.querySelector("#loginForm");
const loginButton = document.querySelector("#loginButton");
const loginMessage = document.querySelector("#loginMessage");

function showMessage(message, type) {
  loginMessage.textContent = message;
  loginMessage.className = `form-message visible ${type}`;
}

function setLoading(isLoading) {
  loginButton.disabled = isLoading;

  loginButton.querySelector("span:first-child").textContent =
    isLoading ? "Validando acesso..." : "Entrar no sistema";
}

async function checkExistingSession() {
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    window.location.href = "formulario.html";
  }
}

checkExistingSession();

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value;

  if (!email || !password) {
    showMessage("Preencha o e-mail e a senha.", "error");
    return;
  }

  setLoading(true);
  loginMessage.className = "form-message";

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    showMessage(
      "Não foi possível entrar. Verifique se o e-mail está autorizado e se a senha está correta.",
      "error"
    );

    setLoading(false);
    return;
  }

  showMessage("Acesso autorizado. Redirecionando...", "success");

  setTimeout(() => {
    window.location.href = "formulario.html";
  }, 500);
});