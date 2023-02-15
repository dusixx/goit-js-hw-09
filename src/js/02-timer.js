import utils from './utils';
import { Notify } from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const TIMER_PERIOD = 1000;
const ERR_INVALID_DATE = 'Please, choose a date in the future!';
const MSG_TIMESUP = 'Time is up!';

const startBtn = document.querySelector('[data-start]');
const dateInput = document.querySelector('#datetime-picker');
const valueRefs = getTimerValueRefs('.timer > .field');

let timerId;
let countdownInterval;

startBtn.disabled = true;
startBtn.addEventListener('click', onStartClick);

/**
 * Инициализируем flatpickr
 */
flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,

  onClose: selDates => {
    countdownInterval = selDates[0] - Date.now();

    if ((startBtn.disabled = countdownInterval <= 0))
      Notify.failure(ERR_INVALID_DATE);
  },
});

/**
 * Вызывается по нажатию на Start
 */
function onStartClick({ currentTarget: btn }) {
  // отключаем кнопку и поле
  dateInput.disabled = btn.disabled = true;

  // обновляем разметку и запускаем таймер
  onTimerTick();
  timerId = setInterval(onTimerTick, TIMER_PERIOD);
}

/**
 * Вызывается по тику таймера
 */
function onTimerTick() {
  renderTimerValues((countdownInterval -= TIMER_PERIOD), valueRefs);

  // отсчет закончен
  if (countdownInterval <= TIMER_PERIOD) {
    // включаем поле, но не кнопку
    dateInput.disabled = false;
    clearInterval(timerId);
    Notify.success(MSG_TIMESUP);
  }
}

/**
 * Перерисовывает значения полей таймера
 */
function renderTimerValues(ms, valueRefs) {
  const timeData = utils.convertMs(ms);

  Object.entries(timeData).forEach(([key, value]) => {
    valueRefs[key].textContent = utils.addLeadingZero(value);
  });
}

/**
 * Вернет объект, где ключ - это имя поля,
 * а значение - ссылка на соотвествующий value
 */
function getTimerValueRefs(fieldSelector) {
  const res = {};
  document
    .querySelectorAll(fieldSelector)
    ?.forEach(
      ({ firstElementChild: value, lastElementChild: label }) =>
        (res[label.textContent.toLowerCase()] = value)
    );

  return res;
}
