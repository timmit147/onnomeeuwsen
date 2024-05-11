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