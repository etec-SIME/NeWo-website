let nome = document.getElementById('nome');
let comente = document.getElementById('comente');
let form = document.getElementById('formulario-comentario'); 
let textForm = document.getElementById('textForm');
let textNome = document.getElementById('textNome');
let textComente = document.getElementById('textComente');
let comentariosLista = document.getElementById('comentarios-lista'); 
var stars = document.querySelectorAll('.estrelas li'); 
let avaliacaoSelecionada = 0; 

document.addEventListener('click', function(e) {
    var element = e.target;
    if (element.classList.contains('star-icon')) {
        e.preventDefault(); 
        var clickedStar = element;
        var starIndex = Array.prototype.indexOf.call(stars, clickedStar);

        stars.forEach(function(star) {
            star.classList.remove('ativo');
        });

        for (var i = 0; i <= starIndex; i++) {
            stars[i].classList.add('ativo');
        }
        avaliacaoSelecionada = clickedStar.getAttribute('data-avaliação');
        console.log("Avaliação Selecionada: " + avaliacaoSelecionada);
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (textForm) textForm.textContent = "";
    if (nome.value.trim() === '' || comente.value.trim() === '') {
        if (textForm) textForm.textContent = "Você precisa preencher todos os campos.";
        return; 
    } 

    if (validatorNome(nome.value) && validatorComente(comente.value)) {
        if (avaliacaoSelecionada === 0) {
            if (textForm) textForm.textContent = "Você precisa selecionar uma avaliação (estrelas).";
            return;
        }

        criarNovoComentario(nome.value, comente.value, avaliacaoSelecionada);
        nome.value = '';
        comente.value = '';
        avaliacaoSelecionada = 0;
        stars.forEach(star => star.classList.remove('ativo'));
        
        console.log('Formulário enviado e comentário criado com sucesso!');

    } else {
       console.log("Requisição não atendida devido a falha na validação dos campos.");
    }
});

function criarNovoComentario(nomeAutor, textoComentario, rating) {
    if (!comentariosLista) return;

    const novoComentario = document.createElement('div');
    novoComentario.classList.add('comentario-item'); 

    let estrelasHTML = '';
    const estrelaCheia = '★'; 
    const estrelaVazia = '☆'; 
    
    for (let i = 1; i <= 5; i++) {
        estrelasHTML += `<span class="comentario-estrela" style="color: #A55FE6;">${i <= rating ? estrelaCheia : estrelaVazia}</span>`;
    }

    novoComentario.innerHTML = `
        <div class="comentario-icone">
            <img src="img/user.png">
        </div> 
        
        <div class="comentario-autor-wrapper">
            <h4 class="comentario-autor">${nomeAutor}</h4>
        </div>

        <div class="comentario-metadata">
            <div class="comentario-rating">${estrelasHTML}</div>
            <small class="comentario-data">${new Date().toLocaleDateString('pt-BR')}</small>
        </div>

        <p class="comentario-texto">${textoComentario}</p>
    `;

    comentariosLista.prepend(novoComentario);
}

nome.addEventListener("keyup", () => {
    if(validatorNome(nome.value) != true) {
        if (textNome) textNome.textContent = "O formato do Nome deve ser Ex: abcd ou Abcd."
    } else {
        if (textNome) textNome.textContent = " ";
    }
})

comente.addEventListener("keyup", () => {
    if(validatorComente(comente.value) != true) {
       if (textComente) textComente.textContent = "Seu comentário só pode conter letras, números, espaços ou hífens."
    } else {
        if (textComente) textComente.textContent = " ";
    }
})

function validatorNome(nome){
    let namePattern = /^[a-zA-Z0-9\s]+$/;
    return namePattern.test(nome);
}

function validatorComente(comente){
    let comentePattern = /^[a-zA-Z0-9\s-]+$/; 
    return comentePattern.test(comente);
}