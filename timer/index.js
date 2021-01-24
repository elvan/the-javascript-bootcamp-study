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
  }

  start() {
    console.log(this);
  }
}

const durationInput = document.getElementById('duration');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');

const timer = new Timer(durationInput, startButton, pauseButton);
timer.start();
