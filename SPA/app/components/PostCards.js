export function PostCards(post){
    const {title, id, date, link, _embedded, slug} = post;
    const dateLocal = new Date(date).toLocaleString();

    const $article = document.createElement('article');
    const $img = document.createElement('img');
    const $imgAutor = document.createElement('img');
    const $title = document.createElement('h4');
    const $ref = document.createElement('a');
    const $date = document.createElement('time');
    const $authorName = document.createElement('p');

    $title.appendChild($ref);
    
    $article.classList.add('post-card');

    $ref.href = '#/'+slug;
    $ref.dataset.id = id;
    $ref.textContent = title.rendered;
    
    document.addEventListener('click', e => {
        if(!e.target.matches('.post-card a')) return false;
        localStorage.setItem('wpPostId', e.target.dataset.id);
    });

    $img.src = `${_embedded["wp:featuredmedia"] ?_embedded["wp:featuredmedia"][0].source_url : 'app/assets/three-dots.svg'}`;
    $img.classList.add('preview');
    
    $date.textContent = dateLocal;

    $imgAutor.src = `${_embedded.author[0].avatar_urls[24]}`
    $imgAutor.classList.add('author');

    $authorName.textContent = `${_embedded.author[0].name}`

    $article.appendChild($img);
    $article.appendChild($title);
    $article.appendChild($imgAutor);
    $article.appendChild($authorName);
    $article.appendChild($date);

    return $article;
}