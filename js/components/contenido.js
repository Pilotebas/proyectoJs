import {
  getAll,
  getAllpants,
  getAllsweet,
  getAllshirt,
  getAntbyId,
} from "../modules/modules.js";

import { CarritoComponent } from "../components/cart.js";

class MyComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
            <style>
                /* Estilos para el componente */
                .item {
                  margin-top: 20px
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  width: 17.5vw;
                  height: 39vh;
                  border-radius: 1vw;
                  border: 1px solid black;
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
                  padding: 0;
                  width: 7vw;
                  height: 40%;
                  font-size: 1vw;
                  color: white;
                  padding-left: 1vw;
                }

                .item_contenido > div {
                  width: 100%;
                  height: 100%;
                  display: flex;
                  flex-direction: row;
                  align-items: start;
                  justify-content: start ;
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
                  height: 3vh;
                  font-size: 1vw;
                  border-radius: 1vw;
                  background-color: F6F6F6;
                  cursor: pointer;
                  border: none;
                  background-color: #F6F6F6;
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
  // cuando el DOM esta listo
  connectedCallback() {
    const nombre = this.getAttribute("nombre");
    const imagen = this.getAttribute("imagen");
    const precio = this.getAttribute("precio");
    const id = this.getAttribute("id");

    // Configuración de los elementos del componente
    this.shadowRoot.querySelector("h1").textContent = nombre;
    this.shadowRoot.querySelector("button").setAttribute("id", id);

    this.shadowRoot
      .querySelector("button")
      .addEventListener("click", function () {
        let ids = localStorage.getItem("idProduct");

        ids = ids ? ids + ", " + this.id : this.id;

        localStorage.setItem("idProduct", ids);

        const string = localStorage.getItem("idProduct");
        const valores = string.split(", ");
        const contador = {};

        let total = 0;

        valores.forEach((valor) => {
          contador[valor] = (contador[valor] || 0) + 1;
          total++
        });
        let carrito = document.getElementById("carritoContainer");
        carrito.innerHTML = "";

        const myComponent = document.createElement("carrito-component");


        console.log(contador);

        myComponent.shadowRoot.querySelector("h2").textContent = total;

        carrito.appendChild(myComponent);
      });

    this.shadowRoot.querySelector(
      ".imagen"
    ).style.backgroundImage = `url('${imagen}')`;
    this.shadowRoot.querySelector(
      ".item_contenido > div > h1"
    ).textContent = `$${precio}`;
  }
}

customElements.define("my-component", MyComponent);

document.addEventListener("DOMContentLoaded", async () => {
  let container = document.getElementById("contenido");

  function agregarComponentes(json, titulo) {
    contenido.innerHTML = "";


    // Agregar los componentes
    json.forEach((item) => {
      const myComponent = document.createElement("my-component");

      myComponent.setAttribute("nombre", item.nombre);
      myComponent.setAttribute("imagen", item.imagen);
      myComponent.setAttribute("precio", item.precio);
      myComponent.setAttribute("id", item.id);

      container.appendChild(myComponent);
    });
  }

  function agregarComponentesCarrito(json,) {
    container.innerHTML = "";

    // Agregar los componentes
    json.forEach((item) => {
      const myComponent = document.createElement("my-component");

      myComponent.setAttribute("nombre", item.nombre);
      myComponent.setAttribute("imagen", item.imagen);
      myComponent.setAttribute("precio", item.precio);
      myComponent.setAttribute("id", item.id);

      container.appendChild(myComponent);
    });
  }

  document
    .getElementById("opcion1")
    .addEventListener("click", async function () {
      let jsonOpcion1 = await getAll();
      agregarComponentes(jsonOpcion1, "Todos los productos");
    });

  document
    .getElementById("opcion2")
    .addEventListener("click", async function () {
      let jsonOpcion2 = await getAllsweet();
      agregarComponentes(jsonOpcion2, "Abrigos");
    });

  document
    .getElementById("opcion3")
    .addEventListener("click", async function () {
      let jsonOpcion3 = await getAllshirt();
      agregarComponentes(jsonOpcion3, "Camisas");
    });
  document
    .getElementById("opcion4")
    .addEventListener("click", async function () {
      let jsonOpcion4 = await getAllpants();
      agregarComponentes(jsonOpcion4, "Pantalones");
    });
  document
    .getElementById("opcion4")
    .addEventListener("click", async function () {
      let jsonOpcion4 = await getAllpants();
      agregarComponentes(jsonOpcion4, "Pantalones");
    });
  // Inicializar con la opción 1
  let jsonOpcion1 = await getAll();
  agregarComponentes(jsonOpcion1, "Todos los productos");
});
