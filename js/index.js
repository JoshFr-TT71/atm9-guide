async function loadGallery() {
    const res = await fetch("assets/gallery.json");
    const images = await res.json();
    const container = document.getElementById("galleryContainer");
  
    images.forEach(image => {
      const wrapper = document.createElement("a");
      wrapper.href = image.url;
      wrapper.target = "_blank";
  
      const img = document.createElement("img");
      img.src = image.thumb;
      img.alt = image.description;
  
      const caption = document.createElement("figcaption");
      caption.textContent = image.description;
  
      const figure = document.createElement("figure");
      figure.appendChild(img);
      figure.appendChild(caption);
      wrapper.appendChild(figure);
      container.appendChild(wrapper);
    });
  }
  
  window.addEventListener("DOMContentLoaded", loadGallery);
  
