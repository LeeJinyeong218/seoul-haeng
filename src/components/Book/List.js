import React, {useContext} from 'react';
import styled, {ThemeProvider} from "styled-components";
import Theme from "../../styles/Theme";
import {useSetViewItems, useViewItems} from "../../contexts/BookItemsContext";
import {FilterProvider, useFilter} from "../../contexts/FilterContext";

const StyledList = styled.div`
`

const StyledListItem = styled.a`
  display: block;
  border: 3px solid ${(props) => props.theme.color.sub};
  border-radius: 20px;
  margin: 20px;
  text-decoration: none;
  color: black;
  padding: 30px;
  overflow: hidden;
  & img {
    display:inline-block;
  }
  & .info {
    display: inline-block;
    width: 500px;
    margin-left: 30px;
    vertical-align: top;
  }
  & .title-section {
    margin-bottom: 20px;
    width: 100em;
  }
  & .desc-section {
    display: grid;
    grid-template-columns: repeat(2, 300px);
  }
  & .title {
    width: 70%;
  }
  & p, h1, h3, h4 {
    margin: 5px 0;
  }
  & h4 {
    display: inline;
  }
`
const ListItem = ({event}) => {
    return (
        <StyledListItem href={event['ORG_LINK']} target="_blank" rel="noopener noreferrer">
            <img src={event.MAIN_IMG}
                 style={{width: "150px"}} alt={"event image"}/>
            <div className="info">
                <div className="title-section">
                    <h3>{event['CODENAME']} | {event['GUNAME']}</h3>
                    <h1 className="title">{event['TITLE']}</h1>
                </div>
                <div className="desc-section">
                    <div className="date-part">
                        <h4>예약일: {event['RGSTDATE']}</h4><br />
                        <h4>행사일: {event['STRTDATE'].slice(0, -10)}</h4>
                        {
                            (event['STRTDATE'] !== event['END_DATE']) ?
                                <h4>~ {event['END_DATE'].slice(0, -10)}</h4> : null
                        }
                    </div>
                    <div className="etc-part">
                        <p>{event['PLACE']}</p>
                        <p>{event['USE_TRGT']}</p>
                        <p>{event['USE_FEE']}</p>
                        <p>{event['PLAYER']}</p>
                    </div>
                </div>
            </div>
        </StyledListItem>
    )
};

const List = ({events}) => {
    return (
        <ThemeProvider theme={Theme}>
            {events.length === 0  && <div style={{
                margin: '30px auto',
                fontSize: '30px',
                textAlign: 'center'
            }}>해당하는 행사가 없습니다.</div>}
            <StyledList>
                {events.map(event => <ListItem event={event} />)}
            </StyledList>
        </ThemeProvider>
    );
};

export default List;