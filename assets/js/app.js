//initial values
const API_KEY = '21bc84afd76a48f2c4e4a7883c54930f';

const url =
  'https://api.themoviedb.org/3/search/movie?api_key=21bc84afd76a48f2c4e4a7883c54930f';

const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#input-value');

buttonElement.onclick = (event) => {
  event.preventDefault(); //disable website behavior
  const value = inputElement.value;

  const newUrl = url + '&query=' + value;
  fetch(newUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log('data:', data);
    })
    .catch((error) => {
      console.log('error:', error);
    });
  console.log('value:', value);
};
