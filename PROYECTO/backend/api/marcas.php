<?php
// backend/api/marcas.php (CORREGIDO)
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once('../config.php');

$method = $_SERVER['REQUEST_METHOD'];

try {
    switch($method) {
        case 'GET':
            // Listar todas las marcas
            $stmt = $pdo->query("
                SELECT 
                    id_marca,
                    nom_marca,
                    estado_marca,
                    usr_insert,
                    fec_insert
                FROM tab_Marcas 
                ORDER BY nom_marca ASC
            ");
            $marcas = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(['ok' => true, 'marcas' => $marcas]);
            break;

        case 'POST':
            // Insertar nueva marca
            $data = json_decode(file_get_contents("php://input"), true);
            
            if (empty($data['id_marca']) || empty($data['nom_marca'])) {
                http_response_code(400);
                echo json_encode(['ok' => false, 'msg' => 'ID y nombre son requeridos']);
                exit;
            }
            
            // ✅ CORRECCIÓN: Llamar correctamente a la función con parámetros nombrados
            $stmt = $pdo->prepare("SELECT fun_insert_marcas(:id, :nombre)");
            $stmt->execute([
                ':id' => intval($data['id_marca']),
                ':nombre' => trim($data['nom_marca'])
            ]);
            
            $response = $stmt->fetchColumn();
            
            if (strpos($response, 'SUCCESS') !== false) {
                http_response_code(201);
                echo json_encode(['ok' => true, 'msg' => 'Marca creada correctamente']);
            } else {
                http_response_code(400);
                echo json_encode(['ok' => false, 'msg' => $response]);
            }
            break;

        case 'PUT':
            // Actualizar marca
            $data = json_decode(file_get_contents("php://input"), true);
            
            if (empty($data['id_marca']) || empty($data['nom_marca'])) {
                http_response_code(400);
                echo json_encode(['ok' => false, 'msg' => 'ID y nombre son requeridos']);
                exit;
            }
            
            // ✅ Convertir estado_marca correctamente
            $estado = isset($data['estado_marca']) ? 
                      (($data['estado_marca'] === true || $data['estado_marca'] === 1 || $data['estado_marca'] === '1') ? 'true' : 'false') 
                      : 'true';
            
            $stmt = $pdo->prepare("SELECT fun_update_marcas(:id, :nombre, :estado::boolean)");
            $stmt->execute([
                ':id' => intval($data['id_marca']),
                ':nombre' => trim($data['nom_marca']),
                ':estado' => $estado
            ]);
            
            $response = $stmt->fetchColumn();
            
            if (strpos($response, 'SUCCESS') !== false) {
                echo json_encode(['ok' => true, 'msg' => 'Marca actualizada correctamente']);
            } else {
                http_response_code(400);
                echo json_encode(['ok' => false, 'msg' => $response]);
            }
            break;

        case 'DELETE':
            // Eliminar marca (soft delete)
            $data = json_decode(file_get_contents("php://input"), true);
            
            if (empty($data['id_marca'])) {
                http_response_code(400);
                echo json_encode(['ok' => false, 'msg' => 'ID de marca requerido']);
                exit;
            }
            
            $stmt = $pdo->prepare("SELECT fun_delete_marcas(:id)");
            $stmt->execute([':id' => intval($data['id_marca'])]);
            
            $response = $stmt->fetchColumn();
            
            if (strpos($response, 'SUCCESS') !== false) {
                echo json_encode(['ok' => true, 'msg' => 'Marca desactivada correctamente']);
            } else {
                http_response_code(400);
                echo json_encode(['ok' => false, 'msg' => $response]);
            }
            break;

        default:
            http_response_code(405);
            echo json_encode(['ok' => false, 'msg' => 'Método no permitido']);
            break;
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'ok' => false, 
        'msg' => 'Error de BD: ' . $e->getMessage(),
        'code' => $e->getCode()
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'msg' => 'Error: ' . $e->getMessage()]);
}
?>