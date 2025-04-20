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
        let currentIndex = 0; // Initialize the starting index
        const totalImages = json.length;

        // Update the carousel (set the image and caption)
        function updateCarousel() {
            const offset = -currentIndex * 100;
            images.style.transform = `translateX(${offset}%)`; // Move the images
            caption.innerText = json[currentIndex].caption; // Set the caption
        }

        // Set the first image and caption initially
        updateCarousel();

        // Next button functionality
        next.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent the default behavior of the anchor tag
            if (currentIndex < totalImages - 1) {
                currentIndex++;
                updateCarousel(); // Update the carousel with the next image
            }
        });

        // Back button functionality
        back.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent the default behavior of the anchor tag
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel(); // Update the carousel with the previous image
            }
        });
    }
});
