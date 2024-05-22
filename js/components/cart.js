// Definir la clase del componente de carrito
export class CarritoComponent extends HTMLElement {
  constructor() {
    super();

    // Crear el shadow DOM
    this.attachShadow({ mode: "open" });

    // Definir el contenido del componente
    this.shadowRoot.innerHTML = `
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
        <style>
          /* Estilos CSS */
          :host {
            display: flex;
            align-items: center;
          }
  
          i{
            font-size: 2vw;
            color: black;
            margin-left: 1vw;
          }
  
          h1{
            font-size: 1.5vw;
            padding-left: 1vw;
            padding-right: 2vw;
            color: black;
          }
  
          h2{
            display: flex;
            width: 15%;
            height: 50%;
            background-color: #AED6F1;
            justify-content: center;
            align-items: center;
            border-radius: 0.5vw;
            color: black;
            font-size: 1.3vw;
          }
          h2:hover{
            background-color: white;
          }
        </style>
        <i class="bx bxs-cart"></i>
        <h1>Carrito</h1>
        <h2 id="countProducts"></h2>
      `;
  }

  connectedCallback() {

    const string = localStorage.getItem("idProduct");
    const valores = string.split(", ");
    const contador = {};

    let total = 0;

    valores.forEach((valor) => {
      contador[valor] = (contador[valor] || 0) + 1;
      total++;
    });

    this.shadowRoot.querySelector("h2").textContent = total;
  }
  /** Funcion que se ejecuta o actualiza cada vez que un atributo cambia */
  attributeChangedCallback(name, old, now) {
    console.log("micars ", name, old, now);
    this.render();
  }
}

// Registrar el componente personalizado
customElements.define("carrito-component", CarritoComponent);
