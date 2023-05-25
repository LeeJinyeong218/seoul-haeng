import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Header from "../components/Home/Header";
import Footer from "../components/Footer";
import Intro from "../components/Home/Intro";
import MapLink from "../components/Home/MapLink";
import EventList from "../components/Home/EventList";
import BookLink from "../components/Home/BookLink";
import {getAllEvents} from "../api/api";
import {useItems, useSetItems} from "../contexts/ItemsContext";
import {LoadingProvider, useIsLoading, useLoadingError, useSetIsLoading, useSetLoadingError} from "../contexts/LoadingContext";


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
  //display: flex;
  //flex-direction: column;
  //justify-content: center;
  //align-items: center;
  //overflow: hidden;
`

const StyledEventBlock = styled.div`
    margin: 0;
    padding: 0;
    display: flex;
    height: 450px;
    flex-direction: column;
    justify-content: space-between;
`;

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingError, setLoadingError] = useState(null);
    // const setItems = useSetItems();
    // const items = useItems();
    // const setIsLoading = useSetIsLoading();
    // const isLoading = useIsLoading();
    // const setLoadingError = useSetLoadingError();
    // const loadingError = useLoadingError();

    const date = new Date();

    const ongoingEvents = [...items]
        .filter((item) => {
            return Date.parse(item['STRTDATE']) <= date && Date.parse(item['END_DATE']) >= date;
        })
        .sort((a, b) => Date.parse(b['STRTDATE']) - Date.parse(a['STRTDATE']))
        .sort((a, b) => Date.parse(a['END_DATE']) - Date.parse(b['END_DATE']))
        .slice(0, 3);

    const handleLoad = async () => {
        let result = [];
        try {
            setIsLoading(true);
            setLoadingError(null);
            result = await getAllEvents();
        } catch (error) {
            console.error(error);
            setLoadingError(error);
            return;
        } finally {
            setIsLoading(false);
        }
        setItems(result);
    };

    useEffect(() => {
        handleLoad();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <StyledHome>
            <div className="contents-wrap">
                <Header/>
                <StyledMainGrid>
                    <StyledMainGridContent><Intro className="content"/></StyledMainGridContent>
                    <StyledMainGridContent><MapLink className="content"/></StyledMainGridContent>
                    {/*<LoadingProvider>*/}
                        <StyledMainGridContent className="content">
                            {isLoading ? <p style={{textAlign: 'center'}}>불러오는 중입니다.<br />잠시만 기다려주세요.</p> :
                                <StyledEventBlock>
                                    <EventList title="진행 행사" data={ongoingEvents}/>
                                    <BookLink />
                                </StyledEventBlock>
                            }
                            {loadingError?.message && <span>{loadingError.message}</span>}
                        </StyledMainGridContent>
                    {/*</LoadingProvider>*/}
                </StyledMainGrid>
            </div>
            <Footer />
        </StyledHome>
    );
};

export default Home;