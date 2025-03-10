document.querySelector('.hero form').addEventListener('submit', function (e) {
    e.preventDefault();
    const query = document.querySelector('.hero input[type="text"]').value;
    alert(`Buscando: ${query}`);
    // Aquí puedes agregar la lógica para redirigir o filtrar resultados
});
