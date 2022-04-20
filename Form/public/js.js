const d = document;
const $loader = d.querySelector('.contact-form-loader'),
$sent = d.getElementById('sent'),
$form = d.querySelector('.contact-form');
const $inputs = d.querySelectorAll(".contact-form [required]");
d.querySelector(".nombre").setAttribute("pattern", "^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$");
d.querySelector(".email").pattern = "^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$"
d.querySelector(".consulta").dataset.pattern = "^.{1,255}$"
$inputs.forEach(input => {
    const $span = d.createElement("span");
    $span.setAttribute("id", `${input.name}`);
    $span.textContent = input.title;
    $span.classList.add("contact-form-error", "none");
    input.insertAdjacentElement("afterend", $span);
});

d.addEventListener("keyup", e => {
    if(e.target.matches(".contact-form [required]")){
        let $input = e.target,
        pattern = $input.pattern || $input.dataset.pattern;

    if(pattern && $input.value !== ""){
        let regexp = new RegExp(pattern);
        return !regexp.exec($input.value)
        ? d.getElementById($input.name).classList.add("is-active")
        : d.getElementById($input.name).classList.remove("is-active");
    }
    if($input.value == ''){
        d.getElementById($input.name).classList.remove("is-active");
    }

    if(!pattern){
        return $input.value === ""
        ? d.getElementById($input.name).classList.add("is-active")
        : d.getElementById($input.name).classList.remove("is-active");
    }
}
})

d.addEventListener('submit', e => {
    if(e.target.matches('.contact-form')){
        e.preventDefault();
        
        $loader.classList.remove('none');
        if(!$sent.classList.contains('none')) $sent.classList.add('none');

        fetch('http://localhost:3000/send',{
            method:'POST',
            body: new FormData(e.target),
            mode:'cors',
        })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(res => {
            $loader.classList.add('none');
            $sent.classList.remove('none');
            $sent.textContent += res;
            $form.reset();
        })
    }
})
