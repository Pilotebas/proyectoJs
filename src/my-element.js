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
    async obtenerDataProductos() {
        try {
            this.products = await getProducts();
            this.requestUpdate(); // Asegúrate de actualizar la vista después de obtener los productos
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    }
    render() {
        return html`<div class="principal">
        <header>
            <div class="header_titulo">
                <h1>CampusShop</h1>
            </div>
            <div class="header_contenido">
                <ul>
                <button ?active=${this.activeCategory === 'all'} @click=${() => this.changeCategory('all')}>
                    <i class='bx bx-border-all'></i>
                    <h1>Todos los productos</h1>
                </button>
                <button ?active=${this.activeCategory === 'abrigos'} @click=${() => this.changeCategory('abrigos')}>
                    <i class='bx bxs-face-mask'></i>
                    <h1>Abrigos</h1>
                </button>
                <button ?active=${this.activeCategory === 'camisas'} @click=${() => this.changeCategory('camisas')}>
                    <i class='bx bxs-t-shirt'></i>
                    <h1>Camisas</h1>
                </button>
                <button ?active=${this.activeCategory === 'pantalones'} @click=${() => this.changeCategory('pantalon')}>
                    <i class='bx bxs-arch'></i>
                    <h1>Pantalones</h1>
                </button>
                </ul>
            </div>
            <button class="header_carrito" ${this.view === 'cart' ? 'active' : ''}" @click=${this.viewCart} >
                <i class='bx bxs-cart' ></i>
                <h1>Carrito</h1>
                <h2>${this.cartItems.length}</h2>
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
        <div class="contenido">
            <h2 class="titulo">${this.activeCategory === 'all' ? 'Todos los productos' : this.activeCategory.charAt(0).toUpperCase() + this.activeCategory.slice(1)}</h2>
            <div class="xd">
                <section class="item"> 
                ${filteredProducts.map(product => html `
                <div class"producto">
                    <img class="img" src=${product.imagen}>
                    <div class="item_contenido">
                        <h1>${product.titulo}</h1>
                        <div>
                            <h1>$${product.precio}</h1>
                            <button class="agregar" @click=${()=> this.addToCart(product)}>Agregar</button>
                        </div>
                    </div>
                </div>`)}
                </section>
            </div">  
        </div">  
        `
    }
    renderCart(){
        const total = this.cartItems.reduce((acc, item) => acc + item.subtotal, 0);

        return html `
        <h1 class="titulo">Carrito de compras</h1>
        ${this.cartItems.length > 0 ? html`
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
                        <h1>${item.quantity}</h1>
                    </div>
                    <div class="subtotal">
                        <h2>Subtotal</h2>
                        <h2>$${item.subtotal}</h2>
                    </div>
                    <div class="eliminar"  @click=${()=> this.removeFromCart(item.id)}>
                        <i class='bx bx-trash'></i>
                    </div>
                </div>
            </section>`)}
            <div class="botones">
                <button  @click=${()=> this.emptyCart}>Vaciar Carrito</button>
                <div>
                    <h1>Total <br>$ ${total}</h1>
                    <button>Comprar Ahora</button>
                </div>
            </div>
        </div>
        ` : html`<div class="kitty"><p>Tu carrito está vacío. . .</p><img class="Cat" src="" alt=""></div>`}
        `
    }
    static get styles() {
        return css`
        /* Estilos para los botones del menú */
        .principal{
            display: flex;
            flex-direction: row;
            align-items: center;
            height: 100vh;
            background-color: #AED6F1;
        }
        header {
            width: 23vw;
            height: 80vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
        }   
        header .header_titulo{
            width: 18vw;
            height: 10vh;
        }
        header .header_titulo > h1{
            padding-top: 1vw;
            font-size: 3vw;
        }
        .header_contenido button {
            height: 25%;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 1vw;
            cursor: pointer;
            border-radius: 1vw;
            color: black;
            text-decoration: none; /* Si los botones se comportan como enlaces */
        }

        .header_contenido button:hover {
            background-color: #F6F6F6;
            scale: 1.05;
        }

        .header_contenido button i {
            font-size: 1.7vw;
            margin-left: 1vw;
        }

        .header_contenido button h1 {
            font-size: 1.5vw;
        }

        .header_carrito {
            width: 18vw;
            height: 6vh;
            display: flex;
            align-items: center;
            border-radius: 1vw;
        }

        .header_carrito:hover {
            background-color: #F6F6F6;
            border-radius: 1vw;
            scale: 1.05;
        }

        .header_carrito i {
            font-size: 2vw;
            color: black;
            margin-left: 1vw;
        }

        .header_carrito h1 {
            font-size: 1.5vw;
            padding-left: 1vw;
            padding-right: 2vw;
            color: black;
        }

        .header_carrito h2 {
            display: flex;
            width: 15%;
            height: 50%;
            background-color: white;
            justify-content: center;
            align-items: center;
            border-radius: 0.5vw;
            color: black;
            font-size: 1.3vw;
        }

        .header_logo {
            width: 18vw;
            height: 10vh;
        }

        .header_logo h1 {
            text-align: center;
            font-size: 1.5vw;
            padding-bottom: 1vw;
        }

        .titulo {
            width: 20vw;
            height: 4vh;
            color: black;
            font-size: 2vw;
            padding-top: 1vw;
            padding-left: 1vw;
        }
        .main {
            width: 75vw;
            height: 80vh;
            display: flex;
            flex-direction: column;
            background-color: #F6F6F6;
            border-radius: 2vw;
        }
        
        .xd{
            margin: 0 auto;
            width: 75vw;
            height: 80vh;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: center;
            gap: 1vw;
            overflow-y: scroll;
            background: #F1F1F1
        }
        .item {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 17.5vw;
            height: 39vh;
            border-radius: 1vw;
        }
        
        .item img {
            width: 100%;
            height: 80%;
            border-radius: 1vw;
            cursor: pointer;
        }
        .item_contenido{
            width: 17.5vw;
            height: 8vh;
            background-color: black;
            border-radius: 1vw;
            cursor: pointer;
        }
        .item_contenido h1 {
            padding: 0;
            width: 7vw;
            height: 15%;
            font-size: 1vw;
            color: white;
            padding-left: 1vw;
            padding-top: 0.5vw;
            
        }
        
        .item_contenido > div {
            width: 100%;
            height: 50%;
            display: flex;
            flex-direction: row;
            align-items: start;
            justify-content: start;
        }
        
        .item_contenido > div > h1 {
            margin-left: 1vw;
            color: white;
            padding: 0;
            width: 50%;
            font-size: 1vw;
        }
        
        .item_contenido > div > button {
            width: 35%;
            height: 3vh;
            font-size: 1vw;
            border-radius: 1vw;
            cursor: pointer;
            border: none;
            background-color: #F6F6F6;
        }
        
        .item_contenido > div > button:hover {
            transform: scale(1.1);
            background-color: #C5E0F6;
        }
        
        .botones {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
        
        .botones button {
            width: 40%;
            height: 1vh;
            font-size: 1vw;
            border-radius: 1vw;
            cursor: pointer;
            border: none;
            background-color: #F6F6F6;
        }
        
        .botones button:last-child {
            width: 20%;
        }
        
        .kitty {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .kitty p {
            font-size: 2vw;
        }
        
        .kitty img {
            width: 40%;
            height: auto;
        }        
        @media screen and (max-width: 500px){
            body {
                display: flex;
                flex-direction: column;
            }
            header {
                width: 100vw;
                height: 10vh;
                display: flex;
                flex-direction: row;
                align-items: start;
            }   
            header .header_titulo{
                width: 18vh;
                height: 4vh;
            }
            header .header_titulo > h1{
                font-size: 3vh;
            }
            header .header_contenido{
                position: absolute;
                margin-left: 25vw;
                width: 30vh;
                height: 10vh;
            }
            header .header_contenido ul{
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: row;
                align-items: end;
            }
            header .header_contenido a{
                width: 25%;
                height: 50%;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                border-radius: 1vw;
                color: black;
            }
            header .header_contenido a i{
                font-size: 4vh;
            }
            header .header_contenido a h1{
                display: none;
            }
            header .header_carrito{
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            header .header_carrito:hover{
                background-color: #AED6F1;
                scale: none;
            }
            header .header_carrito i{
                width: 70%;
                height: 50%;
                font-size: 4vh;
                border-radius: 1vw;
                text-align: center;
            }
            header .header_carrito i:hover{
                background-color: #F6F6F6;
                scale: 1.02;
            }
            header .header_carrito > h1{
                display: none;
            }
            header .header_carrito > h2{
                display: none;
            }
            header .header_logo {
                display: none;
            }
            main{
                width: 90vw;
                height: 88vh;
                display: flex;
                flex-direction: column;
                background-color: #F6F6F6;
                border-radius: 2vw;
            }
            .contenido{
                width: 90vw;
                height:88vh
            }
            .contenido > h1{
                width: 100%;
                height: 5vh;
                font-size: 3vh;
            }
            .contenido > div{
                margin: 0 auto;
                width: 85vw;
                height: 81vh;
                overflow-y: scroll;
            }
            .contenido > div > section{
                width: 80%;
                height: 40vh;
            }
            .contenido > div > section > div{
                width: 100%;
                height: 34vh;
                background-size: cover;
            }
            .contenido > div > section .item_contenido{
                width: 100%;
            }
            .contenido > div section .item_contenido > h1{
                width: 100%;
                font-size: 2vh;
            }
            .contenido > div section .item_contenido > div > h1{
                font-size: 2vh;
            }
            .contenido > div section .item_contenido > div > button{
                font-size: 2vh;
            }
            .contenido > div section .item_contenido > div > button:hover{
                scale: 1.1;
                background-color: #C5E0F6;
            }
        }
        
        `
    }
    addToCart(product) {
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
        this.cartItems = []; // Limpiar el carrito localmente
        localStorage.setItem("cart", JSON.stringify(this.cartItems)); // Actualizar el almacenamiento local
        this.requestUpdate(); // Actualizar la vista
    }
    
    openMenu() {
        this.menuOpen = true;
        this.requestUpdate();
    }

    closeMenu() {
        this.menuOpen = false;
        this.requestUpdate();
    }
}


window.customElements.define('my-element', MyElement)
