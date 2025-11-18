<?php
session_start();
session_unset();
session_destroy();
echo json_encode(['ok'=>true,'msg'=>'Sesión cerrada']);
?>
