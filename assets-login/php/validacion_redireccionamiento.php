<?php
// Incluimos la conexión a la base de datos
require_once 'config.php';

// Capturamos los datos enviados desde el formulario de login
$correo = $_POST['correo'] ?? '';
$password = $_POST['password'] ?? '';

try {
    // Preparamos la consulta para buscar al usuario por su correo
    $stmt = $pdo->prepare("
        SELECT id_usuario, nom_usuario, correo_usuario, password_usuario, rol_usuario 
        FROM tab_Usuarios 
        WHERE correo_usuario = :correo 
        LIMIT 1
    ");
    $stmt->execute(['correo' => $correo]);

    // Obtenemos los datos del usuario (si existe)
    $usuario = $stmt->fetch();

    // Verificamos que exista y que la contraseña sea correcta
    if ($usuario && password_verify($password, $usuario['password_usuario'])) {

        // Redirigimos según el rol del usuario
        if ($usuario['rol_usuario'] === 'admin') {
            header("Location: ../views/admin.php");
            exit;

        } elseif ($usuario['rol_usuario'] === 'user') {
            header("Location: ../views/user.php");
            exit;

        } else {
            echo "Rol desconocido.";
        }

    } else {
        // Si no coincide el correo o la contraseña
        echo "Credenciales incorrectas.";
    }

} catch (PDOException $e) {
    // Si ocurre algún error con la base de datos
    echo "Error al validar usuario.";
}
?>
