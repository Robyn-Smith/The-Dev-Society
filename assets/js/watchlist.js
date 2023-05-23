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
        <button id="removeBtn">X</button>`

        myWatchList.appendChild(filmCards)
    }

}

// Generates a modal for the selected film
function generateModal(index) {
    // Grab details of selected film using its index
    var filmInfo = watchList[index]

    // Assign each child of the watchlist to a variable
    var title = filmInfo.title
    var year = filmInfo.year
    var actors = filmInfo.actors
    var plot = filmInfo.plot
    var poster = filmInfo.poster

    // Generate the html for the modal, this contains information about the clicked film
    var movieInfo = document.createElement('dialog')
    movieInfo.innerHTML =
    `<div class="six columns">
        <img id="savedPoster" src="${poster}" alt="Poster for the movie ${title}"></img>
    </div>
    <div class="six columns">
        <p id="savedTitle">${title}</p>
        <p id="savedYear">${year}</p>
        <p id="savedActors">${actors}</p>
        <p id="savedPlot">${plot}</p>
    </div>`

    myWatchList.appendChild(movieInfo)
    // Show the selected modal
    movieInfo.showModal()

    // Close the modal if the user clicks outside of it
    movieInfo.addEventListener("click", function(e) {
        // Get bounds of modal
        const dialogDimensions = movieInfo.getBoundingClientRect()
        if (
          e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right ||
          e.clientY < dialogDimensions.top ||
          e.clientY > dialogDimensions.bottom
        ) {
          // remove() will delete the created dialog element, unlike close() which only hides it
          movieInfo.remove()
        }
      })
}

// Store watchList to local storage
function storeWatchList() {
    localStorage.setItem('watchList', JSON.stringify(watchList))
}

// Set initial conditions for the page
function init() {
    // Get the watchList out of local storage and assign to storedWatchList
    var storedWatchList = JSON.parse(localStorage.getItem('watchList'))
    
    // If the storedWatchList is populated, assign to watchList
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