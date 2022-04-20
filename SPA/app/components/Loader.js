import api from "../helpers/wp_api.js";

export default function Loader(){
    const $loader = document.createElement('img');
    $loader.src = `app/assets/three-dots.svg`;
    $loader.alt = 'Cargando...';
    $loader.classList.add('loader');
    
    return $loader;
}