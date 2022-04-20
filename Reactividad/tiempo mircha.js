const timers = document.querySelectorAll('div[class="style-scope ytd-playlist-panel-renderer"] span[id="text"]');

let arr = [];
let total = 0;
timers.forEach(video => {
    let time = video.textContent,
    minutesSeconds = time.split(":");
    let result;
    if(minutesSeconds.length == 3){
        result =parseInt(minutesSeconds[0])*3600 + parseInt(minutesSeconds[1])*60 + parseInt(minutesSeconds[2]);
    }else{
        result = parseInt(minutesSeconds[0])*60 + parseInt(minutesSeconds[1]);
    }
    arr.push(result);
    });
    console.log(arr)
arr.forEach(video => total += video);
console.log(total)