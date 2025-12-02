<?php
// backend/api/resenas.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

include_once('../config.php');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // === OBTENER TESTIMONIOS GENERALES (Donde id_producto es NULL) ===
    try {
        $sql = "SELECT r.id_opinion, r.calificacion, r.comentario, u.nom_usuario 
                FROM tab_Opiniones r
                JOIN tab_Usuarios u ON r.id_usuario = u.id_usuario
                WHERE r.estado = 'aprobado' 
                AND r.id_producto IS NULL  -- ESTA ES LA CLAVE: Solo traer los que no tienen producto
                ORDER BY r.id_opinion DESC LIMIT 6";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $resenas = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(['ok' => true, 'resenas' => $resenas]);
    } catch (PDOException $e) {
        echo json_encode(['ok' => false, 'msg' => $e->getMessage()]);
    }

} elseif ($method === 'POST') {
    // === GUARDAR TESTIMONIO ===
    $data = json_decode(file_get_contents("php://input"), true);

    if (empty($data['id_usuario']) || empty($data['calificacion']) || empty($data['comentario'])) {
        echo json_encode(['ok' => false, 'msg' => 'Datos incompletos']);
        exit;
    }

    try {
        // Generar ID manual (ya que no usas SERIAL)
        $stmtId = $pdo->query("SELECT COALESCE(MAX(id_opinion), 0) + 1 FROM tab_Opiniones");
        $newId = $stmtId->fetchColumn();

        // Insertar con id_producto como NULL
        $sql = "INSERT INTO tab_Opiniones (id_opinion, id_usuario, id_producto, calificacion, comentario, estado, fec_insert) 
                VALUES (:id, :uid, NULL, :calif, :coment, 'aprobado', CURRENT_TIMESTAMP)";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':id' => $newId,
            ':uid' => $data['id_usuario'],
            ':calif' => $data['calificacion'],
            ':coment' => $data['comentario']
        ]);

        echo json_encode(['ok' => true, 'msg' => '¡Gracias por tu opinión!']);
    } catch (PDOException $e) {
        echo json_encode(['ok' => false, 'msg' => 'Error al guardar: ' . $e->getMessage()]);
    }
}
?>