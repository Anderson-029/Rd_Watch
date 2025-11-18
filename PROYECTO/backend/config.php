<?php
// backend/config.php

// Variables de conexión
$DB_HOST = "localhost";
$DB_PORT = "5432";
$DB_NAME = "rdwatch_db";
$DB_USER = "postgres";
$DB_PASS = "toby,2003";

// Conexión PDO
try {
  $pdo = new PDO(
    "pgsql:host=$DB_HOST;port=$DB_PORT;dbname=$DB_NAME;",
    $DB_USER,
    $DB_PASS,
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
  );
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(["ok" => false, "msg" => "Error de conexión: " . $e->getMessage()]);
  exit;
}
?>
