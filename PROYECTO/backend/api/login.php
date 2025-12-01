<?php
// backend/api/login.php

// 1. Configuración de cabeceras (CORS y Tipo de Contenido)
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Manejo de solicitud OPTIONS (pre-flight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 2. Incluir configuración de base de datos e iniciar sesión
include_once('../config.php');
session_start();

// 3. Obtener datos del cuerpo de la solicitud (JSON)
$data = json_decode(file_get_contents("php://input"), true);
$email = trim($data['email'] ?? '');
$password = (string)($data['password'] ?? '');

// Validación básica
if ($email === '' || $password === '') {
    echo json_encode(['ok' => false, 'msg' => 'Email y contraseña requeridos']);
    exit;
}

try {
    // 4. Llamar a la función de base de datos para verificar credenciales
    // Asegúrate de que tu SP 'fun_login_usuario' exista y funcione correctamente
    $stmt = $pdo->prepare("SELECT * FROM fun_login_usuario(:email, :pwd)");
    $stmt->execute([':email' => $email, ':pwd' => $password]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    // Verificar si el login fue exitoso según la respuesta de la BD
    if (!$row || $row['status'] !== 'SUCCESS') {
        echo json_encode([
            'ok' => false,
            'msg' => $row['message'] ?? 'Credenciales inválidas'
        ]);
        exit;
    }

    // 5. Obtener el rol del usuario (Consulta adicional para seguridad)
    $stmtRol = $pdo->prepare("SELECT rol FROM tab_Usuarios WHERE id_usuario = :id");
    $stmtRol->execute([':id' => $row['ret_id_usuario']]); 
    $rolData = $stmtRol->fetch(PDO::FETCH_ASSOC);
    $rol = $rolData['rol'] ?? 'cliente';

    // 6. Guardar datos críticos en la SESIÓN de PHP (lado servidor)
    $_SESSION['user_id']   = (int)$row['ret_id_usuario'];
    $_SESSION['user_name'] = $row['ret_nombre'];
    $_SESSION['user_mail'] = $row['ret_email'];
    $_SESSION['user_rol']  = $rol;

    // Log para depuración (aparece en error.log de Apache/PHP)
    error_log("✅ Login exitoso - Usuario ID: " . $_SESSION['user_id'] . ", Rol: " . $rol);

    // 7. Enviar respuesta al Frontend con las RUTAS EXACTAS
    echo json_encode([
        'ok' => true,
        'user' => [
            'id' => $row['ret_id_usuario'],
            'nombre' => $row['ret_nombre'],
            'correo' => $row['ret_email'],
            'telefono' => $row['ret_telefono'],
            'direccion' => $row['ret_direccion'],
            'rol' => $rol
        ],
        // AQUÍ ESTÁ LA CORRECCIÓN: Usamos RD_WATCH en mayúsculas
        'redirect' => $rol === 'admin' 
            ? '/RD_WATCH/admin/admin.html' 
            : '/RD_WATCH/frontend/public/user.html'
    ]);

} catch (Throwable $e) {
    error_log("❌ Error en login: " . $e->getMessage());
    echo json_encode([
        'ok' => false,
        'msg' => 'Error del servidor',
        'error' => $e->getMessage()
    ]);
}
?>