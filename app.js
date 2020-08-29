//initial values
const API_KEY = '21bc84afd76a48f2c4e4a7883c54930f';
const imageUrl = 'https://image.tmdb.org/t/p/w500';
const url =
  'https://api.themoviedb.org/3/search/movie?api_key=21bc84afd76a48f2c4e4a7883c54930f';

const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#input-value');
const movieSearchable = document.querySelector('#movies-searchable');

function movieSection(movies) {
  return movies.map((movie) => {
    if (movie.poster_path) {
      return `
          <img src=${imageUrl + movie.poster_path} data-movie-id=${movie.id} />
        `;
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
  <div class="content">
    <p id="content-close">x</p>
  </div>
  `;

  movieElement.innerHTML = movieTemplate;
  return movieElement;
}

buttonElement.onclick = (event) => {
  event.preventDefault(); //disable website behavior
  const value = inputElement.value;

  const newUrl = url + '&query=' + value;
  fetch(newUrl)
    .then((res) => res.json())
    .then((data) => {
      const movies = data.results;
      const movieBlock = createMovieContainer(movies);
      movieSearchable.appendChild(movieBlock);
      console.log('data:', data);
    })
    .catch((error) => {
      console.log('error:', error);
    });
  console.log('value:', value);
};
