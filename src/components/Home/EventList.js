import React from 'react';
import styled, {ThemeProvider} from "styled-components";
import Theme from '../../styles/Theme'

const StyledEventList = styled.div`
  margin: 0;
  border-radius: 10px;
  overflow: hidden;
  border: ${(props) => props.theme.borderBold.main} solid ${(props)  => props.theme.color.main};
  height: 300px;
  box-sizing: border-box;
    & h3 {
      font-size: 17px;
      margin: 0;
      padding: 10px 10px;
      background-color: ${(props)  => props.theme.color.main};
      justify-content: center;
      color: white;
    }
  & .content {
    font-size: 13px;
  }
  & .row {
    display: block;
    margin: 5px;
    padding: 5px;
    text-decoration: none;
    color: black;
    :not(:last-of-type){
      border-bottom: 1px solid gray;
    }
    
  }
  & .row p {
    margin: 0;
    text-align: left;
  }
  & .row .name {
    font-size: 16px;
  }

  & .row .duration {
    margin-bottom: 5px;
  }
`

const EventList = (props) => {
    return (
        <ThemeProvider theme={Theme}>
            <StyledEventList>
                <h3>{props.title}</h3>
                <div className="content">
                    {props.data.map((item) => {
                        let startDate = new Date(item.STRTDATE);
                        let endDate = new Date(item.END_DATE);
                        return (
                            <a className="row" href={item.ORG_LINK} target="_blank" rel="noopener noreferrer">
                                <p className="duration">{startDate.getMonth()+1}.{startDate.getDate()} ~ {endDate.getMonth()+1}.{endDate.getDate()}</p>
                                <p className="name">{item.TITLE}</p>
                            </a>
                        )
                    })}
                </div>
            </StyledEventList>
        </ThemeProvider>
    );
};

export default EventList;