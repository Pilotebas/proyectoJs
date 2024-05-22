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


class MyButtonCarrito extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
    <style>
    .botones{
      width: 80%;
      height: 10vh;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
    .botones > a{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 14vw;
      height: 6vh;
      background-color: #AED6F1;
      border-radius: 1vw;
      color: black;
      font-size: 1.4vw;
    }
    .botones > a:hover{
        scale: 1.05;
    }
    .botones > div{
      width: 20vw;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      border-radius: 1vw;
      color: black;
    }
    .botones > div a{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 14vw;
      height: 6vh;
      background-color: #AED6F1;
      border-radius: 1vw;
      color: black;
      font-size: 1.4vw;
    }
    .botones > div a:hover{
      scale: 1.05;
    }
    </style>
    <div class="botones">
        <button id="vaciarCarrito">Vaciar Carrito</button>
        <div>
            <h1>Total: $<span></span></h1>
            <a href="#">Comprar Ahora</a>
        </div>
    </div>
  `;
  }

  connectedCallback() {
    // Agregamos el evento click al botón "Vaciar Carrito"
    this.shadowRoot.getElementById("vaciarCarrito").addEventListener("click", () => {
      this.removeAllItems();
      // Después de vaciar el carrito, actualizamos el total a cero
      this.shadowRoot.querySelector("h1 span").textContent = "$0";
    });
  }

  removeAllItems() {
    localStorage.clear();
  }
}
customElements.define("carrito-botton", MyButtonCarrito);

var string = localStorage.getItem("idProduct");
var valores = string ? string.split(", ") : [];
function quantity(id) {
  let total = 0;
  valores.forEach((valor) => {
    if (valor == id) {
      total++;
    }
  });
  console.log(total);
  return total;
}
function obtenerPrecioMultiplicado(id, precio) {
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
    let total = 0; // Inicializamos el total a 0
    json.forEach((item) => {
      if (valores.includes(item.id.toString())) {
        const myCardConten = document.createElement("carrito-contenido");
        myCardConten.setAttribute("nombre", item.nombre);
        myCardConten.setAttribute("imagen", item.imagen);
        myCardConten.setAttribute("precio", item.precio);
        myCardConten.setAttribute("id", item.id);

        container.appendChild(myCardConten);

        // Sumamos al total el subtotal de cada producto
        total += obtenerPrecioMultiplicado(item.id, item.precio);
      }
    });

    // Si el total es 0, mostramos un mensaje indicando que el carrito está vacío
    if (total === 0) {
      container.innerHTML = "<p>Tu carrito está vacío :(</p>";
    } else {
      // Si hay productos en el carrito, creamos e insertamos el botón
      const myButtonCarrito = document.createElement("carrito-botton");
      container.appendChild(myButtonCarrito);

      // Actualizamos el total en el botón
      myButtonCarrito.shadowRoot.querySelector("h1 span").textContent = `${total}`;
    }
  }

  document.getElementById("carritoContainer").addEventListener("click", async () => {
    let jsonOpcion4 = await getAll();
    agregarComponentesCarrito(jsonOpcion4);
  });
});

