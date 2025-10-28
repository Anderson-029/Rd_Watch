let productos = [
  { id: 1, nombre: "Tissot Supersport Chrono", precio: 1200, imagen: "imageUrl_1.webp" },
  { id: 2, nombre: "Reloj Clásico de Acero", precio: 950, imagen: "tissot.png" }
];

let pedidos = [
  { id: 1, cliente: "Juan Pérez", estado: "pendiente", total: 1200 },
  { id: 2, cliente: "Ana Torres", estado: "pagado", total: 950 },
  { id: 3, cliente: "Carlos Ruiz", estado: "enviado", total: 500 },
  { id: 4, cliente: "Laura Gómez", estado: "entregado", total: 1500 }
];

let clientes = [
  { nombre: "Juan Pérez", email: "juan@mail.com", tel: "3001234567" },
  { nombre: "Ana Torres", email: "ana@mail.com", tel: "3012345678" },
  { nombre: "Carlos Ruiz", email: "carlos@mail.com", tel: "3021234567" }
];

let config = {
  tiendaNombre: "RD-Watch",
  tiendaMoneda: "USD",
  adminUsuario: "admin",
  adminPass: "1234"
};

let editandoProductoId = null;
let estadosChart;

// Navegación entre secciones
function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  document.querySelectorAll(".sidebar nav a").forEach(a => a.classList.remove("active"));
  document.querySelector(`.sidebar nav a[onclick="showSection('${id}')"]`).classList.add("active");
}

// ----------------- Productos -----------------
function renderProductos() {
  const tbody = document.querySelector("#tablaProductos tbody");
  tbody.innerHTML = "";
  productos.forEach(p => {
    tbody.innerHTML += `
      <tr>
        <td><img src="${p.imagen}" alt="${p.nombre}"></td>
        <td>${p.nombre}</td>
        <td>$${p.precio}</td>
        <td>
          <button class="edit" onclick="editarProducto(${p.id})">Editar</button>
          <button class="delete" onclick="eliminarProducto(${p.id})">Eliminar</button>
        </td>
      </tr>
    `;
  });
  document.querySelector("#statProductos h3").textContent = productos.length;
}

function mostrarFormProducto() {
  document.getElementById("formProducto").classList.remove("hidden");
  document.getElementById("formProductoTitle").textContent = "Nuevo Producto";
  document.getElementById("productoForm").reset();
  editandoProductoId = null;
}

function cancelarFormProducto() {
  document.getElementById("formProducto").classList.add("hidden");
}

document.getElementById("productoForm").addEventListener("submit", e => {
  e.preventDefault();
  const nombre = document.getElementById("pNombre").value;
  const precio = parseFloat(document.getElementById("pPrecio").value);
  const imagen = document.getElementById("pImagen").value;

  if (editandoProductoId) {
    const producto = productos.find(p => p.id === editandoProductoId);
    producto.nombre = nombre;
    producto.precio = precio;
    producto.imagen = imagen;
  } else {
    productos.push({ id: Date.now(), nombre, precio, imagen });
  }

  cancelarFormProducto();
  renderProductos();
});

function editarProducto(id) {
  const producto = productos.find(p => p.id === id);
  mostrarFormProducto();
  document.getElementById("formProductoTitle").textContent = "Editar Producto";
  document.getElementById("pNombre").value = producto.nombre;
  document.getElementById("pPrecio").value = producto.precio;
  document.getElementById("pImagen").value = producto.imagen;
  editandoProductoId = id;
}

function eliminarProducto(id) {
  if (confirm("¿Seguro que quieres eliminar este producto?")) {
    productos = productos.filter(p => p.id !== id);
    renderProductos();
  }
}

// ----------------- Pedidos -----------------
function renderPedidos() {
  const tbody = document.querySelector("#tablaPedidos tbody");
  tbody.innerHTML = "";
  pedidos.forEach(p => {
    tbody.innerHTML += `
      <tr>
        <td>#${p.id}</td>
        <td>${p.cliente}</td>
        <td>${p.estado}</td>
        <td>$${p.total}</td>
      </tr>
    `;
  });
  document.querySelector("#statPedidos h3").textContent = pedidos.length;
}

// ----------------- Clientes -----------------
function renderClientes() {
  const tbody = document.querySelector("#tablaClientes tbody");
  tbody.innerHTML = "";
  clientes.forEach(c => {
    tbody.innerHTML += `
      <tr>
        <td>${c.nombre}</td>
        <td>${c.email}</td>
        <td>${c.tel}</td>
      </tr>
    `;
  });
  document.querySelector("#statClientes h3").textContent = clientes.length;
}

// ----------------- Configuración -----------------
function renderConfig() {
  document.getElementById("tiendaNombre").value = config.tiendaNombre;
  document.getElementById("tiendaMoneda").value = config.tiendaMoneda;
  document.getElementById("adminUsuario").value = config.adminUsuario;
}

document.getElementById("formConfigTienda").addEventListener("submit", e => {
  e.preventDefault();
  config.tiendaNombre = document.getElementById("tiendaNombre").value;
  config.tiendaMoneda = document.getElementById("tiendaMoneda").value;
  alert("Configuración de tienda guardada ✅");
});

document.getElementById("formConfigAdmin").addEventListener("submit", e => {
  e.preventDefault();
  config.adminUsuario = document.getElementById("adminUsuario").value;
  const nuevaPass = document.getElementById("adminPass").value;
  if (nuevaPass.trim() !== "") {
    config.adminPass = nuevaPass;
    alert("Contraseña actualizada 🔑");
  } else {
    alert("Usuario actualizado ✅");
  }
});

// ----------------- Dashboard (Gráfica) -----------------
function renderCharts() {
  const canvas = document.getElementById("estadosChart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const estados = ["pendiente", "pagado", "enviado", "entregado", "cancelado"];
  const counts = estados.map(e => pedidos.filter(p => p.estado === e).length);

  if (estadosChart && typeof estadosChart.destroy === "function") {
    estadosChart.destroy();
  }

  estadosChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: estados.map(e => e[0].toUpperCase() + e.slice(1)),
      datasets: [{
        label: "Cantidad de pedidos",
        data: counts,
        backgroundColor: ["#f39c12","#27ae60","#2980b9","#8e44ad","#c0392b"],
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
      plugins: { legend: { display: false } }
    }
  });
}

// ----------------- Init -----------------
function init() {
  renderProductos();
  renderPedidos();
  renderClientes();
  renderConfig();
  renderCharts();
  showSection("dashboard");
}

init();
