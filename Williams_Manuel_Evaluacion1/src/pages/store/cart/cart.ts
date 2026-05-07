import {
  obtenerCarrito,
  obtenerPrecioTotal,
  actualizarCantidad,
  eliminarDelCarrito,
  vaciarCarrito,
} from "../../../utils/cart";

// Referencia al contenedor principal del carrito
const contenidoCarrito = document.getElementById("contenido-carrito") as HTMLElement;

// Formatea un número como precio en pesos argentinos
const formatearPrecio = (monto: number): string =>
  `$${monto.toLocaleString("es-AR")}`;

// ── Renderiza el carrito completo ─────────────────────────────
const renderizarCarrito = (): void => {
  const carrito = obtenerCarrito();

  // Si el carrito está vacío muestra el estado vacío
  if (carrito.length === 0) {
    contenidoCarrito.innerHTML = `
      <div class="carrito-vacio">
        <span>🛒</span>
        <p>Tu carrito está vacío.</p>
        <a href="../home/home.html" class="btn-primario">Ver productos</a>
      </div>`;
    return;
  }

  // Genera las filas de la tabla
  const filas = carrito
    .map(
      ({ product, cantidad }) => `
      <tr>
        <td>
          <div class="celda-producto">
            <img src="${product.imagen}" alt="${product.nombre}" />
            <span>${product.nombre}</span>
          </div>
        </td>
        <td>${formatearPrecio(product.precio)}</td>
        <td>
          <!-- Control de cantidad con botones + y - -->
          <div class="control-cantidad">
            <button
              class="btn-cantidad"
              data-id="${product.id}"
              data-delta="-1"
              aria-label="Restar cantidad"
            >−</button>
            <span>${cantidad}</span>
            <button
              class="btn-cantidad"
              data-id="${product.id}"
              data-delta="1"
              aria-label="Sumar cantidad"
            >+</button>
          </div>
        </td>
        <td>${formatearPrecio(product.precio * cantidad)}</td>
        <td>
          <button class="btn-eliminar" data-id="${product.id}">
            Quitar
          </button>
        </td>
      </tr>`
    )
    .join("");

  // Precio total del carrito
  const total = obtenerPrecioTotal();

  contenidoCarrito.innerHTML = `
    <table class="tabla-carrito">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Subtotal</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>${filas}</tbody>
    </table>

    <div class="resumen-carrito">
      <p class="texto-total">
        Total: <span>${formatearPrecio(total)}</span>
      </p>
      <div class="acciones-carrito">
        <a class="btn-contorno" href="../home/home.html">
          ← Seguir comprando
        </a>
        <button class="btn-vaciar" id="btn-vaciar">
          🗑 Vaciar carrito
        </button>
      </div>
    </div>`;

  // ── Eventos de los controles de cantidad ─────────────────
  contenidoCarrito
    .querySelectorAll<HTMLButtonElement>(".btn-cantidad")
    .forEach((boton) => {
      boton.addEventListener("click", () => {
        const id    = Number(boton.dataset["id"]);
        const delta = Number(boton.dataset["delta"]);
        // Actualiza la cantidad; si llega a 0 elimina el item
        actualizarCantidad(id, delta);
        renderizarCarrito();
      });
    });

  // ── Eventos de los botones eliminar ──────────────────────
  contenidoCarrito
    .querySelectorAll<HTMLButtonElement>(".btn-eliminar")
    .forEach((boton) => {
      boton.addEventListener("click", () => {
        const id = Number(boton.dataset["id"]);
        eliminarDelCarrito(id);
        renderizarCarrito();
      });
    });

  // ── Evento del botón vaciar carrito ──────────────────────
  const btnVaciar = document.getElementById("btn-vaciar") as HTMLButtonElement;
  btnVaciar.addEventListener("click", () => {
    if (confirm("¿Estás seguro que querés vaciar el carrito?")) {
      vaciarCarrito();
      renderizarCarrito();
    }
  });
};

// Renderizado inicial
renderizarCarrito();
