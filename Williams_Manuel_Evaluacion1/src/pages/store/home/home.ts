import { PRODUCTS, getCategories } from "../../../data/data";
import type { Product } from "../../../types/IProduct";
import { agregarAlCarrito, obtenerCantidadTotal } from "../../../utils/cart";
import { obtenerSesion } from "../../../utils/localStorage";

// ── Estado de los filtros ─────────────────────────────────────
let categoriaActiva: string = "Todas";
let textoBusqueda: string   = "";

// ── Referencias al DOM ────────────────────────────────────────
const contenedorProductos = document.getElementById("contenedor-productos") as HTMLElement;
const listaCategoriasEl   = document.getElementById("lista-categorias")     as HTMLUListElement;
const inputBusqueda       = document.getElementById("input-busqueda")       as HTMLInputElement;
const formBusqueda        = document.getElementById("form-busqueda")        as HTMLFormElement;
const contadorCarrito     = document.getElementById("contador-carrito")     as HTMLSpanElement;
const toast               = document.getElementById("toast")                as HTMLDivElement;
const linkCuenta          = document.getElementById("link-cuenta")          as HTMLAnchorElement;

// ── Toast de notificación ─────────────────────────────────────
const mostrarToast = (mensaje: string): void => {
  toast.textContent = mensaje;
  toast.classList.add("visible");
  setTimeout(() => toast.classList.remove("visible"), 2200);
};

// ── Actualiza el badge con la cantidad del carrito ────────────
const actualizarBadgeCarrito = (): void => {
  contadorCarrito.textContent = String(obtenerCantidadTotal());
};

// ── Aplica los filtros activos y re-renderiza ─────────────────
const aplicarFiltros = (): void => {
  let resultado = PRODUCTS;

  // Filtro por categoría
  if (categoriaActiva !== "Todas") {
    resultado = resultado.filter((p) => p.categoria === categoriaActiva);
  }

  // Filtro por texto de búsqueda
  const query = textoBusqueda.trim().toLowerCase();
  if (query) {
    resultado = resultado.filter((p) =>
      p.nombre.toLowerCase().includes(query)
    );
  }

  renderizarProductos(resultado);
};

// ── Renderiza las tarjetas de productos ──────────────────────
const renderizarProductos = (productos: Product[]): void => {
  contenedorProductos.innerHTML = "";

  if (productos.length === 0) {
    contenedorProductos.innerHTML = `
      <div class="estado-vacio">
        <span>🔍</span>
        <p>No se encontraron productos que coincidan con tu búsqueda.</p>
      </div>`;
    return;
  }

  productos.forEach((producto) => {
    const articulo = document.createElement("article");
    articulo.classList.add("card-producto");

    articulo.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy" />
      <div class="card-body">
        <span class="badge-categoria">${producto.categoria}</span>
        <h3>${producto.nombre}</h3>
        <p class="descripcion">${producto.descripcion}</p>
        <p class="precio">$${producto.precio.toLocaleString("es-AR")}</p>
        <button class="btn-agregar" data-id="${producto.id}">
          🛒 Agregar al carrito
        </button>
      </div>`;

    // Evento del botón agregar
    const boton = articulo.querySelector(".btn-agregar") as HTMLButtonElement;
    boton.addEventListener("click", () => {
      agregarAlCarrito(producto);
      actualizarBadgeCarrito();
      mostrarToast(`✔ "${producto.nombre}" agregado al carrito`);

      // Feedback visual temporal en el botón
      boton.textContent = "✔ Agregado";
      boton.classList.add("agregado");
      setTimeout(() => {
        boton.textContent = "🛒 Agregar al carrito";
        boton.classList.remove("agregado");
      }, 1500);
    });

    contenedorProductos.appendChild(articulo);
  });
};

// ── Renderiza las categorías en el aside ─────────────────────
const renderizarCategorias = (): void => {
  // Opción "Todas"
  const liTodas = document.createElement("li");
  liTodas.innerHTML = `<a href="#" class="activo" data-categoria="Todas">Todas</a>`;
  listaCategoriasEl.appendChild(liTodas);

  // Resto de categorías obtenidas desde los datos
  getCategories().forEach(({ nombre }) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="#" data-categoria="${nombre}">${nombre}</a>`;
    listaCategoriasEl.appendChild(li);
  });

  // Evento de clic en la lista completa (delegación)
  listaCategoriasEl.addEventListener("click", (evento) => {
    evento.preventDefault();
    const enlace = evento.target as HTMLElement;
    if (!enlace.dataset["categoria"]) return;

    // Actualiza la clase activo
    listaCategoriasEl
      .querySelectorAll("a")
      .forEach((a) => a.classList.remove("activo"));
    enlace.classList.add("activo");

    categoriaActiva = enlace.dataset["categoria"]!;
    aplicarFiltros();
  });
};

// ── Eventos de búsqueda ───────────────────────────────────────

// Búsqueda al hacer submit del form
formBusqueda.addEventListener("submit", (evento) => {
  evento.preventDefault();
  textoBusqueda = inputBusqueda.value;
  aplicarFiltros();
});

// Búsqueda en tiempo real mientras el usuario escribe
inputBusqueda.addEventListener("input", () => {
  textoBusqueda = inputBusqueda.value;
  aplicarFiltros();
});

// ── Muestra el link correcto según la sesión activa ───────────
const configurarLinkCuenta = (): void => {
  const sesion = obtenerSesion();
  if (sesion && sesion.loggedIn) {
    const ruta =
      sesion.role === "admin"
        ? "/src/pages/admin/home/home.html"
        : "/src/pages/client/home/home.html";
    linkCuenta.href        = ruta;
    linkCuenta.textContent = `👤 ${sesion.email}`;
  }
};

// ── Inicialización ────────────────────────────────────────────
const inicializar = (): void => {
  renderizarCategorias();
  renderizarProductos(PRODUCTS);
  actualizarBadgeCarrito();
  configurarLinkCuenta();
};

inicializar();
