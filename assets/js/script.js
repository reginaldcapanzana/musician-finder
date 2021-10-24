var button = document.querySelector('#btn')
var bandName = document.querySelector('#bandName');
var bandPic = document.querySelector('#bandPic')
var listContainer = document.querySelector("#listContainer")

//Variables needed for Spotify API
const clientID = 'f0956f3b8a6d41f28174c3145226555f';
const clientSecret = 'f437039b0ecf433d94808485272815a8';
const redirectURI = 'https://reginaldcapanzana.github.io/musician-finder';

//Spotify API Token
// Will run on start up. Need Token before accessing anything from the SpotifyAPI
const spotifyAPIController = (function(){
    const getToken = async () => {
        const result = await fetch('https://accounts.spotify.com')
    }
})();

button.addEventListener("click", function() {
    // bandName.textContent = ""
    // bandPic.setAttribute('src', "")
    listContainer.innerHTML = ""
    var searchVal = document.querySelector('#search').value;
    // console.log(searchVal)
    var requestUrl = "https://rest.bandsintown.com/artists/" + searchVal + "?app_id=3cc6769e7ff614003f89926a784e3cd0"
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            bandName.textContent = data.name;
            bandPic.setAttribute('src', data.image_url)
        });
        var eventsUrl = "https://rest.bandsintown.com/artists/" + searchVal + "/events?app_id=3cc6769e7ff614003f89926a784e3cd0&date=upcoming"
    fetch(eventsUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var tourInfo = document.createElement('li');
                var tourDate = data[i].datetime.slice(0, 10)
                tourInfo.textContent = data[i].venue.location + " at " + data[i].venue.name + ". Date: " + tourDate
                listContainer.append(tourInfo)
            }
        })
    })