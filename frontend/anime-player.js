let CurrentAnime;
let CurrentEpisode;

function makeEpisodeBtn(episodeCount) {
    let htmlText = "";
    for (let i = 0; i < episodeCount; i++) {
        console.log(i);
        if (i + 1 == CurrentEpisode) {
            htmlText += `<button class="anime-episode-button-active" onclick="LoadEpisode(${i})">
                ${i+1}
            </button>`
            continue;
        }

        htmlText += `
        <button class="anime-episode-button" onclick="LoadEpisode(${i})">
            ${i+1}
        </button>`
    }
    return htmlText
}

function OpenPlayPage(data) {
    console.log(data);
    CurrentAnime = data;
    CurrentEpisode = 1;
    ChangePage(PAGE_STATES.PLAYER_PAGE);
    console.log(data.totalEpisodes)
    LoadEpisode(0);
    
    document.getElementById("anime-player-container").innerHTML += `
    <div class="anime-player-title">
            ${data.animeTitle}
    </div>
    <div id="anime-episodes-container">
        ${makeEpisodeBtn(parseInt(data.eptotal))}
    </div>
    `
}

function LoadPlayer(streamLink, type) {
    if (document.getElementById('my-video') != null) {
        document.getElementById('my-video').remove();
    }

    document.getElementById("anime-player-container").innerHTML = `
    <video
    id="my-video"
    class="video-js"
    controls
    preload="auto"
    width="1100px"
    height="620px"
    poster="MY_VIDEO_POSTER.jpg">
    </video>
    ` + document.getElementById("anime-player-container").innerHTML;

    let video = videojs(document.getElementById('my-video'));
    video.src({
        src: streamLink,
        type: "audio/x-mpegURL"
    });
}

function ChangeEpisodeBtn(totalEpisodes) {
    document.getElementById('anime-episodes-container').innerHTML = `
        ${makeEpisodeBtn(totalEpisodes)}
    `
}

function LoadEpisode(epNumber) {
    CurrentEpisode = epNumber + 1;
    console.log(CurrentAnime.episodes.length)
    console.log(CurrentAnime.episodes.length - epNumber - 1)

    fetch(`http://127.0.0.1:5000/gogoanime/watch/${CurrentAnime.episodes[CurrentAnime.episodes.length - epNumber - 1].episodeId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res=>{
        if (res.ok) {
            res.json().then(data=>{
                LoadPlayer(data.sources[0].file, data.sources[0].type);
                ChangeEpisodeBtn(CurrentAnime.eptotal);
            });
        }
    });

}