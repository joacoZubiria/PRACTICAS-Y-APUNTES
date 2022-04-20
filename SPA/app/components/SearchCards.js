export function SearchCards(props){
    const {title, id, _embedded} = props;
    const {date, slug} = _embedded.self[0];
    const dateLocal = new Date(date).toLocaleString();
    
    const $article = document.createElement('article');
    const $title = document.createElement('h4');
    const $ref = document.createElement('a');
    const $date = document.createElement('time');

    $title.appendChild($ref);
    
    $article.classList.add('post-card');

    $ref.href = '#/'+slug;
    $ref.dataset.id = id;
    $ref.textContent = title;
    
    $date.textContent = dateLocal;

    $article.appendChild($title);
    $article.appendChild($date);

    document.addEventListener('click', e => {
        if(!e.target.matches('.post-card a')) return false;
        localStorage.setItem('wpPostId', e.target.dataset.id);
    });

    return $article;
}