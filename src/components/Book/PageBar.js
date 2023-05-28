import React from 'react';
import styled from "styled-components";

const StyledPageBar = styled.div`
  text-align: center;
  padding: 20px;
`

const StyledPageTurnButton = styled.button`
  background: transparent;
  border: none;
  font-size: 25px;
  color: black;
  margin: 0 10px;
`

const StyledPageNumberButton = styled.button`
  background: transparent;
  border: none;
  font-size: 25px;
  color: gray;
  margin: 0 5px;
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
`
const PageBar = (props) => {
    const pageNumberList = [...Array(5).keys()].map(key => key + props.pageRow*5+1);

    return (
        <StyledPageBar>
            {(props.pageRow !== 0) && <StyledPageTurnButton
                onClick={() => props.handlePageLeftTurnerClick()}>◀︎</StyledPageTurnButton>}
            {pageNumberList.map((item) => {
                if (item === props.pageNumber+1) {
                    return <StyledPageNumberButton style={{fontWeight:`500`, color:`black`}}
                            key={item}>
                        {item}
                    </StyledPageNumberButton>
                } else if (item > props.limit[0]) {
                    return null;
                }
                return (
                    <StyledPageNumberButton
                        onClick={() => props.handlePageNumberClick(item-1)
                        } key={item}>{item}</StyledPageNumberButton>
                )
            })}
            {(props.pageRow !== props.limit[1]) && <StyledPageTurnButton
                onClick={() => props.handlePageRightTurnerClick()}>▶︎</StyledPageTurnButton>}
        </StyledPageBar>
    );
};
//
export default PageBar;