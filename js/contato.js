let nome = document.getElementById('nome');
let escola = document.getElementById('escola');
let email = document.getElementById('email');
let assunto = document.getElementById('assuntoInput');
let mensagem = document.getElementById('Mensagem'); 
let textForm = document.getElementById('textForm');
let textNome = document.getElementById('textNome');
let textEscola = document.getElementById('textEscola');
let textEmail = document.getElementById('textEmail');
let textAssunto = document.getElementById('textAssunto');
let textMensagem = document.getElementById('textMensagem'); 
let form = document.querySelector('form');
const hamburger = document.querySelector('.hamburger-icon');
const menuMobile = document.querySelector('.menu-mobile');
const fecharIcon = document.querySelector('.menu-mobile .fechar');

function closeMobileMenu() {
    menuMobile.classList.remove('open');
}

hamburger.addEventListener('click', () => {
    menuMobile.classList.toggle('open');
});

fecharIcon.addEventListener('click', closeMobileMenu);

document.addEventListener('click', (event) => {
    if (menuMobile.classList.contains('open')) {
        if (!menuMobile.contains(event.target) && !hamburger.contains(event.target)) {
            closeMobileMenu();
        }
    }
});


form.addEventListener('submit', (e) => {
    e.preventDefault();

    textForm.textContent = "";
    textNome.textContent = "";
    textEscola.textContent = "";
    textEmail.textContent = "";
    textAssunto.textContent = "";
    textMensagem.textContent = "";
    
    let temErro = false;
    
    if (nome.value.trim() === '') { 
        textNome.textContent = "O Nome é obrigatório."; 
        temErro = true; 
    }
    if (escola.value.trim() === '') { 
        textEscola.textContent = "A Escola/Empresa é obrigatória."; 
        temErro = true; 
    }
    if (email.value.trim() === '') { 
        textEmail.textContent = "O E-mail é obrigatório."; 
        temErro = true; 
    }
    if (assunto.value.trim() === '') { 
        textAssunto.textContent = "O Assunto é obrigatório."; 
        temErro = true; 
    }
    if (mensagem.value.trim() === '') { 
        textMensagem.textContent = "A Mensagem é obrigatória."; 
        temErro = true; 
    }

    if (nome.value.trim() !== '' && !validatorNome(nome.value)) { 
        textNome.textContent = "O formato do Nome deve conter apenas letras, espaços ou hífens."; 
        temErro = true; 
    }
    if (escola.value.trim() !== '' && !validatorEscola(escola.value)) { 
        textEscola.textContent = "O formato da Escola/Empresa está incorreto. Use apenas letras, números e pontuações básicas."; 
        temErro = true; 
    }
    if (email.value.trim() !== '' && !validatorEmail(email.value)) { 
        textEmail.textContent = "O formato do e-mail deve ser Ex: nome@dominio.com"; 
        temErro = true; 
    }

    if (temErro) {
        textForm.textContent = "Corrija os campos com erros antes de enviar.";
        textForm.style.display = 'block';
    } else {
        textForm.style.display = 'none';
        enviarFormspreeAjax();
    }
});

async function enviarFormspreeAjax() {
    const formData = new FormData(form);
    const submitButton = document.querySelector('.submit-button');
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            form.reset();
            textForm.textContent = "Mensagem enviada com sucesso! Entraremos em contato em breve.";
            textForm.style.color = '#ffffff'; 
            textForm.style.display = 'block'; 
            
            setTimeout(() => {
                textForm.textContent = "";
                textForm.style.display = 'none';
            }, 10000);
        } else {
            const data = await response.json();
            textForm.textContent = data.error || "Houve um erro ao enviar a mensagem. Tente novamente.";
            textForm.style.color = '#ffffff'; 
            textForm.style.display = 'block'; 
        }
    } catch (error) {
        textForm.textContent = "Erro de conexão. Verifique sua internet.";
        textForm.style.color = 'white';
        textForm.style.display = 'block';
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Enviar';
        textForm.style.textAlign = 'center'; 
    }
}

nome.addEventListener("keyup", () => {
    if(!validatorNome(nome.value) && nome.value.trim() !== '') {
        textNome.textContent = "O formato do Nome deve conter apenas letras, espaços ou hífens.";
    } else {
        textNome.textContent = "";
    }
});

escola.addEventListener("keyup", () => {
    if(!validatorEscola(escola.value) && escola.value.trim() !== '') {
        textEscola.textContent = "O formato da Escola/Empresa está incorreto. Use apenas letras, números e pontuações básicas.";
    } else {
        textEscola.textContent = "";
    }
});

email.addEventListener("keyup", () => {
    if(!validatorEmail(email.value) && email.value.trim() !== '') {
        textEmail.textContent = "O formato do e-mail deve ser Ex: nome@dominio.com";
    } else {
        textEmail.textContent = "";
    }
});

assunto.addEventListener("keyup", () => {
    if (assunto.value.trim().length > 0 && !validatorTextoGeral(assunto.value)) {
        textAssunto.textContent = "Caracteres inválidos detectados. Use apenas texto e pontuação básica.";
    } else {
        textAssunto.textContent = "";
    }
});

mensagem.addEventListener("keyup", () => {
    if (mensagem.value.trim().length > 0 && !validatorTextoGeral(mensagem.value)) {
        textMensagem.textContent = "Caracteres inválidos detectados. Use apenas texto e pontuação básica.";
    } else {
        textMensagem.textContent = "";
    }
});


function validatorNome(nome){
    let namePattern = /^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s-]+$/;
    return namePattern.test(nome);
}

function validatorEscola(escola){
    let escolaPattern = /^[a-zA-Z0-9\s.,'&()-]+$/; 
    return escolaPattern.test(escola);
}

function validatorEmail(email) {
    let emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return emailPattern.test(email);
}

function validatorTextoGeral(texto) {
    let pattern = /^[a-zA-Z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s.,'?!()-]+$/;
    return pattern.test(texto);
}