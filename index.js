console.log('funguju');

const myTurn = document.querySelectorAll('button');
let playerTurn = 'circle';

for (let i = 0; i < myTurn.length; i++) {
  myTurn[i].addEventListener('click', (event) => {
    if (playerTurn === 'circle') {
      event.target.classList.add('board__field--circle');
      playerTurn = 'cross';
      const whoseTurn = document.querySelector('.icon__circle');
      whoseTurn.src = 'cross.svg';
      whoseTurn.alt = 'křížik je na taku';
    } else {
      event.target.classList.add('board__field--cross');
      playerTurn = 'circle';
      const whoseTurn = document.querySelector('.icon__circle');
      whoseTurn.src = 'circle.svg';
      whoseTurn.alt = 'kolečko je na tahu';
    }
    myTurn[i].disabled = true;
  });
}
