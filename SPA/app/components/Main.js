export function Main(post){
    const $section = document.createElement('section');
    $section.classList.add('grid-fluid');
    $section.classList.add('posts');
    $section.appendChild(post)

    return $section;
}