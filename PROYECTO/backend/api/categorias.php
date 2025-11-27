<?php
// backend/api/categorias.php
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
$action = $_GET['action'] ?? 'categoria'; // 'categoria' o 'subcategoria'

try {
    if ($action === 'categoria') {
        // ================================================
        // CRUD CATEGORÍAS
        // ================================================
        switch($method) {
            case 'GET':
                // Listar todas las categorías
                $stmt = $pdo->query("
                    SELECT 
                        id_categoria,
                        nom_categoria,
                        descripcion_categoria,
                        estado,
                        usr_insert,
                        fec_insert,
                        usr_update,
                        fec_update
                    FROM tab_Categorias 
                    ORDER BY nom_categoria ASC
                ");
                $categorias = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode([
                    'ok' => true, 
                    'categorias' => $categorias,
                    'total' => count($categorias)
                ]);
                break;

            case 'POST':
                // Insertar nueva categoría
                $data = json_decode(file_get_contents("php://input"), true);
                
                // Validaciones
                if (empty($data['id_categoria'])) {
                    http_response_code(400);
                    echo json_encode(['ok' => false, 'msg' => 'ID de categoría es requerido']);
                    exit;
                }
                
                if (empty($data['nom_categoria'])) {
                    http_response_code(400);
                    echo json_encode(['ok' => false, 'msg' => 'Nombre de categoría es requerido']);
                    exit;
                }
                
                if (empty($data['descripcion_categoria'])) {
                    http_response_code(400);
                    echo json_encode(['ok' => false, 'msg' => 'Descripción es requerida']);
                    exit;
                }
                
                // Llamar a la función de PostgreSQL
                $stmt = $pdo->prepare("SELECT fun_insert_categorias(:id, :nombre, :desc)");
                $stmt->execute([
                    ':id' => intval($data['id_categoria']),
                    ':nombre' => trim($data['nom_categoria']),
                    ':desc' => trim($data['descripcion_categoria'])
                ]);
                
                $response = $stmt->fetchColumn();
                
                if (strpos($response, 'SUCCESS') !== false) {
                    http_response_code(201);
                    echo json_encode([
                        'ok' => true, 
                        'msg' => 'Categoría creada correctamente',
                        'details' => $response
                    ]);
                } else {
                    http_response_code(400);
                    echo json_encode(['ok' => false, 'msg' => $response]);
                }
                break;

            case 'PUT':
                // Actualizar categoría existente
                $data = json_decode(file_get_contents("php://input"), true);
                
                // Validaciones
                if (empty($data['id_categoria'])) {
                    http_response_code(400);
                    echo json_encode(['ok' => false, 'msg' => 'ID de categoría es requerido']);
                    exit;
                }
                
                if (empty($data['nom_categoria'])) {
                    http_response_code(400);
                    echo json_encode(['ok' => false, 'msg' => 'Nombre de categoría es requerido']);
                    exit;
                }
                
                if (empty($data['descripcion_categoria'])) {
                    http_response_code(400);
                    echo json_encode(['ok' => false, 'msg' => 'Descripción es requerida']);
                    exit;
                }
                
                // Determinar estado
                $estado = isset($data['estado']) ? ($data['estado'] === 'true' || $data['estado'] === true) : true;
                
                // Llamar a la función de PostgreSQL
                $stmt = $pdo->prepare("SELECT fun_update_categorias(:id, :nombre, :desc, :estado)");
                $stmt->execute([
                    ':id' => intval($data['id_categoria']),
                    ':nombre' => trim($data['nom_categoria']),
                    ':desc' => trim($data['descripcion_categoria']),
                    ':estado' => $estado ? 'true' : 'false'
                ]);
                
                $response = $stmt->fetchColumn();
                
                if (strpos($response, 'SUCCESS') !== false) {
                    echo json_encode([
                        'ok' => true, 
                        'msg' => 'Categoría actualizada correctamente',
                        'details' => $response
                    ]);
                } else {
                    http_response_code(400);
                    echo json_encode(['ok' => false, 'msg' => $response]);
                }
                break;

            case 'DELETE':
                // Eliminar categoría (soft delete)
                $data = json_decode(file_get_contents("php://input"), true);
                
                if (empty($data['id_categoria'])) {
                    http_response_code(400);
                    echo json_encode(['ok' => false, 'msg' => 'ID de categoría es requerido']);
                    exit;
                }
                
                // Llamar a la función de PostgreSQL
                $stmt = $pdo->prepare("SELECT fun_delete_categorias(:id)");
                $stmt->execute([':id' => intval($data['id_categoria'])]);
                
                $response = $stmt->fetchColumn();
                
                if (strpos($response, 'SUCCESS') !== false) {
                    echo json_encode([
                        'ok' => true, 
                        'msg' => 'Categoría desactivada correctamente',
                        'details' => $response
                    ]);
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
        



    } else if ($action === 'subcategoria') {
        // ================================================
        // CRUD SUBCATEGORÍAS (CORREGIDO)
        // ================================================
        switch($method) {
            case 'GET':
                // Listar todas las subcategorías con información de categoría
                $stmt = $pdo->query("
                    SELECT 
                        s.id_categoria,
                        s.id_subcategoria,
                        s.nom_subcategoria,
                        s.estado,
                        c.nom_categoria,
                        s.usr_insert,
                        s.fec_insert,
                        s.usr_update,
                        s.fec_update
                    FROM tab_Subcategorias s
                    LEFT JOIN tab_Categorias c ON s.id_categoria = c.id_categoria
                    ORDER BY c.nom_categoria ASC, s.nom_subcategoria ASC
                ");
                $subcategorias = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode([
                    'ok' => true, 
                    'subcategorias' => $subcategorias,
                    'total' => count($subcategorias)
                ]);
                break;

            case 'POST':
                // Insertar nueva subcategoría
                $data = json_decode(file_get_contents("php://input"), true);
                
                // Log para debug
                error_log("📥 POST Subcategoría recibido: " . json_encode($data));
                
                // Validaciones
                if (empty($data['id_categoria'])) {
                    http_response_code(400);
                    echo json_encode(['ok' => false, 'msg' => 'ID de categoría es requerido']);
                    exit;
                }
                
                if (empty($data['id_subcategoria'])) {
                    http_response_code(400);
                    echo json_encode(['ok' => false, 'msg' => 'ID de subcategoría es requerido']);
                    exit;
                }
                
                if (empty($data['nom_subcategoria'])) {
                    http_response_code(400);
                    echo json_encode(['ok' => false, 'msg' => 'Nombre de subcategoría es requerido']);
                    exit;
                }
                
                // Verificar que la categoría padre exista y esté activa
                $stmt = $pdo->prepare("
                    SELECT COUNT(*) 
                    FROM tab_Categorias 
                    WHERE id_categoria = :id_cat AND estado = TRUE
                ");
                $stmt->execute([':id_cat' => intval($data['id_categoria'])]);
                
                if ($stmt->fetchColumn() == 0) {
                    http_response_code(400);
                    echo json_encode(['ok' => false, 'msg' => 'La categoría padre no existe o está inactiva']);
                    exit;
                }
                
                // Verificar si ya existe esa subcategoría en esa categoría
                $stmt = $pdo->prepare("
                    SELECT COUNT(*) 
                    FROM tab_Subcategorias 
                    WHERE id_categoria = :id_cat 
                    AND id_subcategoria = :id_sub
                ");
                $stmt->execute([
                    ':id_cat' => intval($data['id_categoria']),
                    ':id_sub' => intval($data['id_subcategoria'])
                ]);
                
                if ($stmt->fetchColumn() > 0) {
                    http_response_code(400);
                    echo json_encode(['ok' => false, 'msg' => 'Ya existe una subcategoría con ese ID en esta categoría']);
                    exit;
                }
                
                // Insertar subcategoría
                // El trigger llenará automáticamente usr_insert, fec_insert, usr_update, fec_update
                $stmt = $pdo->prepare("
                    INSERT INTO tab_Subcategorias 
                    (id_categoria, id_subcategoria, nom_subcategoria, estado) 
                    VALUES (:id_cat, :id_sub, :nombre, TRUE)
                ");
                
                try {
                    $stmt->execute([
                        ':id_cat' => intval($data['id_categoria']),
                        ':id_sub' => intval($data['id_subcategoria']),
                        ':nombre' => trim($data['nom_subcategoria'])
                    ]);
                    
                    http_response_code(201);
                    echo json_encode([
                        'ok' => true, 
                        'msg' => 'Subcategoría creada correctamente'
                    ]);
                } catch (PDOException $e) {
                    if ($e->getCode() == '23505') { // Unique violation
                        http_response_code(400);
                        echo json_encode(['ok' => false, 'msg' => 'La subcategoría ya existe']);
                    } else {
                        error_log("Error al insertar subcategoría: " . $e->getMessage());
                        http_response_code(500);
                        echo json_encode(['ok' => false, 'msg' => 'Error en la base de datos: ' . $e->getMessage()]);
                    }
                }
                break;

            case 'PUT':
                // Actualizar subcategoría existente
                $data = json_decode(file_get_contents("php://input"), true);
                
                error_log("📥 PUT Subcategoría recibido: " . json_encode($data));
                
                // Validaciones
                if (empty($data['id_categoria'])) {
                    http_response_code(400);
                    echo json_encode(['ok' => false, 'msg' => 'ID de categoría es requerido']);
                    exit;
                }
                
                if (empty($data['id_subcategoria'])) {
                    http_response_code(400);
                    echo json_encode(['ok' => false, 'msg' => 'ID de subcategoría es requerido']);
                    exit;
                }
                
                if (empty($data['nom_subcategoria'])) {
                    http_response_code(400);
                    echo json_encode(['ok' => false, 'msg' => 'Nombre de subcategoría es requerido']);
                    exit;
                }
                
                // Determinar estado
                $estado = isset($data['estado']) ? 
                          ($data['estado'] === 'true' || $data['estado'] === true) : 
                          true;
                
                // Actualizar subcategoría (el trigger llenará usr_update y fec_update)
                $stmt = $pdo->prepare("
                    UPDATE tab_Subcategorias 
                    SET nom_subcategoria = :nombre, 
                        estado = :estado
                    WHERE id_categoria = :id_cat 
                    AND id_subcategoria = :id_sub
                ");
                
                $stmt->execute([
                    ':id_cat' => intval($data['id_categoria']),
                    ':id_sub' => intval($data['id_subcategoria']),
                    ':nombre' => trim($data['nom_subcategoria']),
                    ':estado' => $estado
                ]);
                
                if ($stmt->rowCount() > 0) {
                    echo json_encode([
                        'ok' => true, 
                        'msg' => 'Subcategoría actualizada correctamente'
                    ]);
                } else {
                    http_response_code(404);
                    echo json_encode([
                        'ok' => false, 
                        'msg' => 'Subcategoría no encontrada'
                    ]);
                }
                break;

            case 'DELETE':
                // Eliminar subcategoría (soft delete)
                $data = json_decode(file_get_contents("php://input"), true);
                
                error_log("📥 DELETE Subcategoría recibido: " . json_encode($data));
                
                // Validaciones
                if (empty($data['id_categoria'])) {
                    http_response_code(400);
                    echo json_encode(['ok' => false, 'msg' => 'ID de categoría es requerido']);
                    exit;
                }
                
                if (empty($data['id_subcategoria'])) {
                    http_response_code(400);
                    echo json_encode(['ok' => false, 'msg' => 'ID de subcategoría es requerido']);
                    exit;
                }
                
                // Desactivar subcategoría (el trigger llenará usr_update y fec_update)
                $stmt = $pdo->prepare("
                    UPDATE tab_Subcategorias 
                    SET estado = FALSE
                    WHERE id_categoria = :id_cat 
                    AND id_subcategoria = :id_sub
                ");
                
                $stmt->execute([
                    ':id_cat' => intval($data['id_categoria']),
                    ':id_sub' => intval($data['id_subcategoria'])
                ]);
                
                if ($stmt->rowCount() > 0) {
                    echo json_encode([
                        'ok' => true, 
                        'msg' => 'Subcategoría desactivada correctamente'
                    ]);
                } else {
                    http_response_code(404);
                    echo json_encode([
                        'ok' => false, 
                        'msg' => 'Subcategoría no encontrada'
                    ]);
                }
                break;

            default:
                http_response_code(405);
                echo json_encode(['ok' => false, 'msg' => 'Método no permitido']);
                break;
        }
    } else {
        // Acción no válida
        http_response_code(400);
        echo json_encode([
            'ok' => false, 
            'msg' => 'Acción no válida. Use action=categoria o action=subcategoria'
        ]);
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