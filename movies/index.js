const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apiKey: '2e95ca6d',
      s: searchTerm,
    },
  });

  return response.data.Search;
};

const input = document.querySelector('input');

const onInput = async (event) => {
  const movies = await fetchData(event.target.value);
  console.log(movies);
};

input.addEventListener('input', debounce(onInput, 1000));
