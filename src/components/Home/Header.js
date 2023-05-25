import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import Theme from "../../styles/Theme";
import headerImg from "../../assets/IMG_7998.JPG"

const StyledHeader = styled.div`
      background: linear-gradient(
              90deg,
              ${(props) => props.theme.color.main} 40%,
              transparent 55%
      ),
      url(${headerImg});
      background-size: 100%, 60%;
      background-position: 50% 50%, 100% 57%;
    margin: 0;
    color: white;
    position: relative;
    padding: 40px;
`;

const StyledTitle = styled.h1`
    font-size: 60px;
    font-weight: 500;
    margin: 0;
    text-align: left;
    & span {
        font-size: 25px;
        font-weight: 300;
        margin: 0;
    }
`;

const StyledLink = styled.a`
    font-size: 15px;
    text-decoration: none;
    color: white;
    display: inline-block;
    position: absolute;
    top: 10px;
    right: 20px;
`;

const Header = () => {
    return (
        <ThemeProvider theme={Theme}>
            <StyledHeader>
                <StyledTitle>서울 行<span>행복한 행사들</span></StyledTitle>
                <StyledLink href="https://www.seoul.go.kr/main/index.jsp">
                    서울시 홈페이지 바로가기
                </StyledLink>
            </StyledHeader>
        </ThemeProvider>
    )
};

export default Header;