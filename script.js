let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}

const typed = new Typed('.multiple-text', {
    strings: ['Work Student', 'Video Editor', 'Graphic Designer', 'Photographer', 'Web Developer', 'Programmer', 'Cisco Networker'],
    typeSpeed: 80,
    backSpeed: 80,
    backDelay: 1200,
    loop: true,
});



// Fullscreen Gallery Functionality
const galleryImages = document.querySelectorAll('.gallery img');
const fullscreenOverlay = document.getElementById('fullscreenOverlay');
const fullscreenImage = document.getElementById('fullscreenImage');

galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        fullscreenImage.src = img.src;
        fullscreenOverlay.style.display = 'flex';
    });
});

fullscreenOverlay.addEventListener('click', () => {
    fullscreenOverlay.style.display = 'none';
    fullscreenImage.src = '';
});

