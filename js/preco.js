let nome = document.getElementById('nome');
let escola = document.getElementById('escola');
let email = document.getElementById('email');
let telefone = document.getElementById('telefone');
let cargo = document.getElementById('cargo');
let textForm = document.getElementById('textForm');
let textNome = document.getElementById('textNome')
let textEscola = document.getElementById('textEscola')
let textEmail = document.getElementById('textEmail');
let textTelefone = document.getElementById('textTelefone');
let textCargo = document.getElementById('textCargo');
let form = document.querySelector('form');

form.addEventListener('submit', (e) => {

    // A validação agora checa se QUALQUER um dos campos está vazio
    if (nome.value === '' || escola.value === '' || email.value === '' || telefone.value === '' || cargo.value === '') {
        textForm.textContent = "Você precisa preencher todos os campos.";
    } else if(
        validatorNome(nome.value) == true &&
        validatorEscola(escola.value) == true &&
        validatorEmail(email.value) == true &&
        validatorTelefone(telefone.value) == true &&
        validatorCargo(cargo.value) == true
     ){
        // Se todos os campos estiverem preenchidos, a mensagem de erro é removida
        textForm.textContent = "";

         // E os dados podem ser enviados ou processados
         console.log('Formulário enviado com sucesso!');
         console.log('Nome:', nome.value);
         console.log('Escola:', escola.value);
         console.log('Email:', email.value);
         console.log('Telefone:', telefone.value);
         console.log('Cargo:', cargo.value);

    }else{
       console.log("Requisição não atendida")
    }
     // A função e.preventDefault() é chamada primeiro para garantir que a página não recarregue
    e.preventDefault();
});

nome.addEventListener("keyup", () => {
    if(validatorNome(nome.value) != true) {
        textNome.textContent = "O formato do Nome deve ser Ex: abcd ou Abcd."
    } else {
        textNome.textContent = " ";
    }
})

escola.addEventListener("keyup", () => {
    if(validatorEscola(escola.value) != true) {
        textEscola.textContent = "O formato do nome da Escola/Empresa deve ser Ex: Nome da sua escola/empresa."
    } else {
        textEscola.textContent = " ";
    }
})

email.addEventListener("keyup", () => {
    if(validatorEmail(email.value) != true) {
        textEmail.textContent = "O formato do email deve ser Ex: abc@gmail.com"
    } else {
        textEmail.textContent = " ";
    }
})

telefone.addEventListener("keyup", () => {
    if(mascaraDeTelefone(telefone.value) != true) {
        textTelefone.textContent = "O formato do telefone deve ser Ex: (11) 11111-1111"
    } else {
        textTelefone.textContent = " ";
    }
})

cargo.addEventListener("keyup", () => {
    if(validatorCargo(cargo.value) != true) {
        textCargo.textContent = "O formato do cargo deve ser Ex: Diretor."
    } else {
        textCargo.textContent = " ";
    }
})

function validatorNome(nome){
    let namePattern = /^[a-zA-Z\s-]+$/; 
  return namePattern.test(nome);
}

function validatorEscola(escola){
    let escolaPattern = /^[a-zA-Z\s-]+$/; 
  return escolaPattern.test(escola);
}

function validatorEmail(email) {
    let emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  return emailPattern.test(email);
}

function validatorCargo(cargo){
    let cargoPattern = /^[a-zA-Z\s-]+$/; 
  return cargoPattern.test(cargo);
}

function mascaraDeTelefone(telefone) {
    let valor = telefone.value;
    valor = valor.replace(/\D/g, ''); // Remove todos os não-dígitos
    let tamanho = valor.length;

    if (tamanho > 9) { // Número de celular (9 dígitos)
        valor = valor.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (tamanho > 5) { // Número de fixo (8 dígitos, mas pode ser digitado)
        valor = valor.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3'); // Formato similar para fixo
    } else if (tamanho > 2) { // Formato (XX)
        valor = valor.replace(/^(\d{2})(\d)/, '($1) $2');
    }
    telefone.value = valor;
}