/* eslint-disable indent */
export default function countdown(endsAt, element) {
  const endsIn = element.querySelector('[data-listing="endsIn"]');

  let s = 1000; // 1000 ms
  let m = 60 * s;
  let h = 60 * m;
  let d = 24 * h;

  let timeLeft;
  let daysLeft;
  let hoursLeft;
  let minutesLeft;
  let secondsLeft;

  function calculateTime() {
    const now = new Date();
    const ends = new Date(endsAt);

    timeLeft = new Date(ends.getTime() - now.getTime());
    daysLeft = Math.floor(timeLeft / d);
    hoursLeft = Math.floor((timeLeft % d) / h);
    minutesLeft = Math.floor((timeLeft % h) / m);
    secondsLeft = Math.floor((timeLeft % m) / s);
  }
  calculateTime();

  console.log(daysLeft);
  if (daysLeft === 0) {
    setInterval(function () {
      calculateTime();
      endsIn.parentElement.classList.add('text-primary');
      endsIn.textContent = `${hoursLeft}h, ${minutesLeft}m, ${secondsLeft}s`;
    }, 1000);
    return daysLeft;
  }
  return daysLeft;
}
