import {
  emailExiste,
  registrarUsuario,
  guardarSesion,
} from "../../../utils/localStorage";
import { navigate } from "../../../utils/navigate";

// Todos los usuarios registrados son clientes por defecto
const ROL_POR_DEFECTO = "client" as const;

// Referencias al DOM
const formulario     = document.getElementById("form-registro")     as HTMLFormElement;
const inputEmail     = document.getElementById("email")              as HTMLInputElement;
const inputPassword  = document.getElementById("password")           as HTMLInputElement;
const inputConfirmar = document.getElementById("confirmar-password") as HTMLInputElement;
const errorGeneral   = document.getElementById("error-general")      as HTMLDivElement;
const errorEmail     = document.getElementById("error-email")        as HTMLSpanElement;
const errorPassword  = document.getElementById("error-password")     as HTMLSpanElement;
const errorConfirmar = document.getElementById("error-confirmar")    as HTMLSpanElement;

// Limpia todos los mensajes de error
const limpiarErrores = (): void => {
  errorEmail.textContent     = "";
  errorPassword.textContent  = "";
  errorConfirmar.textContent = "";
  errorGeneral.textContent   = "";
  errorGeneral.classList.remove("visible");
};

// Valida todos los campos; devuelve true si son correctos
const validarCampos = (): boolean => {
  let valido = true;

  // Validación de email
  if (!inputEmail.value.trim()) {
    errorEmail.textContent = "El email es obligatorio.";
    valido = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail.value.trim())) {
    errorEmail.textContent = "El formato del email no es válido.";
    valido = false;
  }

  // Validación de contraseña
  if (!inputPassword.value) {
    errorPassword.textContent = "La contraseña es obligatoria.";
    valido = false;
  } else if (inputPassword.value.length < 6) {
    errorPassword.textContent = "La contraseña debe tener al menos 6 caracteres.";
    valido = false;
  }

  // Validación de confirmación de contraseña
  if (!inputConfirmar.value) {
    errorConfirmar.textContent = "Confirmá tu contraseña.";
    valido = false;
  } else if (inputPassword.value !== inputConfirmar.value) {
    errorConfirmar.textContent = "Las contraseñas no coinciden.";
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

  // Verifica que el email no esté ya registrado
  if (emailExiste(inputEmail.value.trim())) {
    errorGeneral.textContent = "Ya existe una cuenta con ese email.";
    errorGeneral.classList.add("visible");
    return;
  }

  // Crea y guarda el nuevo usuario con rol "client" por defecto
  const nuevoUsuario = {
    email:    inputEmail.value.trim(),
    password: inputPassword.value,
    role:     ROL_POR_DEFECTO,
    loggedIn: true,
  };

  registrarUsuario(nuevoUsuario);

  // Inicia sesión automáticamente tras el registro
  guardarSesion(nuevoUsuario);

  // Los clientes siempre van a su home
  navigate("/src/pages/client/home/home.html");
});