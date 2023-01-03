const API_KEY = 'api_key=15e383204c1b8a09dbfaaa4c01ed7e17';
// 1cf50e6248dc270629e802686245c2c8
const BASE_URL = 'https://api.themoviedb.org/3/';

const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const searchURL = BASE_URL + '/search/movie?'+API_KEY;

const APIIP = "http://2997-35-190-175-234.ngrok.io/"
// window.onload = new SnowFlakeApp();
const genres = [
  {
    "id": 28,
    "name": "Action"
  },
  {
    "id": 12,
    "name": "Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 14,
    "name": "Fantasy"
  },
  {
    "id": 36,
    "name": "History"
  },
  {
    "id": 27,
    "name": "Horror"
  },
  {
    "id": 10402,
    "name": "Music"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Science Fiction"
  },
  {
    "id": 10770,
    "name": "TV Movie"
  },
  {
    "id": 53,
    "name": "Thriller"
  },
  {
    "id": 10752,
    "name": "War"
  },
  {
    "id": 37,
    "name": "Western"
  }
]

// const videoLink = BASE_URL + '/movie/'+id+'/videos?'+API_KEY;
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


// const API_URL ='https://developers.themoviedb.org/3/discover/movie-discover'



const watchlist = document.getElementById('watchlist')
const removeWatchlistBtn = document.getElementsByClassName('remove-watchlist-btn')
const cardWatchlistBtn = document.getElementsByClassName('watchlist-btn')
const readMore = document.getElementsByClassName('read-more')
const readMorePlot = document.getElementsByClassName('read-more-plot')
const movieKey = document.getElementsByClassName('movie-key')
const localStorageKeys = Object.keys(localStorage)


// style="width: 200px; height: 200px;"
function showMovies(data,idmov) {

  ihtml = ""
  data.forEach(movie => {
          const {id, title, poster_path, vote_average, overview, release_date,popularity
          } = movie;
          // if(vote_average===0){
          //     vote_average="-"
          // }
          // if(poster_path==="null"){
          //     poster_path=
          // }
          const readMoreMovieID = id + 'more'
          const hideReadMore = id + 'hide'
          const summaryPlot = `${title.substring(0, 19)}<span id=${hideReadMore}>...</span>`

          const readMorePlot = `<span class="read-more-plot" id=${readMoreMovieID} >${title.substring(19, title.length)}</span>`
          const completePlot = title
          const longPlot = summaryPlot + readMorePlot
          const movieID = id;
          const movieIDkey = id + 'key';
          const watchlistBtnKey = id + 'watchlistBtn';
          const removeBtnKey = id + 'removeBtn';
              console.log(movie);
              ihtml += `
                
                <div class="posimg col-md-4">
                  <img class="img" src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" style="width: 300px; height: 450px;" alt="${title}>
                </div>
                <div class="postit">
                  <h2 class="title">${title}</h2>
                  <ul class="list">
                    <li class="item"><strong>Released:</strong> ${release_date}</li>
                    <li class="item"><strong>Popularity</strong> ${popularity}</li>
                    <li class="item"><strong>Rating:</strong> ${vote_average}/10</li>
                    <li class="item"><button id="${id}" style="width:40%; height: 50px; text-align: centre; border: 1.5px solid white;" class="btn btn-success btn-lg" onclick="openNav(${id})")>Trailer Link</button></li>
                  </ul>
                </div>
             
              <div class="row">
                <div class="well">
                  <h3>Plot</h3>
                  ${overview}
                  <hr>
            
                </div>
              </div>
            `;
          //   <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
          // <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
          // <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
          // <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
      if(idmov==id){
      cardContainer.innerHTML = ihtml}
      // displayWatchlistOrRemoveBtn();
     
      // document.getElementById(removeBtnKey).addEventListener('click',removeFromWatchlist(movieIDkey, removeBtnKey, watchlistBtnKey, removeBtnKey));
          // document.getElementById(id).addEventListener('click', () => {
          //     console.log(id)
          //     openNav(movie)
          // })
          // onclick="addToWatchlist(${movieIDkey}, ${movieID}, ${watchlistBtnKey}, ${removeBtnKey})"
  })
}

// document.getElementById(watchlistBtnKey).addEventListener('click',addToWatchlist(movieIDkey, movieID, watchlistBtnKey, removeBtnKey));

// function test(mov){
//   console.log(mov);
// }

getmovonWin();
// https://api.themoviedb.org/3/find/%7Bexternal_id%7D?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US&external_source=76600
function getmovonWin(){
let movtit = sessionStorage.getItem('movid');
const movdet=movtit.split(",")
// console.log(movdet[1])
url=BASE_URL + '/search/movie?'+API_KEY+'&query='+movdet[0];
fetch(url).then(res => res.json()).then(data => {
  console.log(data);
  if(data.results.length !== 0){
    // console.log(data.results);
    showMovies(data.results,movdet[movdet.length-1]);
  }
});


}

const sliders = document.querySelector(".carouselbox");
const oriname = document.querySelector(".oriname");
const chrname = document.querySelector(".chrname");
var scrollPerClick;
var ImagePadding = 20;

showcastData();

// var scrollAmount = 0;

// function sliderScrollLeft(){
//   console.log("in")
//   sliders.scrollTo({
//     top:0,
//     left:(scrollAmount -= scrollPerClick),
//     behavior: "smooth", 
//   });

//   if(scrollAmount<0){
//     scrollAmount=0;
//   }
// }


// function sliderScrollRight(){
//   console.log("inright")
//   if(scrollAmount <= sliders.scrollWidth - sliders.clientWidth){
//     sliders.scrollTo({
//       top:0,
//       left:(scrollAmount -= scrollPerClick),
//       behavior: "smooth", 
//     });
//   }
// }


async function showcastData(){
  let movtit = sessionStorage.getItem('movid');
  const movdet=movtit.split(",")
  // console.log("new"+movdet[movdet.length-1]);
  url=BASE_URL + 'movie/'+movdet[movdet.length-1]+'/credits?'+API_KEY;
  // url=APIIP + "api/credit?id="+movdet[movdet.length-1];

  var result = await axios.get(url);
  // console.log(result)
  result = result.data.cast;
  // console.log(result)
  // result.forEach (mov=>{
  //   console.log(mov);
  // });
  const PRO_URL='https://image.tmdb.org/t/p/original/'
  result.map(function(cur,index){
    // console.log(cur.data+index);
    // console.log(cur.original_name);
    // console.log(cur.character);
    ihtml=`
      <img class="img-${index} slider-img" src="${cur.profile_path? PRO_URL+cur.profile_path: "http://via.placeholder.com/1080x1580" }" />
      <div class="namecast">
        <h6>NAME:</h6>
        <p class="oriname">${cur.original_name}</p>
        <h6>CHARACTER NAME:</h6>
        <p class="chrname">${cur.character}</p>
      </div>
    `
    castcontent.innerHTML +=ihtml
    

 
  });
  
  
}







//I am working on this currently

function watchList(){
  let movtit = sessionStorage.getItem('movid');
  const movdet=movtit.split(",")
  // watchListList.push();
  // let uname = localStorage.getItem('user');
  localStorage.setItem('watchList',movdet[movdet.length-1]);
  watchListSelection();
}


function watched(){
  let movtit = sessionStorage.getItem('movid');
  const movdet=movtit.split(",")
  // watchedList.push(movdet[movdet.length-1]);
  let uname = localStorage.getItem('user');
  localStorage.setItem('watched',movdet[movdet.length-1]);
  // watchedSelection();
  callwatchedApi(uname,movdet[movdet.length-1]);
}


function callwatchedApi(user,id){
  console.log(typeof(id));
  let newid = parseInt(id);
  url=APIIP+"user?userid="+user+"&addwatched="+newid;
  fetch(url).then(res => res.json()).then(data => {
  console.log(data);
  if(data.results.length !== 0){
    // console.log(data.results);
    // showMovies(data.results,movdet[movdet.length-1]);
  }
  // watchedSelection();
});
}



//I am working here
function watchedSelection() {
  const watchedtags = document.querySelectorAll('.watched');
  console.log(watchedtags);
  watchedtags.forEach(watchedtag => {
      watchedtag.classList.remove('highlight')
  })
  var watchedList = JSON.parse(localStorage.getItem(uname+'watched'));
  itemtoadd=JSON.parse(localStorage.getItem('watched'))
  if(watchedList.length !=0){ 
      console.log(watchedList)  
      watchedList.forEach(name => {
          console.log(name+","+itemtoadd);
          if(name==itemtoadd){
            const hightlightedTag = document.getElementById(watchedid);
            hightlightedTag.classList.add('highlight');
          }
      })
  }

}

function watchListSelection() {
  const watchtags = document.querySelectorAll('.watchList');
  watchtags.forEach(watchtag => {
      watchtag.classList.remove('highlight')
  })
  var watchedListList = JSON.parse(localStorage.getItem(uname+'watchList'));
  itemtoadd=JSON.parse(localStorage.getItem('watchList'))
  if(watchedListList.length !=0){ 
      console.log(watchedListList)  
      watchedListList.forEach(name => {
          if(name==itemtoadd){
            const hightlightedTag = document.getElementById(watchListid);
            hightlightedTag.classList.add('highlight');
          }
      })
  }

}























function displayWatchlistOrRemoveBtn() {
  for (let movie of movieKey) {
      // console.log(movie.id)
      const removeBtnID = movie.id + 'removeBtn'
      // console.log(removeBtnID)
      const removeBtn = document.getElementById(removeBtnID)

      const watchlistBtnID = movie.id + 'watchlistBtn'
      const watchlistBtn = document.getElementById(watchlistBtnID)

      localStorageKeys.forEach((key) => {
          if (movie.id === key) {
              // console.log(movie.id)
              removeBtn.style.display = 'inline'
              watchlistBtn.style.display = 'none'
          }
      })
  }
}

function showCompletePlot(readMoreMovieID, hideReadMore) {
  readMoreMovieID.style.display = 'inline'
  hideReadMore.style.display = 'none'
}

function addToWatchlist(movieIDkey, movieID, watchlistBtnKey, removeBtnKey) {
  // localStorage.setItem("hello","hello");
  console.log(movieID);
  localStorage.setItem(movieIDkey, movieID);
  watchlistBtnKey.style.display = 'none';
  removeBtnKey.style.display = 'inline';
}

function removeFromWatchlist(movieIDkey, removeBtnKey, watchlistBtnKey, removeBtnKey) {
  localStorage.removeItem(movieIDkey.innerHTML);

  //Get parent element (the movie card div) and remove it
  if (watchlist) {
      localStorage.removeItem(movieIDkey.innerHTML)

      const parentEl = document.getElementById(movieIDkey.innerHTML).parentElement
      parentEl.remove()
  }

  watchlistBtnKey.style.display = 'inline';
  removeBtnKey.style.display = 'none';

  // Display default elements if local storage empty
  if (watchlist && localStorage.length === 0) {
      if (watchlist.children) {
          const children = watchlist.children
          const childrenArr = Array.prototype.slice.call(children)
          childrenArr.forEach((child) => (child.style.display = 'flex'))
      }
  } 
}

if (watchlist && localStorage.length > 0) {
  if (watchlist.children) {
      const children = watchlist.children
      const childrenArr = Array.prototype.slice.call(children)
      childrenArr.forEach((child) => (child.style.display = 'none'))
  }
}

for (let i = 0; i < localStorage.length; i++) {
  const getLocalStorage = localStorage.getItem(localStorage.key(i))

  // Display every key's value to the watchlist
  if (watchlist) {
      watchlist.innerHTML += `<div class="card">${getLocalStorage}</div>`

      // Hide the 'add to watchlist' button
      for (let button of cardWatchlistBtn) {
          button.style.display = 'none'
      }

      // Display the 'remove from watchlist' button
      for (let button of removeWatchlistBtn) {
          button.style.display = 'inline'
      }
  }
}

//<p>Overview: ${overview}</p> 






const overlayContent = document.getElementById('overlay-content');

function openNav(id,) {
  // let id = movie.id;
  fetch(BASE_URL + '/movie/'+id+'/videos?'+API_KEY).then(res => res.json()).then(videoData => {
    console.log(videoData);
    if(videoData){
      document.getElementById("myNav").style.width = "100%";
      if(videoData.results.length > 0){
        var embed = [];
        var dots = [];
        videoData.results.forEach((video, idx) => {
          let {name, key, site} = video

          if(site == 'YouTube'){
              
            embed.push(`
              <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" class="embed hide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          
          `)

            dots.push(`
              <span class="dot">${idx + 1}</span>
            `)
          }
        })
        
        var content = `
        <br>        
        ${embed.join('')}
        <br/>        
        `
        overlayContent.innerHTML = content;
        activeSlide=0;
        showVideos();
      }else{
        overlayContent.innerHTML = `<h1 class="no-results">No Results Found</h1>`
      }
    }
  })
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

var activeSlide = 0;
var totalVideos = 0;

function showVideos(){
  let embedClasses = document.querySelectorAll('.embed');
  let dots = document.querySelectorAll('.dot');

  totalVideos = embedClasses.length; 
  embedClasses.forEach((embedTag, idx) => {
    if(activeSlide == idx){
      embedTag.classList.add('show')
      embedTag.classList.remove('hide')

    }else{
      embedTag.classList.add('hide');
      embedTag.classList.remove('show')
    }
  })

  // dots.forEach((dot, indx) => {
  //   if(activeSlide == indx){
  //     dot.classList.add('active');
  //   }else{
  //     dot.classList.remove('active')
  //   }
  // })
}

