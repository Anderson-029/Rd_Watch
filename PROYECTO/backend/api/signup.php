<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
include_once('../config.php');

$data = json_decode(file_get_contents("php://input"), true);
$nombre = trim($data['nombre'] ?? '');
$email = trim($data['email'] ?? '');
$telefono = $data['telefono'] ?? null;
$password = (string)($data['password'] ?? '');
$direccion = $data['direccion'] ?? null;

if ($nombre==='' || $email==='' || $password==='') {
  echo json_encode(['ok'=>false,'msg'=>'Faltan campos obligatorios']);
  exit;
}

try {
  $stmt = $pdo->prepare("SELECT * FROM fun_registrar_usuario(:n,:e,:t,:p,:d)");
  $stmt->execute([
    ':n'=>$nombre,
    ':e'=>$email,
    ':t'=>$telefono,
    ':p'=>$password,
    ':d'=>$direccion
  ]);
  $row = $stmt->fetch(PDO::FETCH_ASSOC);

  echo json_encode([
    'ok'=>$row['status']==='SUCCESS',
    'msg'=>$row['message'],
    'id'=>$row['id_usuario']
  ]);
} catch (Throwable $e) {
  echo json_encode(['ok'=>false,'msg'=>'Error del servidor']);
}
?>
