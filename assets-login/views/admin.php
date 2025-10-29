<?php
require_once '../php/config.php'; // Conexión y sesión

// Verificar que haya una sesión activa
if (!isset($_SESSION['rol_usuario'])) {
    header("Location: index.html");
    exit;
}

// Verificar que la sesión pertenezca a un usuario ADMIN
if ($_SESSION['rol_usuario'] === 'admin') {
}
else {
    header("Location: index.html");
    exit;
}
?>



<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Panel - RD-Watch</title>
  <link rel="stylesheet" href="/assets-login/css/admin.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <!-- Sidebar -->
  <aside class="sidebar">
    <h2>RD-Watch</h2>
    <nav>
      <a href="#" class="active" onclick="showSection('dashboard')">📊 Dashboard</a>
      <a href="#" onclick="showSection('productos')">🛒 Productos</a>
      <a href="#" onclick="showSection('pedidos')">📦 Pedidos</a>
      <a href="#" onclick="showSection('clientes')">👥 Clientes</a>
      <a href="#" onclick="showSection('configuracion')">⚙ Configuración</a>

    </nav>
  </aside>

  <!-- Main -->
  <main class="main-content">
    <header class="admin-header">
      <h1>Panel de Administración</h1>
      <button class="logout-btn" onclick="window.location.href='../php/logout.php'">Cerrar Sesión</button>

    </header>

    <!-- Dashboard -->
    <section id="dashboard" class="section">
      <h2>Estadísticas</h2>
      <div class="stats">
        <div class="stat-card" id="statProductos"><h3>0</h3><p>Productos</p></div>
        <div class="stat-card" id="statPedidos"><h3>0</h3><p>Pedidos</p></div>
        <div class="stat-card" id="statClientes"><h3>0</h3><p>Clientes</p></div>
      </div>
      <canvas id="estadosChart"></canvas>
    </section>

    <!-- Productos -->
    <section id="productos" class="section hidden">
      <h2>Gestión de Productos</h2>
      <button class="btn-add" onclick="mostrarFormProducto()">➕ Agregar Producto</button>
      <div id="formProducto" class="form-inline hidden">
        <h3 id="formProductoTitle">Nuevo Producto</h3>
        <form id="productoForm">
          <label>Nombre</label>
          <input type="text" id="pNombre" required>
          <label>Precio</label>
          <input type="number" id="pPrecio" min="0" step="0.01" required>
          <label>Imagen URL</label>
          <input type="url" id="pImagen" required>
          <button type="submit" class="btn">Guardar</button>
          <button type="button" class="btn secondary" onclick="cancelarFormProducto()">Cancelar</button>
        </form>
      </div>
      <table id="tablaProductos">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </section>

    <!-- Pedidos -->
    <section id="pedidos" class="section hidden">
      <h2>Gestión de Pedidos</h2>
      <table id="tablaPedidos">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Estado</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </section>

    <!-- Clientes -->
    <section id="clientes" class="section hidden">
      <h2>Gestión de Clientes</h2>
      <table id="tablaClientes">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </section>

    <!-- Configuración -->
<section id="configuracion" class="section hidden">
  <h2>Configuración</h2>

  <div class="form-inline">
    <h3>Datos de la Tienda</h3>
    <form id="formConfigTienda">
      <label>Nombre de la tienda</label>
      <input type="text" id="tiendaNombre" value="RD-Watch">

      <label>Moneda</label>
      <select id="tiendaMoneda">
        <option value="USD" selected>USD - Dólares</option>
        <option value="EUR">EUR - Euros</option>
        <option value="COP">COP - Pesos Colombianos</option>
      </select>

      <button type="submit" class="btn">Guardar</button>
    </form>
  </div>

  <div class="form-inline">
    <h3>Cuenta de Administrador</h3>
    <form id="formConfigAdmin">
      <label>Usuario</label>
      <input type="text" id="adminUsuario" value="admin">

      <label>Nueva contraseña</label>
      <input type="password" id="adminPass">

      <button type="submit" class="btn">Actualizar</button>
    </form>
  </div>
  </section>


  </main>

  <script src="/assets-login/js/admin.js"></script>
</body>
</html>
