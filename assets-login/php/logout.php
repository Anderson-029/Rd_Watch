<?php


// Iniciamos la sesión (por si aún no está activa)
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Eliminamos todas las variables de sesión
$_SESSION = [];

// Destruimos la sesión actual (borra el archivo de sesión del servidor)
session_destroy();

// Redirigimos al usuario al login (index.php)
// Recordemos que estamos en /php/, así que subimos un nivel con ../
header("Location: ../views/index.html");
exit;
?>
