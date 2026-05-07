import { verificarAcceso, logout } from "../../../utils/auth";
import { obtenerSesion } from "../../../utils/localStorage";
import { PRODUCTS } from "../../../data/data";

// Protege la ruta: solo acceden usuarios con rol "admin"
verificarAcceso(
  "/src/pages/auth/login/login.html",    // redirige si no está logueado
  "/src/pages/client/home/home.html",    // redirige si el rol es "client"
  "admin"
);

// Referencias al DOM
const btnLogout      = document.getElementById("btn-logout")     as HTMLButtonElement;
const nombreUsuario  = document.getElementById("nombre-usuario") as HTMLSpanElement;
const tablaBody      = document.getElementById("tabla-body")     as HTMLTableSectionElement;

// Cierra la sesión al hacer clic en el botón
btnLogout.addEventListener("click", () => {
  logout();
});

// Muestra el email del usuario logueado en el saludo
const sesion = obtenerSesion();
if (sesion) {
  nombreUsuario.textContent = sesion.email;
}

// Renderiza el inventario de productos en la tabla
const renderizarTabla = (): void => {
  tablaBody.innerHTML = "";

  PRODUCTS.forEach((producto) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${producto.id}</td>
      <td>
        <img
          src="${producto.imagen}"
          alt="${producto.nombre}"
          width="70"
          height="55"
          style="object-fit:cover; border-radius:6px;"
        />
      </td>
      <td>${producto.nombre}</td>
      <td>${producto.categoria}</td>
      <td>$${producto.precio.toLocaleString("es-AR")}</td>
    `;

    tablaBody.appendChild(fila);
  });
};

renderizarTabla();
