import React from 'react';
import { Container } from './styles';

interface SquareProps {
  id: number;
  bomb: boolean;
  checked: boolean;
  flag: boolean;
  neighbouringBombs: number;
  isGameOver: boolean;
  won: boolean;
  handleClick: (squareId: number) => void;
  handlePlaceFlag: (squareId: number) => void;
}

const Square: React.FC<SquareProps> = ({
  id,
  bomb,
  checked,
  flag,
  neighbouringBombs,
  isGameOver,
  won,
  handleClick,
  handlePlaceFlag,
}: SquareProps) => {
  const handleRightClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    event.preventDefault();
    handlePlaceFlag(id);
  };

  return (
    <Container
      onContextMenu={handleRightClick}
      onClick={() => handleClick(id)}
      bomb={bomb}
      checked={checked}
      isGameOver={isGameOver}
      neighbouringBombs={neighbouringBombs}
    >
      {isGameOver && !won ? bomb && '💣' : flag && '🚩'}
      {checked && neighbouringBombs > 0 && neighbouringBombs}
    </Container>
  );
};

export default Square;
