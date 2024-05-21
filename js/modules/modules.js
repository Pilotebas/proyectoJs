export const getAllabrigos = async() =>{
    let rest = await fetch ('http://localhost:5501/abrigo')
    let data = await rest.json();
    console.log("hola", data)
    return data;
}

export const getAllcamiseta = async() =>{
    let rest = await fetch ('http://localhost:5501/camiseta')
    let data = await rest.json();
    return data;
}

export const getAllpantalon = async() =>{
    let rest = await fetch ('http://localhost:5501/pantalon')
    let data = await rest.json();
    return data;
}