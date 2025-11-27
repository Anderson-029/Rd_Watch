<?php
// ========================================
// ARCHIVO: backend/api/productos.php (REEMPLAZAR COMPLETO)
// ========================================
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost'); // ✅ Cambiado de * a localhost específico
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true'); // ✅ CRÍTICO: Permitir cookies/sesiones

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include_once('../config.php');
session_start(); // ✅ CRÍTICO: Iniciar sesión

$method = $_SERVER['REQUEST_METHOD'];

// ✅ Log para debug
error_log("📥 Productos - Método: $method, Usuario: " . ($_SESSION['user_id'] ?? 'NO SESSION'));
error_log("📥 Sesión completa: " . json_encode($_SESSION));

try {
    switch($method) {
        case 'GET':
            // ✅ GET es público - cualquiera puede ver productos
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
        case 'PUT':
        case 'DELETE':
            // ✅ Verificar autenticación para operaciones de escritura
            if (!isset($_SESSION['user_id'])) {
                error_log("❌ No hay sesión de usuario");
                http_response_code(401);
                echo json_encode([
                    'ok' => false, 
                    'msg' => 'No has iniciado sesión. Por favor inicia sesión primero.',
                    'debug' => 'SESSION_USER_ID no existe'
                ]);
                exit;
            }

            // ✅ Verificar que sea admin (si tienes el campo rol)
            if (isset($_SESSION['user_rol']) && $_SESSION['user_rol'] !== 'admin') {
                error_log("❌ Usuario no es admin: " . $_SESSION['user_rol']);
                http_response_code(403);
                echo json_encode([
                    'ok' => false, 
                    'msg' => 'No tienes permisos de administrador',
                    'debug' => 'Rol actual: ' . $_SESSION['user_rol']
                ]);
                exit;
            }

            // Si llegamos aquí, el usuario está autenticado
            error_log("✅ Usuario autenticado: " . $_SESSION['user_id']);

            if ($method === 'POST') {
                // Insertar nuevo producto
                $data = json_decode(file_get_contents("php://input"), true);
                
                error_log("📝 Datos recibidos: " . json_encode($data));

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
                    echo json_encode(['ok' => true, 'msg' => 'Producto creado correctamente']);
                } else {
                    echo json_encode(['ok' => false, 'msg' => $response]);
                }
                
            } elseif ($method === 'PUT') {
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
                    echo json_encode(['ok' => true, 'msg' => 'Producto actualizado correctamente']);
                } else {
                    echo json_encode(['ok' => false, 'msg' => $response]);
                }
                
            } elseif ($method === 'DELETE') {
                // Eliminar producto
                $data = json_decode(file_get_contents("php://input"), true);
                
                $stmt = $pdo->prepare("SELECT fun_delete_productos(:id)");
                $stmt->execute([':id' => $data['id_producto']]);
                
                $response = $stmt->fetchColumn();
                
                if (strpos($response, 'SUCCESS') !== false) {
                    echo json_encode(['ok' => true, 'msg' => 'Producto eliminado correctamente']);
                } else {
                    echo json_encode(['ok' => false, 'msg' => $response]);
                }
            }
            break;

        default:
            http_response_code(405);
            echo json_encode(['ok' => false, 'msg' => 'Método no permitido']);
            break;
    }
} catch (Exception $e) {
    error_log("❌ Error en productos.php: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'ok' => false, 
        'msg' => 'Error del servidor: ' . $e->getMessage()
    ]);
}
?>