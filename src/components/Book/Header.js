import React, {useState} from 'react';
import styled, {ThemeProvider} from "styled-components";
import Theme from "../../styles/Theme";

const StyledHeader = styled.div`
    background: ${(props) => props.theme.color.main};
    margin: 0;
    color: white;
    position: relative;
    padding: 30px 40px;
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

const StyledFunctionPart = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const StyledPageDesc = styled.p`
  display: inline-block;
  position: absolute;
  font-size: 20px;
  top: 10px;
  right: 20px;
  margin: 0;
`

const StyledSearchBar = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 30px;
`

const StyledSearchInput = styled.input`
  width: 400px;
  height: 40px;
  margin-right: 15px;
  padding: 0 10px;
  background-color: ${(props) => props.theme.color.main};
  border: ${(props) => props.theme.borderBold.sub} solid white;
  border-radius: 10px;
  color: white;
  caret-color: white;
  font-size: 20px;
  
  &:focus {
    outline: none;
  }
`

const StyledSearchButton = styled.button`
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.theme.color.main};
  border: ${(props) => props.theme.borderBold.sub} solid white;
  border-radius: 10px;
  box-sizing: content-box;
  padding: 0 10px;
  color: white;
`

const Header = (props) => {
    const [input, setInput] = useState("");

    return (
        <ThemeProvider theme={Theme}>
            <StyledHeader>
                <StyledPageDesc>문화 행사 모아보기</StyledPageDesc>
                <StyledFunctionPart>
                    <StyledTitle>서울 行<span>행복한 행사들</span></StyledTitle>
                    <StyledSearchBar>
                        <StyledSearchInput
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="제목, 장소, 출연자정보로 찾기"
                        />
                        <StyledSearchButton
                            type="submit"
                            onClick={() => props.handleSearchButtonClick(input)}
                        >검색</StyledSearchButton>
                    </StyledSearchBar>
                </StyledFunctionPart>
            </StyledHeader>
        </ThemeProvider>
    );
};

export default Header;