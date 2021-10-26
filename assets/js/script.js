var button = document.querySelector('#btn')
var bandName = document.querySelector('#bandName');
var bandPic = document.querySelector('#bandPic')
var upcomingShows = document.querySelector("#upcomingShows")

button.addEventListener("click", function() {
    bandName.textContent = ""
    bandPic.setAttribute('src', "")
    upcomingShows.innerHTML = ""
    var searchVal = document.querySelector('#search').value
    var requestUrl = "https://rest.bandsintown.com/artists/" + searchVal + "?app_id=3cc6769e7ff614003f89926a784e3cd0"
    
    fetch(requestUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            // console.log(data)
            if (Object.keys(data).length == 0) {
                bandName.textContent = "Artist not found"
                bandPic.setAttribute('src', "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2019/12/03202400/Yellow-Labrador-Retriever.jpg")
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
})