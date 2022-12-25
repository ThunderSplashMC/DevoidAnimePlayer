const api = require('./api');
const AnimeAPIServer = import('./AnimeAPI/index.js');
const express = require('express');
const cors = require('cors')
const app = express()
const port = 5000

AnimeAPIServer.then((animeApi)=>{app.use(animeApi.router)})
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/isalive', (req, res)=> {
    res.send(`<3`);
})

app.get('/anime/popular', (req, res)=> {
    res.send(`<3`);
})

app.post("/anime/search", (req, res)=>{
    data = api.FetchAnimesBytitle(req.body.searchTerms).then((data)=>{
        res.send(JSON.stringify(data));
    });
})

app.post("/anime/data", (req, res)=>{
    api.FetchAnimeGogoData(req.body.name).then((data)=>{
        res.send(JSON.stringify(data));
    })
})

app.post("/anime/episode", (req, res)=>{
    api.FetchAnimeEpisode(req.body.name, req.body.episode).then((data)=>{
        res.send(JSON.stringify(data));
    })
})


app.listen(port, ()=>{
    console.log(`Server running on ${port}`);
})