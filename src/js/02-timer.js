import utils from './utils';
import { Notify } from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const TIMER_PERIOD = 1000;
const startBtn = document.querySelector('[data-start]');
const dateInput = document.querySelector('#datetime-picker');
const valueRefs = getTimerValueRefs('.timer > .field');

let timerId;
let countdownInterval;

startBtn.disabled = true;
startBtn.addEventListener('click', onStartClick);

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,

  onClose: selDates => {
    countdownInterval = selDates[0] - Date.now();

    if ((startBtn.disabled = countdownInterval <= 0))
      Notify.failure('Please, choose a date in the future!', { timeout: 1000 });
  },
});

function onStartClick({ currentTarget: btn }) {
  dateInput.disabled = btn.disabled = true;
  onTimerTick();
  timerId = setInterval(onTimerTick, TIMER_PERIOD);
}

function onTimerTick() {
  renderTimerValues((countdownInterval -= TIMER_PERIOD), valueRefs);

  if (countdownInterval <= TIMER_PERIOD) {
    dateInput.disabled = false;
    clearInterval(timerId);
    Notify.success('Time is up!', { timeout: 1000 });
  }
}

function renderTimerValues(ms, valueRefs) {
  const timeData = utils.convertMs(ms);

  Object.entries(timeData).forEach(([key, value]) => {
    valueRefs[key].textContent = utils.addLeadingZero(value);
  });
}

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
