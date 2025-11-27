<?php
// backend/api/login.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include_once('../config.php');
session_start();

$data = json_decode(file_get_contents("php://input"), true);
$email = trim($data['email'] ?? '');
$password = (string)($data['password'] ?? '');

if ($email === '' || $password === '') {
    echo json_encode(['ok' => false, 'msg' => 'Email y contraseña requeridos']);
    exit;
}

try {
    // Llamar a la función de login
    $stmt = $pdo->prepare("SELECT * FROM fun_login_usuario(:email, :pwd)");
    $stmt->execute([':email' => $email, ':pwd' => $password]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$row || $row['status'] !== 'SUCCESS') {
        echo json_encode([
            'ok' => false,
            'msg' => $row['message'] ?? 'Credenciales inválidas'
        ]);
        exit;
    }

    // Obtener el rol del usuario
    $stmtRol = $pdo->prepare("SELECT rol FROM tab_Usuarios WHERE id_usuario = :id");
    $stmtRol->execute([':id' => $row['ret_id_usuario']]);  // ⬅️ CAMBIO: ret_id_usuario
    $rolData = $stmtRol->fetch(PDO::FETCH_ASSOC);
    $rol = $rolData['rol'] ?? 'cliente';

    // Guardar datos en la sesión
    $_SESSION['user_id']   = (int)$row['ret_id_usuario'];      // ⬅️ CAMBIO
    $_SESSION['user_name'] = $row['ret_nombre'];               // ⬅️ CAMBIO
    $_SESSION['user_mail'] = $row['ret_email'];                // ⬅️ CAMBIO
    $_SESSION['user_rol']  = $rol;

    // Log para debug
    error_log("✅ Login exitoso - Usuario: " . $_SESSION['user_id'] . ", Rol: " . $rol);

    echo json_encode([
        'ok' => true,
        'user' => [
            'id' => $row['ret_id_usuario'],          // ⬅️ CAMBIO
            'nombre' => $row['ret_nombre'],          // ⬅️ CAMBIO
            'correo' => $row['ret_email'],           // ⬅️ CAMBIO
            'telefono' => $row['ret_telefono'],      // ⬅️ CAMBIO
            'direccion' => $row['ret_direccion'],    // ⬅️ CAMBIO
            'rol' => $rol
        ],
        'redirect' => $rol === 'admin' ? '/admin/admin.html' : '/frontend/public/user.html'
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