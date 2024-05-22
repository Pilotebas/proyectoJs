import { LitElement, css, html } from 'lit'
import litLogo from './assets/lit.svg'
import viteLogo from '/vite.svg'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyElement extends LitElement {
  static get properties() {
    return {
        activeCategory: { type: String },
        view: { type: String },
        cartItems: { type: Array },
        products: { type: Array },
        menuOpen: { type: Boolean }
    };
}

constructor() {
    super();
    this.activeCategory = 'all';
    this.view = 'products';
    this.cartItems = [];
    this.products = [];
    this.menuOpen = false;
    this.obtenerDataProductos();
}

connectedCallback() {
    super.connectedCallback();
    this.obtenerDataProductos();
}

  render() {
    return html`<div>
      <header>
        <div class="header_titulo">
            <h1>CampusShop</h1>
        </div>
        <div class="header_contenido">
            <ul>
                <button ${this.activeCategory === 'all' ? 'active' : ''}" @click=${() => this.changeCategory('all')} >
                    <i class='bx bx-border-all'></i>
                    <h1>Todos los productos</h1>
                </button>
                <button ${this.activeCategory === 'all' ? 'active' : ''}" @click=${() => this.changeCategory('abrigos')} >
                    <i class='bx bxs-face-mask'></i>
                    <h1>Abrigos</h1>
                </button>
                <button ${this.activeCategory === 'all' ? 'active' : ''}" @click=${() => this.changeCategory('camisas')} >
                    <i class='bx bxs-t-shirt'></i>
                    <h1>Camisas</h1>
                </button>
                <button ${this.activeCategory === 'all' ? 'active' : ''}" @click=${() => this.changeCategory('pantalon')} >
                    <i class='bx bxs-arch'></i>
                    <h1>Pantalones</h1>
                </button>
            </ul>
        </div>
        <button class="header_carrito" ${this.view === 'cart' ? 'active' : ''}" @click=${this.viewCart} >
            <i class='bx bxs-cart' ></i>
            <h1>Carrito</h1>
            <h2>3</h2>
        </button >
        <div class="header_logo">
            <h1>Fear of Good <br>  x   <br> Pilotebas</h1>
        </div>
      </header>
      <main>${this.view === 'products' ? this.renderProducts() : this.renderCart()}</main>
</div>`
  }
  viewCart() {
    this.activeCategory = null;
    this.view = 'cart';
    this.menuOpen = false;
    this.requestUpdate();
}
  _onClick() {
    this.count++
  }

  static get styles() {
    return css`
      
    `
  }
}

window.customElements.define('my-element', MyElement)
