<?php
// backend/api/clientes.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include_once('../config.php');
session_start();

// Verificar que quien pide los datos sea ADMIN
if (!isset($_SESSION['user_id']) || ($_SESSION['user_rol'] ?? '') !== 'admin') {
    http_response_code(403);
    echo json_encode(['ok' => false, 'msg' => 'Acceso denegado']);
    exit;
}

try {
    // Seleccionamos todos los usuarios que NO sean admin (o que tengan rol cliente/null)
    $sql = "SELECT 
                id_usuario, 
                nom_usuario, 
                correo_usuario, 
                num_telefono_usuario, 
                direccion_principal,
                activo,
                to_char(fecha_registro, 'DD/MM/YYYY') as fecha_registro
            FROM tab_Usuarios 
            WHERE rol IS DISTINCT FROM 'admin' 
            ORDER BY id_usuario DESC";

    $stmt = $pdo->query($sql);
    $clientes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'ok' => true,
        'clientes' => $clientes,
        'total' => count($clientes)
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'ok' => false, 
        'msg' => 'Error al obtener clientes',
        'error' => $e->getMessage()
    ]);
}
?>