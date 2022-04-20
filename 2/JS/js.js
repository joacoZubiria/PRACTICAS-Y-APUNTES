const $main = document.querySelector("main");

/*const getHTML = (options) => {
    let{url, succes, error} = options;
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", () => {
        if(xhr.readyState !== 4) return;
        if(xhr.status >= 200 && xhr.status < 300){
            let html = xhr.response;
            succes(html);
        }else{
            error(`Error ${xhr.status}: ${xhr.statusText || "ERROR"}`);
        }
    });
    xhr.open("GET", url);
    xhr.setRequestHeader("Content-type", "text/html; charset=UTF-8");
    xhr.send();
}

document.addEventListener("DOMContentLoaded", e => {
    getHTML({
        url: "assets/home.html",
        succes: (html) => $main.innerHTML = html,
        error: (err) => $main.innerHTML = `<h1>${err}</h1>`
    });
});

document.addEventListener("click", e=>{
    if(e.target.matches(".menu a")){
        e.preventDefault();
        getHTML({
            url: e.target.href,
            succes: (html) => $main.innerHTML = html,
            error: (err) => $main.innerHTML = err
        })
    }
})*/

const getHTML = (options) => {
    let {url, succes, error} = options;

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", e =>{
        if(xhr.readyState !== 4) return;

        if(xhr.status >= 200 && xhr.status < 300){
            let html = xhr.responseText;
            succes(xhr.responseText);
        }else{
            error(`Error ${xhr.status}: ${xhr.statusText || "ERROR"}`);
        };
    });
    xhr.open("GET", url);
    xhr.setRequestHeader("Content-type","text/html;charset=utf-8");
    xhr.send();
};

document.addEventListener("DOMContentLoaded", e => {
    getHTML({
        url:"assets/home.html",
        succes: (html) => $main.innerHTML = html,
        error: (err) => $main.innerHTML = err
    });
});

document.addEventListener("click", e => {
    if(e.target.matches(".menu a")){
        e.preventDefault();
        getHTML({
            url: e.target.href,
            succes: (html) => $main.innerHTML = html,
            error: (err) => $main.innerHTML = err
        });
    };
});
