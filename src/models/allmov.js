const API_KEY = 'api_key=15e383204c1b8a09dbfaaa4c01ed7e17';
// 1cf50e6248dc270629e802686245c2c8
const BASE_URL = 'https://api.themoviedb.org/3/';

const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const searchURL = BASE_URL + '/search/movie?'+API_KEY;
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

const sortcategory = [

  { "name" : "popularity"},

  { "name" : "release_date"},

  { "name" : "title"},

  { "name" : "rating"},

]

const ordercategory = [

  {"name":"asc"},

  {"name":"desc"}

]


const tagsEl = document.getElementById('tags');
const sorttagsEl = document.getElementById('sorttags');
const ascorder = document.getElementById('orderasc');
const descorder = document.getElementById('orderdesc');

// console.log(ascorder.checked)
var selectedGenre = []
setGenre();
function setGenre() {
    tagsEl.innerHTML= '';
    genres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id=genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () => {
            if(selectedGenre.length == 0){
                selectedGenre.push(genre.id);
            }else{
                if(selectedGenre.includes(genre.id)){
                    selectedGenre.forEach((id, idx) => {
                        if(id == genre.id){
                            selectedGenre.splice(idx, 1);
                        }
                    })
                }else{
                    selectedGenre.push(genre.id);
                }
            }
            console.log(selectedGenre)
            getMovies(API_URL + '&with_genres='+encodeURI(selectedGenre.join(',')))
            highlightSelection()
        })
        tagsEl.append(t);
    })
}

function highlightSelection() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.classList.remove('highlight')
    })
    clearBtn()
    if(selectedGenre.length !=0){   
        selectedGenre.forEach(id => {
            const hightlightedTag = document.getElementById(id);
            hightlightedTag.classList.add('highlight');
        })
    }

}

function clearBtn(){
    let clearBtn = document.getElementById('clear');
    if(clearBtn){
        clearBtn.classList.add('highlight')
    }else{
            
        let clear = document.createElement('div');
        clear.classList.add('tag','highlight');
        clear.id = 'clear';
        clear.innerText = 'Clear x';
        clear.addEventListener('click', () => {
            selectedGenre = [];
            setGenre();            
            getMovies(API_URL);
        })
        tagsEl.append(clear);
    }
    
}

//fjdksflas

var selectedSort = []
setSort();
function setSort() {
    sorttagsEl.innerHTML= '';
    sortcategory.forEach(sortcat => {
        console.log(sortcat)
        const t = document.createElement('div');
        t.classList.add('sorttag');
        t.innerText = sortcat.name;
        t.addEventListener('click', () => {
            if(selectedSort.length == 0){
                selectedSort.push(sortcat.name);
            }else{
                if(selectedSort.includes(sortcat.name)){
                    selectedSort.forEach((name, idx) => {
                        if(name == sortcat.name){
                            selectedSort.splice(idx, 1);
                        }
                    })
                }else{
                    selectedSort.push(sortcat.name);
                }
            }
            console.log(selectedSort)
            let chkvalue=""
            if(ascorder.checked){
              console.log(ascorder.checked)
              chkvalue=".asc";
            }
            else if(descorder.checked){
              console.log(descorder.checked)
              chkvalue=".desc";
            }
            else{
              console.log("nothing checked")
            }
            console.log(API_URL + '&sort_by='+encodeURI(selectedSort.join(','))+chkvalue)
            getMovies(API_URL + '&sort_by='+encodeURI(selectedSort.join(','))+chkvalue)
            sorthighlightSelection()
        })
        sorttagsEl.append(t);
    })
}

function sorthighlightSelection() {
    const sorttags = document.querySelectorAll('.sorttag');
    sorttags.forEach(sorttag => {
        sorttag.classList.remove('highlight')
    })
    sortclearBtn()
    if(selectedSort.length !=0){ 
        console.log(selectedSort)  
        selectedSort.forEach(name => {
            const hightlightedTag = document.getElementById(name);
            hightlightedTag.classList.add('highlight');
        })
    }

}

function sortclearBtn(){
    let clearBtn = document.getElementById('clear');
    if(clearBtn){
        clearBtn.classList.add('highlight')
    }else{
            
        let clear = document.createElement('div');
        clear.classList.add('sorttag','highlight');
        clear.id = 'clear';
        clear.innerText = 'Clear x';
        clear.addEventListener('click', () => {
            selectedSort = [];
            setSort();            
            getMovies(API_URL);
        })
        sorttagsEl.append(clear);
    }
    
}




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


const main = document.getElementById('main');
const prev = document.getElementById('prev')
const next = document.getElementById('next')
const current = document.getElementById('current')

var currentPage = 1;
var nextPage = 2;
var prevPage = 3;
var lastUrl = '';
var totalPages = 100;

getMovies(API_URL);

function getMovies(url){
    lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        console.log(data);
        if(data.results.length !== 0){
          showMovies(data.results);
          currentPage = data.page;
          nextPage = currentPage + 1;
          prevPage = currentPage - 1;
          totalPages = data.total_pages;

          current.innerText = currentPage;

          if(currentPage <= 1){
            prev.classList.add('disabled');
            next.classList.remove('disabled')
          }else if(currentPage>= totalPages){
            prev.classList.remove('disabled');
            next.classList.add('disabled')
          }else{
            prev.classList.remove('disabled');
            next.classList.remove('disabled')
          }

          tagsEl.scrollIntoView({behavior : 'smooth'})
        }else{
          main.innerHTML= `<h1 class="no-results">No More Results Found</h1>`
        }
    })
}

const watchlist = document.getElementById('watchlist')
const removeWatchlistBtn = document.getElementsByClassName('remove-watchlist-btn')
const cardWatchlistBtn = document.getElementsByClassName('watchlist-btn')
const readMore = document.getElementsByClassName('read-more')
const readMorePlot = document.getElementsByClassName('read-more-plot')
const movieKey = document.getElementsByClassName('movie-key')
const localStorageKeys = Object.keys(localStorage)


// style="width: 200px; height: 200px;"
function showMovies(data) {

    ihtml = ""
    data.forEach(movie => {
            const {id, title, poster_path, vote_average, overview, release_date
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
                <div class="cards">
                  <div class="card mx-2 my-2 " id=${movieID} style="width: 15rem; background-color:#AA0914;">
                                <span id=${movieIDkey} class="hide movie-key">${movieIDkey}</span>        
                                <img class="img" src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" style="width: 238px; height: 357px;" alt="${title}>
                                <div class="card-body">
                                        <br>
                                        <h5 class="card-title" onclick="showCompletePlot(${readMoreMovieID}, ${hideReadMore})">${completePlot.length < 19 ? completePlot : longPlot}</h5>
                                
                                        <p>Rating: <span class="badge badge-success">${vote_average}/10<span></p>
                                        <button id="${id}" style="width:100%; height: 40px; text-align: centre;" class="btn btn-success btn-lg" onclick="movWin('${title}',${id})")>More Detail</button>
                                </div>
                        </div>
                  </div>
                `
        
        cardContainer.innerHTML = ihtml
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

function movWin(title,id){
  console.log(title)
  sessionStorage.setItem('movid',[title,id]);
  window.location = '/movwin';
  return false;
}

function getmovonWin(){
  let movid = sessionStorage.getItem('movid');
  console.log(movid[0])
  url=BASE_URL + '/search/movie?&id='+movid[0]+API_KEY;
  fetch(url).then(res => res.json()).then(data => {
    console.log(data);
    if(data.results.length !== 0){
      showMovies(data.results);
    }
  });
  
 
}


// const watchListList=[];
watchList();
function watchList(){
  let uname = localStorage.getItem('user');
  let itemtoadd = JSON.parse(localStorage.getItem('watchList'));
  console.log(itemtoadd)
  console.log()
  console.log(localStorage.getItem(uname+'watchList'))
  var watchListList = JSON.parse(localStorage.getItem(uname+'watchList'));
  if(watchListList == null){ 
    watchListList=[];
  }
  if(watchListList.length == 0){
    watchListList.push(itemtoadd);
  }
  else{
    if(watchListList.includes(itemtoadd)){
        watchListList.forEach((name, idx) => {
            if(name == itemtoadd){
                watchListList.splice(idx, 1);
            }
        })
    }else{
        watchListList.push(itemtoadd);
    }
  }

  console.log(watchListList)
  // watchListList.push(itemtoadd);
  localStorage.setItem(uname+'watchList',JSON.stringify(watchListList));
}

watched();
function watched(){
  let uname = localStorage.getItem('user');
  itemtoadd=JSON.parse(localStorage.getItem('watched'))
  var watchedList = JSON.parse(localStorage.getItem(uname+'watched'));
  if(itemtoadd == null){ 
    watchedList=[];
  }
  if(watchedList.length == 0){
    watchedList.push(itemtoadd);
  }
  else{
    if(watchedList.includes(itemtoadd)){
        watchedList.forEach((name, idx) => {
            if(name == itemtoadd){
                watchedList.splice(idx, 1);
            }
        })
    }else{
        watchedList.push(itemtoadd);
    }
  }
  // watchedList.push(itemtoadd);
  localStorage.setItem(uname+'watched',JSON.stringify(watchedList));
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

form.addEventListener('submit',(e) => {
    e.preventDefault();

    const searchitem = search.value;
    selectedGenre=[];
    setGenre();
    selectedSort=[];
    setSort();
    if(searchitem){
        getMovies(searchURL+'&query='+searchitem)
    }else{
      getMovies(API_URL);
    }
})




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

const leftArrow = document.getElementById('left-arrow')
const rightArrow = document.getElementById('right-arrow')

leftArrow.addEventListener('click', () => {
  if(activeSlide > 0){
    activeSlide--;
  }else{
    activeSlide = totalVideos -1;
  }

  showVideos()
})

rightArrow.addEventListener('click', () => {
  if(activeSlide < (totalVideos -1)){
    activeSlide++;
  }else{
    activeSlide = 0;
  }
  showVideos()
})
// <a href="${videoLink}" class="btn btn-primary my-4">Visit Contest</a> 

prev.addEventListener('click', () => {
  if(prevPage > 0){
    pageCall(prevPage);
  }
})

next.addEventListener('click', () => {
  if(nextPage <= totalPages){
    pageCall(nextPage);
  }
})

function pageCall(page){
  let urlSplit = lastUrl.split('?');
  console.log(lastUrl)
  console.log(urlSplit)
  let queryParams = urlSplit[1].split('&');
  let key = queryParams[queryParams.length -1].split('=');
  if(key[0] != 'page'){
    let url = lastUrl + '&page='+page
    getMovies(url);
  }else{
    key[1] = page.toString();
    let a = key.join('=');
    queryParams[queryParams.length -1] = a;
    let b = queryParams.join('&');
    let url = urlSplit[0] +'?'+ b
    getMovies(url);
  }
}