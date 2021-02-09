// @ts-nocheck

const waitFor = (selector) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (document.querySelector(selector)) {
        clearInterval(interval);
        clearTimeout(timeout);
        resolve();
      }
    }, 100);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      reject();
    }, 2000);
  });
};

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

  const dropdown = document.querySelector('.dropdown');

  expect(dropdown.className).not.to.include('is-active');
});

it('After searching, dropdown opens up', async () => {
  const input = document.querySelector('input');
  input.value = 'avengers';
  input.dispatchEvent(new Event('input'));

  await waitFor('.dropdown-item');

  const dropdown = document.querySelector('.dropdown');

  expect(dropdown.className).to.include('is-active');
});
