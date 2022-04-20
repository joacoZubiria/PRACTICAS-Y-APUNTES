const $form = document.getElementById('form'),
$search = document.getElementById('search');
const $section = document.createElement('section');
//const $frag = document.createDocumentFragment();

function createTemplate(movie){
    // const $figure = document.createElement('figure'),
    // $img = document.createElement('img'),
    // $pGenre = document.createElement('p'),
    // $divSum = document.createElement('div');

    // //$template.insertAdjacentElement('afterbegin',$figure);
    // $figure.insertAdjacentElement('afterbegin', $img);
    // $img.insertAdjacentElement('afterend',$pGenre);
    // $pGenre.insertAdjacentElement('afterend',$divSum);

    // $figure.querySelector('img').src = `${movie.show.image.medium}`;
    // $figure.querySelector('p').textContent = `${movie.show.genres.join(', ')}`;
    // $figure.querySelector('div').insertAdjacentHTML('afterbegin', movie.show.summary);
    $section.insertAdjacentHTML('beforeend', `<figure>
    <img src="${movie.show.image == null ? '' : movie.show.image.medium}"></img> 
    <p>${movie.show.genres.join(', ')}</p>
    <div>${movie.show.summary == null ? 'No hay descripción' : movie.show.summary}</div>
    <a href="${movie.show.url ? movie.show.url : ''}">${movie.show.url ? 'Ver más' : ''}</a>
</figure>`);

// movie.show.image ? movie.show.image.medium : ''

    console.log($section)
    //frag.appendChild($figure);
}

document.addEventListener('submit', e => {
    e.preventDefault()
    if(e.target === $form){
        //if($frag !== '') $frag.textContent = '';
        if($section.textContent !== '') $section.textContent = '';

        let moviePromise = new Promise(async function (resolve, reject){
            let movie = await fetch(`https://api.tvmaze.com/search/shows?q=${$form.searcher.value}`),
            json = await movie.json();
        
            if(!movie.ok){
                reject(movie.statusText);
            }
            resolve(json)
        
            console.log(movie)
            console.log(json)
        });

        moviePromise
        .then(async res => {
            if(res.length === 0){
                $section.textContent = 'No existen shows o series con esa búsqueda';
                $form.insertAdjacentElement('afterend', $section);
                return;
            }
            for(let i = 0; i < res.length; i++){
                createTemplate(res[i])
            }
            //$template.appendChild($frag)
            $form.insertAdjacentElement('afterend', $section);
        })
        .catch(res => {
            console.log(res);
            $section.textContent = 'No existen shows o series con esa búsqueda';
            $form.insertAdjacentElement('afterend', $section);
        })
    }
})