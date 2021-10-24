var button = document.querySelector('#btn')
var bandName = document.querySelector('#bandName');
//var userUrl = document.createElement('p');
var bandPic = document.querySelector('#bandPic')

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

    //Top Songs Spotify API
    var topSongsURL = "https://api.spotify.com/v1/artists/" + searchVal + "/top-tracks";
    fetch(topSongsURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
        })

    })