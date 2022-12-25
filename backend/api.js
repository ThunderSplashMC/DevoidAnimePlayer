const KitsuAPI = require('node-kitsu');
const GogoAPI = require('gogoanime');

exports.FetchAnimesBytitle = async (searchTerms) => {
    return await GogoAPI.search(searchTerms.join(' '))

    //return await KitsuAPI.searchAnime(searchTerms.join(' '), 0)
}

exports.FetchAnimeGogoData = async (name) => {
    let data = (await GogoAPI.search(name))[0]
    let firstEpisode = await GogoAPI.animeEpisodeHandler(data.episodes[0].id);
    data.firstEpisode = {
        streamLinks: firstEpisode[0].servers
    }
    return data;
}

exports.FetchAnimeEpisode = async (name, episode) => {
    let data = (await GogoAPI.search(name))[0]
    let episodeData = await GogoAPI.animeEpisodeHandler(data.episodes[episode - 1].id);
    let returnData = {
        streamLinks: episodeData[0].servers
    }
    return returnData;
}

exports.fetchPopular = () => {
    
}