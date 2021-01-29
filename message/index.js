// @ts-nocheck
document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();

  const input = document.querySelector('#message');
  const encrypted = btoa(input.value);

  const output = document.querySelector('#link-input');
  output.value = `${window.location}#${encrypted}`;
  output.select();
});