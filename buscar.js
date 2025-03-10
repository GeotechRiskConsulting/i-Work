import { database, ref, onValue } from './firebase.js';

// Obtener elementos del DOM
const buscarForm = document.getElementById('buscarForm');
const nombreInput = document.getElementById('nombreInput');
const especialidadInput = document.getElementById('especialidadInput');
const resultados = document.getElementById('resultados');

// Función para calcular la similitud entre dos cadenas (tolerante a errores)
function calcularSimilitud(str1, str2) {
    const maxLength = Math.max(str1.length, str2.length);
    const distancia = levenshtein(str1.toLowerCase(), str2.toLowerCase());
    return 1 - (distancia / maxLength); // Porcentaje de similitud (0 a 1)
}

// Algoritmo de Levenshtein para calcular la distancia entre dos cadenas
function levenshtein(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matriz = [];
    for (let i = 0; i <= b.length; i++) {
        matriz[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matriz[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            const costo = a[j - 1] === b[i - 1] ? 0 : 1;
            matriz[i][j] = Math.min(
                matriz[i - 1][j] + 1,    // Eliminación
                matriz[i][j - 1] + 1,    // Inserción
                matriz[i - 1][j - 1] + costo // Sustitución
            );
        }
    }

    return matriz[b.length][a.length];
}

// Manejar el envío del formulario de búsqueda
buscarForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitar que el formulario se envíe

    const nombreQuery = nombreInput.value.trim().toLowerCase();
    const especialidadQuery = especialidadInput.value.trim().toLowerCase();

    if (!nombreQuery && !especialidadQuery) {
        alert('Por favor, ingresa un nombre o una especialidad.');
        return;
    }

    // Leer datos desde Firebase
    onValue(ref(database, 'profesionales'), (snapshot) => {
        resultados.innerHTML = ''; // Limpiar resultados anteriores

        if (!snapshot.exists()) {
            resultados.innerHTML = '<p>No se encontraron profesionales.</p>';
            return;
        }

        const profesionales = [];
        snapshot.forEach((childSnapshot) => {
            const profesional = childSnapshot.val();
            profesionales.push(profesional);
        });

        // Filtrar y ordenar profesionales
        const resultadosFiltrados = profesionales
            .map(profesional => {
                const similitudNombre = nombreQuery ? calcularSimilitud(nombreQuery, profesional.nombre) : 0;
                const similitudEspecialidad = especialidadQuery ? calcularSimilitud(especialidadQuery, profesional.especialidad) : 0;
                const puntuacionTotal = (similitudNombre + similitudEspecialidad) / 2; // Promedio de similitud
                return { ...profesional, puntuacionTotal };
            })
            .filter(profesional => profesional.puntuacionTotal > 0.5) // Mostrar solo resultados con similitud > 50%
            .sort((a, b) => b.puntuacionTotal - a.puntuacionTotal); // Ordenar por similitud

        if (resultadosFiltrados.length === 0) {
            resultados.innerHTML = '<p>No se encontraron profesionales que coincidan con la búsqueda.</p>';
            return;
        }

        // Mostrar resultados
        resultadosFiltrados.forEach(profesional => {
            const card = document.createElement('div');
            card.className = 'profesional-card';
            card.innerHTML = `
                <h3>${profesional.nombre}</h3>
                <p><strong>Especialidad:</strong> ${profesional.especialidad}</p>
                <p><strong>Ubicación:</strong> ${profesional.ubicacion}</p>
                <p><strong>Puntuación:</strong> ⭐⭐⭐⭐☆</p>
                <button>Contactar</button>
            `;
            resultados.appendChild(card);
        });
    });
});