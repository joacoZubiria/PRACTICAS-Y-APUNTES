const $drop = document.getElementById('dropzone');
const xhr = new XMLHttpRequest();


const uploader = (file) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', e => {
        if(xhr.readyState != 4) return;

        if(xhr.status >= 200 && xhr.status < 300){
            console.log(xhr.responseText);
        }else{
            console.log(`Error ${xhr.status}: ${xhr.statusText}`);
        }
    });

    xhr.open('POST', '/enviar');
    xhr.setRequestHeader('enc-type', 'multipart/form-data');
    xhr.setRequestHeader('file-name',`${file.name}`);
    xhr.send(file);
}

const progressBar = (file) => {
    const $progress = document.createElement('progress'),
    $span = document.createElement('span');

    const reader = new FileReader();
    reader.readAsDataURL(file);

    $progress.max = 100;

    reader.addEventListener('progress', e => {
        console.log(e)
        $drop.insertAdjacentElement('beforeend', $progress);
        $drop.insertAdjacentElement('beforeend', $span);

        $progress.value = parseInt((e.loaded*100)/e.total); 
        $span.textContent = `${file.name} -- ${$progress.value}/${$progress.max}`
    })
    reader.addEventListener('loadend', e => {
        setTimeout(() => {
            $drop.removeChild($progress);
            $drop.removeChild($span);
        }, 3000);
        //console.log(reader.result)
        console.log(file)
        uploader(file);
    })

}

$drop.addEventListener('dragover', e => {
    e.preventDefault();
    e.stopPropagation();
    $drop.style.backgroundColor = 'red';
});

$drop.addEventListener('dragleave', e => {
    e.preventDefault();
    e.stopPropagation();
    $drop.style.backgroundColor = 'white';
});

$drop.addEventListener('drop', e => {
    //console.log(e);
    e.preventDefault();
    e.stopPropagation();

    $drop.style.backgroundColor = 'white';

    let files = Array.from(e.dataTransfer.files);

    files.forEach(file => {
        progressBar(file);
    });
});