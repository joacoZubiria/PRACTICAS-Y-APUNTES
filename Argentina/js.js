const d = document,
$selectProvincia = d.getElementById('provincias'),
$selectDepto = d.getElementById('departamentos');
const $frag = d.createDocumentFragment();

async function generateOptions(arr){
    arr.forEach(el => {
        const $option = d.createElement('option');
        $option.textContent = el.nombre;
        $option.value = el.id;

        $frag.appendChild($option);
    });
}
async function getStates(){
    const stateFetch = await fetch('https://apis.datos.gob.ar/georef/api/provincias');
    let states = await stateFetch.json();
    const {provincias} = states;
    generateOptions(provincias);
    $selectProvincia.appendChild($frag);
}
async function getDepto(state){
    $selectDepto.textContent = '';
    const deptosFetch = await fetch(`https://apis.datos.gob.ar/georef/api/departamentos?provincia=${state}&max=1000`);
    let deptos = await deptosFetch.json();
    generateOptions(deptos.departamentos)
    console.log(deptos)
    $selectDepto.appendChild($frag);
}

d.addEventListener('change', e => getDepto(e.target.value));

d.addEventListener('DOMContentLoaded',getStates);