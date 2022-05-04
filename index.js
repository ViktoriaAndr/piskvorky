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
    if (isWinningMove(myTurn[i]) === true) {
      let player = getSymbol(myTurn[i]);

      if (player === 'cross') {
        const win1 = () => {
          alert('Vyhrál křížek');
        };
        setTimeout(win1, 300);
        return;
      }
      const win2 = () => {
        alert('Vyhrál kroužek');
      };
      setTimeout(win2, 300);
    }
  });
}

// zjisti jestli je na policku nejaky symbol a jaky, pokud neni tak undefined
const getSymbol = (field) => {
  // Název třídy přizpůsob tvému kódu.
  if (field.classList.contains('board__field--cross')) {
    return 'cross';
  } else if (field.classList.contains('board__field--circle')) {
    return 'circle';
  }
};

// Napiš funkci getField(row, column), která pro číslo řádku a sloupce vrátí příslušný prvek.
const boardSize = 10; // 10x10
// const fields = document.querySelectorAll('.board__field'); // Selektor pozměň tak, aby odpovídal tvému kódu.

const getField = (row, column) => {
  return myTurn[row * boardSize + column];
};

//Napiš funkci getPosition(field), která naopak pro dané políčko vrátí objekt s číslem řádku a sloupce. Pro levé horní políčko vrať {row: 0, column: 0}, pro pravé dolní {row: 9, column: 9}, pro levé dolní {row: 9, column: 0}
const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < myTurn.length && field !== myTurn[fieldIndex]) {
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1; // Jednička pro právě vybrané políčko
  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;
  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  return false;
};
