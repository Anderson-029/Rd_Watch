<?php
// backend/api/citas.php

// 1. Evitar que PHP imprima errores HTML visibles que rompen el JSON
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

include_once('../config.php');

$data = json_decode(file_get_contents("php://input"), true);

// Mapeo de datos recibidos del JS
$id_usuario  = $data['p_id_usuario'] ?? null;
$id_servicio = $data['p_id_servicio'] ?? null;
$fecha       = $data['p_fecha_pref'] ?? date('Y-m-d');
$notas       = $data['p_notas'] ?? '';
$prioridad   = $data['p_prioridad'] ?? 'normal';

if (!$id_usuario || !$id_servicio) {
    echo json_encode(['ok' => false, 'msg' => 'Faltan datos de usuario o servicio']);
    exit;
}

try {
    // LLAMADA A TU FUNCIÓN ALMACENADA (PL/pgSQL)
    // fun_registrar_peticion_servicio(id_usr, id_srv, fecha, notas, prioridad)
    
    $sql = "SELECT fun_registrar_peticion_servicio(:uid, :sid, :fecha, :notas, :prio)";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':uid'   => $id_usuario,
        ':sid'   => $id_servicio,
        ':fecha' => $fecha,
        ':notas' => $notas,
        ':prio'  => $prioridad
    ]);

    // Obtener el resultado (el ID de la reserva creada)
    $id_reserva = $stmt->fetchColumn();

    if ($id_reserva > 0) {
        echo json_encode([
            'ok' => true, 
            'msg' => 'Solicitud enviada exitosamente. Ticket #' . $id_reserva
        ]);
    } else {
        echo json_encode(['ok' => false, 'msg' => 'No se pudo registrar la solicitud.']);
    }

} catch (PDOException $e) {
    // Enviar el error como JSON limpio
    echo json_encode(['ok' => false, 'msg' => 'Error BD: ' . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(['ok' => false, 'msg' => 'Error Servidor: ' . $e->getMessage()]);
}
?>