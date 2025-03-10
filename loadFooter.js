// loadFooter.js
document.addEventListener("DOMContentLoaded", function () {
    // Cargar el footer
    fetch('includes/footer.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
        })
        .catch(error => console.error('Error al cargar el footer:', error));
});