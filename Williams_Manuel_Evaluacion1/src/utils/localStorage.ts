import type { IUser } from "../types/IUser";

// Claves usadas en localStorage
const CLAVE_SESION = "sesionActiva";
const CLAVE_USUARIOS = "usuarios";

// ── Sesión activa ─────────────────────────────────────────

// Guarda el usuario logueado en la sesión activa
export const guardarSesion = (usuario: IUser): void => {
  localStorage.setItem(CLAVE_SESION, JSON.stringify(usuario));
};

// Devuelve el usuario de la sesión activa, o null si no hay ninguno
export const obtenerSesion = (): IUser | null => {
  const raw = localStorage.getItem(CLAVE_SESION);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as IUser;
  } catch {
    return null;
  }
};

// Elimina la sesión activa (logout)
export const eliminarSesion = (): void => {
  localStorage.removeItem(CLAVE_SESION);
};

// ── Registro de usuarios ──────────────────────────────────

// Devuelve todos los usuarios registrados
export const obtenerUsuarios = (): IUser[] => {
  const raw = localStorage.getItem(CLAVE_USUARIOS);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as IUser[];
  } catch {
    return [];
  }
};

// Guarda un nuevo usuario en el listado de usuarios registrados
export const registrarUsuario = (usuario: IUser): void => {
  const usuarios = obtenerUsuarios();
  usuarios.push(usuario);
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
};

// Verifica si ya existe un usuario con ese email
export const emailExiste = (email: string): boolean => {
  return obtenerUsuarios().some((u) => u.email === email);
};

// Busca un usuario por email y contraseña; devuelve el usuario o null
export const buscarUsuario = (
  email: string,
  password: string
): IUser | null => {
  return (
    obtenerUsuarios().find(
      (u) => u.email === email && u.password === password
    ) ?? null
  );
};
