// Funcionalidad del menú hamburguesa
document.querySelector('.menu-toggle').addEventListener('click', function () {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active'); // Alternar la clase "active"
});
