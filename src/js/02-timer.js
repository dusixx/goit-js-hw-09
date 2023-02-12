import utils from './utils';
import { Notify } from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const TIMER_PERIOD = 1000;
const startBtn = document.querySelector('[data-start]');
const dateInput = document.querySelector('#datetime-picker');
const valueRefs = getTimerValueRefs('.timer > .field');
let timerId;

startBtn.disabled = true;
startBtn.addEventListener('click', onStartClick);

/**
 * Инициализируем flatpickr
 */
flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: onDatePickerClose,
});

/**
 * Вызывается после закрытия окна выбора даты
 */
function onDatePickerClose(selectedDates) {
  const isValidDate = selectedDates[0] > Date.now();

  startBtn.disabled = !isValidDate;
  if (!isValidDate) Notify.failure('Please choose a date in the future');
}

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
  const dateDiff = Date.parse(dateInput.value) - Date.now();

  // обновляем значения таймера
  updateTimerValues(dateDiff, valueRefs);

  // отсчет закончен
  if (dateDiff <= TIMER_PERIOD) {
    // включаем поле, но не кнопку
    dateInput.disabled = false;
    clearInterval(timerId);
    Notify.success('Done!');
  }
}

/**
 * Обновляет значения полей таймера в разметке
 */
function updateTimerValues(ms, valueRefs) {
  const timeData = utils.convertMs(ms);

  Object.entries(timeData).forEach(([key, value]) => {
    valueRefs[key].textContent = utils.addLeadingZero(value);
  });
}

/**
 * Вернет объект, где ключ - это label поля,
 * а значение - ссылка на соотвествующий value элемент
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
