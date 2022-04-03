var deadline = new Date(2022, 6, 23, 18, 0);

var elementDays = document.querySelector('.timer-day');
var elementHours = document.querySelector('.timer-hour');
var elementMinutes = document.querySelector('.timer-minute');
var elementSeconds = document.querySelector('.timer-second');

var elementDaysTitle = document.querySelector('.timer-day-title');
var elementHoursTitle = document.querySelector('.timer-hour-title');
var elementMinutesTitle = document.querySelector('.timer-minute-title');
var elementSecondsTitle = document.querySelector('.timer-second-title');

function declensionNum(num, words) {
  return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
}

function countdownTimer() {
  var diff = deadline - new Date();
  if (diff <= 0) {
    clearInterval(timerId);
  }
  var days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
  var hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
  var minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
  var seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
  elementDays.innerHTML = days < 10 ? '0' + days : days;
  elementHours.innerHTML = hours < 10 ? '0' + hours : hours;
  elementMinutes.innerHTML = minutes < 10 ? '0' + minutes : minutes;
  elementSeconds.innerHTML = seconds < 10 ? '0' + seconds : seconds;
  elementDaysTitle.innerHTML = declensionNum(days, ['день', 'дня', 'дней']);
  elementHoursTitle.innerHTML = declensionNum(hours, ['час', 'часа', 'часов']);
  elementMinutesTitle.innerHTML = declensionNum(minutes, ['минута', 'минуты', 'минут']);
  elementSecondsTitle.innerHTML = declensionNum(seconds, ['секунд', 'секунд', 'секунд']);
}

countdownTimer();

var timerId = null;
timerId = setInterval(countdownTimer, 1000);