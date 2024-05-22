import { getAll } from "../modules/modules.js";

class MyCardConten extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
      <style>
        .item {
          display: flex;
          flex-direction: row;
          align-items: center;
          width: 70vw;
          height: 10vw;
          border-radius: 1vw;
          border: 1px solid black;
        }
        .item_contenido {
          display: flex;
          gap: 3vw;
        }
        .imagen {
          width: 100%;
          height: 100%;
          background-repeat: no-repeat;
          background-size: contain;
          background-position: center;
          border-radius: 1vw;
          cursor: pointer;
        }
        .item_contenido .name {
          width: 10vw;
          height: 15vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1vw;
        }
        .item_contenido .cantidad {
          width: 10vw;
          height: 15vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1vw;
        }
        .item_contenido .precio {
          width: 10vw;
          height: 15vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1vw;
        }
        .item_contenido .subtotal {
          width: 10vw;
          height: 15vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1vw;
        }
        .eliminar {
          width: 5vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 15vh;
          align-self: center;
          font-size: 2.5vw;
          color: red;
          cursor: pointer;
      }
        i{
          width: 5vw;
          display: flex;
          font-size: 2.5vw;
          color: red;
          cursor: pointer;
        }
        
      </style>
      <section class="item">
        <div class="imagen"></div>
        <div class="item_contenido">
          <div class="name">
            <h1>Nombre</h1>
            <h2></h2>
          </div>
          <div class="cantidad">
            <h1>Cantidad</h1>
            <h1></h1>
          </div>
          <div class="precio">
            <h1>Precio</h1>
            <h1></h1>
          </div>
          <div class="subtotal">
            <h2>Subtotal</h2>
            <h2>$</h2>
          </div>
          <div class="eliminar">
            <i class='bx bx-trash' data-id=""></i>
          </div>
        </div>
      </section>
    `;
    }

    connectedCallback() {
        const nombre = this.getAttribute("nombre");
        const imagen = this.getAttribute("imagen");
        const precio = this.getAttribute("precio");
        const id = this.getAttribute("id");
        
        this.shadowRoot.querySelector(".name h2").textContent = nombre;
        this.shadowRoot.querySelector(".imagen").style.backgroundImage = `url(${imagen})`;
        this.shadowRoot.querySelector(".precio h1:nth-of-type(2)").textContent = `$${precio}`;
        this.shadowRoot.querySelector(".cantidad h1:nth-of-type(2)").textContent = quantity(id)
        this.shadowRoot.querySelector(".eliminar i").addEventListener("click", () => {
          this.removeItemFromList(id);
          this.remove();
          // Llama a la función para volver a renderizar los componentes del carrito
          document.getElementById("carritoContainer").click();
        });
        this.shadowRoot.querySelector(".subtotal h2:nth-of-type(2)").textContent = obtenerPrecioMultiplicado(id, precio)

        this.shadowRoot.querySelector(".eliminar i").addEventListener("click", () => {
            this.removeItemFromList(id);
            this.remove();
            // Llama a la función para volver a renderizar los componentes del carrito
            document.getElementById("carritoContainer").click();
        });
    }

    removeItemFromList(id) {
      let ids = localStorage.getItem("idProduct");
      ids = ids ? ids.split(", ") : [];
      // Elimina todas las instancias del ID específico de la lista
      ids = ids.filter((item) => item !== id);
      localStorage.setItem("idProduct", ids.join(", "));
      console.log(`Se eliminaron todas las instancias del ID ${id}. Lista actualizada:`, ids);
  }
}
customElements.define("carrito-contenido", MyCardConten);

var string = localStorage.getItem("idProduct");
var valores = string ? string.split(", ") : [];
function quantity(id){
    let total = 0;
    valores.forEach((valor) => {
        if (valor == id) {
            total++;
        }
    });
    console.log(total);
    return total;
}
function obtenerPrecioMultiplicado(id, precio){
    let total = 0;
    valores.forEach((valor) => {
        if (valor == id) {
            total++;
        }
    });
    console.log(total);
    return total * precio;
}
document.addEventListener("DOMContentLoaded", async () => {
    let container = document.getElementById("contenido");

    
    function agregarComponentesCarrito(json) {
        container.innerHTML = "";
        json.forEach((item) => {
            if (valores.includes(item.id.toString())) {
                const myCardConten = document.createElement("carrito-contenido");
                myCardConten.setAttribute("nombre", item.nombre);
                myCardConten.setAttribute("imagen", item.imagen);
                myCardConten.setAttribute("precio", item.precio);
                myCardConten.setAttribute("id", item.id);

                container.appendChild(myCardConten);
            }
        });
    }

    document.getElementById("carritoContainer").addEventListener("click", async () => {
        let jsonOpcion4 = await getAll();
        agregarComponentesCarrito(jsonOpcion4);
    });
});
