<?php
header('Content-Type: application/json');
session_start();

if (isset($_SESSION['user_id'])) {
  echo json_encode([
    'ok'=>true,
    'user'=>[
      'id'=>$_SESSION['user_id'],
      'nombre'=>$_SESSION['user_name'],
      'correo'=>$_SESSION['user_mail']
    ]
  ]);
} else {
  echo json_encode(['ok'=>false,'msg'=>'No autenticado']);
}
?>
