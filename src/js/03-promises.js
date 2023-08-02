import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onFormSubmit);


function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
     setTimeout(() => {
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });

}

function onFormSubmit(evt) { 
  evt.preventDefault();

  let delay = Number(formEl.delay.value);
  const step = Number(formEl.step.value);
  const amount =  Number(formEl.amount.value);
  for (let i = 0; i < amount; i += 1 ) { 
    const position = i + 1;
    formEl.reset();
    delay += step;
  createPromise(position, delay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  }
    
};







