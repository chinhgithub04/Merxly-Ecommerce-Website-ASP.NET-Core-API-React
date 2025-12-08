import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${({ theme }) => theme.font.main};
  }

  body {
    background: #fff;
    color: ${({ theme }) => theme.colors.dark};
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;
