let nome = document.getElementById('nome');
let comente = document.getElementById('comente');
let form = document.getElementById('formulario-comentario');
let textForm = document.getElementById('textForm');
let textNome = document.getElementById('textNome');
let textComente = document.getElementById('textComente');
let comentariosLista = document.getElementById('comentarios-lista');
var stars = document.querySelectorAll('.estrelas li');
let avaliacaoSelecionada = 0;

function validatorNome(nome){
    let namePattern = /^[a-zA-Z0-9\s]+$/;
    return namePattern.test(nome);
}

function validatorComente(comente){
    let comentePattern = /^[a-zA-Z0-9\s-]+$/;
    return comentePattern.test(comente);
}

document.addEventListener('click', function(e) {
    var element = e.target;
    if (element.classList.contains('star-icon')) {
        e.preventDefault();
        var clickedStar = element;
        var starItem = clickedStar.closest('li');

        if (!starItem || !stars.length) return;

        var starIndex = Array.prototype.indexOf.call(stars, starItem);

        stars.forEach(function(star) {
            star.classList.remove('ativo');
        });

        for (var i = 0; i <= starIndex; i++) {
            stars[i].classList.add('ativo');
        }

        avaliacaoSelecionada = starItem.getAttribute('data-avaliacao') || (starIndex + 1);
        console.log("Avaliação Selecionada: " + avaliacaoSelecionada);
    }
});

let perPage = 4
const state = {
    page: 1,
    perPage,
    totalPage: 1
}

const html = {
    get(element){
        return document.querySelector(element)
    }
}

const controls = {
    next () {
        state.page++;
        if(state.page > state.totalPage ) {
            state.page = state.totalPage;
        }
    },
    prev(){
        state.page--
        if(state.page < 1){
            state.page = 1;
        }
    },
    goTo(page){
        page = parseInt(page);

        if(page < 1){
            page = 1
        }

        state.totalPage = Math.ceil(comentariosLista.children.length / state.perPage);

        if (page > state.totalPage){
            page = state.totalPage;
        }

        state.page = page;

    },
    createListeners(){
        if (html.get('.first')) html.get('.first').addEventListener('click', () => {
            controls.goTo(1)
            update()
        });

        if (html.get('.last')) html.get('.last').addEventListener('click', () => {
            controls.goTo(state.totalPage)
            update()
        });

        if (html.get('.next')) html.get('.next').addEventListener('click', () => {
            controls.next()
            update()
        });

        if (html.get('.prev')) html.get('.prev').addEventListener('click', () => {
            controls.prev()
            update()
        });
    }
}

function displayComments() {
    const todosComentarios = comentariosLista.querySelectorAll('.comentario-item');
    const start = (state.page - 1) * state.perPage;
    const end = start + state.perPage;

    if (!todosComentarios || todosComentarios.length === 0) return;

    todosComentarios.forEach((comentario, index) => {
        if (index >= start && index < end) {
            comentario.style.display = 'flex';
        } else {
            comentario.style.display = 'none';
        }
    });

    const currentPageEl = html.get('.current-page');
    if (currentPageEl) {
        currentPageEl.textContent = state.page;
    }

    const totalPagesEl = html.get('.total-pages');
    if (totalPagesEl) {
        totalPagesEl.textContent = state.totalPage;
    }
}

function update(){
    state.totalPage = Math.ceil(comentariosLista.children.length / state.perPage);

    if (state.page > state.totalPage) {
        state.page = state.totalPage || 1;
    }

    displayComments();

    console.log(`Página atual: ${state.page} / Total de Páginas: ${state.totalPage}`);
}

// CRIAÇÃO DE NOVOS COMENTÁRIOS
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

    controls.goTo(1);
    update();
}


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
        if (textForm) textForm.textContent = "Comentário enviado com sucesso!";

        console.log('Formulário enviado e comentário criado com sucesso!');

    } else {
       console.log("Requisição não atendida devido a falha na validação dos campos.");
    }
});


nome.addEventListener("keyup", () => {
    if(textNome) {
        if(validatorNome(nome.value) != true) {
            textNome.textContent = "O formato do Nome deve ser Ex: abcd ou Abcd (sem caracteres especiais)."
        } else {
            textNome.textContent = " ";
        }
    }
})

comente.addEventListener("keyup", () => {
    if(textComente) {
        if(validatorComente(comente.value) != true) {
           textComente.textContent = "Seu comentário só pode conter letras, números, espaços ou hífens."
        } else {
            textComente.textContent = " ";
        }
    }
})

function init(){
    controls.createListeners();
    update();
}

document.addEventListener('DOMContentLoaded', init);