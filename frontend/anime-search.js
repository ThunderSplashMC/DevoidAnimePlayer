function Search() {
    const inputData = document.getElementById("search_bar").value.split(" ");
    document.getElementById("search_bar").innerText = "";
    fetch(`http://127.0.0.1:5000/gogoanime/search?keyw=${inputData.join('%')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res=>{
        if (res.ok) {
            res.json().then(data=>{DisplayAnimes(data)});
        }
    })
}

function DisplayAnimes(AnimeData) {
    console.log(AnimeData);
    document.getElementById('anime-search-body').innerHTML = "";
    for (let i = 0; i < AnimeData.length; i++) {
        document.getElementById('anime-search-body').innerHTML += `<div class="animeTile" onclick="OnAnimeTileClick('${AnimeData[i].animeId}')" title="${AnimeData[i].animeTitle}">
        <div class="animePosterImg">
            <img src="${AnimeData[i].animeImg}">
        </div>
        <div class="animeTitle">
            <p>
                ${AnimeData[i].animeTitle}
            </p>
        </div>
        </div>
        `
    }
}

function DisplayAnimes(AnimeData) {
    console.log(AnimeData);
    document.getElementById('anime-search-body').innerHTML = "";
    for (let i = 0; i < AnimeData.length; i++) {
        document.getElementById('anime-search-body').innerHTML += `<div class="animeTile" onclick="OnAnimeTileClick('${AnimeData[i].animeId}')" title="${AnimeData[i].animeTitle}">
        <div class="animePosterImg">
            <img src="${AnimeData[i].animeImg}">
        </div>
        <div class="animeTitle">
            <p>
                ${AnimeData[i].animeTitle}
            </p>
        </div>
        </div>
        `
    }
}

// .attributes.posterImage.large

function OnAnimeTileClick(animeID) {
    fetch(`http://127.0.0.1:5000/gogoanime/info/${animeID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res=>{
        if (res.ok) {
            res.json().then(data=>{
                OpenPlayPage(data);
            });
        }
    })
}

function DisplayPopular() {
    fetch(`http://127.0.0.1:5000/popular`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res=>{
        if (res.ok) {
            res.json().then(data=>{
                DisplayAnimes(data)
            });
        }
    })
}