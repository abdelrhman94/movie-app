//initial values
const API_KEY = '21bc84afd76a48f2c4e4a7883c54930f';
const imageUrl = 'https://image.tmdb.org/t/p/w500';
const url =
  'https://api.themoviedb.org/3/search/movie?api_key=21bc84afd76a48f2c4e4a7883c54930f';

const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#input-value');
const movieSearchable = document.querySelector('#movies-searchable');

function generateUrl(path) {
  const url = `https://api.themoviedb.org/3${path}?api_key=21bc84afd76a48f2c4e4a7883c54930f`;
  return url;
}

function movieSection(movies) {
  return movies.map((movie) => {
    if (movie.poster_path) {
      return `<img 
      src=${imageUrl + movie.poster_path} data-movie-id=${movie.id} 
      />`;
    }
  });
}

function createMovieContainer(movies) {
  const movieElement = document.createElement('div');
  movieElement.setAttribute('class', 'movie');

  const movieTemplate = `
    <section class="section">
      ${movieSection(movies)}
    </section>
  <div class="content ">
    <p id="content-close">x</p>
  </div>
  `;

  movieElement.innerHTML = movieTemplate;
  return movieElement;
}

function renderSearchMovies(data) {
  movieSearchable.innerHTML = '';
  const movies = data.results;
  const movieBlock = createMovieContainer(movies);
  movieSearchable.appendChild(movieBlock);
  console.log('data:', data);
}

buttonElement.onclick = (event) => {
  event.preventDefault(); //disable website behavior
  const value = inputElement.value;
  const path = '/search/movie';
  const newUrl = generateUrl(path) + '&query=' + value;
  fetch(newUrl)
    .then((res) => res.json())
    .then(renderSearchMovies)
    .catch((error) => {
      console.log('error:', error);
    });

  inputElement.value = '';
  console.log('value:', value);
};

function createIframe(video) {
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${video.key}`;
  iframe.width = 360;
  iframe.height = 315;
  iframe.allowFullscreen = true;

  return iframe;
}

document.onclick = (event) => {
  const target = event.target;

  if (target.tagName.toLowerCase() === 'img') {
    const movieId = target.dataset.movieId;
    console.log(movieId);
    const section = event.target.parentElement;
    const content = section.nextElementSibling;
    content.classList.add('content-display');
    const path = `/movie/${movieId}/videos`;
    const url = generateUrl(path);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log('videos', data);

        const videos = data.results;
        const length = videos.length > 4 ? 4 : videos.length;
        const iframeContainer = document.createElement('div');
        for (let i = 0; i < videos.length; i++) {
          const video = videos[i];
          const iframe = createIframe(video);
          iframeContainer.appendChild(iframe);
          content.appendChild(iframeContainer);
        }
      })
      .catch((error) => {
        console.log('error:', error);
      });
  }

  if (target.id === 'content-close') {
    const content = target.parentElement;
    content.classList.remove('content-display');
  }
};
