
<?php

require_once '../php/config.php'; // Conexión y sesión

// Verificar que haya una sesión activa
if (!isset($_SESSION['rol_usuario'])) {
    header("Location: index.html");
    exit;
}

// Verificar que el rol de la sesión sea "user"
if ($_SESSION['rol_usuario'] === 'user') {
} 
else {
    // ❌ Rol incorrecto → redirigimos al login
    header("Location: index.html");
    exit;
}
?>



<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi Panel - RD-Watch</title>
  <link rel="stylesheet" href="/assets-login/css/user.css">
</head>
<body>
  <!-- Navbar -->
  <header class="navbar">
    <h1>RD-Watch</h1>
    <nav>
      <!-- Añadí data-section para que el JS sepa qué mostrar -->
      <a href="#" class="acative" data-section="inicio">Inicio</a>
      <a href="#" data-section="perfilForm">Perfil</a>
      <a href="#" data-section="pedidoForm">Pedidos</a>
      <a href="#" data-section="direccionForm">Direcciones</a>
      <a href="#" data-section="pagoForm">Pago</a>
      <a href="../php/logout.php" id="logoutLink" onclick="return true;">Cerrar Sesión</a>

    </nav>
  </header>

  <!-- Dashboard de usuario -->
  <main class="user-dashboard">
    <section class="welcome">
      <h2>Bienvenido, Anderson 👋</h2>
      <p>Aquí puedes consultar y administrar tu información personal, pedidos y métodos de pago.</p>
    </section>

    <!-- Cards -->
    <section class="cards-grid">
      <!-- Perfil -->
      <div class="card">
        <h3>Mi Perfil</h3>
        <p><strong>Nombre:</strong> <span id="perfilNombre">Anderson Gomez</span></p>
        <p><strong>Email:</strong> <span id="perfilEmail">anderson@email.com</span></p>
        <button class="btn" onclick="toggleForm('perfilForm')">Editar Perfil</button>
      </div>

      <!-- Pedidos -->
      <div class="card">
        <h3>Mis Pedidos</h3>
        <p>Tienes <strong>2 pedidos activos</strong> y <strong>5 completados</strong>.</p>
        <button class="btn" onclick="toggleForm('pedidoForm')">Ver Historial</button>
      </div>

      <!-- Direcciones -->
      <div class="card">
        <h3>Direcciones</h3>
        <p>Dirección principal:<br><span id="direccionPrincipal">Calle 123, Bogotá</span></p>
        <button class="btn" onclick="toggleForm('direccionForm')">Gestionar</button>
      </div>

      <!-- Métodos de Pago -->
      <div class="card">
        <h3>Métodos de Pago</h3>
        <p>Tarjeta terminada en <strong id="pagoTarjeta">1234</strong></p>
        <button class="btn" onclick="toggleForm('pagoForm')">Actualizar</button>
      </div>
    </section>

    <!-- Formularios -->
    <section id="perfilForm" class="form-section hidden">
      <h2>Editar Perfil</h2>
      <form onsubmit="guardarPerfil(event)">
        <label>Nombre</label>
        <input type="text" id="inputNombre" value="Anderson Gomez">
        <label>Email</label>
        <input type="email" id="inputEmail" value="anderson@email.com">
        <label>Teléfono</label>
        <input type="tel" id="inputTelefono" value="+57 300 111 2233">
        <button type="submit" class="btn">Guardar</button>
      </form>
    </section>

    <section id="pedidoForm" class="form-section hidden">
      <h2>Historial de Pedidos</h2>
      <table>
        <thead>
          <tr>
            <th>ID Pedido</th>
            <th>Producto</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#1001</td>
            <td>Tissot Supersport Chrono</td>
            <td>10/08/2025</td>
            <td>Enviado</td>
          </tr>
          <tr>
            <td>#1002</td>
            <td>Reloj Clásico de Acero</td>
            <td>15/08/2025</td>
            <td>Pendiente</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section id="direccionForm" class="form-section hidden">
      <h2>Gestionar Direcciones</h2>
      <form onsubmit="guardarDireccion(event)">
        <label>Dirección Principal</label>
        <input type="text" id="inputDireccion" value="Calle 123, Bogotá">
        <label>Ciudad</label>
        <input type="text" id="inputCiudad" value="Bogotá">
        <label>Código Postal</label>
        <input type="text" id="inputPostal" value="110111">
        <button type="submit" class="btn">Guardar</button>
      </form>
    </section>

    <section id="pagoForm" class="form-section hidden">
      <h2>Método de Pago</h2>
      <form onsubmit="guardarPago(event)">
        <label>Nombre en la tarjeta</label>
        <input type="text" id="inputTitular" value="Anderson Gomez">
        <label>Número de tarjeta</label>
        <input type="text" id="inputTarjeta" placeholder="**** **** **** 1234">
        <label>Fecha de expiración</label>
        <input type="month" id="inputExpiracion">
        <label>CVV</label>
        <input type="text" id="inputCVV" maxlength="3">
        <button type="submit" class="btn">Actualizar</button>
      </form>
    </section>
  </main>

  <script src="/assets-login/js/user.js"></script>
</body>
</html>
