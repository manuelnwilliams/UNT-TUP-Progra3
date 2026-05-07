import { buscarUsuario, guardarSesion } from "../../../utils/localStorage";
import { navigate } from "../../../utils/navigate";

// Referencias al DOM
const formulario   = document.getElementById("form-login")    as HTMLFormElement;
const inputEmail   = document.getElementById("email")          as HTMLInputElement;
const inputPassword = document.getElementById("password")      as HTMLInputElement;
const errorGeneral  = document.getElementById("error-general") as HTMLDivElement;
const errorEmail    = document.getElementById("error-email")   as HTMLSpanElement;
const errorPassword = document.getElementById("error-password") as HTMLSpanElement;

// Limpia todos los mensajes de error
const limpiarErrores = (): void => {
  errorEmail.textContent    = "";
  errorPassword.textContent = "";
  errorGeneral.classList.remove("visible");
};

// Valida los campos del formulario; devuelve true si todo está bien
const validarCampos = (): boolean => {
  let valido = true;

  if (!inputEmail.value.trim()) {
    errorEmail.textContent = "El email es obligatorio.";
    valido = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail.value.trim())) {
    errorEmail.textContent = "El formato del email no es válido.";
    valido = false;
  }

  if (!inputPassword.value) {
    errorPassword.textContent = "La contraseña es obligatoria.";
    valido = false;
  }

  return valido;
};

// Manejo del submit
formulario.addEventListener("submit", (evento: SubmitEvent) => {
  evento.preventDefault();
  limpiarErrores();

  // Validación de campos
  if (!validarCampos()) return;

  // Búsqueda del usuario en localStorage
  const usuario = buscarUsuario(
    inputEmail.value.trim(),
    inputPassword.value
  );

  if (!usuario) {
    // Las credenciales no coinciden con ningún registro
    errorGeneral.classList.add("visible");
    return;
  }

  // Guarda la sesión activa e indica que está logueado
  guardarSesion({ ...usuario, loggedIn: true });

  // Redirige según el rol
  if (usuario.role === "admin") {
    navigate("/src/pages/admin/home/home.html");
  } else {
    navigate("/src/pages/client/home/home.html");
  }
});
