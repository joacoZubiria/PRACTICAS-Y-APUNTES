import app from "./helpers/wp_api.js";
import { Header } from "./components/Header.js";
import { Main } from "./components/Main.js";
import { PostCards } from "./components/PostCards.js";
import { Router } from "./components/Router.js";
import { InfiniteScroll } from "./helpers/InfiniteScroll.js";

const $main = document.getElementById('root');
$main.insertAdjacentElement('beforebegin', Header());

export async function App(){
    const $frag = await Router();
    if($frag != undefined) $main.insertAdjacentElement('beforeend', Main($frag));
    InfiniteScroll()
}