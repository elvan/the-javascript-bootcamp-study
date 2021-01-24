// @ts-check

class Timer {
  /**
   * @param {HTMLElement} durationInput
   * @param {HTMLElement} startButton
   * @param {HTMLElement} pauseButton
   */
  constructor(durationInput, startButton, pauseButton) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;

    this.startButton.addEventListener('click', this.start);
    this.pauseButton.addEventListener('click', this.pause);
  }

  start = () => {
    this.tick();
    this.interval = setInterval(this.tick, 1000);
  };

  pause = () => {
    clearInterval(this.interval);
  };

  tick = () => {
    console.log('tick');
  };
}

const durationInput = document.getElementById('duration');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');

const timer = new Timer(durationInput, startButton, pauseButton);
