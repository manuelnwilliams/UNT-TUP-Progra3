import type { IUser } from "../../../types/IUser";
import type { Rol } from "../../../types/Rol";
import { getUsers, saveUsers } from "../../../utils/localStorage";
import { navigate } from "../../../utils/navigate";

console.log("registro cargado");

const form = document.getElementById("registerForm") as HTMLFormElement;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // capturar valores
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement).value;

  // traer usuarios guardados
  const users: IUser[] = getUsers();

  // validar que el usuario no exista
  const exists = users.find((u: IUser) => u.email === email);

  if (exists) {
    alert("El usuario ya esta registrado");
    return;
  }

  // crear nuevo usuario 
  const newUser: IUser = {
    email: email,
    password: password,
    rol: "client" as Rol, // siempre client

  // guardar usuario 
  users.push(newUser);
  saveUsers(users);

  alert("Usuario registrado correctamente");
  navigate("/src/pages/auth/login/login.html");
});