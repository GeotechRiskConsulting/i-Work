// loadHeader.js
document.addEventListener("DOMContentLoaded", function () {
    // Cargar el header
    fetch('includes/header.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);

            // Llamar a la función del menú hamburguesa después de cargar el header
            setupMenu();
        })
        .catch(error => console.error('Error al cargar el header:', error));
});

// Función para configurar el menú hamburguesa
function setupMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });
    } else {
        console.error('No se encontraron los elementos del menú.');
    }
}