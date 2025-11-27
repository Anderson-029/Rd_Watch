<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost');
header('Access-Control-Allow-Credentials: true');
session_start();

if (isset($_SESSION['user_id'])) {
    echo json_encode([
        'ok' => true,
        'user' => [
            'id' => $_SESSION['user_id'],
            'nombre' => $_SESSION['user_name'],
            'correo' => $_SESSION['user_mail'],
            'rol' => $_SESSION['user_rol'] ?? 'cliente'
        ]
    ]);
} else {
    http_response_code(401);
    echo json_encode([
        'ok' => false,
        'msg' => 'No autenticado'
    ]);
}
?>