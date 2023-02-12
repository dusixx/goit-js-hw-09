import utils from './utils';

const TIMER_PERIOD = 1000;
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId;

stopBtn.disabled = true;

startBtn.addEventListener('click', onStartClick);

stopBtn.addEventListener('click', ({ currentTarget: btn }) => {
  // отключаем stopBtn, включаем startBtn
  btn.disabled = !(startBtn.disabled = false);
  clearInterval(timerId);

  // возвращаем дефолтный цвет
  utils.setBodyBgColor(null);
});

function onStartClick({ currentTarget: btn }) {
  // отключаем startBtn, включаем stopBtn
  btn.disabled = !(stopBtn.disabled = false);
  timerId = setInterval(() => utils.setBodyBgColor(), TIMER_PERIOD);
}
