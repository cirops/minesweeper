import React from 'react';

import { Message } from './styles';

interface ResultsProps {
  message: string;
}

const Results: React.FC<ResultsProps> = ({ message }: ResultsProps) => {
  return <Message>{message}</Message>;
};

export default Results;
