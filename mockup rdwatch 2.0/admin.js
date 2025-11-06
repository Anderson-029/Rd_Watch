/* global Chart */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  /* ===== Navegación de secciones ===== */
  const links = document.querySelectorAll(".admin-link");
  const sections = document.querySelectorAll(".admin-section");

  if (links.length && sections.length) {
    links.forEach((btn) => {
      btn.addEventListener("click", () => {
        links.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const target = btn.dataset.target || "";
        sections.forEach((s) => s.classList.remove("is-active"));

        const targetEl = document.getElementById(target);
        if (targetEl) targetEl.classList.add("is-active");
      });
    });
  }

  /* ===== Sidebar móvil ===== */
  const sidebar = document.getElementById("adminSidebar");
  const openMenuBtn = document.getElementById("btn-open-admin-menu");
  if (sidebar && openMenuBtn) {
    openMenuBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }

  /* ===== Datos de demo (remplaza con fetch a tu backend) ===== */
  let productos = [
    { id: 1, nombre: "Tissot Supersport Chrono", precio: 1200, imagen: "https://via.placeholder.com/90x90?text=Tissot" },
    { id: 2, nombre: "Reloj Clásico de Acero", precio: 950, imagen: "https://via.placeholder.com/90x90?text=Clasico" },
  ];
  let pedidos = [
    { id: 1, cliente: "Juan Pérez", estado: "pendiente", total: 1200 },
    { id: 2, cliente: "Ana Torres", estado: "pagado", total: 950 },
    { id: 3, cliente: "Carlos Ruiz", estado: "enviado", total: 500 },
    { id: 4, cliente: "Laura Gómez", estado: "entregado", total: 1500 },
  ];
  let clientes = [
    { nombre: "Juan Pérez", email: "juan@mail.com", tel: "3001234567" },
    { nombre: "Ana Torres", email: "ana@mail.com", tel: "3012345678" },
  ];
  let servicios = [
    { id_servicio: 101, nom_servicio: "Reparación Premium", descripcion: "Servicio técnico especializado", precio_servicio: 350, duracion_estimada: 120, estado: true },
    { id_servicio: 102, nom_servicio: "Mantenimiento Expert", descripcion: "Limpieza y ajuste de precisión", precio_servicio: 220, duracion_estimada: 90, estado: true },
  ];

  /* ===== Utilidades de modal ===== */
  const modalOverlay = document.getElementById("modalOverlay");
  function openModal(id) {
    const el = document.querySelector(id);
    if (!el || !modalOverlay) return;
    el.style.display = "flex";
    requestAnimationFrame(() => el.classList.add("show"));
    modalOverlay.classList.add("show");
  }
  function closeModal(id) {
    const el = document.querySelector(id);
    if (!el || !modalOverlay) return;
    el.classList.remove("show");
    setTimeout(() => {
      el.style.display = "none";
    }, 200);
    modalOverlay.classList.remove("show");
  }
  document.querySelectorAll("[data-close]").forEach((btn) => {
    btn.addEventListener("click", () => closeModal(btn.dataset.close));
  });
  if (modalOverlay) {
    modalOverlay.addEventListener("click", () => {
      document.querySelectorAll(".modal").forEach((m) => {
        if (getComputedStyle(m).display !== "none") closeModal("#" + m.id);
      });
    });
  }

  /* ===== Dashboard ===== */
  function renderDashboard() {
    const sp = document.getElementById("statProductos");
    const spe = document.getElementById("statPedidos");
    const sc = document.getElementById("statClientes");
    const ss = document.getElementById("statServicios");

    if (sp) sp.textContent = String(productos.length);
    if (spe) spe.textContent = String(pedidos.length);
    if (sc) sc.textContent = String(clientes.length);
    if (ss) ss.textContent = String(servicios.length);

    const ctx = document.getElementById("estadosChart");
    if (ctx && typeof Chart !== "undefined") {
      const estados = ["pendiente", "pagado", "enviado", "entregado", "cancelado"];
      const counts = estados.map((e) => pedidos.filter((p) => p.estado === e).length);
      // destruir gráfica previa si existe
      if (ctx._chartInstance) {
        ctx._chartInstance.destroy();
      }
      ctx._chartInstance = new Chart(ctx, {
        type: "bar",
        data: { labels: estados, datasets: [{ label: "Pedidos", data: counts }] },
      });
    }
  }

  /* ===== Productos ===== */
  const tbodyProductos = document.getElementById("tbodyProductos");
  const buscarProducto = document.getElementById("buscarProducto");
  const btnNuevoProducto = document.getElementById("btnNuevoProducto");

  function drawProductos(list = productos) {
    if (!tbodyProductos) return;
    tbodyProductos.innerHTML = list
      .map(
        (p) => `
      <tr>
        <td><img src="${p.imagen}" alt="${p.nombre}"></td>
        <td>${p.nombre}</td>
        <td>$${Number(p.precio).toFixed(2)}</td>
        <td>
          <button class="button button-outline" onclick="editarProducto(${p.id})"><i class="fas fa-pen"></i></button>
          <button class="button button-secondary" onclick="eliminarProducto(${p.id})"><i class="fas fa-trash"></i></button>
        </td>
      </tr>`
      )
      .join("");
  }

  if (buscarProducto) {
    buscarProducto.addEventListener("input", (e) => {
      const q = String(e.target.value || "").toLowerCase();
      drawProductos(productos.filter((p) => p.nombre.toLowerCase().includes(q)));
    });
  }

  const modalProducto = document.getElementById("modalProducto");
  const formProducto = document.getElementById("formProducto");
  const pNombre = document.getElementById("pNombre");
  const pPrecio = document.getElementById("pPrecio");
  const pImagen = document.getElementById("pImagen");

  if (btnNuevoProducto && formProducto) {
    btnNuevoProducto.addEventListener("click", () => {
      const title = document.getElementById("tituloModalProducto");
      if (title) title.textContent = "Nuevo Producto";
      formProducto.reset();
      formProducto.dataset.editing = "";
      openModal("#modalProducto");
    });
  }

  function editarProducto(id) {
    if (!formProducto || !pNombre || !pPrecio || !pImagen) return;
    const prod = productos.find((p) => p.id === id);
    if (!prod) return;
    const title = document.getElementById("tituloModalProducto");
    if (title) title.textContent = "Editar Producto";
    pNombre.value = prod.nombre;
    pPrecio.value = String(prod.precio);
    pImagen.value = prod.imagen;
    formProducto.dataset.editing = String(id);
    openModal("#modalProducto");
  }
  function eliminarProducto(id) {
    if (!confirm("¿Eliminar producto?")) return;
    productos = productos.filter((p) => p.id !== id);
    drawProductos();
    renderDashboard();
  }
  if (formProducto) {
    formProducto.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!pNombre || !pPrecio || !pImagen) return;
      const nombre = pNombre.value.trim();
      const precio = parseFloat(pPrecio.value);
      const imagen = pImagen.value.trim();
      const editing = formProducto.dataset.editing;

      if (editing) {
        const p = productos.find((x) => String(x.id) === editing);
        if (p) Object.assign(p, { nombre, precio, imagen });
      } else {
        productos.push({ id: Date.now(), nombre, precio, imagen });
      }
      closeModal("#modalProducto");
      drawProductos();
      renderDashboard();
    });
  }

  // Exponer a window para los onclick en la tabla
  window.editarProducto = editarProducto;
  window.eliminarProducto = eliminarProducto;

  /* ===== Pedidos y Clientes ===== */
  const tbodyPedidos = document.getElementById("tbodyPedidos");
  const tbodyClientes = document.getElementById("tbodyClientes");

  function drawPedidos() {
    if (!tbodyPedidos) return;
    tbodyPedidos.innerHTML = pedidos
      .map((p) => `<tr><td>#${p.id}</td><td>${p.cliente}</td><td>${p.estado}</td><td>$${p.total}</td></tr>`)
      .join("");
  }
  function drawClientes() {
    if (!tbodyClientes) return;
    tbodyClientes.innerHTML = clientes.map((c) => `<tr><td>${c.nombre}</td><td>${c.email}</td><td>${c.tel}</td></tr>`).join("");
  }

  /* ===== Servicios (CRUD) ===== */
  const tbodyServicios = document.getElementById("tbodyServicios");
  const btnNuevoServicio = document.getElementById("btnNuevoServicio");
  const formServicio = document.getElementById("formServicio");

  const sId = document.getElementById("sId");
  const sNombre = document.getElementById("sNombre");
  const sDescripcion = document.getElementById("sDescripcion");
  const sPrecio = document.getElementById("sPrecio");
  const sDuracion = document.getElementById("sDuracion");
  const sEstado = document.getElementById("sEstado");
  const buscarServicio = document.getElementById("buscarServicio");

  function drawServicios(list = servicios) {
    if (!tbodyServicios) return;
    tbodyServicios.innerHTML = list
      .map(
        (s) => `
      <tr>
        <td>${s.id_servicio}</td>
        <td>${s.nom_servicio}</td>
        <td>$${Number(s.precio_servicio).toFixed(2)}</td>
        <td>${s.duracion_estimada} min</td>
        <td><span class="badge ${s.estado ? "active" : "inactive"}">${s.estado ? "Activo" : "Inactivo"}</span></td>
        <td>
          <button class="button button-outline" onclick="editarServicio(${s.id_servicio})"><i class="fas fa-pen"></i></button>
          <button class="button button-secondary" onclick="eliminarServicio(${s.id_servicio})"><i class="fas fa-trash"></i></button>
        </td>
      </tr>`
      )
      .join("");
  }

  if (buscarServicio) {
    buscarServicio.addEventListener("input", (e) => {
      const q = String(e.target.value || "").toLowerCase();
      drawServicios(servicios.filter((s) => s.nom_servicio.toLowerCase().includes(q)));
    });
  }

  if (btnNuevoServicio && formServicio) {
    btnNuevoServicio.addEventListener("click", () => {
      const title = document.getElementById("tituloModalServicio");
      if (title) title.textContent = "Nuevo Servicio";
      formServicio.reset();
      formServicio.dataset.editing = "";
      openModal("#modalServicio");
    });
  }

  function editarServicio(id) {
    if (!formServicio || !sId || !sNombre || !sDescripcion || !sPrecio || !sDuracion || !sEstado) return;
    const s = servicios.find((x) => x.id_servicio === id);
    if (!s) return;
    const title = document.getElementById("tituloModalServicio");
    if (title) title.textContent = "Editar Servicio";
    sId.value = String(s.id_servicio);
    sNombre.value = s.nom_servicio;
    sDescripcion.value = s.descripcion;
    sPrecio.value = String(s.precio_servicio);
    sDuracion.value = String(s.duracion_estimada);
    sEstado.value = String(Boolean(s.estado));
    formServicio.dataset.editing = String(id);
    openModal("#modalServicio");
  }

  async function callSQLFunction(url, payload) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    // Seguridad extra por si el backend responde no-JSON
    try {
      return await res.json();
    } catch {
      return { status: res.ok ? "SUCCESS" : "ERROR", message: "Respuesta no JSON" };
    }
  }

  if (formServicio) {
    formServicio.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!sId || !sNombre || !sDescripcion || !sPrecio || !sDuracion || !sEstado) return;

      const payload = {
        id_servicio: Number(sId.value),
        nom_servicio: sNombre.value.trim(),
        descripcion: sDescripcion.value.trim(),
        precio_servicio: Number(sPrecio.value),
        duracion_estimada: Number(sDuracion.value),
        estado: sEstado.value === "true",
      };

      const editing = formServicio.dataset.editing;
      try {
        if (editing) {
          await callSQLFunction("/api/servicios/update", payload);
          const idx = servicios.findIndex((x) => x.id_servicio === Number(editing));
          if (idx !== -1) servicios[idx] = { ...payload };
        } else {
          await callSQLFunction("/api/servicios/insert", payload);
          servicios.push({ ...payload });
        }
        closeModal("#modalServicio");
        drawServicios();
        renderDashboard();
      } catch (err) {
        alert("Error guardando el servicio: " + (err?.message || String(err)));
      }
    });
  }

  async function eliminarServicio(id) {
    if (!confirm("¿Eliminar servicio?")) return;
    try {
      await callSQLFunction("/api/servicios/delete", { id_servicio: id });
      servicios = servicios.filter((s) => s.id_servicio !== id);
      drawServicios();
      renderDashboard();
    } catch (err) {
      alert("Error eliminando servicio: " + (err?.message || String(err)));
    }
  }

  // Exponer a window para onclicks
  window.editarServicio = editarServicio;
  window.eliminarServicio = eliminarServicio;

  /* ===== Configuración (demo) ===== */
  const formConfigTienda = document.getElementById("formConfigTienda");
  if (formConfigTienda) {
    formConfigTienda.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Configuración de tienda guardada ✅");
    });
  }
  const formConfigAdmin = document.getElementById("formConfigAdmin");
  if (formConfigAdmin) {
    formConfigAdmin.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Cuenta admin actualizada ✅");
    });
  }

  /* ===== Init ===== */
  function init() {
    drawProductos();
    drawPedidos();
    drawClientes();
    drawServicios();
    renderDashboard();

    const btnLogout = document.getElementById("btn-logout");
    if (btnLogout) {
      btnLogout.addEventListener("click", () => {
        alert("Sesión cerrada");
        window.location.href = "index.html";
      });
    }
  }
  init();
});
