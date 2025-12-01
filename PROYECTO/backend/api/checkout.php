<?php
// backend/api/checkout.php
ob_start();
include_once('../config.php');
session_start();
ob_clean(); // Limpieza de buffer

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 1. Verificar Sesión
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['ok' => false, 'msg' => 'Sesión expirada']);
    exit;
}

try {
    // 2. Obtener datos del frontend
    $data = json_decode(file_get_contents("php://input"), true);
    
    $direccion = trim($data['direccion'] ?? '');
    $ciudad    = trim($data['ciudad'] ?? '');
    $metodo    = trim($data['metodo'] ?? 'Tarjeta');
    
    if (empty($direccion) || empty($ciudad)) {
        echo json_encode(['ok' => false, 'msg' => 'Dirección y ciudad son requeridas']);
        exit;
    }

    $direccion_completa = "$direccion, $ciudad";

    // 3. Llamar a la función SQL de checkout
    $stmt = $pdo->prepare("SELECT fun_checkout(:uid, :metodo, :dir)");
    $stmt->execute([
        ':uid'    => $_SESSION['user_id'],
        ':metodo' => $metodo,
        ':dir'    => $direccion_completa
    ]);
    
    $resultado = $stmt->fetchColumn();

    if (strpos($resultado, 'SUCCESS') !== false) {
        echo json_encode([
            'ok' => true, 
            'msg' => 'Pago aprobado y orden creada',
            'order_id' => filter_var($resultado, FILTER_SANITIZE_NUMBER_INT)
        ]);
    } else {
        echo json_encode(['ok' => false, 'msg' => $resultado]);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'msg' => 'Error servidor: ' . $e->getMessage()]);
}
ob_end_flush();
?>