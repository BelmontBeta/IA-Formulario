// js/changePassword.js
import { supabase } from "./supabase.js";

const passwordModal = document.getElementById('passwordModal');
const changePasswordButton = document.getElementById('changePasswordButton');
const closeModalButton = document.getElementById('closeModalButton');
const changePasswordForm = document.getElementById('changePasswordForm');
const newPasswordInput = document.getElementById('newPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');
const passwordMessage = document.getElementById('passwordMessage');
const updatePasswordButton = document.getElementById('updatePasswordButton');

function showPasswordMessage(message, type) {
    passwordMessage.textContent = message;
    passwordMessage.className = `form-message visible ${type}`;
}

function setPasswordLoading(isLoading) {
    updatePasswordButton.disabled = isLoading;
    updatePasswordButton.querySelector("span:first-child").textContent =
        isLoading ? "Atualizando..." : "Atualizar Senha";
}

// Abrir modal
changePasswordButton.addEventListener('click', () => {
    passwordModal.classList.add('visible');
    passwordMessage.className = 'form-message'; // Limpa mensagens anteriores
    newPasswordInput.value = '';
    confirmPasswordInput.value = '';
});

// Fechar modal
closeModalButton.addEventListener('click', () => {
    passwordModal.classList.remove('visible');
});

// Fechar modal clicando fora
window.addEventListener('click', (event) => {
    if (event.target === passwordModal) {
        passwordModal.classList.remove('visible');
    }
});

// Lógica de alteração de senha
changePasswordForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    passwordMessage.className = 'form-message'; // Limpa mensagens

    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (newPassword.length < 6) {
        showPasswordMessage('A nova senha deve ter no mínimo 6 caracteres.', 'error');
        return;
    }

    if (newPassword !== confirmPassword) {
        showPasswordMessage('As senhas não coincidem.', 'error');
        return;
    }

    setPasswordLoading(true);

    const { error } = await supabase.auth.updateUser({
        password: newPassword
    });

    if (error) {
        console.error('Erro ao atualizar senha:', error.message);
        showPasswordMessage(`Erro ao atualizar senha: ${error.message}`, 'error');
        setPasswordLoading(false);
        return;
    }

    showPasswordMessage('Senha atualizada com sucesso! Você será desconectado para efetuar login com a nova senha.', 'success');
    setPasswordLoading(false);

    // Desconecta o usuário para que ele faça login com a nova senha
    setTimeout(async () => {
        await supabase.auth.signOut();
        window.location.href = 'index.html';
    }, 3000);
});