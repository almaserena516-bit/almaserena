/* ==========================================================================
   ALMA SERENA - CATALOGO (js/catalogo.js)
   Carga productos.json y los muestra en #productos, con botón de compra
   ========================================================================== */

let todosLosProductos = [];

document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('productos');
    const filtroCategoria = document.getElementById('categoriaFiltro');
    const ordenar = document.getElementById('ordenar');

    if (!contenedor) return;

    fetch('productos.json')
        .then(res => res.json())
        .then(productos => {
            todosLosProductos = productos;
            llenarFiltroCategorias(productos);
            mostrarProductos(productos);
        })
        .catch(err => {
            contenedor.innerHTML = '<p style="color:#fff;">No se pudieron cargar los productos.</p>';
            console.error('Error cargando productos.json:', err);
        });

    if (filtroCategoria) {
        filtroCategoria.addEventListener('change', aplicarFiltrosYOrden);
    }
    if (ordenar) {
        ordenar.addEventListener('change', aplicarFiltrosYOrden);
    }

    function llenarFiltroCategorias(productos) {
        if (!filtroCategoria) return;
        const categorias = [...new Set(productos.map(p => p.categoria))];
        categorias.forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat;
            opt.textContent = cat;
            filtroCategoria.appendChild(opt);
        });
    }

    function aplicarFiltrosYOrden() {
        let resultado = [...todosLosProductos];

        if (filtroCategoria && filtroCategoria.value !== 'todos') {
            resultado = resultado.filter(p => p.categoria === filtroCategoria.value);
        }

        if (ordenar) {
            if (ordenar.value === 'precio') {
                resultado.sort((a, b) => a.precio - b.precio);
            } else {
                resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
            }
        }

        mostrarProductos(resultado);
    }

    function mostrarProductos(productos) {
        contenedor.innerHTML = '';
        if (productos.length === 0) {
            contenedor.innerHTML = '<p style="color:#fff;">No se encontraron productos.</p>';
            return;
        }
        productos.forEach(p => {
            const card = document.createElement('div');
            card.className = 'producto';
            card.innerHTML = `
                <img src="${p.imagen}" alt="${p.nombre}" loading="lazy">
                <h3>${p.nombre}</h3>
                <p>${p.descripcion}</p>
                <span class="precio">$${p.precio}</span>
                <a href="${p.link}" target="_blank" class="btnGold" style="display:inline-block;margin-top:10px;">Comprar</a>
            `;
            contenedor.appendChild(card);
        });
    }
});
