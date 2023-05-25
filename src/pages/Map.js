import React, { useEffect, useRef } from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";
import ReturnHome from "../components/ReturnHome";

const { naver } = window;

const StyledNav = styled.div`
  background: rgba(255, 255, 255, 0.5);
  position: fixed;
  width: 300px;
  height: 100%;
  z-index: 1;
  border: 5px solid white;
  border-radius: 20px;
`
const Map = () => {
    const mapElement = useRef(null);
    useEffect(() => {
        if (!mapElement.current || !naver) return;
        const location = new naver.maps.LatLng(37.5656, 126.9769);
        const mapOptions: naver.maps.MapOptions = {
            center: location,
            zoom: 17,
            zoomControl: true,
            zoomControlOptions: {
                position: naver.maps.Position.TOP_RIGHT,
            },
        };
        const map = new naver.maps.Map(mapElement.current, mapOptions);
        new naver.maps.Marker({
            position: location,
            map,
        });
    }, []);

    return (
        <div>
            <StyledNav>
                <div>무슨 내용 하지</div>
            </StyledNav>
            <ReturnHome />
            <div ref={mapElement} style={{ height: '100vh'}}/>
        </div>
    );
};

export default Map;