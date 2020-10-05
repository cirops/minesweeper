import styled, { css } from 'styled-components';

interface SquareProps {
  bomb: boolean;
  checked: boolean;
  neighbouringBombs: number;
  isGameOver: boolean;
}

const colorForNeighbouringBombs = [
  '#e76346',
  '#4199d3',
  '#57da59',
  '#bb41d3',
  '#bb41d3',
  '#bb41d3',
  '#bb41d3',
  '#bb41d3',
];

export const Container = styled.div<SquareProps>`
  font-size: 25px;
  text-align: center;
  font-family: 'Roboto Mono', monospace;

  height: 40px;
  width: 40px;
  border: 5px solid;
  border-color: #f5f3eb #bab7a9 #bab7a9 #fff9db;
  box-sizing: border-box;

  color: ${props => colorForNeighbouringBombs[props.neighbouringBombs + 1]};

  ${props =>
    props.checked &&
    css`
      border: 2px solid;
      background-color: #cecab7;
      border-color: #9c998d;
    `};
`;
