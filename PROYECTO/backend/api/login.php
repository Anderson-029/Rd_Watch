<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
include_once('../config.php');
session_start();

$data = json_decode(file_get_contents("php://input"), true);
$email = trim($data['email'] ?? '');
$password = (string)($data['password'] ?? '');

if ($email === '' || $password === '') {
  echo json_encode(['ok'=>false,'msg'=>'Email y contraseña requeridos']);
  exit;
}

try {
  $stmt = $pdo->prepare("SELECT * FROM fun_login_usuario(:email, :pwd)");
  $stmt->execute([':email'=>$email, ':pwd'=>$password]);
  $row = $stmt->fetch(PDO::FETCH_ASSOC);

  if (!$row || $row['status'] !== 'SUCCESS') {
    echo json_encode(['ok'=>false,'msg'=>$row['message'] ?? 'Credenciales inválidas']);
    exit;
  }

  $_SESSION['user_id']   = (int)$row['id_usuario'];
  $_SESSION['user_name'] = $row['nombre'];
  $_SESSION['user_mail'] = $row['email'];
  $_SESSION['user_rol']  = $row['rol'];

  echo json_encode(['ok'=>true,'user'=>[
    'id'=>$row['id_usuario'],
    'nombre'=>$row['nombre'],
    'correo'=>$row['email']
  ]]);
} catch (Throwable $e) {
  echo json_encode(['ok'=>false,'msg'=>'Error del servidor']);
}
?>
