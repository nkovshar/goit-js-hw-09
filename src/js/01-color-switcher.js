function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerId = null;
stopBtnEl.disabled = true;

startBtnEl.addEventListener('click', () => {
    timerId = setInterval(() => {
        onColorChange();
    }, 1000);
    startBtnEl.disabled = true;
    stopBtnEl.disabled = false;
});

stopBtnEl.addEventListener('click', () => {
    clearInterval(timerId)
    startBtnEl.disabled = false;
    stopBtnEl.disabled = true;

});

function onColorChange(evt) { 
    const randomColor = getRandomHexColor();
    body.style.backgroundColor = randomColor;
}