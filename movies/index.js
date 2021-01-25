const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apiKey: '2e95ca6d',
      s: searchTerm,
    },
  });

  console.log(response.data);
};

const input = document.querySelector('input');

const onInput = (event) => {
  fetchData(event.target.value);
};

input.addEventListener('input', debounce(onInput, 1000));
