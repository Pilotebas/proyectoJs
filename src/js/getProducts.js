export async function getProducts() {
    try {
        const response = await fetch("http://localhost:5501/products");
        const data = await response.json();
        return data.map(item => ({
            id: item.id,
            titulo: item.titulo,
            imagen: item.imagen,
            categoria: item.categoria.id,
            precio: item.precio
        }));
    } catch (error) {
        console.error('Error loading products:', error);
        throw error; // Asegúrate de propagar el error para manejarlo en `obtenerDataProductos()`
    }
}