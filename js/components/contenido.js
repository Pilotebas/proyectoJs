class MyContenido extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        // Inicializa el shadow DOM con los enlaces de estilos y un contenedor para el contenido
        this.shadowRoot.innerHTML = /*html*/ `
        <link rel="stylesheet" href="../css/style.css">
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
        <div id="content"></div> <!-- Contenedor inicial -->
    `;
    }

    /**
     * Cuando el DOM esté listo
     */
    connectedCallback() {
        this.fetchData();
    }

    /**
     * Función para obtener datos desde una URL JSON
     */
    async fetchData() {
        try {
            const response = await fetch('bd/bd.json'); // Ajuste de la ruta al archivo JSON
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.updateContent(data);
        } catch (error) {
            console.error('Fetch error: ', error);
        }
    }

    /**
     * Función para actualizar el contenido del componente con datos del JSON
     */
    updateContent(data) {
        // Selecciona el div de contenido
        const content = this.shadowRoot.querySelector('#content');

        // Genera el contenido HTML basado en los datos del JSON
        let htmlContent = '';

        // Recorre cada categoría de productos
        for (const category in data) {
            if (data.hasOwnProperty(category)) {
                htmlContent += `<h2>${category.charAt(0).toUpperCase() + category.slice(1)}</h2>`;
                data[category].forEach(item => {
                    htmlContent += /*html*/`
                <div class="imagen">
                    <img src="${item.imagen}" alt="${item.nombre}">
                </div>
                <div class="item_contenido">
                    <h1>${item.nombre}</h1>
                    <div class="precio">
                        <h1>$${item.precio}</h1>
                        <button>Agregar</button>
                    </div>
                </div>
            `;
                });
            }
        }

        // Actualiza el contenido del div
        content.innerHTML = htmlContent;
    }
}

// Register the MyHeader component using the tag name <my-header>
customElements.define('my-contenido', MyContenido);
