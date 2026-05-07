import type { Product } from "../types/IProduct";
import type { Icategoria } from "../types/Icategoria";

// Lista de productos disponibles en la tienda
export const PRODUCTS: Product[] = [
  {
    id: 1,
    nombre: "Hamburguesa Triple",
    descripcion: "Triple carne, cheddar y bacon",
    precio: 25000,
    imagen:
      "https://www.shutterstock.com/image-photo/triple-burger-cheddar-onion-tomato-260nw-2087903464.jpg",
    categoria: "Hamburguesas",
  },
  {
    id: 2,
    nombre: "Pizza Muzzarella",
    descripcion: "Salsa casera y orégano",
    precio: 18000,
    imagen:
      "https://t3.ftcdn.net/jpg/04/44/86/70/360_F_444867086_79U7yvSiS6LaEWo8nN0ZYX8CJ7NhvhJh.jpg",
    categoria: "Pizzas",
  },
  {
    id: 3,
    nombre: "Papas Fritas",
    descripcion: "Papas fritas con cheddar y bacon",
    precio: 5000,
    imagen:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400",
    categoria: "Papas Fritas",
  },
  {
    id: 4,
    nombre: "Bebida Cola",
    descripcion: "Bebida Cola 500 ml.",
    precio: 2000,
    imagen:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400",
    categoria: "Bebidas",
  },
  {
    id: 5,
    nombre: "Empanadas x12",
    descripcion: "Empanadas de carne al horno",
    precio: 20000,
    imagen:
      "https://www.shutterstock.com/image-photo/delicious-argentinian-empanadas-filled-meat-260nw-2673296227.jpg",
    categoria: "Empanadas",
  },
  {
    id: 6,
    nombre: "Pizza Napolitana",
    descripcion: "Tomate, muzzarella y albahaca fresca",
    precio: 20000,
    imagen:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
    categoria: "Pizzas",
  },
];

// Devuelve la lista de categorías únicas derivadas de los productos
export const getCategories = (): Icategoria[] => {
  const nombres = [...new Set(PRODUCTS.map((p) => p.categoria))];
  return nombres.map((nombre) => ({ nombre }));
};
