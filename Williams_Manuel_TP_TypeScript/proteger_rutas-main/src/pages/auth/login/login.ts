import { navigate } from "../../../utils/navigate";
import { getUsers, saveSession } from "../../../utils/localStorage";
import type { IUser } from "../../../types/IUser";

const form = document.getElementById("loginForm") as HTMLFormElement;

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement).value;

  // traer usuarios
  const users: IUser[] = getUsers();

  // validar credenciales
  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    alert("Credenciales incorrectas");
    return;
  }

  saveSession(user);

  // redirigir según rol
 if (user.rol === "admin") {
  navigate("/src/pages/admin/home/home.html");
  } else {
  navigate("/src/pages/client/home/home.html");
  }
});
