import STRING_KEYS from '../keys/keys.js'

const d = document;

const $section = d.getElementById('algos'),
$template = d.getElementById('algo').content,
$frag = d.createDocumentFragment(),
fetchOpt = {
        headers: {
            'Authorization' : `Bearer ${STRING_KEYS.privateKey}`,
        }
    };

//console.log($template)

let products, 
 prices;

Promise.all([
    fetch('https://api.stripe.com/v1/products', fetchOpt),
    fetch('https://api.stripe.com/v1/prices', fetchOpt)
]).then(res => {
    //console.log(res);
    return Promise.all(res.map(resp => resp.json()));
}).then(res => {
    //console.log(res)
    products = res[0].data;
    prices = res[1].data;
    console.log(products,prices)

    prices.forEach(e => {
        console.log(e)
        let arr = products.filter(prod => prod.id === e.product);
        console.log(arr)
        
        let moneyFormat = num => {return `$${num.slice(0,-2)}.${num.slice(1)}`};
        
        $template.querySelector('figure').setAttribute('data-price', e.id);
        $template.querySelector('figure').style.width = 'fit-content';
        $template.querySelector('img').src = arr[0].images[0];
        $template.querySelector('img').alt = arr[0].id;
        $template.querySelector('img').style.width = '100px';
        $template.querySelector('figcaption').textContent = `${moneyFormat(e.unit_amount_decimal)} ${e.currency.toUpperCase()}`;
        
        const $clone = d.importNode($template, true);

        $frag.appendChild($clone);
    });
    $section.appendChild($frag);
}).catch(err => console.log(err))

d.addEventListener('click', e => {
    if(e.target.matches('figure *')){
        let price = e.target.parentElement.dataset.price;
        
        Stripe(STRING_KEYS.publicKey).redirectToCheckout({
            lineItems: [{price, quantity: 1}],
            mode: 'subscription',
            successUrl : 'http://127.0.0.1:5500/payment/succes.html',
            cancelUrl: 'http://127.0.0.1:5500/public/index.html'
        })
        .then(res => {
            console.log(res);
            if(res.error){
                console.log(res.error.message);
            }
        })
    }
})


// fetch('https://api.stripe.com/v1/products', {
//     headers: {
//         'Authorization' : `Bearer ${STRING_KEYS.privateKey}`,
//     }
// })
// .then(res => res.ok 
//     ? res.json() 
//     : Promise.reject(res))
// .then(res => console.log(res))
// .catch(err => console.log(err))