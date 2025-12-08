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

const btnLerSobre = document.querySelector('.linear-gradient-btn');
const secaoAlvo = document.querySelector('.digitalized-maintenance-container');

if (btnLerSobre && secaoAlvo) {
    btnLerSobre.addEventListener('click', () => {
        secaoAlvo.scrollIntoView({ behavior: 'smooth' });
    });
}

const btnGaranta = document.querySelector('.digitalized-maintenance-description-click');

if (btnGaranta) {
    btnGaranta.style.cursor = 'pointer';
    
    btnGaranta.addEventListener('click', () => {
        window.location.href = 'preco.html';
    });
}

const btnVerComentarios = document.querySelector('.explanatory-video-comments');

if (btnVerComentarios) {
    btnVerComentarios.style.cursor = 'pointer';

    btnVerComentarios.addEventListener('click', () => {
        window.location.href = 'comente.html';
    });
}

const btnVerificar = document.querySelector('.verify-values-linear-gradient-btn');

if (btnVerificar) {
    btnVerificar.style.cursor = 'pointer'; 

    btnVerificar.addEventListener('click', (event) => {
        event.preventDefault(); 
        window.location.href = 'preco.html';
    });
}