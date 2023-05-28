import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import ReturnHome from "../components/ReturnHome";
import Header from "../components/Book/Header";
import FilterBox from "../components/Book/FilterBox";
import List from "../components/Book/List";
import PageBar from "../components/Book/PageBar";
import Footer from "../components/Footer";

const StyledBook = styled.div`
  margin: 0;
  padding: 0;
  background-color: white;

  & .contents-wrap {
    padding-bottom: 2.5rem;
  }

  & Footer {
    height: 2.5rem;
  }
`
const Book = (props) => {
    const events = props.events;
    const eventsNumber = events.length;

    const [searchWord, setSearchWord] = useState('');

    const [codeFilter, setCodeFilter] = useState(new Array(0));
    const [guFilter, setGuFilter] = useState(new Array(0));
    const [stateFilter, setStateFilter] = useState(new Array(0));

    const VIEW_LIMIT = 5;
    const [pageNumber, setPageNumber] = useState(0);
    const [pageRow, setPageRow] = useState(0);
    const pageNumberLimit = (eventsNumber % VIEW_LIMIT) ? eventsNumber/VIEW_LIMIT-1 : eventsNumber/VIEW_LIMIT;
    const pageRowLimit = (pageNumberLimit % VIEW_LIMIT) ?
        pageNumberLimit/VIEW_LIMIT-1 : pageNumberLimit/VIEW_LIMIT;

    // paged Items
    const sortedEvents = events
        .sort((a, b) => Date.parse(a['STRTDATE']) - Date.parse(b['STRTDATE']));

    const filteredItems = sortedEvents
        .filter(item => {
            if (codeFilter.length === 0) {
                return true;
            } else {
                return codeFilter.includes(item['CODENAME']);
            }
        })
        // eslint-disable-next-line array-callback-return
        .filter(item => {
            if (guFilter.length === 0) {
                return true;
            } else {
                return guFilter.includes(item['GUNAME']);
            }
        })
        // eslint-disable-next-line array-callback-return
        .filter(item => {
            const date = new Date();
            if (stateFilter.length === 0) {
                return true;
            }
            else {
                return (stateFilter.includes("예정")
                        && Date.parse(item['STRTDATE']) > date)
                    ||(stateFilter.includes("진행 중")
                        && Date.parse(item['STRTDATE']) <= date
                        && Date.parse(item['END_DATE']) >= date)
                    ||(stateFilter.includes("종료")
                        && Date.parse(item['END_DATE']) < date)
            }
        })
        .filter(item => {
            if (searchWord.length === 0) {
                return true;
            }
            else {
                return item['TITLE'].includes(searchWord)
                    || item['PLAYER'].includes(searchWord)
                    || item['PLACE'].includes(searchWord);
            }
        });

    const pagedItems = filteredItems.slice(pageNumber*VIEW_LIMIT, (pageNumber+1)*VIEW_LIMIT);

    useEffect(() => {
        setPageNumber(0);
        setPageRow(0);
    }, [codeFilter, guFilter, stateFilter]);

    // Search Bar handler
    const handleSearchButtonClick = (value) => {
        setSearchWord(value);
    }

    // FilterBox handler
    const handleCodeFilterChange = (isChecked, value) => {
        isChecked ?
            setCodeFilter([...codeFilter, value]) : setCodeFilter(codeFilter.filter(item => item !== value));
    }
    const handleGuFilterChange = (isChecked, value) => {
        isChecked ?
            setGuFilter([...guFilter, value]) : setGuFilter(guFilter.filter(item => item !== value));
    }
    const handleStateFilterChange = (isChecked, value) => {
        isChecked ?
            setStateFilter([...stateFilter, value]) : setStateFilter(stateFilter.filter(item => item !== value));
    }

    // PageBar Handler

    const handlePageNumberClick = (value) => {
        setPageNumber(value);
    }

    const handlePageLeftTurnerClick = () => {
        setPageRow(pageRow-1);
        setPageNumber(pageRow*5-1);
    }
    const handlePageRightTurnerClick = () => {
        setPageRow(pageRow+1);
        setPageNumber((pageRow + 1)*5);
    }

    return (
        <StyledBook>
            <div className="contents-wrap">
                <Header
                    handleSearchButtonClick={handleSearchButtonClick}
                />
                <FilterBox
                    handleCodeFilterChange={handleCodeFilterChange}
                    handleGuFilterChange={handleGuFilterChange}
                    handleStateFilterChange={handleStateFilterChange}
                />
                <List events={pagedItems}/>
                <PageBar
                    pageNumber={pageNumber}
                    pageRow={pageRow}
                    limit={[pageNumberLimit, pageRowLimit]}
                    handlePageNumberClick={handlePageNumberClick}
                    handlePageLeftTurnerClick={handlePageLeftTurnerClick}
                    handlePageRightTurnerClick={handlePageRightTurnerClick}
                />
            </div>
            <ReturnHome />
            <Footer />
        </StyledBook>
    );
};
export default Book;