var returnBtn = document.getElementById('returnBtn')

var myWatchList = document.getElementById('myWatchList')

var watchList = []

// Generates cards for each film/show saved to the watchlist
function displayWatchList() {
    myWatchList.innerHTML = ''
    
    // Loop through watchlist array
    for (var i = 0; i < watchList.length; i++) {
        var filmInfo = watchList[i]
        //console.log(filmInfo)

        var title = filmInfo.title
        var poster = filmInfo.poster

        // Generate the html for the cards
        var filmCards = document.createElement('div')
        filmCards.setAttribute('id', 'filmCard')
        filmCards.setAttribute('data-index', `${i}`)
        filmCards.innerHTML = 
        `<img id="listPoster" src="${poster}" alt="poster for the movie ${title}">
        <button id="removeBtn">X</button>
        <button id="faveBtn">☆</button>`

        myWatchList.appendChild(filmCards)
    }

}

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

init()