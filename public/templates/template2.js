document.addEventListener('DOMContentLoaded', () => {
    console.log('Template 2 JavaScript is loaded.');

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
});
