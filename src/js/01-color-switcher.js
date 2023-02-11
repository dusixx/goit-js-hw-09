import utils from './utils';

const TIMER_PERIOD = 1000;
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId;

startBtn.addEventListener('click', onStartButton);

stopBtn.addEventListener('click', () => {
  startBtn.disabled = false;
  clearInterval(timerId);

  // возвращаем дефолтный цвет
  utils.setBodyBgColor(null);
});

function onStartButton({ currentTarget: btn }) {
  btn.disabled = true;
  timerId = setInterval(() => utils.setBodyBgColor(), TIMER_PERIOD);
}
