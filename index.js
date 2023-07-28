const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

let STOP_TIMER_FLAG = false

const getTimer = () =>{
  const [hours, minutes, seconds] = timerEl.innerHTML.split(':')
  return Number(hours)*3600 + Number(minutes)*60 + Number(seconds) 
}

const setTimer = (seconds) =>{
  const hours = `${Math.floor(seconds / 3600)}`
  seconds -= hours*3600
  const minutes = `${Math.floor(seconds / 60)}`
  seconds -= minutes*60
  seconds = `${seconds}`
  timerEl.innerHTML = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`
}

const animateTimer = async () => {
  while (getTimer() > 0){
    if (STOP_TIMER_FLAG){break}
    STOP_TIMER_FLAG = true
    await waitSecond().then(() =>{
      setTimer(getTimer() - 1)
      STOP_TIMER_FLAG = false
    })
    
  }
}

const waitSecond = () => {
  return new Promise(res =>
    setTimeout(res, 1000)
  )
}

inputEl.addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/\D+/, '')
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  setTimer(seconds)
  animateTimer()

  inputEl.value = '';
});
