import React, {useState} from 'react';
import styled from "styled-components";

const StyledNav = styled.div`
  background: white;// rgba(255, 255, 255, 0.9);
  position: fixed;
  left: 0;
  width: 400px;
  height: 100%;
  z-index: 3;
  
  & .scroll {
    overflow-y: scroll;
    height: 90%;
    padding: 0;
    margin: 0;
  }
  
`
// Search
const StyledSearchBar = styled.div`
  display: flex;
  width: 90%;
  margin: 20px auto 0 auto;
`

const StyledSearchInput = styled.input`
  width: 85%;
  height: 40px;
  margin-right: 15px;
  padding: 0 10px;
  background-color: transparent;
  border: 2px solid darkgray;
  border-radius: 10px;
  color: black;
  caret-color: black;
  font-size: 15px;
  
  &:focus {
    outline: none;
  }
`

const StyledSearchButton = styled.button`
  width: 40px;
  height: 40px;
  background-color: darkgray;
  border: 2px solid darkgray;
  border-radius: 10px;
  box-sizing: content-box;
  padding: 0 10px;
  color: white;
  font-weight: bolder;
  cursor: pointer;
`
// Place list
const StyledPlaceInfo = styled.div`
    width: 90%;
    margin: 0 auto;
    padding-bottom: 10px;
    border-bottom: 1px solid darkgray;
    margin-top: 20px;
  
    & img {
      display: block;
      width: 200px;
      margin: 0 auto 20px auto;
      border-radius: 5px;
    }
    & h2, h4, h5{
      margin: 5px;
    }
    & a {
      text-decoration: none;
      color: black;
      word-break: break-all;
    }
`

const StyledEvent = styled.a`
  display: block;
  border: 3px solid darkgray;
  border-radius: 20px;
  margin: 20px;
  text-decoration: none;
  color: black;
  padding: 30px;
  
  & h1, h3, h4 {
    margin: 3px 0;
  }
  & h3 {
    font-size: 15px;
  }
  & h1 {
    font-size: 25px;
  }
  & h4 {
    display: inline;
    font-size: 15px;
  }
`
const PlaceInfo = ({item}) => {
    return (
        <StyledPlaceInfo>
            <img src={item['MAIN_IMG']} alt={item['FAC_NAME']} />
            <h2>{item['FAC_NAME']}</h2>
            <h4>{item['ADDR']}</h4>
            <h4>{item['PHNE']}</h4>
            <a href={item['HOMEPAGE']} target="_blank" rel="noopener noreferrer">
                <h5>{item['HOMEPAGE']}</h5>
            </a>
        </StyledPlaceInfo>
    )
}
const HeritageInfo = ({item}) => {
    return (
        <StyledPlaceInfo>
            <h2>{item['name_kor']}</h2>
            <h4>{item['h_kor_city']} {item['h_kor_gu']} {item['h_kor_dong']}</h4>
        </StyledPlaceInfo>
    )
}
const EventListItem = ({item}) => {
    return (
        <StyledEvent href={item['ORG_LINK']} target="_blank" rel="noopener noreferrer">
            <img src={item['MAIN_IMG']}
                 style={{width: "150px"}} alt={"event"}/>
            <h3>{item['CODENAME']} | {item['GUNAME']}</h3>
            <h1 className="title">{item['TITLE']}</h1>
            <h4>행사일: {item['STRTDATE'].slice(0, -10)}<br /></h4>
            {
                (item['STRTDATE'] !== item['END_DATE']) ?
                    <h4> ~ {item['END_DATE'].slice(0, -10)}</h4> : null
            }
            <h4><br />{item['PLACE']}</h4>
        </StyledEvent>
    )
}

const NavBar = (props) => {
    const [input, setInput] = useState("");

    return (
        <StyledNav>
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
            <div className="scroll">
                { props.selectedPlace !== null && <PlaceInfo item={props.selectedPlace} />}
                { props.selectedHeritage !== null && <HeritageInfo item={props.selectedHeritage} />}
                { props.selectedHeritage === null &&
                    <div className="event-container">
                        {props.viewEvents.map(item => {
                            return (
                                <EventListItem item={item}/>
                            )
                        })}
                    </div>
                }
            </div>
        </StyledNav>
    );
};

export default NavBar;