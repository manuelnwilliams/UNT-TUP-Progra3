import type { CartItem, Product } from "../types/IProduct";

// Clave usada en localStorage para el carrito
const CLAVE_CARRITO = "foodstore_carrito";

// Devuelve los items actuales del carrito
export const obtenerCarrito = (): CartItem[] => {
  const raw = localStorage.getItem(CLAVE_CARRITO);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
};

// Persiste el carrito en localStorage
const guardarCarrito = (carrito: CartItem[]): void => {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
};

// Agrega un producto al carrito; si ya existe, incrementa la cantidad
export const agregarAlCarrito = (producto: Product): void => {
  const carrito = obtenerCarrito();
  const existente = carrito.find((item) => item.product.id === producto.id);

  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ product: producto, cantidad: 1 });
  }

  guardarCarrito(carrito);
};

// Modifica la cantidad de un producto en +1 o -1.
// Si la cantidad llega a 0, elimina el producto del carrito.
export const actualizarCantidad = (
  productoId: number,
  delta: number
): void => {
  const carrito = obtenerCarrito();
  const item = carrito.find((i) => i.product.id === productoId);
  if (!item) return;

  item.cantidad += delta;

  if (item.cantidad <= 0) {
    guardarCarrito(carrito.filter((i) => i.product.id !== productoId));
  } else {
    guardarCarrito(carrito);
  }
};

// Elimina completamente un producto del carrito
export const eliminarDelCarrito = (productoId: number): void => {
  guardarCarrito(
    obtenerCarrito().filter((item) => item.product.id !== productoId)
  );
};

// Vacía todo el carrito
export const vaciarCarrito = (): void => {
  localStorage.removeItem(CLAVE_CARRITO);
};

// Devuelve la cantidad total de items en el carrito
export const obtenerCantidadTotal = (): number => {
  return obtenerCarrito().reduce((suma, item) => suma + item.cantidad, 0);
};

// Devuelve el precio total del carrito
export const obtenerPrecioTotal = (): number => {
  return obtenerCarrito().reduce(
    (suma, item) => suma + item.product.precio * item.cantidad,
    0
  );
};
