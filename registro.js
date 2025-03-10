// registro.js
import { database, ref, push } from './firebase.js';

// Obtener el formulario
const registroForm = document.getElementById('registroForm');

// Manejar el envío del formulario
registroForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitar que el formulario se envíe

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const especialidad = document.getElementById('especialidad').value;
    const ubicacion = document.getElementById('ubicacion').value;

    // Guardar los datos en Firebase
    push(ref(database, 'profesionales'), {
        nombre,
        email,
        especialidad,
        ubicacion
    }).then(() => {
        alert('Registro exitoso');
        registroForm.reset(); // Limpiar el formulario
    }).catch((error) => {
        console.error('Error al guardar:', error);
        alert('Hubo un error al registrar. Intenta de nuevo.');
    });
});