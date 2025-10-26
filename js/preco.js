let nome = document.getElementById('nome');
let escola = document.getElementById('escola');
let email = document.getElementById('email');
let telefone = document.getElementById('telefoneInput');
let cargo = document.getElementById('cargo');
let textForm = document.getElementById('textForm');
let textNome = document.getElementById('textNome');
let textEscola = document.getElementById('textEscola');
let textEmail = document.getElementById('textEmail');
let textTelefone = document.getElementById('textTelefone');
let textCargo = document.getElementById('textCargo');
let form = document.querySelector('form');
const hamburger = document.querySelector('.hamburger-icon');
const menuMobile = document.querySelector('.menu-mobile');
const fecharIcon = document.querySelector('.menu-mobile .fechar');
const buyButton = document.querySelector('.buy-button'); 
const formSection = document.querySelector('.form-section'); 
const emailDestino = 'tcchas2@gmail.com';

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

if (buyButton && formSection) {
    buyButton.addEventListener('click', (e) => {
        e.preventDefault();
        formSection.scrollIntoView({
            behavior: 'smooth'
        });
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    textForm.textContent = "";
    textNome.textContent = "";
    textEscola.textContent = "";
    textEmail.textContent = "";
    textTelefone.textContent = "";
    textCargo.textContent = "";
    
    mascaraDeTelefone(telefone);

    let temErro = false;
    
    if (nome.value === '') { 
        textNome.textContent = "O Nome é obrigatório."; 
        temErro = true; 
    }
    if (escola.value === '') { 
        textEscola.textContent = "O Nome da Escola/Empresa é obrigatório."; 
        temErro = true; 
    }
    if (email.value === '') { 
        textEmail.textContent = "O E-mail é obrigatório."; 
        temErro = true; 
    }
    if (telefone.value === '') { 
        textTelefone.textContent = "O Telefone é obrigatório."; 
        temErro = true; 
    } else if (telefone.value.length < 15) { 
        textTelefone.textContent = "O Telefone deve estar completo no formato (XX) XXXXX-XXXX."; 
        temErro = true; 
    }
    if (cargo.value === '') { 
        textCargo.textContent = "O Cargo é obrigatório."; 
        temErro = true; 
    }

    if (nome.value !== '' && !validatorNome(nome.value)) { 
        textNome.textContent = "O formato do Nome deve conter apenas letras, espaços ou hífens."; 
        temErro = true; 
    }
    if (escola.value !== '' && !validatorEscola(escola.value)) { 
        textEscola.textContent = "O formato da Escola/Empresa está incorreto. Use apenas letras, números e pontuações básicas."; 
        temErro = true; 
    }
    if (email.value !== '' && !validatorEmail(email.value)) { 
        textEmail.textContent = "O formato do e-mail deve ser Ex: nome@dominio.com"; 
        temErro = true; 
    }
    if (telefone.value !== '' && !validatorTelefone(telefone.value)) { 
        textTelefone.textContent = "O formato do Telefone deve ser (XX) XXXXX-XXXX."; 
        temErro = true; 
    }
    if (cargo.value !== '' && !validatorCargo(cargo.value)) { 
        textCargo.textContent = "O formato do Cargo está incorreto. Use apenas letras, espaços, hífens ou pontos."; 
        temErro = true; 
    }

    if (temErro) {
        textForm.textContent = "Corrija os campos com erros antes de enviar.";
    } else {
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
            setTimeout(() => {
                textForm.textContent = "";
            }, 10000);
        } else {
            const data = await response.json();
            textForm.textContent = data.error || "Houve um erro ao enviar a mensagem. Tente novamente.";
        }
    } catch (error) {
        textForm.textContent = "Erro de conexão. Verifique sua internet.";
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Enviar';
    }
}

nome.addEventListener("keyup", () => {
    if(!validatorNome(nome.value)) {
        textNome.textContent = "O formato do Nome deve conter apenas letras, espaços ou hífens.";
    } else {
        textNome.textContent = "";
    }
});

escola.addEventListener("keyup", () => {
    if(!validatorEscola(escola.value)) {
        textEscola.textContent = "O formato da Escola/Empresa está incorreto. Use apenas letras, números e pontuações básicas.";
    } else {
        textEscola.textContent = "";
    }
});

email.addEventListener("keyup", () => {
    if(!validatorEmail(email.value)) {
        textEmail.textContent = "O formato do e-mail deve ser Ex: nome@dominio.com";
    } else {
        textEmail.textContent = "";
    }
});

telefone.addEventListener("keyup", () => {
    mascaraDeTelefone(telefone); 
    if(telefone.value.length > 0 && telefone.value.length < 15) {
        textTelefone.textContent = "O Telefone deve estar completo no formato (XX) XXXXX-XXXX.";
    } else if (telefone.value.length === 15 && !validatorTelefone(telefone.value)) {
        textTelefone.textContent = "O formato deve ser (XX) XXXXX-XXXX.";
    } else {
        textTelefone.textContent = "";
    }
});

cargo.addEventListener("keyup", () => {
    if(!validatorCargo(cargo.value)) {
        textCargo.textContent = "O formato do cargo está incorreto. Use apenas letras, espaços, hífens ou pontos.";
    } else {
        textCargo.textContent = "";
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

function validatorCargo(cargo){
    let cargoPattern = /^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s.-]+$/; 
    return cargoPattern.test(cargo);
}

function validatorTelefone(telefone) {
    let telefonePattern = /^\(\d{2}\) \d{5}-\d{4}$/; 
    return telefonePattern.test(telefone);
}

function mascaraDeTelefone(elemento) {
    let valor = elemento.value.replace(/\D/g, ''); 
    let tamanho = valor.length;

    if (tamanho > 11) {
        valor = valor.substring(0, 11);
    }
    
    if (tamanho === 11) {
        valor = valor.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (tamanho > 6) {
        valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
    } else if (tamanho > 2) { 
        valor = valor.replace(/^(\d{2})(\d*)$/, '($1) $2');
    } else {
        valor = valor.replace(/^(\d*)$/, '($1');
    }
    
    elemento.value = valor;
}