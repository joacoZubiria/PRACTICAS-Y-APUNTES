import { ajax } from "./ajax.js";
import wp_api from "./wp_api.js";
import {PostCards} from "../components/PostCards.js";
import Loader from "../components/Loader.js";
import {SearchCards} from "../components/SearchCards.js"

export async function InfiniteScroll(){
    const d = document,
    w = window,
    $main = d.getElementById('root'),
    $posts = d.querySelector('.posts');
    let query,
    apiURL,
    Components;

    w.addEventListener('scroll', async e => {
        const $frag = d.createDocumentFragment()
        
        let {scrollTop, clientHeight, scrollHeight} = d.documentElement,
        {hash} = w.location;
        
        if(scrollTop + clientHeight >= scrollHeight){
            wp_api.page++;
            
            const $loader = d.querySelector('.loader');
            $loader.style.display = 'block'
            //console.log(scrollTop + clientHeight >= scrollHeight)
            
            if(!hash || hash === '#/'){
                apiURL = `${wp_api.POSTS}&page=${wp_api.page}`
                Components = PostCards 
            }else if(hash.includes('#/search')){
                query = localStorage.getItem('wpSearch');
                apiURL = `${wp_api.SEARCH}${query}&page=${wp_api.page}`;
                Components = SearchCards
            }
            await ajax({
                url: apiURL,
                cbSuccess: (json) => {
                    console.log(json);
                    json.forEach(post => $frag.appendChild(Components(post)));
                }
            });

            $loader.style.display = 'none';
            if(Components != PostCards){
                if($main.contains(d.querySelector('.posts'))) $main.removeChild(d.querySelector('.posts'));
                $main.appendChild($frag);
            } 
            $posts.appendChild($frag);
        }
    })
}