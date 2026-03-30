
function cargarCategorias() {
    const lista = document.getElementById("lista-categorias");

    categorias.forEach(cat => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="#">${cat}</a>`;
        lista.appendChild(li);
    });
}
cargarCategorias();


function cargarProductos() {
    const contenedor = document.getElementById("contenedor-productos");

    productos.forEach(prod => {

        const article = document.createElement("article");
        article.classList.add("card");

        article.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}">
            
            <div class="card-body">
                <h3>${prod.nombre}</h3>
                <p>${prod.descripcion}</p>

                <div class="card-footer">
                    <p class="precio">$${prod.precio}</p>
                    <button onclick="agregarProducto('${prod.nombre}')">
                        Agregar
                    </button>
                </div>
            </div>
        `;
        contenedor.appendChild(article);
    });
}

function agregarProducto(nombre) {
    alert("Agregaste: " + nombre);
}

cargarProductos();
