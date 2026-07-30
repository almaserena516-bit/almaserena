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

    // 👇 BLOQUE NUEVO: conecta las tarjetas de "Explora nuestras categorías" con el filtro
    document.querySelectorAll('.categoria').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const nombreCategoria = card.querySelector('h3').textContent.trim();

            // Marca visualmente cuál está activa
            document.querySelectorAll('.categoria').forEach(c => c.classList.remove('activa'));
            card.classList.add('activa');

            // Selecciona esa categoría en el <select> del catálogo
            if (filtroCategoria) {
                const existeOpcion = [...filtroCategoria.options].some(o => o.value === nombreCategoria);
                filtroCategoria.value = existeOpcion ? nombreCategoria : 'todos';
            }

            aplicarFiltrosYOrden();

            // Baja automáticamente hasta el catálogo
            const catalogo = document.getElementById('catalogo');
            if (catalogo) catalogo.scrollIntoView({ behavior: 'smooth' });
        });
    });
    // 👆 FIN DEL BLOQUE NUEVO

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
