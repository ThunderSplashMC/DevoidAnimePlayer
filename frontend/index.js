function CheckAPIStatus() {
    fetch("http://127.0.0.1:5000/isalive", {
        method: 'GET',
    }).then((resp)=>{
        if (resp.ok) {
            console.log("API Is Online");
        } else {
            console.log("API is currently down");
        }
    }).catch(()=>{
        console.log("API is currently down");
    })
}

CheckAPIStatus();

DisplayPopular();

