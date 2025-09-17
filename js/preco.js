let nome = document.getElementById('nome');
let escola = document.getElementById('escola');
let email = document.getElementById('email');
let telefone = document.getElementById('telefone');
let cargo = document.getElementById('cargo');
let textForm = document.getElementById('textForm');
let form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    // A função e.preventDefault() é chamada primeiro para garantir que a página não recarregue
    e.preventDefault();

    // A validação agora checa se QUALQUER um dos campos está vazio
    if (nome.value === '' || escola.value === '' || email.value === '' || telefone.value === '' || cargo.value === '') {
        textForm.textContent = "Você precisa preencher todos os campos.";
    } else {
        // Se todos os campos estiverem preenchidos, a mensagem de erro é removida
        textForm.textContent = "";

        // E os dados podem ser enviados ou processados
        console.log('Formulário enviado com sucesso!');
        console.log('Nome:', nome.value);
        console.log('Escola:', escola.value);
        console.log('Email:', email.value);
        console.log('Telefone:', telefone.value);
        console.log('Cargo:', cargo.value);
    }
});

function validatorEmail(email) {
    let emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  return emailPattern.test(email);
}