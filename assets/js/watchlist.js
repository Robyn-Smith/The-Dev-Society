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

// Generates a modal for the selected film
function generateModal(index) {
    // Grab details of selected film using its index
    var filmInfo = watchList[index]

    var title = filmInfo.title
    var year = filmInfo.year
    var actors = filmInfo.actors
    var plot = filmInfo.plot
    var poster = filmInfo.poster

    // Generate the html for the modal
    var movieInfo = document.createElement('dialog')
    movieInfo.innerHTML =
    `<div>
        <img id="savedPoster" src="${poster}" alt="poster for the movie ${title}"></img>
    </div>
    <div>
        <p id="savedTitle">Title: <span>${title}</span></p>
        <p id="savedYear">Year: <span>${year}</span></p>
        <p id="savedActors">Actors: <span>${actors}</span></p>
        <p id="savedPlot">Plot: <span>${plot}</span></p>
    </div>`

    myWatchList.appendChild(movieInfo)
    // Show the selected modal
    movieInfo.showModal()
}

function storeWatchList() {
    localStorage.setItem('watchList', JSON.stringify(watchList))
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

// Even listeners for watchlist elements
myWatchList.addEventListener('click', function(e) {
    var element = e.target

    // Removes film from the watch list and updates the page
    if (element.matches('#removeBtn')) {
        var index = element.parentElement.getAttribute("data-index")
        console.log(index)
        watchList.splice(index, 1)

        storeWatchList()
        displayWatchList()
    }

    // Generate modal for selected film when its poster is clicked
    if (element.matches('#listPoster')) {
        var index = element.parentElement.getAttribute("data-index")
        
        console.log(index)
        generateModal(index)
    }
})

init()