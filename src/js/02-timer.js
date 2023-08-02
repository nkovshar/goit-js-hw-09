import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';



const inputEl = document.querySelector('#datetime-picker');
const startBtnEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
startBtnEl.disabled = true;
let timerId = null;

  const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] < options.defaultDate) {
          Notiflix.Notify.failure('Please choose a date in the future');
      }
      else { 
          startBtnEl.disabled = false;
      }      
  },
};

const datePicker = flatpickr(inputEl, options); 

startBtnEl.addEventListener('click', () => {
  timerId = setInterval(() => {
    onTimerStart();
  }, 1000);
});

function addLeadingZero(value) { 
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}


function onTimerStart() {
    const currentDate = Date.now();
    const targetDate = datePicker.selectedDates[0] - currentDate;
    const timerTime = convertMs(targetDate);
    const { days, hours, minutes, seconds } = timerTime;
    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
    startBtnEl.disabled = true;

    if (targetDate <= 1000) { 
        clearInterval(timerId)
        Notiflix.Notify.success('Countdown done!');
    };
}

    
    
    
    


    
