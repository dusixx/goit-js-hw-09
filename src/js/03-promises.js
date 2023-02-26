import utils from './utils';

const formRef = document.querySelector('.form');

formRef.addEventListener('input', ({ target: el }) => {
  if (el.tagName === 'INPUT' && el.value < 0) el.value = 0;
});

formRef.addEventListener('submit', e => {
  e.preventDefault();

  const { delay, step, amount } = e.currentTarget;
  let pause = Number(delay.value);

  Array.from({ length: amount.value }, (_, pos) => {
    createPromise(pos + 1, pause)
      .then(({ pos, delay }) =>
        utils.success(`Fulfilled promise #${pos} in ${delay}ms`)
      )
      .catch(({ pos, delay }) =>
        utils.error(`Rejected promise #${pos} in ${delay}ms`)
      );

    pause += Number(step.value);
  });
});

function createPromise(pos, delay) {
  return new Promise((resolve, reject) => {
    const exec = Math.random() > 0.3 ? resolve : reject;
    setTimeout(() => exec({ pos, delay }), delay);
  });
}
