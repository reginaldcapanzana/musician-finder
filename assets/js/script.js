var button = document.querySelector('#btn')
var bandName = document.querySelector('#bandName');
var bandPic = document.querySelector('#bandPic')
var upcomingShows = document.querySelector("#upcomingShows")
var topSongs = document.querySelector("#top-songs")
var topAlbums = document.querySelector("#top-albums")

//LastFm API info
var lastFmRootURL = "http://ws.audioscrobbler.com/2.0/"
var lastFmAPIKey = "&api_key=6afc7c7f27dfe14e777df51baef17e8f&format=json"

//TODO: Need to add function that clears topSongs and topAlbums divs
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
            //Check if any tracks are returned
             if(Object.keys(data).length == 0){
                 var noTracksAvail = document.createElement('p')
                 noTracksAvail.textContent = 'No Tracks Available'
                 topSongs.append(noTracksAvail)
                 return
             }
             else{
                var tracksData = data.toptracks.track
                for(var i = 0; i < tracksData.length; i++){   
                    var songName = document.createElement('p')
                    songName.textContent = tracksData[i].name
                    topSongs.append(songName)
                }
             }
        })
}

function searchAndGenerateTopAlbums(artist){
    //Grabs top 5 albums of the artist
    var topAlbumsURL = 
        lastFmRootURL + 
        "?method=artist.gettopalbums&artist=" +
        artist +
        "&limit=5"+
        lastFmAPIKey;

    fetch(topAlbumsURL)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            //Check if any tracks are returned
             if(Object.keys(data).length == 0){
                 var noAlbumsAvail = document.createElement('p')
                 noAlbumsAvail.textContent = 'No Albums Available'
                 topAlbums.append(noAlbumsAvail)
                 return
             }
             else{
                 console.log(data)
                var albumData = data.topalbums.album
                for(var i = 0; i < albumData.length; i++){   
                    var albumName = document.createElement('p')
                    albumName.textContent = albumData[i].name
                    topAlbums.append(albumName)
                }
             }
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
            //console.log(data)
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
                console.log(data)
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
    
    //Call top songs and top album function
    searchAndGenerateTopSongs(searchVal)
    searchAndGenerateTopAlbums(searchVal)
})