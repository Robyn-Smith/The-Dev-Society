var apiKey = 'e53831fe';
// YouTube API
var apiKey2 = 'AIzaSyAQ6qYnLqpxfSWS1FZVakvqLEOfVjXlJp4';
//var apiKey2 = 'AIzaSyDE6KlHz8PmrCyHMADxzBtkvSrMU2pzJ8c';

var apiKey3a = '77ca7d6ec3122dd37ca00d73aa375bef';
var apiKey3 = 'AIzaSyD7xo_u2lBGkDL4xt_JdCr8ew06xLLt0pI';

var mainInput = document.getElementById("main-input");


var movieInput = document.getElementById('movie-input')
var searchButton = document.getElementById('search-button');
var addButton = document.getElementById('addBtn')
var viewButtonMain = document.getElementById('viewBtnMain')
var viewButtonDetails = document.getElementById('viewBtnDetails')
var backButton = document.getElementById('backBtn');

var movieNameEl = document.getElementById('movie-name');
var yearEl = document.getElementById('year');
var actorEl = document.getElementById('actors');
var plotEl = document.getElementById('plot');
var genreEl = document.getElementById('genre');
var countryEl = document.getElementById('country');
var addedMessageEl = document.getElementById('added-message')

var imageEl = document.getElementById("poster");
var posterButton = document.getElementById("poster-button");
var playerDialog = document.getElementById('player');
var mapEl = document.getElementById('map');

var historyEl = document.getElementById('history');
var errorEl = document.getElementById('error');
var iframeDiv = document.getElementById('iframe');
var closeBtn = document.getElementById('close');
var errorWelcomeEl = document.getElementById('error-welcome');

var movieList = document.getElementById('movie-list');
var welcomeSection = document.getElementById('welcome');
var detailsSection = document.getElementById('details');

var movieArray = ['https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg', ];

var watchList = []
var saveVideoId='';


/**
 * to the movie details from OMDB api
 * @param movie
 * @returns respoonse.json() upon response failed
 */
function retrieveOMDB(movie){

  var requestUrl = "https://www.omdbapi.com/?apikey=" +  apiKey + "&t=" + movie;
  errorEl.textContent = "";

  fetch(requestUrl)
  .then(function (response) {
    if (response.status !== 200){
      console.log(response);
    }   
    return response.json();
  })
  .then(function(data){
    console.log(data);

    if ('Error' in data){
      errorEl.textContent = data.Error;
    } else {
      addButton.style.display = 'block'
      if ('Title' in data) {
        movieNameEl.textContent =  data.Title;
        // do the trailer part!
        youtubeSearch(data.Title);
        saveHistory(data.Title);          
      }
      if ('imdbRating' in data){
        var rating = data.imdbRating;
        var a ="";
        if (rating != 'N/A'){
          rating = parseInt(rating);
          console.log(rating);
          while (rating >= 2){
            a = a + "⭐";
            rating -=2;
          }
        }
        console.log(parseInt(rating));
        movieNameEl.textContent =  data.Title +" " + a + " (" + data.imdbRating + ")";
        // If the film's title isn't in local storage, set the add button's text to '+ Add To Watchlist"
        if (!watchList.find(({title}) => title === movieNameEl.textContent)) {
          addButton.textContent = '+ Add To Watchlist'
        } else {
          // Otherwise set it to '- Remove From Watchlist'
          addButton.textContent = '- Remove From Watchlist'
        }
      }
      if ('Released' in data){
        yearEl.textContent = "Year: " + data.Released;
      }
      if ('Actors' in data){
        actorEl.textContent = "Actors: " + data.Actors;
      }
      if ('Plot' in data){
        plotEl.textContent = "Plot: " + data.Plot;
      }
      if ('Genre' in data){
        genreEl.textContent = "Genre: " + data.Genre;
      }
      if ('Poster' in data){
        imageEl.src = data.Poster;
        imageEl.alt = data.Title;
        imageEl.style.display = 'block';
      } else {
        imageEl.style.display = 'none';
      }

      if ('Country' in data){
        var a = data.Country.split(", ");
        console.log(a[0]);
        countryEl.textContent = "Country: " + a[0];
        retrieveLatLong(data.Country.split(", ")[0]);
      }  
    }
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
    errorEl.textContent = "Connection Error";

  });
}


/**
 * to the movie details from OMDB api
 * @param movie
 * @returns respoonse.json() upon response failed
 */
function retrieveOMDBfromWelcome(movie){

  var requestUrl = "https://www.omdbapi.com/?apikey=" +  apiKey + "&t=" + movie;
  errorWelcomeEl.textContent = "";

  fetch(requestUrl)
  .then(function (response) {
    if (response.status !== 200){
      console.log(response);
    }   
    return response.json();
  })
  .then(function(data){
    console.log(data);

    if ('Error' in data){
      errorWelcomeEl.textContent = data.Error;
      welcomeSection.setAttribute("style", "display:inline;");
      detailsSection.setAttribute("style", "display:none;");  
    
      //console.log("")
    } else {
      if ('Title' in data) {
        movieNameEl.textContent =  data.Title;
        // do the trailer part!
        youtubeSearch(data.Title);
        saveHistory(data.Title);          
      }
      if ('imdbRating' in data){
        var rating = data.imdbRating;
        var a ="";
        if (rating != 'N/A'){
          rating = parseInt(rating);
          console.log(rating);
          while (rating >= 2){
            a = a + "⭐";
            rating -=2;
          }
        }
        console.log(parseInt(rating));
        movieNameEl.textContent =  data.Title +" " + a + " (" + data.imdbRating + ")";
        // If the film's title isn't in local storage, set the add button's text to '+ Add To Watchlist"
        if (!watchList.find(({title}) => title === movieNameEl.textContent)) {
          addButton.textContent = '+ Add To Watchlist'
        } else {
          // Otherwise set it to '- Remove From Watchlist'
          addButton.textContent = '- Remove From Watchlist'
        }
      }
      if ('Released' in data){
        yearEl.textContent = "Year: " + data.Released;
      }
      if ('Actors' in data){
        actorEl.textContent = "Actors: " + data.Actors;
      }
      if ('Plot' in data){
        plotEl.textContent = "Plot: " + data.Plot;
      }
      if ('Genre' in data){
        genreEl.textContent = "Genre: " + data.Genre;
      }
      if ('Poster' in data){
        imageEl.src = data.Poster;
        imageEl.alt = data.Title;
        imageEl.style.display = 'block';
      } else {
        imageEl.style.display = 'none';
      }

      if ('Country' in data){
        var a = data.Country.split(", ");
        console.log(a[0]);
        countryEl.textContent = "Country: " + a[0];
        retrieveLatLong(data.Country.split(", ")[0]);
      }  
      welcomeSection.setAttribute("style", "display:none;");
      detailsSection.setAttribute("style", "display:inline;");  

    }
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
    errorEl.textContent = "Connection Error";
    errorWelcomeEl.textContent = "Connection Error";

  });
}


/**
 * to perform the geocode that map the country code to lat and long
 * @param city 
 * @returns respoonse.json() upon response failed
 */
function retrieveLatLong(city){

  //var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + '&appid=' + apiKey3a;
  var requestUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyCr-Av0kS8QAYgzV2dOHJXomDn8rxTcsRA`;

  var lat = 0;
  var long =0;
  errorEl.textContent = "";
  //console.log(requestUrl);
  fetch(requestUrl)
  .then(function (response) {
    if (response.status !== 200){
      console.log(response);
    }   
    return response.json();
  })
  .then(function(data){
    if (data.status == "OK"){
      lat = data.results[0].geometry.location.lat;
      long = data.results[0].geometry.location.lng;
      initMap2(lat, long);
  
    } else {
      errorEl.textContent = data.status;
      mapEl.style.display = "none";
    }

  })
  .catch((error) => {
    console.error('Error fetching data:', error);
    errorEl.textContent = "Connection Error";
    mapEl.style.display = "none";    

  });
}


/**
 * to perform the geocode that map the country code to lat and long
 * @param title  movie title to search
 * @returns respoonse.json() upon response failed
 */
function youtubeSearch(title) {
  
  console.log(title);
  var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + title + " trailer&type=video&key=" + apiKey2;

  fetch(url)
  .then(response => response.json())
  .then(data => {
    if ('items' in data){
      var videoId = data.items[0].id.videoId;
      loadVideo(videoId);
    }
    else {
      console.log(data);
      iframeDiv.setAttribute('src', './assets/images/snow.png');
    }
  })
  .catch(error => {
    console.error('Error:', error)
    iframeDiv.setAttribute('src', './assets/images/snow.png');
  });
}

function loadVideo(videoId) {
  
  // playerDiv.innerHTML = '<iframe width="640" height="360" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

  // Set attributes of the iframe
  iframeDiv.setAttribute('width', '640');
  iframeDiv.setAttribute('height', '360');

  iframeDiv.setAttribute('src', 'https://www.youtube.com/embed/' + videoId);
  iframeDiv.setAttribute('frameborder', '0');
  iframeDiv.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media;'); 
  iframeDiv.setAttribute('allowfullscreen', '');
  saveVideoId = videoId;


}


// Initialize and add the map
function initMap() {
  // The location of the UK
  //console.log("here!")
  //const uk = { lat: 55.3781, lng: -3.4360 };
  // The map, centered at the UK
  /*var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: uk,
  });*/
  // The marker, positioned at the UK
  /*const marker = new google.maps.Marker({
    position: uk,
    map: map,
  });
  map.style.display = "none";*/
}

// Initialize and add the map
function initMap2(lat, long) {
  var uk = { lat: lat, lng: long };
  // The map, centered at the UK
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: uk,
    mapTypeControl: false,
    streetViewControl: false, // Disable Street View 
    fullscreenControl: false // Disable Fullscreen control
  });
  // The marker, positioned at the UK
  var marker = new google.maps.Marker({
    position: uk,
    map: map,
  });
}


/**
 * to save the city to save history (local storage)
 * @param title
 * @returns None
 */
function saveHistory(title){
  // get localHistory to array
  var array = [];
  if (localStorage.getItem('saved-titles')!= null){
    array = JSON.parse(localStorage.getItem('saved-titles'));
  }
  // Find the index of the element in the array
  var index = array.indexOf(title);
  // Check if the element exists (index will be -1 if the element is not found)
  if (index !== -1) {
    // Remove the element using splice()
    array.splice(index, 1);
  }  
  array.push(title);
  //console.log(array);
  localStorage.setItem('saved-titles', JSON.stringify(array));
  // remove existing entries
  // Remove all li elements (children) from the ul
  while (historyEl.firstChild) {
    historyEl.removeChild(historyEl.firstChild);
  }  
  // create all childs
  for (i=array.length-1; i>=0; i--){
    liEl = document.createElement('li');
    liEl.textContent = array[i];
    liEl.classList.add('histBtn');
    historyEl.appendChild(liEl);
  }
  
}


/**
 * to load the save history from local history
 * @param None
 * @returns None
 */
function loadFromLocalStorage(){
  var array = [];
  // Get watchlist out of local storage and assign to storedWatchList
  var storedWatchList = JSON.parse(localStorage.getItem('watchList') || "[]")

  // If the storedWatchList is populated, assign to watchList
  if(storedWatchList !== null) {
    watchList = storedWatchList
  }

  if (localStorage.getItem('saved-titles')!= null){
    array = JSON.parse(localStorage.getItem('saved-titles'));
  }
  while (historyEl.firstChild) {
    historyEl.removeChild(historyEl.firstChild);
  }  
  // create all childs
  for (i=array.length-1; i>=0; i--){
    liEl = document.createElement('li');
    liEl.textContent = array[i];
    liEl.classList.add('histBtn');
    historyEl.appendChild(liEl);
  }

}

/**
 * to store the watchlist to localStorage
 * @param None
 * @returns None
 */
function storeWatchList() {
  localStorage.setItem('watchList', JSON.stringify(watchList))
}



/**
 * to get Api - wrapper function
 * @param event
 * @returns none
 */
function getApi(event) {
  //console.log("Clicked");
  event.preventDefault();
  if (movieInput.value){
    movie = movieInput.value;
    retrieveOMDB(movie);

  } else {
    if (event.target.matches('.histBtn')) {
      movie = event.target.textContent;
      retrieveOMDB(movie);
    } else {
      errorEl.textContent = "Please enter a movie name";
    }

  }
  movieInput.value = '';  
  // 20230520: 
  movieInput.blur(); 
}

/**
 * to perform OMDB search from Welcome page
 * @param movie movie name
 * @returns None
 */
function mainLogic(movie){

  retrieveOMDBfromWelcome(movie);
  mainInput.value = '';
  mainInput.blur(); 

}

/**
 * to show the Modal out
 * @param none
 * @returns none
 */
function showModal1(){
  loadVideo(saveVideoId);
  playerDialog.showModal();
}
/**
 * to close the modal 
 * @param none
 * @returns None
 */
function closeModal1() {
  playerDialog.close();
  iframeDiv.setAttribute('src', '');
}

/**
 * to perform back to main page function
 * @param none
 * @returns none
 */
function backToMain(){
  event.preventDefault();
  welcomeSection.setAttribute("style", "display:inline;");
  detailsSection.setAttribute("style", "display:none;");
}

/**
 * Initialization
 * @param none
 * @returns none
 */
function initMovie(){

  // Clear out the previous iframe
  while (movieList.firstChild) {
    movieList.removeChild(movieList.firstChild);
  }
  var selected = [];
  for (var i=0; i<30; i++){
    var randomIndex = Math.floor(Math.random() * (tempArray.length));
    selected.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }
  for (var i=0; i<selected.length; i++){
    // Append the iframe to the player div
    var button = document.createElement('button');  
    var imgsrc = document.createElement('img');  
    imgsrc.src = selected[i].poster;
    imgsrc.alt = selected[i].Title;
    imgsrc.style.display = 'inline-block';
    button.classList.add('hot');
    button.setAttribute('data-movie', selected[i].title);
    button.appendChild(imgsrc);
    button.addEventListener('click', function(event) {
      var movie = event.currentTarget.getAttribute('data-movie');
      console.log(movie)
      console.log(event);
      mainLogic(movie);
    });      
    movieList.appendChild(button);  

  }

  
}

// Checks if the film title already exists in the watchlist before trying to add it
function pushToWatchList(watchList, options) {
  if (!watchList.find(({title}) => title === options.title)) {
      watchList.push(options)
      // Sets the message that appears beneath the add button
      addedMessageEl.textContent = `Added ${movieNameEl.textContent} to your watchlist`
      // Remove added message after 2 seconds
      setTimeout(function() {
          addedMessageEl.textContent = ''
      }, 2000)
      storeWatchList()
      // Change button text to remove
      addButton.textContent = '- Remove From Watchlist'
  } else {
      // Loop through watchList, if the title of the removed film is in the watchList, remove it from the watchList and update the watchList
      for (var i = 0; i < watchList.length; i++) {
        var index = watchList[i]
        if (index.title == options.title) {
            watchList.splice(i, 1)
        }
      }
      // Sets the message that appears beneath the remove button
      addedMessageEl.textContent = `Removed ${movieNameEl.textContent} from your watchlist`
      // Remove added message after 2 seconds
      setTimeout(function() {
        addedMessageEl.textContent = ''
      }, 2000)
      storeWatchList()
      // Change button text to add
      addButton.textContent = '+ Add To Watchlist'
  }
}


$(function () {

  initMovie();

  mainInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && mainInput.value != "") {
      // Enter key is pressed, do something
      event.preventDefault(); // Prevent form submission or other default behavior
      // Add your code here to handle the Enter key press
      var movie = mainInput.value;
      mainLogic(movie);
      mainInput.value = '';
      mainInput.blur(); 

    }
  });
  


  // search button clicked
  searchButton.addEventListener('click', getApi);

  // Event listener for clicks on the add/remove button
  addButton.addEventListener('click', function() {
    // Film information to be stored/removed from the watchList
    var options = {
      title: movieNameEl.textContent,
      year: yearEl.textContent,
      actors: actorEl.textContent,
      plot: plotEl.textContent,
      poster: imageEl.src
    } 

    // Pass watchList and options into pushToWatchList function
    pushToWatchList(watchList, options)
    })

  // load from local Storage
  loadFromLocalStorage();

  // for clicking on saved history button
  document.addEventListener('click', function(event) {
    if (event.target.matches('.histBtn')) {
      getApi(event);
    }
    /*if (event.target.matches('.hot')){
      console.log(event);
      getApi(event);
    }*/
  });  

  posterButton.addEventListener('click', showModal1);
  closeBtn.addEventListener('click', closeModal1);

  // clear the error message upon focus on input field
  movieInput.addEventListener('focus', function() {
    errorEl.textContent = "";
  });  

  // clear the error message upon focus on input field
  mainInput.addEventListener('focus', function() {
    errorWelcomeEl.textContent = "";
  });  

  backButton.addEventListener('click', backToMain);

  // Event listener for view watchlist button on the welcome page
  viewButtonMain.addEventListener('click', function(e) {
    // Prevent the page from reloading on click
    e.preventDefault()
    // Sets the document location to the watchlist page
    document.location.replace('watchlist.html')
  })

  // Event listener for view watchlist button on the results page
  viewButtonDetails.addEventListener('click', function(e) {
    // Prevent the page from reloading on click
    e.preventDefault()
    // Sets the document location to the watchlist page
    document.location.replace('watchlist.html')
  })

  $("#main-input").autocomplete({
    source: availableTags
  });

  $('#movie-list').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]

  });


});
