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
    let galleryImages = document.querySelectorAll('.gallery .image');
    const popup = document.querySelector('.popup');
    const popupImage = document.querySelector('.popup-image');
    const popupTitle = popup.querySelector('h2'); 
    const popupText = popup.querySelector('ul'); 
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentImageIndex = 0;

    function displayPopup(imageSrc, image) {
        const index = Array.from(galleryImages).indexOf(image) + 1; 
        const position = getPosition(image);
        console.log(`Clicked image position: ${position}, Index: ${index}`);
        popupImage.src = imageSrc;
        popup.style.display = 'block';
        setCurrentImageIndex(image);
        set_text(image);
    }

    function set_text(image) {
        popupTitle.innerText = image.dataset.title;
        const imageContent = image.dataset.details;
        const ul = document.createElement('ul'); // Create a new ul element
    
        if (imageContent) {
            imageContent.split(', ').forEach(item => { // Split the imageContent string
                const li = document.createElement('li'); // Create a new li element for each item
                li.innerText = item; // Set the text content of the li
                ul.appendChild(li); // Append the li to the ul
            });
        }
    
        // Clear previous content and append the new ul to popupText
        popupText.innerHTML = ''; // Clear previous content
        popupText.appendChild(ul); // Append the new ul to popupText
    }
    
    

    function setCurrentImageIndex(image) {
        currentImageIndex = Array.from(galleryImages).indexOf(image);
    }

    function changeImage(direction) {
        currentImageIndex = (currentImageIndex + direction + galleryImages.length) % galleryImages.length;
        const newImage = galleryImages[currentImageIndex];
        const newImageSrc = newImage.getAttribute('src');
        popupImage.src = newImageSrc;
        set_text(newImage);
    }

    function getPosition(image) {
        const rect = image.getBoundingClientRect();
        const x = rect.left + window.scrollX;
        const y = rect.top + window.scrollY;
        return { x, y };
    }

    function sortByPosition(images) {
        return Array.from(images).sort((a, b) => {
            const aRect = a.getBoundingClientRect();
            const bRect = b.getBoundingClientRect();
            if (aRect.top !== bRect.top) {
                return aRect.top - bRect.top;
            } else {
                return aRect.left - bRect.left;
            }
        });
    }

    function handleImageLoad(image, callback) {
        if (image.complete) {
            callback();
        } else {
            image.addEventListener('load', callback);
        }
    }

    galleryImages.forEach(function(image) {
        handleImageLoad(image, function() {
            galleryImages = sortByPosition(galleryImages);
        });

        image.addEventListener('click', function() {
            handleImageLoad(image, function() {
                const imageSrc = image.getAttribute('src');
                displayPopup(imageSrc, image);
            });
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





document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.sidebar ul li a');
    const contentBlocks = document.querySelectorAll('.container-block section');

    function showContent(id) {
        contentBlocks.forEach(block => {
            if (block.id === id) {
                block.classList.remove('hidden');
            } else {
                block.classList.add('hidden');
            }
        });

        navLinks.forEach(link => {
            if (link.getAttribute('href').slice(1) === id) {
                link.parentElement.classList.add('active');
            } else {
                link.parentElement.classList.remove('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            showContent(targetId);
        });
    });
});

