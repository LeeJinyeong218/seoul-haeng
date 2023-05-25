import React from 'react';
import {Link} from "react-router-dom";
import styled, {ThemeProvider} from "styled-components";
import Theme from '../../styles/Theme'

const StyledBookLink = styled(Link)`
  display: flex;
  border-radius: 10px;
  background-color: ${(props)  => props.theme.color.sub};
  margin: 0;
  width: 300px;
  padding: 40px;
  text-decoration: none;
  color: white;
  font-weight: bold;
  font-size: 30px;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`
const BookLink = () => {
    return (
        <ThemeProvider theme={Theme}>
            <StyledBookLink to="/book">
                예약하러 가기
            </StyledBookLink>
        </ThemeProvider>
    );
};

export default BookLink;