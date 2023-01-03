const API_KEY = 'api_key=15e383204c1b8a09dbfaaa4c01ed7e17';
// 1cf50e6248dc270629e802686245c2c8
const BASE_URL = 'https://api.themoviedb.org/3/';

const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const searchURL = BASE_URL + '/search/movie?'+API_KEY;

// const videoLink = BASE_URL + '/movie/'+id+'/videos?'+API_KEY;

// const API_URL ='https://developers.themoviedb.org/3/discover/movie-discover'
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


getMovies(API_URL);

function getMovies(url){
    fetch(url).then(res => res.json()).then(data => {
        console.log(data);
        showMovies(data.results);
    })
}

// style="width: 200px; height: 200px;"
function showMovies(data) {

    ihtml = ""
    data.forEach(movie => {
            const {id, title, poster_path, vote_average, overview} = movie;
            if(vote_average===0){
                vote_average="-"
            }
            // if(poster_path==="null"){
            //     poster_path=
            // }
                console.log(movie)
                ihtml += `
                <div class="card mx-2 my-2 " style="width: 15rem; background-color:#5a2e98;">
                                <img  src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}>
                                <div class="card-body">
                                        <br>
                                        <h5 class="card-title" >${title}</h5>
                                        <p>Rating: <span class="badge badge-success">${vote_average}/10<span></p>
                                        <button id="${id}" style="width:100%; height: 40px; text-align: centre;" class="btn btn-success btn-lg" onclick="openNav(${id})")>Trailer Link</button>
                                </div>
                        </div>
                `
        
        cardContainer.innerHTML = ihtml
            // document.getElementById(id).addEventListener('click', () => {
            //     console.log(id)
            //     openNav(movie)
            // })
    })
}

//<p>Overview: ${overview}</p> 

form.addEventListener('submit',(e) => {
    e.preventDefault();

    const searchitem = search.value;

    if(searchitem){
        getMovies(searchURL+'&query='+searchitem)
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

