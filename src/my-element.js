import { LitElement, css, html } from 'lit'
import { getProducts } from './js/getProducts';
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
  changeCategory(category) {
    this.activeCategory = category;
    this.view = 'products';
    this.menuOpen = false;
    this.requestUpdate();
  }
  renderProducts(){
    const filteredProducts = this.products.filter(product => this.activeCategory === 'all' || product.category === this.activeCategory);
    return html `
    <h2 class="tittle" ${this.activeCategory === 'all' ? 'Todos los productos' : this.activeCategory.charAt(0).toUpperCase() + this.activeCategory.slice(1)}></h2>
    <section class="item"> 
    ${filteredProducts.map(product => html `
      <div class"producto">
      
        <img class="imagen" src=${product.imagen}>
        <div class="item_contenido">
            <h1>${product.titulo}</h1>
            <div>
                <h1>${product.precio}</h1>
                <button class="agregar" @click=${()=> this.addTocart(product)}>Agregar</button>
            </div>
        </div>
      </div>`)}
    </section>  
    `
  }
  renderCart(){
    const total = this.cartItems.reduce((acc, item) => acc + item.subtotal, 0);

    return html `
    <h1 class="titulo" ${this.cartItems.length > 0 ? html` >Carrito de compras</h1>
    <div>
    ${this.cartItems.map(item => html` 
        <section class="item">
            <img src=${item.imagen} alt="">
            <div class="item_contenido">
                <div class="name">
                    <h1>Nombre</h1>
                    <h2>${item.nombre}</h2>
                </div>
                <div class="cantidad">
                    <h1>Cantidad</h1>
                    <h1>${item.cantidad}</h1>
                </div>
                <div class="precio">
                    <h1>Precio</h1>
                    <h1>${item.precio}</h1>
                </div>
                <div class="subtotal">
                    <h2>Subtotal</h2>
                    <h2>$${item.subtotal}</h2>
                </div>
                <div class="eliminar"  @click=${()=> this.removeFromCart(item.id)}>
                    <i class='bx bx-trash'></i>
                </div>
            </div>
        </section>
        <div class="botones">
            <button  @click=${()=> this.emptyCart}>Vaciar Carrito</button>
            <div>
                <h1>Total <br>$ 4.000</h1>
                <button>Comprar Ahora</button>
            </div>
        </div>
    </div>
    `
  }
  static get styles() {
    return css`
      
    `
  }
  addToCart(product) {
        added();
        const cartItem = this.cartItems.find(item => item.id === product.id);
        if (cartItem) {
            cartItem.quantity += 1;
            cartItem.subtotal = cartItem.quantity * cartItem.price;
        } else {
            this.cartItems = [
                ...this.cartItems,
                { ...product, quantity: 1, subtotal: product.price }
            ];
        }
        this.requestUpdate();
  }
  removeFromCart(productId) {
    const itemIndex = this.cartItems.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        if (this.cartItems[itemIndex].quantity > 1) {
            this.cartItems[itemIndex].quantity -= 1;
            this.cartItems[itemIndex].subtotal = this.cartItems[itemIndex].quantity * this.cartItems[itemIndex].price;
        } else {
            this.cartItems = this.cartItems.filter(item => item.id !== productId);
        }
    }
    this.requestUpdate();
    this.removed();
  }

  emptyCart() {
    this.cartItems = [];
    this.requestUpdate();
    this.vaciarCarrito();
  }
}

window.customElements.define('my-element', MyElement)
