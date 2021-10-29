var button = document.querySelector('#btn')
var bandName = document.querySelector('#bandName');
var bandPic = document.querySelector('#bandPic')
var upcomingShows = document.querySelector("#upcomingShows")
var topSongs = document.querySelector("#top-songs")
var lyrics = document.querySelector("#lyrics")

//LastFm API info
var lastFmRootURL = "http://ws.audioscrobbler.com/2.0/"
var lastFmAPIKey = "&api_key=6afc7c7f27dfe14e777df51baef17e8f&format=json"

function searchAndGenerateTopSongs(artist){
    //Grabs top 5 songs of the artist
    var topSongsURL = 
        lastFmRootURL + 
        "?method=artist.gettoptracks&artist=" +
        artist +
        "&limit=5"+
        lastFmAPIKey;

    fetch(topSongsURL)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data)
        })
}


button.addEventListener("click", function() {
    bandName.textContent = ""
    bandPic.setAttribute('src', "")
    upcomingShows.innerHTML = ""
    var searchVal = document.querySelector('#search').value

    var testUrl = "https://genius.p.rapidapi.com/artists/16775/songs"

    var requestUrl = "https://rest.bandsintown.com/artists/" + searchVal + "?app_id=3cc6769e7ff614003f89926a784e3cd0"
    
    fetch(requestUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            // console.log(data)
            if (Object.keys(data).length == 0) {
                bandName.textContent = "Artist not found"
                bandPic.setAttribute('src', "https://www.elegantthemes.com/blog/wp-content/uploads/2020/02/000-404.png")
                return 
            }
            else {
                bandName.textContent = data.name
                bandPic.setAttribute('src', data.image_url)
                
                var eventsUrl = "https://rest.bandsintown.com/artists/" + searchVal + "/events?app_id=3cc6769e7ff614003f89926a784e3cd0&date=upcoming"
                fetch(eventsUrl)
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                // console.log(data)
                if (Object.keys(data).length == 0) {
                        var noTourInfo = document.createElement('p')
                        noTourInfo.textContent = 'No upcoming shows!'
                        upcomingShows.append(noTourInfo)
                        return
                    }
                else {
                    for (var i = 0; i < data.length; i++) {
                        var tourInfo = document.createElement('p')
                        var tourDate = data[i].datetime.slice(0, 10)
                        tourInfo.textContent = data[i].venue.location + " at " + data[i].venue.name + ". Date: " + tourDate + " "
                        
                        var ticketPlaceholder = document.createElement('a')
                        var linkText = document.createTextNode("Get tickets!")
                        ticketPlaceholder.appendChild(linkText)
                        ticketPlaceholder.href = data[i].url
                        
                        upcomingShows.append(tourInfo)
                        tourInfo.append(ticketPlaceholder)
                    }}
                })
            }
        })
    
    //Call top songs function
    searchAndGenerateTopSongs(searchVal)
})