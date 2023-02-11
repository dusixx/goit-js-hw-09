export default {
  getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0)}`;
  },

  isDef(v) {
    return typeof v !== 'undefined';
  },

  setBodyBgColor(color) {
    if (!this.isDef(color)) color = this.getRandomHexColor();
    document.body.style.backgroundColor = color;
  },
};
