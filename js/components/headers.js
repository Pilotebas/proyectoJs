class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = /*html*/ `
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
      <div id="content"></div>
      <style>
        a{
          text-decoration: none;
          height: 25%;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 1vw;
          cursor: pointer;
          border-radius: 1vw;
          color: black;
        }
        a:hover{
          background-color: #F6F6F6;
          scale: 1.05;
        }
        a i{
          font-size: 1.7vw;
          margin-left: 1vw;
        }
        a  h1{
          font-size: 1.5vw;
        }
      </style>
              `;
            }

  /**
   * Cuando el Dom este listo
   */
  connectedCallback() {
    this.render();
  }

  /** Funcion que se ejecuta o actualiza cada vez que un atributo cambia */
  attributeChangedCallback(name, old, now) {
    console.log("attributeChangedCallback ", name, old, now);
    this.render();
  }

  /** Función que esta escuchando las propiedades del componente */
  static get observedAttributes() {
    console.log("observedAttributes");
    return ["titulo", "icon"];
  }

  /** Función que crea el html para agregarlo al DOM */
  render() {
    const miTitle = this.getAttribute("titulo");
    const miIcon = this.getAttribute("icon");

    console.log("miIcon ", miIcon);

    // Selecciona el div de contenido en lugar de limpiar todo el shadowRoot
    const content = this.shadowRoot.querySelector('#content');

    // Actualiza el contenido del div
    content.innerHTML = `<a href="#">
      <i class='${miIcon}'></i>
      <h1>${miTitle}</h1>
    </a>`;
  }
}

/*ppp.addEventListener("click", () => {
  let obj = document.getElementById("carro");
  let newValue = parseInt(obj.textContent) + 1;
  obj.textContent = newValue;
  alert(newValue);
});
*/

// Register the Header component using the tag name <my-header>.
customElements.define("my-header", Header);
