<?php 
// backend/api/productos.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // si solo usas mismo dominio puedes quitar '*'
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

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
            // ✅ Listar todos los productos (puede ser público)
            $stmt = $pdo->query("
                SELECT p.*, 
                       m.nom_marca, 
                       c.nom_categoria, 
                       s.nom_subcategoria
                FROM tab_Productos p
                LEFT JOIN tab_Marcas m 
                    ON p.id_marca = m.id_marca
                LEFT JOIN tab_Categorias c 
                    ON p.id_categoria = c.id_categoria
                LEFT JOIN tab_Subcategorias s 
                    ON p.id_categoria = s.id_categoria 
                   AND p.id_subcategoria = s.id_subcategoria
                WHERE p.estado = TRUE
                ORDER BY p.id_producto DESC
            ");
            $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(['ok' => true, 'productos' => $productos]);
            break;

        case 'POST':
            // 🔒 Solo admin
            if (!isset($_SESSION['user_rol']) || $_SESSION['user_rol'] !== 'admin') {
                http_response_code(403);
                echo json_encode(['ok' => false, 'msg' => 'No autorizado']);
                exit;
            }

            // Insertar nuevo producto
            $data = json_decode(file_get_contents("php://input"), true);

            // Si tu fun_insert_productos requiere id explícito:
            if (empty($data['id_producto'])) {
                $data['id_producto'] = $pdo->query("SELECT COALESCE(MAX(id_producto),0)+1 FROM tab_Productos")->fetchColumn();
            }
            
            $stmt = $pdo->prepare("
                SELECT fun_insert_productos(
                    :id, :marca, :nombre, :desc, :precio, 
                    :cat, :subcat, :stock, :img
                )
            ");
            $stmt->execute([
                ':id'     => $data['id_producto'],
                ':marca'  => $data['id_marca'],
                ':nombre' => $data['nom_producto'],
                ':desc'   => $data['descripcion'],
                ':precio' => $data['precio'],
                ':cat'    => $data['id_categoria'],
                ':subcat' => $data['id_subcategoria'],
                ':stock'  => $data['stock'],
                ':img'    => $data['url_imagen'] ?? null
            ]);
            
            $response = $stmt->fetchColumn();
            
            if (strpos($response, 'SUCCESS') !== false) {
                echo json_encode(['ok' => true, 'msg' => $response]);
            } else {
                echo json_encode(['ok' => false, 'msg' => $response]);
            }
            break;

        case 'PUT':
            // 🔒 Solo admin
            if (!isset($_SESSION['user_rol']) || $_SESSION['user_rol'] !== 'admin') {
                http_response_code(403);
                echo json_encode(['ok' => false, 'msg' => 'No autorizado']);
                exit;
            }

            // Actualizar producto
            $data = json_decode(file_get_contents("php://input"), true);
            
            $stmt = $pdo->prepare("
                SELECT fun_update_productos(
                    :id, :marca, :nombre, :desc, :precio, 
                    :cat, :subcat, :stock, :img, :estado
                )
            ");
            $stmt->execute([
                ':id'     => $data['id_producto'],
                ':marca'  => $data['id_marca'],
                ':nombre' => $data['nom_producto'],
                ':desc'   => $data['descripcion'],
                ':precio' => $data['precio'],
                ':cat'    => $data['id_categoria'],
                ':subcat' => $data['id_subcategoria'],
                ':stock'  => $data['stock'],
                ':img'    => $data['url_imagen'] ?? null,
                ':estado' => $data['estado'] ?? true
            ]);
            
            $response = $stmt->fetchColumn();
            
            if (strpos($response, 'SUCCESS') !== false) {
                echo json_encode(['ok' => true, 'msg' => $response]);
            } else {
                echo json_encode(['ok' => false, 'msg' => $response]);
            }
            break;

        case 'DELETE':
            // 🔒 Solo admin
            if (!isset($_SESSION['user_rol']) || $_SESSION['user_rol'] !== 'admin') {
                http_response_code(403);
                echo json_encode(['ok' => false, 'msg' => 'No autorizado']);
                exit;
            }

            // Eliminar producto (soft delete)
            $data = json_decode(file_get_contents("php://input"), true);
            
            $stmt = $pdo->prepare("SELECT fun_delete_productos(:id)");
            $stmt->execute([':id' => $data['id_producto']]);
            
            $response = $stmt->fetchColumn();
            
            if (strpos($response, 'SUCCESS') !== false) {
                echo json_encode(['ok' => true, 'msg' => $response]);
            } else {
                echo json_encode(['ok' => false, 'msg' => $response]);
            }
            break;

        default:
            echo json_encode(['ok' => false, 'msg' => 'Método no permitido']);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'msg' => 'Error del servidor: ' . $e->getMessage()]);
}
