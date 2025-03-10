// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCP_HZbNj3f-cHSc3PmWsaWEMR0DqZne5g",
    authDomain: "i-work-9be2b.firebaseapp.com",
    databaseURL: "https://i-work-9be2b-default-rtdb.firebaseio.com",
    projectId: "i-work-9be2b",
    storageBucket: "i-work-9be2b.firebasestorage.app",
    messagingSenderId: "629481214864",
    appId: "1:629481214864:web:134b4a06eb849354435915",
    measurementId: "G-FJC1ZRK5BJ"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Exporta la base de datos para usarla en otros archivos
export { database, ref, push, onValue };