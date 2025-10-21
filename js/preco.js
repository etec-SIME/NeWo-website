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


hamburger.addEventListener('click', () => {
    menuMobile.classList.toggle('open');
    hamburger.classList.toggle('active'); 
});


form.addEventListener('submit', (e) => {
    e.preventDefault();

    textForm.textContent = "";
    textNome.textContent = "";
    textEscola.textContent = "";
    textEmail.textContent = "";
    textTelefone.textContent = "";
    textCargo.textContent = "";
    
    mascaraDeTelefone(telefone);

    if (nome.value === '' || escola.value === '' || email.value === '' || telefone.value === '' || cargo.value === '') {
        textForm.textContent = "Você precisa preencher todos os campos.";
        return;
    }

    if (
        validatorNome(nome.value) &&
        validatorEscola(escola.value) &&
        validatorEmail(email.value) &&
        validatorTelefone(telefone.value) &&
        validatorCargo(cargo.value)
      ){
        textForm.textContent = "";
        console.log('Formulário enviado com sucesso!');
        
    } else {
        textForm.textContent = "Corrija os campos com erros antes de enviar.";
        console.log("Requisição não atendida. Erros de validação.");
    }
});

nome.addEventListener("keyup", () => {
    if(!validatorNome(nome.value)) {
        textNome.textContent = "O formato do Nome deve conter apenas letras, espaços ou hífens.";
    } else {
        textNome.textContent = " ";
    }
});

escola.addEventListener("keyup", () => {
    if(!validatorEscola(escola.value)) {
        textEscola.textContent = "O formato do nome da Escola/Empresa deve conter apenas letras, espaços ou hífens.";
    } else {
        textEscola.textContent = " ";
    }
});

email.addEventListener("keyup", () => {
    if(!validatorEmail(email.value)) {
        textEmail.textContent = "O formato do email deve ser Ex: abc@gmail.com";
    } else {
        textEmail.textContent = " ";
    }
});

telefone.addEventListener("keyup", () => {
    mascaraDeTelefone(telefone); 

    if(!validatorTelefone(telefone.value)) {
        textTelefone.textContent = "O formato deve ser (XX) XXXXX-XXXX.";
    } else {
        textTelefone.textContent = " ";
    }
});

cargo.addEventListener("keyup", () => {
    if(!validatorCargo(cargo.value)) {
        textCargo.textContent = "O formato do cargo deve ser Ex: Diretor.";
    } else {
        textCargo.textContent = " ";
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