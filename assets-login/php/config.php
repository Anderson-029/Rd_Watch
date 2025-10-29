<?php
// ------------------------------------------------------
// CONFIGURACIÓN DE CONEXIÓN - RD_WATCH
// ------------------------------------------------------
// Este archivo se encarga únicamente de establecer la
// conexión con la base de datos PostgreSQL mediante PDO.
// ------------------------------------------------------

$host = "localhost";   // Servidor donde corre PostgreSQL
$port = "5432";        // Puerto por defecto
$dbname = "rdwatch";   // Nombre de tu base de datos
$user = "postgres";    // Usuario de PostgreSQL
$pass = "ander123";    // Contraseña del usuario

try {
    // Crear la conexión PDO a PostgreSQL
    $pdo = new PDO(
        "pgsql:host=$host;port=$port;dbname=$dbname",$user,$pass
    );

    // Opcional: establece modo de errores y formato de resultados
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    // Si hay error, detiene el script y muestra el mensaje
    die("❌ Error al conectar a la base de datos: " . $e->getMessage());
}
?>
