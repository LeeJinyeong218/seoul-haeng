import React from 'react';
import styled, {ThemeProvider} from "styled-components";
import Theme from "../../styles/Theme";

const StyledIntro = styled.div`
  border-radius: 10px;
  text-align: center;
  overflow: hidden;
  background: white;
  height: 100%;
  border: ${(props) => props.theme.borderBold.main} solid ${(props) => props.theme.color.main};
  
  & h1 {
    padding: 20px;
    background-color: ${(props) => props.theme.color.main};
    margin: 0;
    color: white;
  }
  & p {
    margin: 0;
    padding: 20px;
    font-size: 16px;
  }

`
const Intro = () => {
    return (
        <ThemeProvider theme={Theme}>
            <StyledIntro>
                <h1>소개</h1>
                <p>
                    “서울 행”은 서울시의<br />
                    다양한 문화 관람을 위한<br />
                    맞춤 예약 확인 서비스입니다.<br />
                    <br />
                    간편한 지도로<br />
                    서울 문화행사를 확인하고<br />
                    도심내 여행을 계획해보세요.<br />
                    <br />
                    행복한 문화 관람을 하는데<br />
                    “서울 행”이 도움을 드리겠습니다.<br />
                </p>
            </StyledIntro>
        </ThemeProvider>
    );
};

export default Intro;