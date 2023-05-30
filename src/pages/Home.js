import React from 'react';
import styled from 'styled-components';
import Header from "../components/Home/Header";
import Footer from "../components/Footer";
import Intro from "../components/Home/Intro";
import MapLink from "../components/Home/MapLink";
import EventList from "../components/Home/EventList";
import BookLink from "../components/Home/BookLink";

const StyledHome = styled.div`
    margin: 0;
    padding: 0;
    background-color: white;
  
  & .contents-wrap {
    padding-bottom: 2.5rem;
  }
  
  & Footer {
    height: 2.5rem;
  }
`;

const StyledMainGrid = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 50px;
    margin-top: 60px;
    margin-bottom: 100px;
    justify-content: center;
    flex-basis: 300px;
  flex-shrink: 0;
`;

const StyledMainGridContent = styled.div`
  width: 300px;
  height: 450px;
  & span {
    text-align: center;
  }
`

const StyledEventBlock = styled.div`
    margin: 0;
    padding: 0;
    display: flex;
    height: 450px;
    flex-direction: column;
    justify-content: space-between;
`;

const Home = (props) => {
    const ongoingEvents = [...props.events]
        .filter((item) => {
            return Date.parse(item['STRTDATE']) <= props.date && Date.parse(item['END_DATE']) >= props.date;
        })
        .sort((a, b) => Date.parse(b['STRTDATE']) - Date.parse(a['STRTDATE']))
        .sort((a, b) => Date.parse(a['END_DATE']) - Date.parse(b['END_DATE']))
        .slice(0, 3);

    return (
        <StyledHome>
            <div className="contents-wrap">
                <Header/>
                <StyledMainGrid>
                    <StyledMainGridContent><Intro className="content"/></StyledMainGridContent>
                    <StyledMainGridContent><MapLink className="content"/></StyledMainGridContent>
                    <StyledMainGridContent className="content">
                        <StyledEventBlock>
                            <EventList title="진행 행사" data={ongoingEvents}/>
                            <BookLink />
                        </StyledEventBlock>

                    </StyledMainGridContent>
                </StyledMainGrid>
            </div>
            <Footer />
        </StyledHome>
    );
};

export default Home;