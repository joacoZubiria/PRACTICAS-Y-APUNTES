export function Menu(){
    const $div = document.createElement('div');

    $div.insertAdjacentHTML('afterbegin', `
    <a href="/#/">Home</a>
    <span>-</span>
    <a href="/#/search">Búsqueda</a>
    <span>-</span>
    <a href="/#/contact">Contacto</a>
    `);
    
    return $div;
}