
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'ea04fc9a25mshe6173051552ce96p1f4d8cjsndb4b9af63e58',
// 		'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
// 	}
// };

// fetch('https://online-movie-database.p.rapidapi.com/auto-complete?q=game%20of%20thr', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));
// const api = {
	/** wrapper for tmdb api */
	// tmdb: {
	// 	_params : { 
			// this is my api key, but you can get one for free by applying at https://www.themoviedb.org/settings/api.
			// they are not request limited unlike the OMDbapi.
			// or if you don't want to go through registration, there is a bunch of keys here: https://github.com/rickylawson/freekeys 
		// 	"api_key": "7248c5cc1f2080c7baf7361d2427fb80",
		// 	language: "en_US"  
		// },

		
	// 	async findByID(imdbID, params) {
	// 		if (typeof imdbID === "undefined") { console.error("invalid id: ", imdbID); return void 0 }
	// 		const url = new URL(`https://api.themoviedb.org/3/find/${imdbID}`)
	// 		url.search = new URLSearchParams({...this._params, "external_source": "imdb_id", ...params}).toString()

	// 		return await safeJSONRequest(url)
	// 	},
	// 	async search(name, type, params) { //unused for now lol
	// 		if (typeof name === "undefined" || typeof type === "undefined") { console.error("invalid name: ", name, "or type: ", type); return void 0 }
	// 		const url = new URL(`https://api.themoviedb.org/3/search/${type}`)
	// 		url.search = new URLSearchParams({...this._params, "query": name, ...params}).toString()

	// 		return await safeJSONRequest(url)
	// 	},
	// 	async details(type, TMDBid, params) {
	// 		if (typeof TMDBid === "undefined" || typeof type === "undefined") { console.error("invalid id: ", TMDBid, "or type: ", type); return void 0 }

	// 		const url = new URL(`https://api.themoviedb.org/3/${type}/${TMDBid}`)
	// 		url.search = new URLSearchParams({...this._params, "append_to_response": type === "movie" ? "release_dates" : "content_ratings", ...params}).toString()
	// 		console.log("details", url)

	// 		return await safeJSONRequest(url)
	// 	}
	// },
	// omdb: {
		// _params : {
		// 	// same thing applies here as the above api key. user rickylawson's freekeys or apply for your own key, you'll get it quickly
		// 	// this api key is request-limited to 1000 requests per day. Either sub to their paetron or handle negative responses
		// 	"apikey": "2deceaec", r: "json"
		// },
		

		
		// async findByID(imdbID, params) {
		// 	if (typeof imdbID === "undefined") { console.error("invalid id: ", imdbID); return void 0 }
		// 	console.warn("[expensive] api call to OMDb (max 1000 per day)")
		// 	const url = new URL(`https://www.omdbapi.com/`)
		// 	url.search = new URLSearchParams({...this._params, "i": imdbID, ...params}).toString()

		// 	return await safeJSONRequest(url)
		// }
// 	}
// }

// const options = {
// 	method: 'GET',
// 	headers: {
// 		"apikey": "7248c5cc1f2080c7baf7361d2427fb80"
// 	}
// };
// fetch('https://api.themoviedb.org/', options)
// 	.then(response => response.json())
// 	// .then(response => console.log(response))
// 	.then(data => console.log(data))
//     .catch(err => console.error(err));

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

// scrollFunction();

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a44509b2f3mshbd2523b0d4eed52p1385b7jsn64b36a9373a1',
		'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
	}
};

fetch('https://imdb-top-100-movies.p.rapidapi.com/premiummovies', options)
// fetch('https://api.themoviedb.org/3/movie/550?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US&page=1')
	.then(response => response.json())
	// .then(response => console.log(response))
	.then(data => {
        console.log(data)
        ihtml = ""
        for (item in data) {
                console.log(data[item])
                ihtml += `
                <div class="card mx-2 my-2 " style="width: 15rem; background-color:#AA0914">
                                <img src="${data[item].image}" alt="...">
                                <div class="card-body">
                                        <h5 class="card-title">${data[item].title}</h5>
                                        <p>Rating: <span class="badge badge-success">${data[item].rating}/10<span></p>
                                        
                                        <p>Year: ${data[item].year}</p>
                                </div>
                        </div>
                `
        }
        cardContainer.innerHTML = ihtml
    })
    .catch(err => console.error(err));



    // <p>Rank: ${data[item].rank}</p>


{/* <iframe width="1148" height="480" src="https://www.youtube.com/embed/8Xn8vKgD37U" title="Pardes movie Trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}



    // const options = {
    //     method: 'GET',
    //     headers: {
    //         'X-RapidAPI-Key': 'ea04fc9a25mshe6173051552ce96p1f4d8cjsndb4b9af63e58',
    //         'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
    //     }
    // };
    
    // fetch('https://imdb8.p.rapidapi.com/auto-complete?q=game%20of%20thr', options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .then(data => {
    //                 console.log(data)})
    //     .catch(err => console.error(err));

// Get the button:
