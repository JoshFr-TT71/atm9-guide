// Loop through all carousels on the page
document.querySelectorAll('.carousel').forEach(function (carousel) {
    const images = carousel.querySelector('.carousel-images');
    const caption = carousel.querySelector('.carousel-caption');
    const back = carousel.querySelector('.carousel-back');
    const next = carousel.querySelector('.carousel-next');
    const jsonFile = carousel.getAttribute('data-carousel-json'); // Get the correct JSON file for this carousel

    // Fetch the correct JSON file for each carousel
    fetch(jsonFile)
        .then(function (res) {
            res.json().then(function (json) {
                json.forEach(function (el) {
                    // Create image elements dynamically
                    var image = document.createElement("img");
                    image.setAttribute("src", el.url);
                    image.setAttribute("alt", el.caption);
                    image.setAttribute("title", el.caption);
                    images.appendChild(image);
                });

                // After the images are added, set the first image and caption
                setupCarousel(json, images, caption, back, next);
            });
        });

    // Function to handle carousel navigation
    function setupCarousel(json, images, caption, back, next) {
        let currentIndex = 0;
        const totalImages = json.length;
    
        // Create pips container
        const pipContainer = document.createElement('div');
        pipContainer.classList.add('carousel-pips');
        carousel.parentNode.insertBefore(pipContainer, carousel.nextSibling);

    
        const pips = json.map((_, i) => {
            const pip = document.createElement('span');
            pip.classList.add('carousel-pip');
            if (i === 0) pip.classList.add('active');
            pip.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
            });
            pipContainer.appendChild(pip);
            return pip;
        });
    
        function updateCarousel() {
            images.style.transform = `translateX(${-currentIndex * 100}%)`;
            caption.innerText = json[currentIndex].caption;
            pips.forEach((pip, i) => {
                pip.classList.toggle('active', i === currentIndex);
            });
        }
    
        next.addEventListener("click", (e) => {
            e.preventDefault();
            currentIndex = (currentIndex + 1) % totalImages;
            updateCarousel();
        });
    
        back.addEventListener("click", (e) => {
            e.preventDefault();
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            updateCarousel();
        });
    
        updateCarousel(); // Initial render
    }
});
