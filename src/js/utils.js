import { Notify } from 'notiflix';

export default {
  getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0)}`;
  },

  isDef(v) {
    return typeof v !== 'undefined';
  },

  //   isNum(v) {
  //     return typeof v === 'number' && !isNaN(v) && isFinite(v);
  //   },

  setBodyBgColor(color) {
    // если color не задан - ставим рандомный
    if (!this.isDef(color)) color = this.getRandomHexColor();
    document.body.style.backgroundColor = color;
  },

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  },

  addLeadingZero(v) {
    return String(v).padStart(2, '0');
  },

  error(msg, timeout) {
    Notify.failure(msg, { timeout });
  },

  success(msg, timeout) {
    Notify.success(msg, { timeout });
  },
};
