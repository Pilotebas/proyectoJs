class Main extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <style>
        .container {
            width: 100%;
            height: 100%;
            display: grid;
            grid-template-columns: 0.7fr 4fr 8fr 4fr;
        }
        .perfil{
            background-color: red ;
        }
        .discover{
            display: grid;
            grid-template-rows:  1fr 3fr 2fr;
            background-color: white ;
        }
        .discover_tittle{
            background-color: green ;
        }
        .discover_top{
            background-color: white;
        }
        .discover_like{
            background-color: blue ;
        }
        .playing{
            background-color: red ;
        }
        .list{
            display: grid;
            grid-template-rows: 1fr 10fr;
            background-color: white ;
        }
        .list_tittle{
            background-color: green ;
        }
        .list_contain{
            background-color: black;    
        }
        </style>
        <div class="container">
            <aside class="perfil"></aside>
            <section class="discover">
                <div class="discover_tittle">New Discover</div>
                <div class="discover_top"></div>
                <div class="discover_like"></div>
            </section>
            <article class="playing"></article>
            <aside class="list">
                <div class="list_tittle">Track list</div>
                <div class="list_contain"></div>
            </aside>
        </div>
        `;
    }
    }
    
    customElements.define('my-main', Main);