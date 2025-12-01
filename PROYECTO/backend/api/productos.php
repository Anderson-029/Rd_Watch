<?php
// backend/api/productos.php
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
            // Listar productos (público)
            $stmt = $pdo->query("
                SELECT p.*, m.nom_marca, c.nom_categoria, s.nom_subcategoria
                FROM tab_Productos p
                LEFT JOIN tab_Marcas m ON p.id_marca = m.id_marca
                LEFT JOIN tab_Categorias c ON p.id_categoria = c.id_categoria
                LEFT JOIN tab_Subcategorias s ON p.id_categoria = s.id_categoria AND p.id_subcategoria = s.id_subcategoria
                WHERE p.estado = TRUE
                ORDER BY p.id_producto DESC
            ");
            echo json_encode(['ok' => true, 'productos' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
            break;

        case 'POST':
            // Verificación de sesión
            if (!isset($_SESSION['user_id'])) {
                http_response_code(401);
                echo json_encode(['ok' => false, 'msg' => 'Debes iniciar sesión']);
                exit;
            }

            $data = json_decode(file_get_contents("php://input"), true);

            // Generar ID si no viene
            if (empty($data['id_producto'])) {
                $data['id_producto'] = $pdo->query("SELECT COALESCE(MAX(id_producto),0)+1 FROM tab_Productos")->fetchColumn();
            }

            // CORRECCIÓN PRINCIPAL: Forzar tipos de datos (intval/floatval)
            // Esto evita que PostgreSQL rechace el ID "5" si viene como texto
            $stmt = $pdo->prepare("SELECT fun_insert_productos(:id, :marca, :nombre, :desc, :precio, :cat, :subcat, :stock, :img)");
            $stmt->execute([
                ':id'     => intval($data['id_producto']),
                ':marca'  => intval($data['id_marca']),      // <--- AQUÍ ESTABA EL RIESGO
                ':nombre' => trim($data['nom_producto']),
                ':desc'   => trim($data['descripcion']),
                ':precio' => floatval($data['precio']),
                ':cat'    => intval($data['id_categoria']),
                ':subcat' => intval($data['id_subcategoria']),
                ':stock'  => intval($data['stock']),
                ':img'    => $data['url_imagen'] ?? null
            ]);
            
            $response = $stmt->fetchColumn();
            
            if (strpos($response, 'SUCCESS') !== false) {
                echo json_encode(['ok' => true, 'msg' => 'Producto creado correctamente']);
            } else {
                // Devolvemos 200 pero con ok:false para que el frontend muestre la alerta bonita
                echo json_encode(['ok' => false, 'msg' => $response]);
            }
            break;

        case 'PUT':
            // Actualizar
            if (!isset($_SESSION['user_id'])) { http_response_code(401); exit; }
            $data = json_decode(file_get_contents("php://input"), true);
            
            $stmt = $pdo->prepare("SELECT fun_update_productos(:id, :marca, :nombre, :desc, :precio, :cat, :subcat, :stock, :img, :estado)");
            $stmt->execute([
                ':id'     => intval($data['id_producto']),
                ':marca'  => intval($data['id_marca']), // <--- Forzar entero
                ':nombre' => trim($data['nom_producto']),
                ':desc'   => trim($data['descripcion']),
                ':precio' => floatval($data['precio']),
                ':cat'    => intval($data['id_categoria']),
                ':subcat' => intval($data['id_subcategoria']),
                ':stock'  => intval($data['stock']),
                ':img'    => $data['url_imagen'] ?? null,
                ':estado' => isset($data['estado']) ? ($data['estado'] === true || $data['estado'] === 'true') : true
            ]);
            
            $response = $stmt->fetchColumn();
            echo json_encode(['ok' => strpos($response, 'SUCCESS') !== false, 'msg' => $response]);
            break;

        case 'DELETE':
            // Eliminar
            if (!isset($_SESSION['user_id'])) { http_response_code(401); exit; }
            $data = json_decode(file_get_contents("php://input"), true);
            $stmt = $pdo->prepare("SELECT fun_delete_productos(:id)");
            $stmt->execute([':id' => intval($data['id_producto'])]);
            $response = $stmt->fetchColumn();
            echo json_encode(['ok' => strpos($response, 'SUCCESS') !== false, 'msg' => $response]);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'msg' => 'Error: ' . $e->getMessage()]);
}
?>