// script.js
let currentIndex = 0;
const gallery = document.getElementById('gallery');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const fileInput = document.getElementById('file-input');
const uploadButton = document.getElementById('upload-button');

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : gallery.children.length - 1;
    updateGallery();
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex < gallery.children.length - 1) ? currentIndex + 1 : 0;
    updateGallery();
});

uploadButton.addEventListener('click', () => {
    const files = fileInput.files;
    if (files.length > 0) {
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgContainer = document.createElement('div');
                imgContainer.className = 'image-container';
                
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = file.name;
                img.className = 'gallery-image';
                
                const deleteButton = document.createElement('button');
                deleteButton.className = 'delete-button';
                deleteButton.innerText = 'Delete';
                deleteButton.addEventListener('click', () => {
                    imgContainer.remove();
                    updateGallerySize();
                });
                
                imgContainer.appendChild(img);
                imgContainer.appendChild(deleteButton);
                gallery.appendChild(imgContainer);
                updateGallerySize();
            };
            reader.readAsDataURL(file);
        });
    }
});

function updateGallery() {
    const offset = -currentIndex * 100;
    gallery.style.transform = translateX(${offset}%);
}

function updateGallerySize() {
    if (currentIndex >= gallery.children.length) {
        currentIndex = gallery.children.length - 1;
    }
    updateGallery();
}

// Add delete functionality to existing images
document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', () => {
        button.parentElement.remove();
        updateGallerySize();
    });
});
