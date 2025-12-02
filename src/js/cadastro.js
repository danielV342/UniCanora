const registrationForm = document.getElementById('registrationForm');
const successMessage = document.getElementById('successMessage');
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const googleLoginBtn = document.getElementById('googleLogin');

// Função para exibir mensagem de erro
function showError(inputId, message) {
    const errorElement = document.getElementById(inputId + 'Error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
        inputElement.style.borderColor = '#e74c3c';
    }
}

// Função para remover mensagem de erro
function hideError(inputId) {
    const errorElement = document.getElementById(inputId + 'Error');
    errorElement.style.display = 'none';
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
        inputElement.style.borderColor = '#ddd';
    }
}

// Função para validar o formulário
function validateForm() {
    let isValid = true;
    
    // Validação do nome
    const name = document.getElementById('name').value.trim();
    if (name === '') {
        showError('name', 'Por favor, insira seu nome completo');
        isValid = false;
    } else if (name.length < 3) {
        showError('name', 'O nome deve ter pelo menos 3 caracteres');
        isValid = false;
    } else {
        hideError('name');
    }
    
    // Validação do e-mail
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        showError('email', 'Por favor, insira seu e-mail');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError('email', 'Por favor, insira um e-mail válido');
        isValid = false;
    } else {
        hideError('email');
    }
    
    // Validação do gênero
    const gender = document.getElementById('gender').value;
    if (gender === '') {
        showError('gender', 'Por favor, selecione seu gênero');
        isValid = false;
    } else {
        hideError('gender');
    }

    // Validação do telefone
    const phone = document.getElementById('phone').value.trim();
    const phoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/;
    if (phone === '') {
        showError('phone', 'Por favor, insira seu telefone');
        isValid = false;
    } else if (!phoneRegex.test(phone)) {
        showError('phone', 'Por favor, insira um telefone válido (ex: (81) 99999-9999)');
        isValid = false;
    } else {
        hideError('phone');
    }
    
    // Validação da senha
    const password = document.getElementById('password').value;
    if (password === '') {
        showError('password', 'Por favor, insira uma senha');
        isValid = false;
    } else if (password.length < 8) {
        showError('password', 'A senha deve ter pelo menos 8 caracteres');
        isValid = false;
    } else {
        hideError('password');
    }

    // Validação da confirmação de senha
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (confirmPassword === '') {
        showError('confirmPassword', 'Por favor, confirme sua senha');
        isValid = false;
    } else if (password !== confirmPassword) {
        showError('confirmPassword', 'As senhas não coincidem');
        isValid = false;
    } else {
        hideError('confirmPassword');
    }

    // Validação dos termos
    const terms = document.getElementById('terms').checked;
    if (!terms) {
        showError('terms', 'Você precisa aceitar os termos para continuar');
        isValid = false;
    } else {
        hideError('terms');
    }

    return isValid;
}

// Alternar visibilidade da senha
togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Alterar ícone
    const icon = this.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
});

// Limpar erros quando o usuário começar a digitar
const inputs = document.querySelectorAll('.form-control, .select-control');
inputs.forEach(input => {
    input.addEventListener('input', function() {
        hideError(this.id);
    });

    input.addEventListener('change', function() {
        hideError(this.id);
    });
});

// Login com Google
googleLoginBtn.addEventListener('click', function() {
    // Simnulação de redirecionamento para página de autenticação do Google

    // Mostrar mensagem de carregamento
    googleLoginBtn.innerHTML = '<i class="fab fa-google"></i> Conectando...';
    googleLoginBtn.disabled = true;

    // Simular processo de autenticação
    setTimeout(() => {
        alert('Em um cenário real, você seria redirecionado para a página de autenticação do Google. Esta é uma demonstração.');

    // Restaurar botão
        googleLoginBtn.innerHTML = '<i class="fab fa-google"></i> Entrar com Google';
        googleLoginBtn.disabled = false;
    }, 1000);
});

// Envio do formulário
registrationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
        // Simulação de envio para o servidor
        successMessage.style.display = 'block';

        // Rolar para o topo do formulário para mostrar a mensagem de sucesso
        document.querySelector('.form-section').scrollTop = 0;

        // Ocultar a mensagem após 5 segundos
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }
});

// Máscara para telefone
document.getElementById('phone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 10) {
        value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (value.length > 6) {
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    } else if (value.length > 0) {
        value = value.replace(/^(\d*)/, '($1');
    }

    e.target.value = value;
});

// Adicionar efeito de animação aos elementos
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = 1;
        }, index * 200);
    });
    
    // Ajustar altura do formulário para garantir que não haja scroll visível
    const adjustFormHeight = () => {
        const formContainer = document.querySelector('.form-container');
        const formSection = document.querySelector('.form-section');
        
        if (formContainer.clientHeight > formSection.clientHeight) {
            formSection.style.overflowY = 'auto';
        } else {
            formSection.style.overflowY = 'hidden';
        }
    };

    // Ajustar altura após carregamento e redimensionamento
    setTimeout(adjustFormHeight, 100);
    window.addEventListener('resize', adjustFormHeight);
});