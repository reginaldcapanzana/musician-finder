var button = document.querySelector('#btn')
var bandName = document.querySelector('#bandName');
//var userUrl = document.createElement('p');
var bandPic = document.querySelector('#bandPic')

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
    })