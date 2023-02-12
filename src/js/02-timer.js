import utils from './utils';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';

const TIMER_PERIOD = 1000;
const start = document.querySelector('[data-start]');
const dateText = document.querySelector('#datetime-picker');
const valueRefs = getTimerValueRefs();

start.disabled = true;
start.addEventListener('click', onStartClick);

//
// Инициализируем flatpickr
//
flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: onDatePickerClose,
});

function onDatePickerClose(selectedDates) {
  const date = selectedDates[0];
  const isValidDate = date - Date.now() > 0;

  start.disabled = !isValidDate;

  if (!isValidDate) Notify.failure('Please choose a date in the future');
}

function onStartClick({ currentTarget: btn }) {
  // отключаем кнопку и поле
  dateText.disabled = btn.disabled = true;

  // обновляем разметку и запускаем таймер
  onTimerTick();
  const timerId = setInterval(onTimerTick, TIMER_PERIOD);

  /**
   * Вызывается по тику таймера
   */
  function onTimerTick() {
    const dateDiff = Date.parse(dateText.value) - Date.now();

    // обновляем значения таймера на странице
    updateTimerValues(dateDiff, valueRefs);

    // отсчет закончен
    if (dateDiff < TIMER_PERIOD) {
      // включаем кнопку и поле
      dateText.disabled = btn.disabled = false;
      clearInterval(timerId);
      Notify.success('Bingo!');
    }
  }
}

/**
 * Обновляет значения таймера в браузере
 */
function updateTimerValues(dateDiff, refs) {
  const timeData = utils.convertMs(dateDiff);

  Object.entries(timeData).forEach(([key, value]) => {
    refs[key].textContent = utils.addLeadingZero(value);
  });
}

/**
 * Вернет объект, где ключ - это имя dataset атрибута,
 * а значение - ссылка на соотвествующий span.value элемент
 */
function getTimerValueRefs() {
  return ['days', 'hours', 'minutes', 'seconds'].reduce((res, attr) => {
    res[attr] = document.querySelector(`[data-${attr}]`);
    return res;
  }, {});
}
