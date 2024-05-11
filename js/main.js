document.addEventListener('DOMContentLoaded', function() {
    const angleDownButton = document.querySelector('.angle-down');

    if (angleDownButton) {
        angleDownButton.addEventListener('click', function() {
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

            window.scrollTo({
                top: viewportHeight,
                behavior: 'smooth'
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = document.querySelectorAll('.gallery .image');
    const popup = document.querySelector('.popup');
    const popupImage = document.querySelector('.popup-image');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentImageIndex = 0;

    function displayPopup(imageSrc) {
        popupImage.src = imageSrc;
        popup.style.display = 'block';
        setCurrentImageIndex(imageSrc);
    }

    function setCurrentImageIndex(imageSrc) {
        galleryImages.forEach((image, index) => {
            if (image.getAttribute('src') === imageSrc) {
                currentImageIndex = index;
            }
        });
    }

    function changeImage(direction) {
        currentImageIndex = (currentImageIndex + direction + galleryImages.length) % galleryImages.length;
        const newImageSrc = galleryImages[currentImageIndex].getAttribute('src');
        popupImage.src = newImageSrc;
    }

    galleryImages.forEach(function(image) {
        image.addEventListener('click', function() {
            const imageSrc = image.getAttribute('src');
            displayPopup(imageSrc);
        });
    });

    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    prevBtn.addEventListener('click', function() {
        changeImage(-1);
    });

    nextBtn.addEventListener('click', function() {
        changeImage(1);
    });

    popup.addEventListener('click', function(event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && popup.style.display === 'block') {
            popup.style.display = 'none';
        } else if (event.key === 'ArrowLeft' && popup.style.display === 'block') {
            changeImage(-1);
        } else if (event.key === 'ArrowRight' && popup.style.display === 'block') {
            changeImage(1);
        }
    });
});
