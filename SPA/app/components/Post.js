export async function Post(post){
    console.log(post)
    const {title,date,content} = post;
    const dateLocal = new Date(date).toLocaleString();

    return `<section class="post-page">
        <aside>
            <h2>${title.rendered}</h2>
            <time datetime=${date}>${dateLocal}</time>
        </aside>
        <hr>
        <article>${content.rendered}</article>
    </section>`
}