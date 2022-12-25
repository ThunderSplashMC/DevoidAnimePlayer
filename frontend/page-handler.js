const PAGE_STATES = {
    HOME_PAGE : 0,
    SEARCH_PAGE : 1,
    PLAYER_PAGE : 2
}

let CurrentPage = PAGE_STATES.HOME_PAGE;

function ChangePage(Page) {
    if (Page == PAGE_STATES.HOME_PAGE) {
        window.open("./index.html", '_self');
    }
    if (Page == PAGE_STATES.PLAYER_PAGE) {
        LoadAnimePlayerPage();
    }
}

function LoadAnimePlayerPage() {
    if (document.getElementById('anime-search-body') == null) {
        document.getElementById('anime-page').innerHTML = '<div id="anime-search-body"></div>';
        
    }
    else {
        document.getElementById('anime-search-body').innerHTML = "";
    }
    if (document.getElementById('anime-player-container') == null) {
        document.getElementById('anime-search-body').innerHTML = `
        <div id="anime-player-container"></div>
        `
    }
}