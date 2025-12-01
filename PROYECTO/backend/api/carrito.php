<?php
// backend/api/carrito.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include_once('../config.php');
session_start();

$method = $_SERVER['REQUEST_METHOD'];

try {
    switch($method) {
        case 'GET':
            // Obtener carrito actual del usuario
            if (!isset($_SESSION['user_id'])) {
                echo json_encode(['ok' => true, 'items' => []]);
                exit;
            }
            
            $stmt = $pdo->prepare("
                SELECT 
                    cd.id_producto,
                    cd.cantidad,
                    p.nom_producto,
                    p.precio,
                    p.stock,
                    p.url_imagen,
                    m.nom_marca
                FROM tab_Carrito c
                INNER JOIN tab_Carrito_Detalle cd ON c.id_carrito = cd.id_carrito
                INNER JOIN tab_Productos p ON cd.id_producto = p.id_producto
                LEFT JOIN tab_Marcas m ON p.id_marca = m.id_marca
                WHERE c.id_usuario = :user_id 
                AND c.estado_carrito = 'activo'
            ");
            $stmt->execute([':user_id' => $_SESSION['user_id']]);
            $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            echo json_encode(['ok' => true, 'items' => $items]);
            break;

        case 'POST':
            // Agregar producto al carrito
            if (!isset($_SESSION['user_id'])) {
                http_response_code(401);
                echo json_encode(['ok' => false, 'msg' => 'Debes iniciar sesión']);
                exit;
            }
            
            $data = json_decode(file_get_contents("php://input"), true);
            $id_producto = intval($data['id_producto'] ?? 0);
            $cantidad = intval($data['cantidad'] ?? 1);
            
            if ($id_producto <= 0 || $cantidad <= 0) {
                http_response_code(400);
                echo json_encode(['ok' => false, 'msg' => 'Datos inválidos']);
                exit;
            }
            
            // Llamar a la función PL/pgSQL fun_agregar_carrito
            $stmt = $pdo->prepare("SELECT fun_agregar_carrito(:user_id, :prod_id, :qty)");
            $stmt->execute([
                ':user_id' => $_SESSION['user_id'],
                ':prod_id' => $id_producto,
                ':qty' => $cantidad
            ]);
            $result = $stmt->fetchColumn();
            
            if (strpos($result, 'SUCCESS') !== false) {
                echo json_encode(['ok' => true, 'msg' => 'Producto agregado al carrito']);
            } else {
                http_response_code(400);
                echo json_encode(['ok' => false, 'msg' => $result]);
            }
            break;

        case 'PUT':
            // Actualizar cantidad de un producto en el carrito
            if (!isset($_SESSION['user_id'])) {
                http_response_code(401);
                echo json_encode(['ok' => false, 'msg' => 'Debes iniciar sesión']);
                exit;
            }
            
            $data = json_decode(file_get_contents("php://input"), true);
            $id_producto = intval($data['id_producto'] ?? 0);
            $cantidad = intval($data['cantidad'] ?? 0);
            
            if ($cantidad < 1) {
                http_response_code(400);
                echo json_encode(['ok' => false, 'msg' => 'Cantidad debe ser mayor a 0']);
                exit;
            }
            
            // Actualizar cantidad
            $stmt = $pdo->prepare("
                UPDATE tab_Carrito_Detalle cd
                SET cantidad = :qty
                FROM tab_Carrito c
                WHERE cd.id_carrito = c.id_carrito
                AND c.id_usuario = :user_id
                AND cd.id_producto = :prod_id
                AND c.estado_carrito = 'activo'
            ");
            $stmt->execute([
                ':user_id' => $_SESSION['user_id'],
                ':prod_id' => $id_producto,
                ':qty' => $cantidad
            ]);
            
            echo json_encode(['ok' => true, 'msg' => 'Cantidad actualizada']);
            break;

        case 'DELETE':
            // Eliminar producto del carrito
            if (!isset($_SESSION['user_id'])) {
                http_response_code(401);
                echo json_encode(['ok' => false, 'msg' => 'Debes iniciar sesión']);
                exit;
            }
            
            $data = json_decode(file_get_contents("php://input"), true);
            $id_producto = intval($data['id_producto'] ?? 0);
            
            $stmt = $pdo->prepare("
                DELETE FROM tab_Carrito_Detalle cd
                USING tab_Carrito c
                WHERE cd.id_carrito = c.id_carrito
                AND c.id_usuario = :user_id
                AND cd.id_producto = :prod_id
                AND c.estado_carrito = 'activo'
            ");
            $stmt->execute([
                ':user_id' => $_SESSION['user_id'],
                ':prod_id' => $id_producto
            ]);
            
            echo json_encode(['ok' => true, 'msg' => 'Producto eliminado del carrito']);
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
        'msg' => 'Error de base de datos',
        'error' => $e->getMessage()
    ]);
}
?>