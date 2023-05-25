import React from 'react';
import {Link} from "react-router-dom";
import styled, {ThemeProvider} from "styled-components";
import Theme from "../styles/Theme";

const StyledReturnHome = styled(Link)`
  background-color: ${(props) => props.theme.color.sub};
  position: fixed;
  right: 30px;
  bottom: 30px;
  z-index: 1;
  display: flex;
  width: 100px;
  height: 60px;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: white;
  font-size: 20px;
  font-weight: bolder;
  border-radius: 20px;
`
const ReturnHome = () => {
    return (
        <ThemeProvider theme={Theme}>
        <StyledReturnHome to="/">돌아가기</StyledReturnHome>
        </ThemeProvider>
    );
};

export default ReturnHome;