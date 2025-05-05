const images = [
    'images/test_chart.png',
    'images/dvh.png',
    'images/dose_dist.png',
    'images/tutorial_page.png'
];

let currentIndex = 0;
const galleryImg = document.getElementById('gallery-img');

function showImage(index) {
    galleryImg.src = images[index];
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}