import { Menu } from "./Menu.js";
import { SearchForm } from "./SearchForm.js";
import {Title} from "./Title.js";

export function Header(){
    const $nav = document.createElement('nav');
    $nav.appendChild(Title());
    $nav.appendChild(Menu())
    $nav.appendChild(SearchForm());
    
    return $nav;
}