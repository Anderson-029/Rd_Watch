/* global Chart */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  /* ===== Variables globales ===== */
  const API_BASE = '../backend/api';
  let productos = [];
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
  let servicios = [];
  let marcas = [];
  let categorias = [];
  let subcategorias = [];

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
      if (ctx._chartInstance) {
        ctx._chartInstance.destroy();
      }
      ctx._chartInstance = new Chart(ctx, {
        type: "bar",
        data: { labels: estados, datasets: [{ label: "Pedidos", data: counts }] },
      });
    }
  }

  /* ===== MARCAS ===== */
  const tbodyMarcas = document.getElementById("tbodyMarcas");
  const btnNuevaMarca = document.getElementById("btnNuevaMarca");
  const formMarca = document.getElementById("formMarca");
  const mId = document.getElementById("mId");
  const mNombre = document.getElementById("mNombre");
  const mEstado = document.getElementById("mEstado");
  const buscarMarca = document.getElementById("buscarMarca");

  async function cargarMarcas() {
    try {
      const res = await fetch(`${API_BASE}/marcas.php`);
      const data = await res.json();
      if (data.ok) {
        marcas = data.marcas;
        drawMarcas();
      }
    } catch (err) {
      console.error('Error cargando marcas:', err);
      alert('Error al cargar marcas');
    }
  }

  function drawMarcas(list = marcas) {
    if (!tbodyMarcas) return;
    tbodyMarcas.innerHTML = list
      .map(
        (m) => `
      <tr>
        <td>${m.id_marca}</td>
        <td>${m.nom_marca}</td>
        <td><span class="badge ${m.estado_marca ? 'active' : 'inactive'}">${m.estado_marca ? 'Activo' : 'Inactivo'}</span></td>
        <td>
          <button class="button button-outline" onclick="editarMarca(${m.id_marca})"><i class="fas fa-pen"></i></button>
          <button class="button button-secondary" onclick="eliminarMarca(${m.id_marca})"><i class="fas fa-trash"></i></button>
        </td>
      </tr>`
      )
      .join("");
  }

  if (buscarMarca) {
    buscarMarca.addEventListener("input", (e) => {
      const q = String(e.target.value || "").toLowerCase();
      drawMarcas(marcas.filter((m) => m.nom_marca.toLowerCase().includes(q)));
    });
  }

  if (btnNuevaMarca && formMarca) {
    btnNuevaMarca.addEventListener("click", () => {
      const title = document.getElementById("tituloModalMarca");
      if (title) title.textContent = "Nueva Marca";
      formMarca.reset();
      formMarca.dataset.editing = "";
      
      const maxId = marcas.length > 0 ? Math.max(...marcas.map(m => m.id_marca)) : 0;
      mId.value = maxId + 1;
      
      openModal("#modalMarca");
    });
  }

  function editarMarca(id) {
    if (!formMarca) return;
    const marca = marcas.find((m) => m.id_marca === id);
    if (!marca) return;
    
    const title = document.getElementById("tituloModalMarca");
    if (title) title.textContent = "Editar Marca";
    
    mId.value = marca.id_marca;
    mId.readOnly = true;
    mNombre.value = marca.nom_marca;
    mEstado.value = marca.estado_marca ? "1" : "0";
    
    formMarca.dataset.editing = String(id);
    openModal("#modalMarca");
  }

  function eliminarMarca(id) {
    if (!confirm("¿Eliminar marca?")) return;
    
    fetch(`${API_BASE}/catalogos.php`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tipo: 'marca', id_marca: id })
    })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        alert('Marca eliminada correctamente');
        cargarMarcas();
      } else {
        alert(data.msg || 'Error al eliminar marca');
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error al eliminar marca');
    });
  }

  if (formMarca) {
    formMarca.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const payload = {
        tipo: 'marca',
        id_marca: Number(mId.value),
        nom_marca: mNombre.value.trim(),
        estado_marca: mEstado.value === "1"
      };

      const editing = formMarca.dataset.editing;

      try {
        const method = editing ? 'PUT' : 'POST';
        const res = await fetch(`${API_BASE}/catalogos.php`, {
          method: method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (data.ok) {
          alert(data.msg);
          closeModal("#modalMarca");
          mId.readOnly = false;
          await cargarMarcas();
        } else {
          alert(data.msg || 'Error al guardar marca');
        }
      } catch (err) {
        console.error(err);
        alert('Error guardando marca: ' + err.message);
      }
    });
  }

  window.editarMarca = editarMarca;
  window.eliminarMarca = eliminarMarca;

  /* ===== CATEGORÍAS ===== */
  const tbodyCategorias = document.getElementById("tbodyCategorias");
  const btnNuevaCategoria = document.getElementById("btnNuevaCategoria");
  const formCategoria = document.getElementById("formCategoria");
  const cId = document.getElementById("cId");
  const cNombre = document.getElementById("cNombre");
  const cDescripcion = document.getElementById("cDescripcion");
  const cEstado = document.getElementById("cEstado");
  const buscarCategoria = document.getElementById("buscarCategoria");

  async function cargarCategorias() {
    try {
      const res = await fetch(`${API_BASE}/catalogos.php?tipo=categorias`);
      const data = await res.json();
      if (data.ok) {
        categorias = data.categorias;
        drawCategorias();
      }
    } catch (err) {
      console.error('Error cargando categorías:', err);
      alert('Error al cargar categorías');
    }
  }

  function drawCategorias(list = categorias) {
    if (!tbodyCategorias) return;
    tbodyCategorias.innerHTML = list
      .map(
        (c) => `
      <tr>
        <td>${c.id_categoria}</td>
        <td>${c.nom_categoria}</td>
        <td>${c.descripcion_categoria}</td>
        <td><span class="badge ${c.estado ? 'active' : 'inactive'}">${c.estado ? 'Activo' : 'Inactivo'}</span></td>
        <td>
          <button class="button button-outline" onclick="editarCategoria(${c.id_categoria})"><i class="fas fa-pen"></i></button>
          <button class="button button-secondary" onclick="eliminarCategoria(${c.id_categoria})"><i class="fas fa-trash"></i></button>
        </td>
      </tr>`
      )
      .join("");
  }

  if (buscarCategoria) {
    buscarCategoria.addEventListener("input", (e) => {
      const q = String(e.target.value || "").toLowerCase();
      drawCategorias(categorias.filter((c) => c.nom_categoria.toLowerCase().includes(q)));
    });
  }

  if (btnNuevaCategoria && formCategoria) {
    btnNuevaCategoria.addEventListener("click", () => {
      const title = document.getElementById("tituloModalCategoria");
      if (title) title.textContent = "Nueva Categoría";
      formCategoria.reset();
      formCategoria.dataset.editing = "";
      
      const maxId = categorias.length > 0 ? Math.max(...categorias.map(c => c.id_categoria)) : 0;
      cId.value = maxId + 1;
      
      openModal("#modalCategoria");
    });
  }

  function editarCategoria(id) {
    if (!formCategoria) return;
    const cat = categorias.find((c) => c.id_categoria === id);
    if (!cat) return;
    
    const title = document.getElementById("tituloModalCategoria");
    if (title) title.textContent = "Editar Categoría";
    
    cId.value = cat.id_categoria;
    cId.readOnly = true;
    cNombre.value = cat.nom_categoria;
    cDescripcion.value = cat.descripcion_categoria;
    cEstado.value = cat.estado ? "1" : "0";
    
    formCategoria.dataset.editing = String(id);
    openModal("#modalCategoria");
  }

  function eliminarCategoria(id) {
    if (!confirm("¿Eliminar categoría?")) return;
    
    fetch(`${API_BASE}/catalogos.php`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tipo: 'categoria', id_categoria: id })
    })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        alert('Categoría eliminada correctamente');
        cargarCategorias();
      } else {
        alert(data.msg || 'Error al eliminar categoría');
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error al eliminar categoría');
    });
  }

  if (formCategoria) {
    formCategoria.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const payload = {
        tipo: 'categoria',
        id_categoria: Number(cId.value),
        nom_categoria: cNombre.value.trim(),
        descripcion_categoria: cDescripcion.value.trim(),
        estado: cEstado.value === "1"
      };

      const editing = formCategoria.dataset.editing;

      try {
        const method = editing ? 'PUT' : 'POST';
        const res = await fetch(`${API_BASE}/catalogos.php`, {
          method: method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (data.ok) {
          alert(data.msg);
          closeModal("#modalCategoria");
          cId.readOnly = false;
          await cargarCategorias();
        } else {
          alert(data.msg || 'Error al guardar categoría');
        }
      } catch (err) {
        console.error(err);
        alert('Error guardando categoría: ' + err.message);
      }
    });
  }

  window.editarCategoria = editarCategoria;
  window.eliminarCategoria = eliminarCategoria;

  /* ===== Productos ===== */
  const tbodyProductos = document.getElementById("tbodyProductos");
  const buscarProducto = document.getElementById("buscarProducto");
  const btnNuevoProducto = document.getElementById("btnNuevoProducto");

  async function cargarProductos() {
    try {
      const res = await fetch(`${API_BASE}/productos.php`);
      const data = await res.json();
      if (data.ok) {
        productos = data.productos.map(p => ({
          id: p.id_producto,
          nombre: p.nom_producto,
          precio: parseFloat(p.precio),
          stock: parseInt(p.stock),
          imagen: p.url_imagen || 'https://via.placeholder.com/90x90?text=Producto',
          marca: p.nom_marca || 'N/A',
          categoria: p.nom_categoria || 'N/A',
          descripcion: p.descripcion || '',
          id_marca: p.id_marca,
          id_categoria: p.id_categoria,
          id_subcategoria: p.id_subcategoria
        }));
        drawProductos();
      }
    } catch (err) {
      console.error('Error cargando productos:', err);
      alert('Error al cargar productos');
    }
  }

  function drawProductos(list = productos) {
    if (!tbodyProductos) return;
    tbodyProductos.innerHTML = list
      .map(
        (p) => `
      <tr>
        <td><img src="${p.imagen}" alt="${p.nombre}"></td>
        <td>${p.nombre}</td>
        <td>$${Number(p.precio).toFixed(2)}</td>
        <td>${p.stock}</td>
        <td>${p.marca}</td>
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
  const pId = document.getElementById("pId");
  const pNombre = document.getElementById("pNombre");
  const pDescripcion = document.getElementById("pDescripcion");
  const pPrecio = document.getElementById("pPrecio");
  const pStock = document.getElementById("pStock");
  const pImagen = document.getElementById("pImagen");
  const pMarca = document.getElementById("pMarca");
  const pCategoria = document.getElementById("pCategoria");
  const pSubcategoria = document.getElementById("pSubcategoria");

  async function cargarCatalogos() {
    try {
      const resMarcas = await fetch(`${API_BASE}/catalogos.php?tipo=marcas`);
      const dataMarcas = await resMarcas.json();
      if (dataMarcas.ok) {
        pMarca.innerHTML = '<option value="">Seleccione...</option>' +
          dataMarcas.marcas.map(m => `<option value="${m.id_marca}">${m.nom_marca}</option>`).join('');
      }

      const resCat = await fetch(`${API_BASE}/catalogos.php?tipo=categorias`);
      const dataCat = await resCat.json();
      if (dataCat.ok) {
        pCategoria.innerHTML = '<option value="">Seleccione...</option>' +
          dataCat.categorias.map(c => `<option value="${c.id_categoria}">${c.nom_categoria}</option>`).join('');
      }
    } catch (err) {
      console.error('Error cargando catálogos:', err);
    }
  }

  if (pCategoria) {
    pCategoria.addEventListener('change', async () => {
      const idCat = pCategoria.value;
      if (!idCat) {
        pSubcategoria.innerHTML = '<option value="">Seleccione...</option>';
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/catalogos.php?tipo=subcategorias&id_categoria=${idCat}`);
        const data = await res.json();
        if (data.ok) {
          pSubcategoria.innerHTML = '<option value="">Seleccione...</option>' +
            data.subcategorias.map(s => `<option value="${s.id_subcategoria}">${s.nom_subcategoria}</option>`).join('');
        }
      } catch (err) {
        console.error('Error cargando subcategorías:', err);
      }
    });
  }

  if (btnNuevoProducto && formProducto) {
    btnNuevoProducto.addEventListener("click", async () => {
      const title = document.getElementById("tituloModalProducto");
      if (title) title.textContent = "Nuevo Producto";
      formProducto.reset();
      formProducto.dataset.editing = "";
      await cargarCatalogos();
      
      const maxId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) : 0;
      pId.value = maxId + 1;
      
      openModal("#modalProducto");
    });
  }

  function editarProducto(id) {
    if (!formProducto) return;
    const prod = productos.find((p) => p.id === id);
    if (!prod) return;
    
    cargarCatalogos().then(() => {
      const title = document.getElementById("tituloModalProducto");
      if (title) title.textContent = "Editar Producto";
      
      pId.value = prod.id;
      pId.readOnly = true;
      pNombre.value = prod.nombre;
      pDescripcion.value = prod.descripcion || '';
      pPrecio.value = prod.precio;
      pStock.value = prod.stock || 0;
      pImagen.value = prod.imagen;
      
      setTimeout(() => {
        if (prod.id_marca) pMarca.value = prod.id_marca;
        if (prod.id_categoria) {
          pCategoria.value = prod.id_categoria;
          pCategoria.dispatchEvent(new Event('change'));
          setTimeout(() => {
            if (prod.id_subcategoria) pSubcategoria.value = prod.id_subcategoria;
          }, 500);
        }
      }, 300);
      
      formProducto.dataset.editing = String(id);
      openModal("#modalProducto");
    });
  }

  function eliminarProducto(id) {
    if (!confirm("¿Eliminar producto?")) return;
    
    fetch(`${API_BASE}/productos.php`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_producto: id })
    })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        alert('Producto eliminado correctamente');
        cargarProductos();
        renderDashboard();
      } else {
        alert(data.msg || 'Error al eliminar producto');
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error al eliminar producto');
    });
  }

  if (formProducto) {
    formProducto.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const payload = {
        id_producto: Number(pId.value),
        id_marca: Number(pMarca.value),
        nom_producto: pNombre.value.trim(),
        descripcion: pDescripcion.value.trim(),
        precio: Number(pPrecio.value),
        id_categoria: Number(pCategoria.value),
        id_subcategoria: Number(pSubcategoria.value),
        stock: Number(pStock.value),
        url_imagen: pImagen.value.trim() || null
      };

      const editing = formProducto.dataset.editing;

      try {
        const method = editing ? 'PUT' : 'POST';
        const res = await fetch(`${API_BASE}/productos.php`, {
          method: method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (data.ok) {
          alert(data.msg);
          closeModal("#modalProducto");
          pId.readOnly = false;
          await cargarProductos();
          renderDashboard();
        } else {
          alert(data.msg || 'Error al guardar producto');
        }
      } catch (err) {
        console.error(err);
        alert('Error guardando producto: ' + err.message);
      }
    });
  }

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
  const buscarServicio = document.getElementById("buscarServicio");

  async function cargarServicios() {
    try {
      const res = await fetch(`${API_BASE}/servicios.php`);
      const data = await res.json();
      if (data.ok) {
        servicios = data.servicios;
        drawServicios();
      }
    } catch (err) {
      console.error('Error cargando servicios:', err);
      alert('Error al cargar servicios');
    }
  }

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
      
      const maxId = servicios.length > 0 ? Math.max(...servicios.map(s => s.id_servicio)) : 100;
      sId.value = maxId + 1;
      
      openModal("#modalServicio");
    });
  }

  function editarServicio(id) {
    if (!formServicio || !sId || !sNombre || !sDescripcion || !sPrecio || !sDuracion) return;
    const s = servicios.find((x) => x.id_servicio === id);
    if (!s) return;
    const title = document.getElementById("tituloModalServicio");
    if (title) title.textContent = "Editar Servicio";
    sId.value = String(s.id_servicio);
    sId.readOnly = true;
    sNombre.value = s.nom_servicio;
    sDescripcion.value = s.descripcion;
    sPrecio.value = String(s.precio_servicio);
    sDuracion.value = String(s.duracion_estimada);
    formServicio.dataset.editing = String(id);
    openModal("#modalServicio");
  }

  if (formServicio) {
    formServicio.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!sId || !sNombre || !sDescripcion || !sPrecio || !sDuracion) return;

      const payload = {
        id_servicio: Number(sId.value),
        nom_servicio: sNombre.value.trim(),
        descripcion: sDescripcion.value.trim(),
        precio_servicio: Number(sPrecio.value),
        duracion_estimada: Number(sDuracion.value)
      };

      const editing = formServicio.dataset.editing;
      
      try {
        const method = editing ? 'PUT' : 'POST';
        const res = await fetch(`${API_BASE}/servicios.php`, {
          method: method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        
        const data = await res.json();
        
        if (data.ok) {
          alert(data.msg);
          closeModal("#modalServicio");
          sId.readOnly = false;
          await cargarServicios();
          renderDashboard();
        } else {
          alert(data.msg || 'Error al guardar servicio');
        }
      } catch (err) {
        console.error(err);
        alert("Error guardando el servicio: " + err.message);
      }
    });
  }

  async function eliminarServicio(id) {
    if (!confirm("¿Eliminar servicio?")) return;
    
    try {
      const res = await fetch(`${API_BASE}/servicios.php`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_servicio: id })
      });
      
      const data = await res.json();
      
      if (data.ok) {
        alert('Servicio eliminado correctamente');
        await cargarServicios();
        renderDashboard();
      } else {
        alert(data.msg || 'Error al eliminar servicio');
      }
    } catch (err) {
      console.error(err);
      alert("Error eliminando servicio: " + err.message);
    }
  }

  window.editarServicio = editarServicio;
  window.eliminarServicio = eliminarServicio;

  /* ===== Configuración ===== */
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
  async function init() {
    await cargarProductos();
    await cargarMarcas();
    await cargarCategorias();
    await cargarServicios();
    drawPedidos();
    drawClientes();
    renderDashboard();

    const btnLogout = document.getElementById("btn-logout");
    if (btnLogout) {
      btnLogout.addEventListener("click", () => {
        alert("Sesión cerrada");
        window.location.href = "../frontend/public/index.html";
      });
    }
  }
  init();
});