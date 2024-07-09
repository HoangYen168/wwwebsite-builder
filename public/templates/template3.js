document.addEventListener('DOMContentLoaded', () => {
    console.log('Template 3 JavaScript is loaded.');

    // Navigation alert
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            alert(`You clicked the ${link.textContent} link!`);
        });
    });

    // Form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Form submitted!');
        contactForm.reset();
    });

    // Image upload functionality
    const fileInput = document.getElementById('file-input');
    let currentImage = null;

    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            currentImage = item;
            fileInput.click();
        });
    });

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file && currentImage) {
            const reader = new FileReader();
            reader.onload = (e) => {
                currentImage.src = e.target.result;
                alert('Image uploaded successfully!');
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select an image to upload.');
        }
    });
});
