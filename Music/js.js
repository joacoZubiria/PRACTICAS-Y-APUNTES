const d = document;
const $templateArtist = d.getElementById('artist').content,
$templateSong = d.getElementById('song').content,
$form = d.getElementById('form'),
$section = d.getElementById('wrapper'),
$frag = d.createDocumentFragment();

async function createTemplate(author, song){
    console.log(author.artists[0], song)

    const {strArtistWideThumb, strArtistFanart, strArtist, intBornYear, strBiographyEN, strGenre, strCountryCode} = author.artists[0];

    $templateArtist.querySelector('img').src = `${strArtistWideThumb ? strArtistWideThumb : strArtistFanart}`
    $templateArtist.getElementById('name').textContent = `Name: ${strArtist}`;
    $templateArtist.getElementById('birth').textContent = `Born: ${intBornYear}`
    $templateArtist.getElementById('country').textContent = `Country: ${strCountryCode}`
    $templateArtist.getElementById('genre').textContent = `Genre: ${strGenre}`;
    $templateArtist.getElementById('biography').textContent = `${strBiographyEN}`;

    const $cloneArtist = d.importNode($templateArtist, true);
    $frag.appendChild($cloneArtist);
    if(song !== undefined){
        $templateSong.getElementById('lyrics').textContent = song.lyrics
        const $cloneSong = d.importNode($templateSong, true);
        $frag.appendChild($cloneSong);    
    }
}
async function getArt(artist, art){
    let authorJson,
    songJson;
    if(artist !== '' && art !== ''){
        const [author, song] = await Promise.all([
            fetch(`https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artist}`, {mode:'cors'}), 
            fetch(`https://api.lyrics.ovh/v1/${artist}/${art}`, {mode:'cors'})
        ]);
        if(!song.ok || !author.ok){
            throw {status: song.status, statusText: song.statusText}
        }
        authorJson = await author.json(),
        songJson = await song.json();
    }else if(art === ''){
        const author = await fetch(`https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artist}`, {mode:'cors'})
        authorJson = await author.json();
    }
    createTemplate(authorJson, songJson);
    
    $section.appendChild($frag);
};

d.addEventListener('submit', e=> {
    e.preventDefault();
    if(e.target === $form){
        $section.textContent = '';
        
        getArt($form.artist.value, $form.song.value);
        
        $form.artist.value = '';
        $form.song.value = '';
    }
})