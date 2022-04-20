document.addEventListener("DOMContentLoaded", e => {
    const $div = document.querySelectorAll("[data-include]");
    const getHTML = (el,url) => {
        const xhr = new XMLHttpRequest();
        
        xhr.addEventListener("readystatechange", e => {
            if(xhr.readyState !== 4) return;

            if(xhr.status >= 200 && xhr.status < 300){
                el.outerHTML = xhr.responseText;
            }else{
                el.outerHTML = xhr.statusText + ": Error, el http papi o no tengo nada xd";
            };
        });
        xhr.open("GET", url);
        xhr.setRequestHeader("Content-type","text/html;charset=utf-8");
        xhr.send();
    }

    $div.forEach(el => getHTML(el,el.getAttribute("data-include")));
});