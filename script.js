// Menu toggle functionality
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const body = document.body;

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
    body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (nav.classList.contains('active') && 
        !nav.contains(e.target) && 
        !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        body.style.overflow = '';
    }
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        body.style.overflow = '';
    });
});

// Slideshow functionality (only for index.html)
if (document.querySelector('.slideshow-container')) {
    let slideIndex = 0;
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");
    let slideInterval;
    let lastScrollTop = 0;
    const header = document.querySelector('header');

    // Função para controlar a visibilidade do header ao rolar
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });

    function showSlides() {
        // Esconde todos os slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            dots[i].classList.remove("active");
        }

        // Incrementa o índice e reseta se necessário
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }

        // Mostra o slide atual
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].classList.add("active");
    }

    function startSlideshow() {
        showSlides();
        slideInterval = setInterval(showSlides, 10000); // Muda a cada 10 segundos
    }

    // Navegação manual
    function plusSlides(n) {
        clearInterval(slideInterval);
        slideIndex += n;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        } else if (slideIndex < 1) {
            slideIndex = slides.length;
        }
        showSlides();
        slideInterval = setInterval(showSlides, 10000);
    }

    function currentSlide(n) {
        clearInterval(slideInterval);
        slideIndex = n;
        showSlides();
        slideInterval = setInterval(showSlides, 10000);
    }

    // Event listeners
    document.querySelector('.prev').addEventListener('click', () => plusSlides(-1));
    document.querySelector('.next').addEventListener('click', () => plusSlides(1));

    // Adiciona event listeners para os dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener('click', () => currentSlide(i + 1));
    }

    // Inicia o slideshow quando a página carregar
    document.addEventListener('DOMContentLoaded', startSlideshow);

    // Filtro de categorias
    const categories = document.querySelectorAll('.recipe-category');
    const recipeSlides = document.querySelectorAll('.slide');

    categories.forEach(category => {
        category.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedCategory = category.dataset.category;

            // Atualiza categoria ativa
            categories.forEach(c => c.classList.remove('active'));
            category.classList.add('active');

            // Filtra slides
            recipeSlides.forEach(slide => {
                if (selectedCategory === 'todas' || slide.dataset.category === selectedCategory) {
                    slide.style.display = 'block';
                } else {
                    slide.style.display = 'none';
                }
            });

            // Reinicia slideshow
            clearInterval(slideInterval);
            slideIndex = 0;
            showSlides();
            slideInterval = setInterval(showSlides, 10000);
        });
    });
}

// Recipe filter functionality (only for receitas.html)
if (document.querySelector('.recipes-filters')) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const recipeCards = document.querySelectorAll('.recipe-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.dataset.filter;

            recipeCards.forEach(card => {
                if (filter === 'todas' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
} 