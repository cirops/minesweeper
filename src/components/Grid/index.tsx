import React from 'react';

import Square from '../Square';

interface SquareProps {
  id: number;
  bomb: boolean;
  checked: boolean;
  flag: boolean;
  neighbouringBombs: number;
  isGameOver: boolean;
  won: boolean;
}

interface GridSquareProps {
  squares: SquareProps[];
  isGameOver: boolean;
  won: boolean;
  handleClick: (squareId: number) => void;
  handlePlaceFlag: (squareId: number) => void;
}

const Grid: React.FC<GridSquareProps> = ({
  squares,
  isGameOver,
  won,
  handleClick,
  handlePlaceFlag,
}: GridSquareProps) => {
  return (
    <div className="grid">
      {squares.map(square => {
        return (
          <Square
            key={square.id}
            id={square.id}
            flag={square.flag}
            handleClick={handleClick}
            handlePlaceFlag={handlePlaceFlag}
            bomb={square.bomb}
            checked={square.checked}
            isGameOver={isGameOver}
            won={won}
            neighbouringBombs={square.neighbouringBombs}
          />
        );
      })}
    </div>
  );
};

export default Grid;
