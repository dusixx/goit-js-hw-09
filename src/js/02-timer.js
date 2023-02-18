import utils from './utils';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/dark.css';

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

  onClose: (selDates, dateStr, instance) => {
    if (!dateStr) return instance.setDate(Date.now());
    countdownInterval = selDates[0] - Date.now();

    if ((startBtn.disabled = countdownInterval <= 0))
      utils.error('Please, choose a date in the future!', 1000);
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
    utils.success('Time is up!', 1000);
  }
}

function renderTimerValues(ms, valueRefs) {
  Object.entries(utils.convertMs(ms)).forEach(([key, value]) => {
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
