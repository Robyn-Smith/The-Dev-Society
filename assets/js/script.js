var apiKey = 'e53831fe';
// YouTube API
//var apiKey2 = 'AIzaSyAQ6qYnLqpxfSWS1FZVakvqLEOfVjXlJp4';
var apiKey2 = 'AIzaSyDE6KlHz8PmrCyHMADxzBtkvSrMU2pzJ8c';

var apiKey3a = '77ca7d6ec3122dd37ca00d73aa375bef';
var apiKey3 = 'AIzaSyD7xo_u2lBGkDL4xt_JdCr8ew06xLLt0pI';

var mainInput = document.getElementById("main-input");


var movieInput = document.getElementById('movie-input')
var searchButton = document.getElementById('search-button');
var addButton = document.getElementById('addBtn')

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

var movieList = document.getElementById('movie-list');
var welcomeSection = document.getElementById('welcome');
var detailsSection = document.getElementById('details');

var movieArray = ['https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg', ];

var watchList = []


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
 * to retrieve the Latitude and Longitude from city name using api 
 * @param city
 * @returns respoonse.json() upon response failed
 */
/*function retrieveLatLong(countryName) {
  console.log(countryName);
  // Google Geocoding API url
  var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${countryName}&key={apiKey2}`;

  // Fetch the data from the API
  fetch(url)
      .then(response => response.json())  // Convert response to JSON
      .then(data => {
          console.log(data);
          if (data.status === "OK") {
              // Get the location (latitude and longitude) from the response
              var location = data.results[0].geometry.location;
              console.log(location);
              //initMap2(lat, long);              
          } else {
              console.log('No results found');
          }
      })
      .catch(error => console.log('Error: ', error));
}*/

function retrieveLatLong(city){

  //console.log(city);
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
      //console.log('retrieveLatLong');
      //console.log(data);
      lat = data.results[0].geometry.location.lat;
      long = data.results[0].geometry.location.lng;
      //console.log(lat);
      //console.log(long);
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



function youtubeSearch(title) {
  
  console.log(title);
  var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + title + " trailer&type=video&key=" + apiKey2;

  fetch(url)
  .then(response => response.json())
  .then(data => {
      var videoId = data.items[0].id.videoId;
      loadVideo(videoId);
  })
  .catch(error => console.error('Error:', error));
}

function loadVideo(videoId) {
  
  // playerDiv.innerHTML = '<iframe width="640" height="360" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

  // Clear out the previous iframe
  //while (playerDiv.firstChild) {
  //  playerDiv.removeChild(playerDiv.firstChild);
  //}

  // Create a new iframe
  //var iframe = document.createElement('iframe');

  // Set attributes of the iframe
  iframeDiv.setAttribute('width', '640');
  iframeDiv.setAttribute('height', '360');
  iframeDiv.setAttribute('src', 'https://www.youtube.com/embed/' + videoId);
  iframeDiv.setAttribute('frameborder', '0');
  iframeDiv.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media;'); 
  //gyroscope; picture-in-picture');
  iframeDiv.setAttribute('allowfullscreen', '');

  // Append the iframe to the player div
  //playerDiv.appendChild(iframe);  

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
  // The location of the UK
  //console.log("here!")
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
  mapEl.style.display = "block";
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
    liEl.classList.add('histBtn',  'btn', 'btn-primary', 'w-100', 'list-group-item', 'list-group-item-action', 'mb-1');
    //console.log(liEl);
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
  var storedWatchList = JSON.parse(localStorage.getItem('watchList') || "[]")

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
    liEl.classList.add('histBtn',  'btn', 'btn-primary', 'w-100', 'list-group-item', 'list-group-item-action', 'mb-2');
    //console.log(liEl);
    historyEl.appendChild(liEl);
  }

}

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
}

function mainLogic(movie){

  retrieveOMDB(movie);
  welcomeSection.setAttribute("style", "display:none;");
  detailsSection.setAttribute("style", "display:inline;");

}

function showModal1(){
  console.log(playerDialog);
  playerDialog.showModal();
}
function closeModal1() {
  playerDialog.close();
}

function initMovie(){

  // Clear out the previous iframe
  while (movieList.firstChild) {
    movieList.removeChild(movieList.firstChild);
  }

  // Create a new list
  
  // Random Select 5 movies
  // var tempArray = [{title: "Avatar", poster: "https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg"}, 
  //                  {title: "Fall", poster: "https://m.media-amazon.com/images/M/MV5BNGI3MWYwYjItNzZhYi00ZWIzLTkyMzYtN2JmNjg3ODg1NTg4XkEyXkFqcGdeQXVyMTMwMDA5ODU3._V1_SX300.jpg"}, 
  //                  {title: "Puss in Boots", poster: "https://m.media-amazon.com/images/M/MV5BMTMxMTU5MTY4MV5BMl5BanBnXkFtZTcwNzgyNjg2NQ@@._V1_SX300.jpg"}, 
  //                  {title: "Inception", poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg"}, 
  //                  {title: "Titanic", poster: "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"}, 
  //                  {title: "Squid Game", poster: "https://m.media-amazon.com/images/M/MV5BYWE3MDVkN2EtNjQ5MS00ZDQ4LTliNzYtMjc2YWMzMDEwMTA3XkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_SX300.jpg"}, 
  //                  {title: "Nomadland", poster: "https://m.media-amazon.com/images/M/MV5BMDRiZWUxNmItNDU5Yy00ODNmLTk0M2ItZjQzZTA5OTJkZjkyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg"}, 
  //                  {title: "Parasite", poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg"}, 
  //                  {title: "No Time to Die ", poster: "https://m.media-amazon.com/images/M/MV5BYWQ2NzQ1NjktMzNkNS00MGY1LTgwMmMtYTllYTI5YzNmMmE0XkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_SX300.jpg"}, 
  //                  {title: "Parasite", poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg"}, 
  //                 ];
  var selected = [];
  for (var i=0; i<5; i++){
    var randomIndex = Math.floor(Math.random() * (tempArray.length));
    selected.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }
  console.log(selected);
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
  console.log(movieList);
  // Append the iframe to the player div
  //playerDiv.appendChild(iframe);  

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
    }
  });
  


  // search button clicked
  searchButton.addEventListener('click', getApi);

  addButton.addEventListener('click', function() {

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

});
