import { ajax } from "../helpers/ajax.js";
import app from "../helpers/wp_api.js"
import { PostCards } from "./PostCards.js";
import Loader from "./Loader.js";
import { Post } from "./Post.js";
import { SearchCards } from "./SearchCards.js";

export async function Router(){
    const $frag = document.createDocumentFragment();
    const $main = document.getElementById('root');
    const $search = document.querySelector('.input-search');

    $main.textContent = null;
    const $loader = Loader()
    $main.insertAdjacentElement('afterend', $loader);
    $loader.style.display = "block";

    const {hash} = location;

    if(!hash || hash === '#/'){
        await ajax({
            url: app.POSTS,
            cbSuccess: (res) => {
                console.log(res);
                res.forEach(post => {
                    $frag.appendChild(PostCards(post));
                });
            }
        });
    }else if(hash.includes('#/search')){
        $search.setAttribute('disabled', "");
        const query = location.hash;
        if(query.includes(localStorage.getItem('wpSearch'))){
            await ajax({
                url: app.SEARCH + localStorage.getItem('wpSearch'),
                cbSuccess: (json) => {
                    console.log(json)
                    json.forEach(el =>  {
                        $frag.appendChild(SearchCards(el))
                    });
                    if(json.length === 0) $frag.textContent = 'No se encontraron detalles de su búsqueda';
                } 
            });
            $main.appendChild($frag);
        }
        $search.removeAttribute('disabled');

    }else if(hash.includes('#/contact')){
        $main.insertAdjacentHTML('afterbegin', `<h2>Para el futuro :)</h2>`);
    }else{
        await ajax({
            url: `${app.POST}/${localStorage.getItem('wpPostId')}`,
            cbSuccess: (post) => {
                let html = Post(post);
                html.then(res => $main.insertAdjacentHTML('beforeend',res));
            }
        });
    }
    $loader.style.display = "none";
    if($frag != undefined) {
        return $frag;    
    }
}