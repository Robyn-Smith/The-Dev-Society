var returnBtn = document.getElementById('returnBtn')

var watchList = []

function init() {
    var storedWatchList = JSON.parse(localStorage.getItem('watchList'))
    
    if (storedWatchList !== null) {
        watchList = storedWatchList
    }

    displayWatchList()
}

// Takes user back to homepage
returnBtn.addEventListener('click', function() {
    document.location.replace('index.html')
})