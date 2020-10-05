import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  .container {
    width: 500px;
    align-content: center;
    font-size: 25px;
    text-align: center;
    font-family: 'Roboto Mono', monospace;
  }

  .grid {
    height: 400px;
    width: 400px;
    display: flex;
    flex-wrap: wrap;
    background-color: #dcd6bc;
    margin-left: 50px;
    margin-top: 20px;
    border: 10px solid #dcd6bc;
    margin-bottom: 10px;
  }
`;
