class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = /*html*/ `
    <link rel="stylesheet" href="../css/style.css">
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

  /**Funcion que crea el html para agregarlo al DOM */
  render() {
    const miTitle = this.getAttribute("titulo");
    const miIcon = this.getAttribute("icon");

    console.log("miIcon ", miIcon);

    // Limpiar el shadowRoot antes de actualizar
    this.shadowRoot.innerHTML = "";

    // Actualizar el contenido del shadowRoot basado en el atributo
    const contenido = document.createElement("a");
    contenido.setAttribute("href", "#");

    contenido.innerHTML = `<i class='${miIcon}'></i>
    <h1>${miTitle}</h1>`;

    // contenido.textContent = `${miAtributo}`;
    this.shadowRoot.appendChild(contenido);
  }
}

ppp.addEventListener("click", () => {
    let obj = document.getElementById("carro");
  let newValue = parseInt(obj.textContent) + 1;
  obj.textContent = newValue;
  alert(newValue);
});

// Register the CurrentDate component using the tag name <current-date>.
customElements.define("my-header", Header);
