class MyItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        // Establece los estilos del componente
        this.shadowRoot.innerHTML = /*html*/ `
        <style>
            /* Estilos para el componente */
            .item {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 17.5vw;
            height: 39vh;
            border-radius: 1vw;
            border: 1px solid black;
            overflow: hidden;
            }

            .imagen {
            width: 100%;
            height: 80%;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            border-radius: 1vw;
            cursor: pointer;
            transition: background-image 0.6s;
            }

            .item_contenido {
            width: 100%;
            height: 20%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            background-color: #333333;
            border-radius: 0 0 1vw 1vw;
            }

            .item_contenido > h1 {
            font-size: 1vw;
            margin: 0;
            }

            .item_contenido > div {
            display: flex;
            align-items: center;
            justify-content: space-around;
            width: 100%;
            margin-top: 0.5vh;
            }

            .item_contenido > div > h1 {
            margin-left: 1vw;
            color: white;
            padding: 0;
            width: 50%;
            height: 100%;
            font-size: 1vw;
            }

            .item_contenido > div > button {
            width: 35%;
            height: 3.5vh;
            font-size: 1vw;
            border-radius: 1vw;
            background-color: #F6F6F6;
            cursor: pointer;
            border: none;
            }

            .item_contenido > div > button:hover {
            scale: 1.1;
            background-color: #C5E0F6;
            }
        </style>
        <section class="item">
            <div class="imagen"></div>
            <div class="item_contenido">
            <h1></h1>
            <div>
                <h1></h1>
                <button>Agregar</button>
            </div>
            </div>
        </section>
        `;
    }

    // Define un setter para los datos del JSON
    set datos(value) {
        this.shadowRoot.querySelector('.imagen').style.backgroundImage = `url(${value.imagen})`;
        this.shadowRoot.querySelector('.item_contenido h1').textContent = value.nombre;
        this.shadowRoot.querySelector('.item_contenido div h1').textContent = `$ ${value.precio}`;
    }

    // Método para cargar los datos del JSON mediante fetch
    async cargarDatos(url) {
        try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Asignar los datos al componente
        this.datos = data;
        } catch (error) {
        console.error('Fetch error: ', error);
        }
    }

    // Método que se ejecuta cuando el componente se conecta al DOM
    connectedCallback() {
        // URL del JSON
        const url = '../bd/bd.json';
        // Cargar los datos del JSON
        this.cargarDatos(url);
    }
    }

    customElements.define('my-contenido', MyItem);
