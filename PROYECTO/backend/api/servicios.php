<?php
// backend/api/servicios.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Manejar preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once('../config.php');

$method = $_SERVER['REQUEST_METHOD'];

try {
    switch($method) {
        case 'GET':
            // Listar todos los servicios
            $stmt = $pdo->query("
                SELECT 
                    id_servicio,
                    nom_servicio,
                    descripcion,
                    precio_servicio,
                    duracion_estimada,
                    usr_insert,
                    fec_insert,
                    usr_update,
                    fec_update
                FROM tab_Servicios 
                ORDER BY id_servicio DESC
            ");
            $servicios = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode([
                'ok' => true, 
                'servicios' => $servicios,
                'total' => count($servicios)
            ]);
            break;

        case 'POST':
            // Insertar nuevo servicio
            $data = json_decode(file_get_contents("php://input"), true);
            
            // Validaciones de campos requeridos
            if (empty($data['id_servicio'])) {
                http_response_code(400);
                echo json_encode(['ok' => false, 'msg' => 'ID de servicio es requerido']);
                exit;
            }
            
            if (empty($data['nom_servicio'])) {
                http_response_code(400);
                echo json_encode(['ok' => false, 'msg' => 'Nombre del servicio es requerido']);
                exit;
            }
            
            if (empty($data['descripcion'])) {
                http_response_code(400);
                echo json_encode(['ok' => false, 'msg' => 'Descripción es requerida']);
                exit;
            }
            
            if (!isset($data['precio_servicio']) || $data['precio_servicio'] <= 0) {
                http_response_code(400);
                echo json_encode(['ok' => false, 'msg' => 'Precio del servicio debe ser mayor a 0']);
                exit;
            }
            
            if (empty($data['duracion_estimada']) || $data['duracion_estimada'] <= 0) {
                http_response_code(400);
                echo json_encode(['ok' => false, 'msg' => 'Duración estimada debe ser mayor a 0']);
                exit;
            }
            
            // Llamar a la función de PostgreSQL para insertar
            $stmt = $pdo->prepare("SELECT fun_insert_servicios(:id, :nombre, :desc, :precio, :duracion)");
            $stmt->execute([
                ':id' => intval($data['id_servicio']),
                ':nombre' => trim($data['nom_servicio']),
                ':desc' => trim($data['descripcion']),
                ':precio' => floatval($data['precio_servicio']),
                ':duracion' => intval($data['duracion_estimada'])
            ]);
            
            $response = $stmt->fetchColumn();
            
            if (strpos($response, 'SUCCESS') !== false) {
                http_response_code(201);
                echo json_encode([
                    'ok' => true, 
                    'msg' => 'Servicio creado correctamente',
                    'details' => $response
                ]);
            } else {
                http_response_code(400);
                echo json_encode([
                    'ok' => false, 
                    'msg' => $response
                ]);
            }
            break;

        case 'PUT':
            // Actualizar servicio existente
            $data = json_decode(file_get_contents("php://input"), true);
            
            // Validaciones de campos requeridos
            if (empty($data['id_servicio'])) {
                http_response_code(400);
                echo json_encode(['ok' => false, 'msg' => 'ID de servicio es requerido']);
                exit;
            }
            
            if (empty($data['nom_servicio'])) {
                http_response_code(400);
                echo json_encode(['ok' => false, 'msg' => 'Nombre del servicio es requerido']);
                exit;
            }
            
            if (empty($data['descripcion'])) {
                http_response_code(400);
                echo json_encode(['ok' => false, 'msg' => 'Descripción es requerida']);
                exit;
            }
            
            if (!isset($data['precio_servicio']) || $data['precio_servicio'] <= 0) {
                http_response_code(400);
                echo json_encode(['ok' => false, 'msg' => 'Precio del servicio debe ser mayor a 0']);
                exit;
            }
            
            if (empty($data['duracion_estimada']) || $data['duracion_estimada'] <= 0) {
                http_response_code(400);
                echo json_encode(['ok' => false, 'msg' => 'Duración estimada debe ser mayor a 0']);
                exit;
            }
            
            // Llamar a la función de PostgreSQL para actualizar
            $stmt = $pdo->prepare("SELECT fun_update_servicios(:id, :nombre, :desc, :precio, :duracion)");
            $stmt->execute([
                ':id' => intval($data['id_servicio']),
                ':nombre' => trim($data['nom_servicio']),
                ':desc' => trim($data['descripcion']),
                ':precio' => floatval($data['precio_servicio']),
                ':duracion' => intval($data['duracion_estimada'])
            ]);
            
            $response = $stmt->fetchColumn();
            
            if (strpos($response, 'SUCCESS') !== false) {
                echo json_encode([
                    'ok' => true, 
                    'msg' => 'Servicio actualizado correctamente',
                    'details' => $response
                ]);
            } else {
                http_response_code(400);
                echo json_encode([
                    'ok' => false, 
                    'msg' => $response
                ]);
            }
            break;

        case 'DELETE':
            // Eliminar servicio
            $data = json_decode(file_get_contents("php://input"), true);
            
            if (empty($data['id_servicio'])) {
                http_response_code(400);
                echo json_encode(['ok' => false, 'msg' => 'ID de servicio es requerido']);
                exit;
            }
            
            // Llamar a la función de PostgreSQL para eliminar
            $stmt = $pdo->prepare("SELECT fun_delete_servicios(:id)");
            $stmt->execute([':id' => intval($data['id_servicio'])]);
            
            $response = $stmt->fetchColumn();
            
            if (strpos($response, 'SUCCESS') !== false) {
                echo json_encode([
                    'ok' => true, 
                    'msg' => 'Servicio eliminado correctamente',
                    'details' => $response
                ]);
            } else {
                http_response_code(400);
                echo json_encode([
                    'ok' => false, 
                    'msg' => $response
                ]);
            }
            break;

        default:
            http_response_code(405);
            echo json_encode([
                'ok' => false, 
                'msg' => 'Método HTTP no permitido',
                'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE']
            ]);
            break;
    }
    
} catch (PDOException $e) {
    // Error de base de datos
    http_response_code(500);
    echo json_encode([
        'ok' => false, 
        'msg' => 'Error de base de datos',
        'error' => $e->getMessage(),
        'code' => $e->getCode()
    ]);
    
} catch (Exception $e) {
    // Error general
    http_response_code(500);
    echo json_encode([
        'ok' => false, 
        'msg' => 'Error del servidor',
        'error' => $e->getMessage()
    ]);
}
?>