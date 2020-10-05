import React, { useState, useEffect } from 'react';

import Grid from './components/Grid';
import Results from './components/Results';

import GlobalStyle from './styles/global';

const width = 10;
const bombAmount = 20;

interface SquareProps {
  id: number;
  bomb: boolean;
  checked: boolean;
  flag: boolean;
  isGameOver: boolean;
  won: boolean;
  neighbouringBombs: number;
}

const App: React.FC = () => {
  const [flags, setFlags] = useState(0);
  const [squares, setSquares] = useState<SquareProps[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    const bombsArray = Array(bombAmount).fill({
      bomb: true,
      checked: false,
      flag: false,
      neighbouringBombs: 0,
    });

    const emptyArray = Array(width * width - bombAmount).fill({
      bomb: false,
      checked: false,
      flag: false,
      neighbouringBombs: 0,
    });

    const gameArray = emptyArray.concat(bombsArray);
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5);
    const indexedArray = shuffledArray.map((square, index) => ({
      ...square,
      id: index,
    }));

    indexedArray.forEach(square => {
      if (!square.bomb) {
        const { id } = square;
        const isLeftEdge = id % width === 0;
        const isRightEdge = id % width === width - 1;
        let totalBombs = 0;

        if (id > 0 && !isLeftEdge && indexedArray[id - 1].bomb) totalBombs += 1;
        if (id > 9 && !isRightEdge && indexedArray[id + 1 - width].bomb)
          totalBombs += 1;
        if (id > 10 && indexedArray[id - width].bomb) totalBombs += 1;
        if (id > 11 && !isLeftEdge && indexedArray[id - 1 - width].bomb)
          totalBombs += 1;
        if (id < 98 && !isRightEdge && indexedArray[id + 1].bomb)
          totalBombs += 1;
        if (id < 90 && !isLeftEdge && indexedArray[id - 1 + width].bomb)
          totalBombs += 1;
        if (id < 88 && !isRightEdge && indexedArray[id + 1 + width].bomb)
          totalBombs += 1;
        if (id < 89 && indexedArray[id + width].bomb) totalBombs += 1;
        indexedArray[id].neighbouringBombs = totalBombs;
      }
    });
    setSquares(indexedArray);
  }, []);

  const handleGameOver = (): void => {
    const newSquares = [...squares];
    newSquares.map(square =>
      square.bomb ? { ...square, checked: true } : square,
    );
    setSquares(newSquares);
    setWon(false);
    setIsGameOver(true);
  };

  const handleCheckForWin = (): void => {
    const matches = squares.reduce(
      (acc, currSquare) => (currSquare.bomb && currSquare.flag ? acc + 1 : acc),
      0,
    );

    if (matches === bombAmount) {
      setWon(true);
      setTimeout(() => {
        setIsGameOver(true);
      }, 10);
    }
  };

  const handlePlaceFlag = (squareId: number): void => {
    if (isGameOver) return;
    if (!squares[squareId].checked && flags < bombAmount) {
      if (!squares[squareId].flag) {
        squares[squareId].flag = true;
        setFlags(flags + 1);
        handleCheckForWin();
      } else {
        squares[squareId].flag = false;
        setFlags(flags - 1);
      }
    }
  };

  const handleClick = (squareId: number): void => {
    const checkSquares = [...squares];

    if (isGameOver) return;

    if (squares[squareId].checked || squares[squareId].flag) {
      return;
    }

    if (squares[squareId].bomb) {
      handleGameOver();
      return;
    }

    checkSquares[squareId].checked = true;
    setSquares(checkSquares);

    if (squares[squareId].neighbouringBombs === 0) {
      handleCheckSquare(squareId);
    }
  };

  const handleCheckSquare = (squareId: number): void => {
    const isLeftEdge = squareId % width === 0;
    const isRightEdge = squareId % width === width - 1;

    if (squareId > 0 && !isLeftEdge) {
      handleClick(squareId - 1);
    }
    if (squareId > 9 && !isRightEdge) {
      handleClick(squareId + 1 - width);
    }
    if (squareId > 10) {
      handleClick(squareId - width);
    }
    if (squareId > 11 && !isLeftEdge) {
      handleClick(squareId - 1 - width);
    }
    if (squareId < 98 && !isRightEdge) {
      handleClick(squareId + 1);
    }
    if (squareId < 90 && !isLeftEdge) {
      handleClick(squareId - 1 + width);
    }
    if (squareId < 88 && !isRightEdge) {
      handleClick(squareId + 1 + width);
    }
    if (squareId < 89) {
      handleClick(squareId + width);
    }
  };

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Grid
          handleClick={handleClick}
          handlePlaceFlag={handlePlaceFlag}
          squares={squares}
          isGameOver={isGameOver}
          won={won}
        />
        <div>
          Flags left:
          <span>{bombAmount - flags}</span>
        </div>
        {isGameOver && (
          <Results message={won ? 'YOU WIN!' : 'BOOM! Game Over!'} />
        )}
      </div>
    </>
  );
};

export default App;
