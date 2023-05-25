import React from 'react';
import {Link} from 'react-router-dom';
import styled, {ThemeProvider} from "styled-components";
import Theme from "../../styles/Theme";
import { ReactComponent as MapIcon } from "../../assets/map-icon.svg";

const StyledMapLink = styled(Link)`
  box-sizing: border-box;
  display: block;
  height: 450px;
  padding: 50px 0;
  text-decoration: none;
  color: #dddddd;
  font-weight: bold;
  background-color: ${(props) => props.theme.color.main};
  border-radius: 10px;
  
  & .map-icon-container {
    box-sizing: border-box;
    width: 300px;
    height: 300px;
    overflow: hidden;
  }
  
  & p {
    margin: 0;
    font-size: 30px;
    text-align: center;
  }
`

const MapLink = () => {
    return (
        <ThemeProvider theme={Theme}>
            <StyledMapLink to="/map">
                <div className="map-icon-container">
                    <MapIcon width={300} height={320} fill="#dddddd"/>
                </div>
                <p>지도로 보기</p>
            </StyledMapLink>
        </ThemeProvider>
    );
};

export default MapLink;