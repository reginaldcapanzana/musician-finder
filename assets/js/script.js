var searchButton = document.querySelector('#search-btn')
var bandName = document.querySelector('#bandName');
var bandPic = document.querySelector('#bandPic')
var upcomingShows = document.querySelector("#upcomingShows")
var topSongs = document.querySelector("#top-songs")
var topAlbums = document.querySelector("#top-albums")
var pastSearches = document.querySelector("#previous-searches");
var pastButtons = [];
var clearBtn = document.querySelector('#clear-btn')
var bigRow = document.querySelector("#bigRow")
var smallRow = document.querySelector("#smallRow")
var currVisible = false;

//LastFm API info
var lastFmRootURL = "http://ws.audioscrobbler.com/2.0/"
var lastFmAPIKey = "&api_key=6afc7c7f27dfe14e777df51baef17e8f&format=json"

clearBtn.addEventListener("click", function() {
    bandName.textContent = ""
    bandPic.setAttribute('src', "https://designshack.net/wp-content/uploads/placeholder-image.png")
    upcomingShows.innerHTML = ""
    document.querySelector('#search').value = ""
    pastSearches.innerHTML = ""
    localStorage.removeItem('previousBands');
    topSongs.innerHTML = ""
    topAlbums.innerHTML = ""
    bigRow.setAttribute('style', 'visibility: hidden;')
    smallRow.setAttribute('style', 'visibility: hidden;')
    currVisible = false;
})

searchButton.addEventListener("click", handleFormSubmit)

function handleFormSubmit(event){
    var searchVal = document.querySelector('#search').value
    if (!searchVal){
        return
    }
    event.preventDefault();
    searchBands(searchVal);
}

function searchBands(search){
    bandName.textContent = ""
    bandPic.setAttribute('src', "")
    upcomingShows.innerHTML = ""
    topSongs.innerHTML = ""
    topAlbums.innerHTML = ""

    var requestUrl = "https://rest.bandsintown.com/artists/" + search + "?app_id=3cc6769e7ff614003f89926a784e3cd0"
    
    fetch(requestUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            if (Object.keys(data).length == 0) {
                bandName.textContent = "Artist not found"
                bandPic.setAttribute('src', "https://www.elegantthemes.com/blog/wp-content/uploads/2020/02/000-404.png")
                return 
            }
            else {
                bandName.textContent = data.name
                bandPic.setAttribute('src', data.image_url)
                
                var eventsUrl = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=3cc6769e7ff614003f89926a784e3cd0&date=upcoming"
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
                        tourInfo.setAttribute('style', 'white-space: pre;')
                        tourInfo.setAttribute('class', 'upcomingShows')
                        tourInfo.textContent = data[i].venue.location + " at " + data[i].venue.name + "\r\n"
                        tourInfo.textContent += "Date: " + tourDate + " "
                        
                        var ticketPlaceholder = document.createElement('a')
                        var linkText = document.createTextNode("Get tickets!")
                        ticketPlaceholder.setAttribute('style', 'color: #dabea7;')
                        ticketPlaceholder.appendChild(linkText)
                        ticketPlaceholder.href = data[i].url
                        
                        upcomingShows.append(tourInfo)
                        tourInfo.append(ticketPlaceholder)
                    }}
                })
                //Call top songs and top album function
                searchAndGenerateTopSongs(search)
                searchAndGenerateTopAlbums(search)
                addToButtonList(search)
                if (currVisible === false) {
                  setVisibility(bigRow);
                  setVisibility(smallRow);
                  currVisible = true;
                }
            }
        })
    
    
}

function setVisibility(row) {
  row.setAttribute("style", "visibility: visible;");
}

function searchAndGenerateTopSongs(artist){
    // topSongs.innerHTML = ""
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
    // topAlbums.innerHTML = ""
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

function addToButtonList(search){
    if(pastButtons.indexOf(search) !== -1){
        return
    }
    pastButtons.push(search);
    localStorage.setItem("previousBands", JSON.stringify(pastButtons));
    makeButtons()
}

function checkButtons() {
    var pastSearchButtons = localStorage.getItem("previousBands");
    if (pastSearchButtons) {
      pastButtons = JSON.parse(pastSearchButtons);
    }
    makeButtons();
  }

checkButtons()
    
function makeButtons() {
    pastSearches.innerHTML = ""
    
    for (var i = 0; i < pastButtons.length; i++) {
        const band = pastButtons[i];
        var newBtn = document.createElement("button");

        newBtn.textContent = band;
        newBtn.setAttribute('type', 'button');
        newBtn.setAttribute("data-value", band);
        newBtn.setAttribute('class', 'pure-button custom-button btnPast');
        pastSearches.append(newBtn);
    }
}        

function pastSearchBtn(event){
    if(!event.target.matches('.btnPast')){
        return
    }
    document.querySelector('#search').value = ""
    var btn = event.target;
    var search= btn.getAttribute('data-value')
    searchBands(search);
}
pastSearches.addEventListener('click', pastSearchBtn);