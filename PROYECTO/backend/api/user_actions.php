<?php
// backend/api/user_actions.php

ini_set('display_errors', 0);
ini_set('log_errors', 1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

include_once('../config.php');
session_start();

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

// Para POST, leemos el JSON body
$data = null;
if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if(isset($data['action'])) $action = $data['action'];
}

try {
    // --- GET ---
    if ($method === 'GET') {
        $uid = $_GET['uid'] ?? 0;

        if ($action === 'perfil') {
            $stmt = $pdo->prepare("
                SELECT 
                    nom_usuario, 
                    correo_usuario, 
                    num_telefono_usuario,
                    direccion_principal
                FROM tab_Usuarios 
                WHERE id_usuario = :uid
            ");
            $stmt->execute([':uid' => $uid]);
            $res = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode(['ok' => true, 'data' => $res ?: []]);

        } elseif ($action === 'direccion') {
            $stmt = $pdo->prepare("SELECT * FROM fun_obtener_direccion_usuario(:uid)");
            $stmt->execute([':uid' => $uid]);
            $res = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode(['ok' => true, 'data' => $res ?: null]);

        } elseif ($action === 'pedidos') {
            $stmt = $pdo->prepare("SELECT * FROM fun_obtener_pedidos_usuario(:uid)");
            $stmt->execute([':uid' => $uid]);
            $pedidos = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(['ok' => true, 'data' => $pedidos]);

        } elseif ($action === 'metodo_pago') {
            $stmt = $pdo->prepare("SELECT * FROM fun_obtener_metodo_pago_usuario(:uid)");
            $stmt->execute([':uid' => $uid]);
            $res = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode(['ok' => true, 'data' => $res ?: null]);
        }
    } 
    
    // --- POST ---
    elseif ($method === 'POST') {
        
        if ($action === 'update_profile') {
            $stmt = $pdo->prepare("SELECT * FROM fun_actualizar_perfil(:uid, :nom, :tel)");
            $stmt->execute([
                ':uid' => $data['uid'],
                ':nom' => $data['nombre'],
                ':tel' => (int)$data['telefono']
            ]);
            $res = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode(['ok' => ($res['status'] === 'SUCCESS'), 'msg' => $res['message']]);

        } elseif ($action === 'update_address') {
            $stmt = $pdo->prepare("SELECT * FROM fun_gestionar_direccion(:uid, :dir, 1, :postal)");
            $stmt->execute([
                ':uid' => $data['uid'],
                ':dir' => $data['direccion'],
                ':postal' => $data['postal']
            ]);
            $res = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode(['ok' => ($res['status'] === 'SUCCESS'), 'msg' => $res['message']]);

        } elseif ($action === 'change_password') {
            $stmt = $pdo->prepare("SELECT * FROM fun_cambiar_password(:uid, :old, :new)");
            $stmt->execute([
                ':uid' => $data['uid'],
                ':old' => $data['old_pass'],
                ':new' => $data['new_pass']
            ]);
            $res = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode(['ok' => ($res['status'] === 'SUCCESS'), 'msg' => $res['message']]);

        } elseif ($action === 'update_payment') {
            // Convertir fecha MM/YYYY a formato DATE
            $fechaVencimiento = null;
            if (!empty($data['fecha_vencimiento'])) {
                $partes = explode('/', $data['fecha_vencimiento']);
                if (count($partes) === 2) {
                    $mes = str_pad($partes[0], 2, '0', STR_PAD_LEFT);
                    $anio = $partes[1];
                    $fechaVencimiento = "$anio-$mes-01"; // Primer día del mes
                }
            }

            $stmt = $pdo->prepare("SELECT * FROM fun_actualizar_metodo_pago(:uid, :metodo, :tarjeta, :fecha)");
            $stmt->execute([
                ':uid' => $data['uid'],
                ':metodo' => (int)$data['id_metodo_pago'],
                ':tarjeta' => $data['num_tarjeta'],
                ':fecha' => $fechaVencimiento
            ]);
            $res = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode(['ok' => ($res['status'] === 'SUCCESS'), 'msg' => $res['message']]);
        }
    }

} catch (PDOException $e) {
    echo json_encode(['ok' => false, 'msg' => 'Error BD: ' . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(['ok' => false, 'msg' => 'Error: ' . $e->getMessage()]);
}
?>