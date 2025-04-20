const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', function () {
      // Toggle 'active' class on clicked header for arrow rotation
      this.classList.toggle('active');

      // Toggle 'show' class for the content's visibility
      const content = this.nextElementSibling;

      if (content.style.display === "block") {
          content.style.display = "none";
      } else {
          content.style.display = "block";
      }
  });
});

function openAccordionByHash() {
    const hash = window.location.hash;
    if (!hash) return;

    const header = document.querySelector(hash);
    if (header && header.classList.contains('accordion-header')) {
        // If it's not already open
        if (!header.classList.contains('active')) {
            header.click(); // Triggers the toggle logic already built
        }

        // Optional: Scroll it into view smoothly
        setTimeout(() => {
            header.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}

// Run on page load
window.addEventListener('DOMContentLoaded', openAccordionByHash);

// Also run if user clicks a link changing the hash
window.addEventListener('hashchange', openAccordionByHash);

header.scrollIntoView({ behavior: 'smooth', block: 'start' });
// OR do manual offset:
window.scrollBy(0, -80); // adjust based on your nav height
