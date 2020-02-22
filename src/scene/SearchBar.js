import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { getResults, removeResults} from "../store/searchActions";
import styled from "styled-components";
import AutoCompleteResults from "./AutoCompleteResults";
import SearchIcon from "../images/search.svg";

const Wrapper = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 584px;
  border: 1px solid #dfe1e5;
  margin: 0 auto;
  box-shadow: ${props => (props.isFocus ?
    `0px 1px 3px 1px rgba(0,0,0,0.1)`
    : `0 1px 1px rgba(0,0,0,0.1)`
  )};
  border-radius: 24px;
`;
const Search = styled.div`
  overflow: hidden;
  background: #fff;
  display: flex;
  box-shadow: none;
  height: 44px;
`
const InputField = styled.input`
  font-size: 16px;
  outline: none;
  border: none;
  padding: 0 20px 0 10px;
  flex-grow: 1;
`
const Icon = styled.div`
  display: flex;
  width: 20px;
  margin-left: 15px;
  
  img{
    width: 100%;
  }
`

function SearchBar(props) {
  const inputRef = useRef(null);
  const [isFocus, setFocus] = useState(false);
  const [searchString, setSearch] = useState('');
  const [isInsideAutoComplete, setIsMoving] = useState(false);
  
  const onFocusHandler = () => {
    if(!isFocus) {
      setFocus(true);
    }
  }
  
  const onBlurHandler = () => {
    isFocus && setFocus(false)
  }

  const setSearchHandler = (e) => {
    setSearch(e.target.value);
    searchGitHub(searchString)
  }

  const searchGitHub = (value) => {
    const { getResults, removeResults } = props;

    if(value.length > 0) {
      getResults(value);
    } else {
      removeResults()
    } 
  }

  const isSelectingAutoComplete = (e) => {
    if (e.keyCode === 40 && props.hasResults) {
      setIsMoving(true);
      inputRef.current.focus()
    }
  }

  const handleSetSuggestion = (value) => {
    setSearch(value)
  }

  return (
    <Wrapper isFocus={isFocus}>
      <Search>
        <Icon><img src={SearchIcon} /></Icon>
        <InputField 
          type="text" 
          ref={inputRef}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          value={searchString}
          onChange={setSearchHandler}
          onKeyDown={isSelectingAutoComplete}
        />
      </Search>
      <AutoCompleteResults 
        isMoving={isInsideAutoComplete}
        setSuggestion={handleSetSuggestion}
        inputRef={inputRef}
      />
    </Wrapper>
    
 )
}

function mapStateToProps(state){
  const { results } = state;
  const { items } = results;

  return {
    hasResults: items && items.length > 0
  }
}

export default connect(
  mapStateToProps, 
  { getResults, removeResults }
)(SearchBar);