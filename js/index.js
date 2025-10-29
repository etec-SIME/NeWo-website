let nome = document.getElementById('nome');
let comente = document.getElementById('comente');
let form = document.getElementById('formulario-comentario'); 
let textForm = document.getElementById('textForm');
let textNome = document.getElementById('textNome');
let textComente = document.getElementById('textComente');
let comentariosLista = document.getElementById('comentarios-lista'); 
var stars = document.querySelectorAll('.estrelas li'); 
let avaliacaoSelecionada = 0;
const hamburger = document.querySelector('.hamburger-icon');
const menuMobile = document.querySelector('.menu-mobile');
const fecharIcon = document.querySelector('.menu-mobile .fechar');

function closeMobileMenu() {
    if (menuMobile) {
        menuMobile.classList.remove('open');
    }
}

if (hamburger && menuMobile && fecharIcon) {
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
}

