import { Notify } from 'notiflix';

const form = document.querySelector('.form');
const notifyOpts = { timeout: 1000 };

form.addEventListener('submit', e => {
  e.preventDefault();

  const { delay, step, amount } = e.currentTarget;
  let pause = Number(delay.value);

  Array.from({ length: amount.value }, (_, pos) => {
    createPromise(pos + 1, pause).then(
      ({ pos, delay }) =>
        Notify.success(`Fulfilled promise #${pos} in ${delay}ms`, notifyOpts),
      ({ pos, delay }) =>
        Notify.failure(`Rejected promise #${pos} in ${delay}ms`, notifyOpts)
    );

    pause += Number(step.value);
  });
});

form.addEventListener('input', ({ target: el }) => {
  if (el.tagName === 'INPUT') return;
  if (el.value < 0) el.value = 0;
});

function createPromise(pos, delay) {
  return new Promise((resolve, reject) => {
    const exec = Math.random() > 0.3 ? resolve : reject;
    setTimeout(() => exec({ pos, delay }), delay);
  });
}
