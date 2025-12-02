<?php
// backend/api/citas.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

include_once('../config.php');
session_start();

try {
    // 1. Verificar si el usuario está logueado
    // Nota: El formulario pide nombre/email, pero la BD exige un ID de usuario registrado.
    if (!isset($_SESSION['user_id'])) {
        http_response_code(401);
        echo json_encode(['ok' => false, 'msg' => 'Debes iniciar sesión para agendar un servicio.']);
        exit;
    }

    $id_usuario = $_SESSION['user_id'];
    $data = json_decode(file_get_contents("php://input"), true);

    // 2. Validaciones básicas
    if (empty($data['id_servicio'])) {
        throw new Exception("Por favor selecciona un servicio.");
    }
    
    $id_servicio = intval($data['id_servicio']);
    $notas = isset($data['mensaje']) ? trim($data['mensaje']) : '';
    // Usamos la fecha de hoy por defecto si no viene en el formulario, 
    // o puedes agregar un campo de fecha al HTML.
    $fecha = date('Y-m-d'); 

    // 3. Llamar a la función SQL
    $stmt = $pdo->prepare("SELECT fun_registrar_peticion_servicio(:uid, :sid, :fecha, :notas, 'normal')");
    $stmt->execute([
        ':uid' => $id_usuario,
        ':sid' => $id_servicio,
        ':fecha' => $fecha,
        ':notas' => $notas
    ]);

    $id_reserva = $stmt->fetchColumn();

    if ($id_reserva > 0) {
        echo json_encode(['ok' => true, 'msg' => 'Solicitud enviada correctamente. ID: ' . $id_reserva]);
    } else {
        throw new Exception("Error al registrar la solicitud en base de datos.");
    }

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'msg' => $e->getMessage()]);
}
?>