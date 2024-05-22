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
            </section>`)}
            <div class="botones">
                <button  @click=${()=> this.emptyCart}>Vaciar Carrito</button>
                <div>
                    <h1>Total <br>$ ${total}</h1>
                    <button>Comprar Ahora</button>
                </div>
            </div>
        </div>
        ` : html`<div class="kitty"><p>Tu carrito está vacío. . .</p><img class="Cat" src="./public/Cat.svg" alt=""></div>`}
        `
    }
    static get styles() {
        return css`
        a{
            text-decoration: none;
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
        header .header_contenido{
            width: 18vw;
            height: 25vh;
        }
        header .header_contenido ul{
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
        }
        header .header_contenido a{
            height: 25%;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 1vw;
            cursor: pointer;
            border-radius: 1vw;
            color: black;
        }
        header .header_contenido a:hover{
            background-color: #F6F6F6;
            scale: 1.05;
        }
        header .header_contenido a i{
            font-size: 1.7vw;
            margin-left: 1vw;
        }
        header .header_contenido a h1{
            font-size: 1.5vw;
        }
        header .header_carrito{
            width: 18vw;
            height: 6vh;
            display: flex;
            align-items: center;
        }
        header .header_carrito:hover{
            background-color: #F6F6F6;
            border-radius: 1vw;
            scale: 1.05;
        }
        header .header_carrito i{
            font-size: 2vw;
            color: black;
            margin-left: 1vw;
        }
        header .header_carrito > h1{
            font-size: 1.5vw;
            padding-left: 1vw;
            padding-right: 2vw;
            color: black
        }
        header .header_carrito > h2{
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
        header .header_logo{
            width: 18vw;
            height: 10vh;
        }
        header .header_logo > h1{
            text-align: center;
            font-size: 1.5vw;
            padding-bottom: 1vw;
        }
        .contenido{
            width: 75vw;
            height: 90vh;
            display: flex;
            flex-direction: column;
            background-color: #F6F6F6;
            border-radius: 2vw;
        }
        .contenido > h1{
            width: 20vw;
            height: 8vh;
            color: black;
            font-size: 2vw;
            padding-top: 1vw;
            padding-left: 1vw;
        }
        .contenido > div{
            margin: 0 auto;
            width: 75vw;
            height: 80vh;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1vw;
            overflow-y: scroll;
        }
        .contenido > div > section{
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 17.5vw;
            height: 39vh;
            border-radius: 1vw;
            border: 1px solid black;
        }
        .contenido > div > section .imagen_1{
            width: 100%;
            height: 80%;
            background-image: url(../storage/img/buso1);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            border-radius: 1vw;
            cursor: pointer;
        }
        .contenido > div > section .imagen_1:hover{
            transition: 0.6s;
            background-image: url(../storage/img/buso1.1);
        }
        .contenido > div section .imagen_2{
            width: 100%;
            height: 80%;
            background-image: url(../storage/img/buso2);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            border-radius: 1vw;
            cursor: pointer;
        }
        .contenido > div > section .imagen_2:hover{
            transition: 0.6s;
            background-image: url(../storage/img/buso2.2);
        }
        .contenido > div section .imagen_3{
            width: 100%;
            height: 80%;
            background-image: url(../storage/img/buso3);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            border-radius: 1vw;
            cursor: pointer;
        }
        .contenido > div > section .imagen_3:hover{
            transition: 0.6s;
            background-image: url(../storage/img/buso3.1);
        }
        .contenido > div section .imagen_4{
            width: 100%;
            height: 80%;
            background-image: url(../storage/img/buso4);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            border-radius: 1vw;
            cursor: pointer;
        }
        .contenido > div > section .imagen_4:hover{
            transition: 0.6s;
            background-image: url(../storage/img/buso4.1);
        }
        .contenido > div section .imagen_5{
            width: 100%;
            height: 80%;
            background-image: url(../storage/img/buso5);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            border-radius: 1vw;
            cursor: pointer;
        }
        .contenido > div > section .imagen_5:hover{
            transition: 0.6s;
            background-image: url(../storage/img/buso5.1);
        }
        .contenido > div section .imagen_6{
            width: 100%;
            height: 80%;
            background-image: url(../storage/img/buso6);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            border-radius: 1vw;
            cursor: pointer;
        }
        .contenido > div > section .imagen_6:hover{
            transition: 0.6s;
            background-image: url(../storage/img/buso6.1);
        }
        .contenido > div section .imagen_7{
            width: 100%;
            height: 80%;
            background-image: url(../storage/img/buso7);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            border-radius: 1vw;
            cursor: pointer;
        }
        .contenido > div > section .imagen_7:hover{
            transition: 0.6s;
            background-image: url(../storage/img/busp7.1);
        }
        .contenido > div section .imagen_8{
            width: 100%;
            height: 80%;
            background-image: url(../storage/img/buso8);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            border-radius: 1vw;
            cursor: pointer;
        }
        .contenido > div > section .imagen_8:hover{
            transition: 0.6s;
            background-image: url(../storage/img/buso8.1);
        }
        .contenido > div > section .imagen_9{
            width: 100%;
            height: 80%;
            background-image: url(../storage/img/camisa1);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            border-radius: 1vw;
            cursor: pointer;
        }
        .contenido > div > section .imagen_9:hover{
            transition: 0.6s;
            background-image: url(../storage/img/camisa1.1);
        }
        .contenido > div section .imagen_10{
            width: 100%;
            height: 80%;
            background-image: url(../storage/img/camisa2);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            border-radius: 1vw;
            cursor: pointer;
        }
        .contenido > div section .imagen_10:hover{
            transition: 0.6s;
            background-image: url(../storage/img/camisa2.1);
        }
        .contenido > div section .imagen_11{
            width: 100%;
            height: 80%;
            background-image: url(../storage/img/camisa3);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            border-radius: 1vw;
            cursor: pointer;
        }
        .contenido > div section .imagen_11:hover{
            transition: 0.6s;
            background-image: url(../storage/img/camisa3.1);
        }
        .contenido > div section .imagen_12{
            width: 100%;
            height: 80%;
            background-image: url(../storage/img/camisa4);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            border-radius: 1vw;
            cursor: pointer;
        }
        .contenido > div section .imagen_12:hover{
            transition: 0.6s;
            background-image: url(../storage/img/camisa4.1);
        }
        .contenido > div section .imagen_13{
            width: 100%;
            height: 80%;
            background-image: url(../storage/img/camisa5);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            border-radius: 1vw;
            cursor: pointer;
        }
        .contenido > div section .imagen_13:hover{
            transition: 0.6s;
            background-image: url(../storage/img/camisa5.1);
        }
        .contenido > div section .imagen_14{
            width: 100%;
            height: 80%;
            background-image: url(../storage/img/camisa6);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            border-radius: 1vw;
            cursor: pointer;
        }
        .contenido > div section .imagen_14:hover{
            transition: 0.6s;
            background-image: url(../storage/img/camisa6.1);
        }
        .contenido > div section .imagen_15{
            width: 100%;
            height: 80%;
            background-image: url(../storage/img/camisa7);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            border-radius: 1vw;
            cursor: pointer;
        }
        .contenido > div section .imagen_15:hover{
            transition: 0.6s;
            background-image: url(../storage/img/camisa7.1);
        }
        .contenido > div section .imagen_16{
            width: 100%;
            height: 80%;
            background-image: url(../storage/img/camisa8);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            border-radius: 1vw;
            cursor: pointer;
        }
        .contenido > div section .imagen_16:hover{
            transition: 0.6s;
            background-image: url(../storage/img/camisa8.1);
        }
        .contenido > div > section .imagen_17{
            width: 100%;
            height: 80%;
            background-image: url(../storage/img/pants1);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            border-radius: 1vw;
            cursor: pointer;
        }
        .contenido > div > section .imagen_17:hover{
            transition: 0.6s;
            background-image: url(../storage/img/pants1.1);
        }
        .contenido > div section .imagen_18{
            width: 100%;
            height: 80%;
            background-image: url(../storage/img/pants2);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            border-radius: 1vw;
            cursor: pointer;
        }
        .contenido > div > section .imagen_18:hover{
            transition: 0.6s;
            background-image: url(../storage/img/pants2.2);
        }
        .contenido > div section .imagen_19{
            width: 100%;
            height: 80%;
            background-image: url(../storage/img/pants3);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            border-radius: 1vw;
            cursor: pointer;
        }
        .contenido > div > section .imagen_19:hover{
            transition: 0.6s;
            background-image: url(../storage/img/pants3.1);
        }
        .contenido > div section .imagen_20{
            width: 100%;
            height: 80%;
            background-image: url(../storage/img/pants4);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            border-radius: 1vw;
            cursor: pointer;
        }
        .contenido > div > section .imagen_20:hover{
            transition: 0.6s;
            background-image: url(../storage/img/pants4.1);
        }
        .contenido > div section .imagen_21{
            width: 100%;
            height: 80%;
            background-image: url(../storage/img/pants5);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            border-radius: 1vw;
            cursor: pointer;
        }
        .contenido > div > section .imagen_21:hover{
            transition: 0.6s;
            background-image: url(../storage/img/pants5.1);
        }
        .contenido > div section .imagen_22{
            width: 100%;
            height: 80%;
            background-image: url(../storage/img/pants6);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            border-radius: 1vw;
            cursor: pointer;
        }
        .contenido > div > section .imagen_22:hover{
            transition: 0.6s;
            background-image: url(../storage/img/pants6.1);
        }
        .contenido > div section .imagen_23{
            width: 100%;
            height: 80%;
            background-image: url(../storage/img/pants7);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            border-radius: 1vw;
        }
        .contenido > div > section .imagen_23:hover{
            transition: 0.6s;
            background-image: url(../storage/img/pants7.1);
        }
        .contenido > div section .imagen_24{
            width: 100%;
            height: 80%;
            background-image: url(../storage/img/pants8);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            border-radius: 1vw;
            cursor: pointer;
        }
        .contenido > div > section .imagen_24:hover{
            transition: 0.6s;
            background-image: url(../storage/img/pants8.1);
        }
        .contenido > div > section .item_contenido{
            width: 17.5vw;
            height: 8vh;
            background-color: black;
            border-radius: 1vw;
            cursor: pointer;
        }
        .contenido > div section .item_contenido > h1{
            padding: 0;
            width: 7vw;
            height: 50%;
            font-size: 1vw;
            color: white;
            padding-left: 1vw;
            padding-top: 0.5vw;
        }
        .contenido > div section .item_contenido > div{
            width: 100%;
            height: 50%;
            display: flex;
            flex-direction: row;
            align-items: start;
            justify-content: start ;
        }
        .contenido > div section .item_contenido > div > h1{
            margin-left: 1vw;
            color: white;
            padding: 0;
            width: 50%;
            height: 100%;
            font-size: 1vw;
        }
        .contenido > div section .item_contenido > div > button{
            width: 35%;
            height: 3.5vh;
            font-size: 1vw;
            border-radius: 1vw;
            background-color: F6F6F6;
            cursor: pointer;
            border: none;
            background-color: #F6F6F6;
        }
        .contenido > div section .item_contenido > div > button:hover{
            scale: 1.1;
            background-color: #C5E0F6;
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
            .contenido{
                width: 90vw;
                height: 88vh;
                display: flex;
                flex-direction: column;
                background-color: #F6F6F6;
                border-radius: 2vw;
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
