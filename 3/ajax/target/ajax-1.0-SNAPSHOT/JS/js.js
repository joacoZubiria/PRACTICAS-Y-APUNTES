const $files = document.getElementById("files"),
$main = document.querySelector("main");

const updater = (file) =>{

    const xhr = new XMLHttpRequest(),
    $formData = new FormData();
    
    $formData.append("files", file);

    xhr.addEventListener("readystatechange", e => {
        if(xhr.readyState !== 4) return;
        if(xhr.status >= 200 && xhr.status < 300){
            console.log(xhr.responseText);
        }else{
            $main.textContent = `Error ${xhr.status}: ${xhr.statusText}`;
        }
    });
    xhr.open("POST", "/MyServlet");
    xhr.setRequestHeader("enc-type", "multipart/form-data; charset=utf-8");
    xhr.send($formData);
};

document.addEventListener("change", e => {
    if(e.target === $files){
        const files = Array.from(e.target.files);
        files.forEach(file => {
            updater(file);
            console.log(file);
        });
    };
});
