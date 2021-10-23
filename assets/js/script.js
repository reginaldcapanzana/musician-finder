var button = document.querySelector('#btn')
var bandName = document.querySelector('#bandName');
var bandPic = document.querySelector('#bandPic')
var listContainer = document.querySelector("#listContainer")

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