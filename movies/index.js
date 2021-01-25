const fetchData = async () => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apiKey: '2e95ca6d',
      s: 'avengers',
    },
  });

  console.log(response.data);
};

fetchData();
