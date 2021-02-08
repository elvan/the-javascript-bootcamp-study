// @ts-nocheck

it('Shows an autocomplete', () => {
  createAutoComplete({
    root: document.querySelector('#target'),
    fetchData() {
      return [
        { Title: 'Avengers' },
        { Title: 'Batman' },
        { Title: 'Lego' },
      ];
    },
    renderOption(movie) {
      return movie.Title;
    },
  });
});
