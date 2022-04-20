export async function ajax(props){
    const {url, cbSuccess} = props;

    await fetch(url)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => cbSuccess(json))
    .catch(err => {
        let message = err.statusText;
        console.log(`${err.status}: ${message}, ${err}`);
    });
};