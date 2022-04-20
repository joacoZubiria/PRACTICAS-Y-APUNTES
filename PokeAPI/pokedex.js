const url = 'https://pokeapi.co/api/v2/pokemon/',
svg = "./svg/puff.svg",
$section = document.querySelector('.grid'),
$loader = document.createElement('img'),
//$template = document.getElementById('pokemon').content,
$btnR = document.querySelector('.right'),
$btnL = document.querySelector('.left'),
$fragment = document.createDocumentFragment();

let prevLink,
nextLink;

async function createPokemon(pokemon){
  try{
    let selectedPokemon = await fetch(pokemon.url),
    info = await selectedPokemon.json();
    
    /*const $clone = document.importNode($template, true);

    $clone.querySelector('img').src = info.sprites.front_default;
    $clone.querySelector('img').style.width = '100px';
    $clone.querySelector('figcaption').textContent = info.name.charAt(0).toUpperCase() + info.name.slice(1);
    $clone.querySelector('p').textContent = `#${info.id.toString().padStart(3,0)}`

    $fragment.appendChild($clone);*/
    $section.insertAdjacentHTML('beforeend', `<figure>
    <img src="${info.sprites.front_default}">
    <figcaption>${info.name.charAt(0).toUpperCase() + info.name.slice(1)}</figcaption>
    <p>#${info.id.toString().padStart(3,0)}</p>
    </figure>`);

  }catch(err){
    let message = err.statusText || 'Ocurrio un error';
    $section.textContent = `Error ${err.status || ''}: ${message}`;
  }
}

async function pokedex(url){
  try{
    $loader.src = svg;
    $section.insertAdjacentElement('afterbegin', $loader)

    let pokemons = await fetch(url),
    json = await pokemons.json();
    
    if(!pokemons.ok) throw {status: pokemons.status, statusText: pokemons.statusText};
    console.log(json)

    prevLink = json.previous;
    nextLink = json.next;

    if(prevLink === null) document.querySelector('nav').removeChild($btnL) 
    else document.querySelector('nav').insertAdjacentElement('afterbegin',$btnL);
    if(nextLink === null) document.querySelector('nav').removeChild($btnR) 
    else document.querySelector('nav').insertAdjacentElement('beforeend',$btnR);

    for(let i = 0; i < json.results.length; i++){
      createPokemon(json.results[i]);
    }

    //json.results.forEach(pokemon => createPokemon(pokemon));

    //$template.appendChild($fragment);
    //console.log($fragment)
    $section.removeChild($loader);

  }catch(err){
    let message = err.statusText || 'Ocurrio un error';
    $section.textContent = `Error ${err.status || ''}: ${message}`;
  }
}

document.addEventListener('click', e => {
  if(e.target === $btnL){
    if(prevLink !== null){
      //$fragment.textContent = ''
      $section.innerHTML='';
      pokedex(prevLink);
    } 
  }
  if(e.target === $btnR){
    if(nextLink !== null){
      //$fragment.textContent = ''
      $section.innerHTML='';
      pokedex(nextLink);
    } 
  }
});

document.addEventListener('DOMContentLoaded', pokedex(url));
