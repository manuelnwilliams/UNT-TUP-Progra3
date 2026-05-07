# 🍔 Food Store

Aplicación web de una tienda de comida online desarrollada como trabajo práctico del primer parcial de **Programación 3**. Permite explorar un catálogo de productos, agregar items al carrito, buscar y filtrar por categoría, y gestionar usuarios con registro, login y autenticación por roles.

---

## ✨ Funcionalidades

- **Catálogo dinámico** de productos con grilla responsive
- **Búsqueda en tiempo real** y **filtros por categoría** combinables
- **Carrito de compras** persistente con controles de cantidad por producto
- **Registro** de usuarios con validación de campos
- **Login** con autenticación de credenciales
- **Protección de rutas** según el rol del usuario (`admin` / `client`)
- **Estilos CSS** separados por sección

---

## 🗂 Estructura del proyecto

```
src/
├── data/
│   └── data.ts               # Productos y categorías
├── pages/
│   ├── auth/
│   │   ├── login/            # Página de inicio de sesión
│   │   └── registro/         # Página de registro
│   ├── admin/home/           # Panel del administrador (ruta protegida)
│   ├── client/home/          # Home del cliente (ruta protegida)
│   └── store/
│       ├── home/             # Catálogo de productos
│       └── cart/             # Carrito de compras
├── styles/
│   ├── global.css            # Variables, reset y estilos globales
│   ├── auth.css              # Login y registro
│   ├── store.css             # Catálogo y header
│   ├── cart.css              # Vista del carrito
│   └── panel.css             # Paneles de admin y cliente
├── types/
│   ├── IUser.ts
│   ├── IProduct.ts
│   ├── Icategoria.ts
│   └── Rol.ts
└── utils/
    ├── auth.ts               # Protección de rutas y logout
    ├── cart.ts               # Lógica del carrito
    ├── localStorage.ts       # Gestión de sesión y usuarios
    └── navigate.ts           # Redirección
```

---

## ⚙️ Requisitos previos

- [Node.js](https://nodejs.org/) v20 o superior
- [pnpm](https://pnpm.io/) (recomendado) o npm

---

## 🚀 Instrucciones para ejecutar

### 1. Clonar o descomprimir el proyecto

```bash
# Si lo clonás desde git
git clone <url-del-repositorio>
cd foodstore

# Si lo descomprimís desde el ZIP
# Descomprimir y acceder a la carpeta del proyecto
```

### 2. Instalar dependencias

```bash
pnpm install
```

> Si no tenés pnpm instalado, podés instalarlo con:
> ```bash
> npm install -g pnpm
> ```

### 3. Iniciar el servidor de desarrollo

```bash
pnpm dev
```

La aplicación estará disponible en **http://localhost:5173**

### 4. (Opcional) Generar la build de producción

```bash
pnpm build
```

---

## 👤 Cómo usar la aplicación

1. Al ingresar, se redirige automáticamente al **catálogo de productos**
2. Para acceder a las rutas protegidas, ir a **Registro** y crear una cuenta
   - Todos los usuarios nuevos se registran como **clientes** por defecto
3. Tras registrarse, el sistema inicia sesión automáticamente y redirige al home del cliente
4. Desde el header se puede navegar al **carrito** o volver al catálogo

> **Nota sobre la cuenta admin:** para crear una cuenta con rol `admin`, se puede agregar manualmente un usuario en `localStorage` desde las DevTools del navegador bajo la clave `usuarios`, o modificar el rol de un usuario ya registrado.

---

## ⚠️ Consideraciones de seguridad

Este proyecto utiliza `localStorage` para persistir usuarios y sesiones con fines **educativos**. Esta implementación **no es segura para producción**: cualquier usuario con acceso a las DevTools del navegador puede modificar los datos almacenados. La autenticación real debe implementarse en el backend.

---

## 🛠 Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| TypeScript | Lógica de la aplicación con tipado estricto |
| Vite | Bundler y servidor de desarrollo |
| HTML5 + CSS3 | Estructura y estilos |
| localStorage | Persistencia de usuarios, sesión y carrito |
