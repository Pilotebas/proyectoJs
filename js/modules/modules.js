export async function getAllsweet(){
    let rest = await fetch ('http://localhost:5503/abrigo')
    let data = await rest.json();
    return data;
}

export const getAllshirt = async()=>{
    let rest = await fetch ('http://localhost:5503/camiseta')
    let data = await rest.json();
    return data;
}

export const getAllpants = async()=>{
    let rest = await fetch ('http://localhost:5503/pantalon')
    let data = await rest.json();
    return data;
}

export const getAll = async()=>{
    let resShirt = await getAllshirt() 
    let resPants = await getAllpants()
    let resSweet = await getAllsweet()
    let res = [...resShirt, ...resPants, ...resSweet]
    return res;
}