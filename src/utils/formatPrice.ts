

export function formatPrice(price: number){

    return price.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
}