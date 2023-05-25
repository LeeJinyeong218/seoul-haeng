import React from 'react';
import styled, {ThemeProvider} from "styled-components";
import Theme from "../../styles/Theme";
import FilterList from "../../assets/filter_list.json";

const StyledFilterBox = styled.div`
  background-color: ${(props) => props.theme.color.sub};
  padding: 5px 15px;
  
  & h1 {
    padding-left: 15px;
    font-size: 25px;
    color: white;
  }
`
const StyledFilter = styled.div`
  border: 2px solid white;
  padding: 10px;
  margin: 10px;
  color: white;
  & h1 {
    font-size: 20px;
    margin: 0;
    padding: 0;
  }
  & div {
    margin: 10px 0;
    display: flex;
    flex-wrap: wrap;
  }
  & label {
    margin: 3px 10px;
    white-space:nowrap;
  }
`

const Filter = ({filterName, checkboxes, checkFunction}) => {

    return (
        <StyledFilter>
            <h1>
                {filterName}
            </h1>
            <div>
                {checkboxes.map(checkbox =>
                    <label className='checkboxLabel' key={checkbox}>
                        <input
                            type="checkbox"
                            id={checkbox}
                            name={filterName}
                            value={checkbox}
                            onChange={ e => {
                                checkFunction(e.target.checked, e.target.id);
                            }}
                        />
                        {checkbox}
                    </label>
                )}
            </div>
        </StyledFilter>
    )
}

const FilterBox = (props) => {
    return (
        <ThemeProvider theme={Theme}>
            <StyledFilterBox>
                <h1>보기 설정</h1>
                <Filter
                    filterName={FilterList[0].name}
                    checkboxes={FilterList[0].list}
                    checkFunction={props.handleCodeFilterChange}
                />
                <Filter
                    filterName={FilterList[1].name}
                    checkboxes={FilterList[1].list}
                    checkFunction={props.handleGuFilterChange}
                />
                <Filter
                    filterName={FilterList[2].name}
                    checkboxes={FilterList[2].list}
                    checkFunction={props.handleStateFilterChange}
                />
            </StyledFilterBox>
        </ThemeProvider>
    );
};

export default FilterBox;