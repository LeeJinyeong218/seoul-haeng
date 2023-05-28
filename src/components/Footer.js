import React from 'react';
import styled, {ThemeProvider} from "styled-components";
import Theme from "../styles/Theme";

const StyleFooter = styled.div`
  background-color: ${(props) => props.theme.color.main};
  
  & p {
    margin: 0;
    color: white;
    text-align: left;
    padding: 50px;
  }
`
const Footer = () => {
    return (
        <ThemeProvider theme={Theme}>
            <StyleFooter>
                <p>
                    제 2023 서울 열린데이터광장 공공데이터 활용 모바일 앱/웹 경진대회
                    <br />Team 문화 IN
                    <br />Project 서울 行: 행복한 행사들
                </p>
            </StyleFooter>
        </ThemeProvider>
    );
};

export default Footer;