const $body = document.querySelector('body');
fetch('mark/markdown.md')
.then(res => res.ok? res.text() : Promise.reject(res))
.then(res => {
    const html =new showdown.Converter().makeHtml(res);
    $body.innerHTML = html;
})