const images = [
    '/images/Pixel war.png',
    '/images/Pixel war (1).png',
    '/images/Pixel war (2).png',
    '/images/Pixel war (3).png',
    '/images/Pixel war (4).png',
    '/images/Pixel war (5).png'
];

let currentIndex = 0;

const imgElem = document.getElementById('tutoImg');
const nextBtn = document.getElementById('nextBtn');
const wrap = document.getElementById('wrapper');
const tutoWrapper = document.getElementById('tutoWrapper');

nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= images.length) {
    // Le tuto est fini, on masque le tuto et on affiche le formulaire
        wrap.style.display = 'block';
        tutoWrapper.style.display = 'none';
    } else {
    // Change l'image du tuto
    imgElem.src = images[currentIndex];
    }
});