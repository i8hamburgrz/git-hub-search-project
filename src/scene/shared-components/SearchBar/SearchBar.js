import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { getSuggestions, getResults } from "../../../store/searchActions";
import styled from "styled-components";
import AutoCompleteResults from "./components/AutoCompleteResults";
import SearchIcon from "../../../images/search.svg";

const Wrapper = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-width: 599px;
  width: calc(100% - 15px);
  border: ${props => (props.isError 
    ? `1px solid red`
    : `1px solid #dfe1e5`
  )};
  margin: 0 auto;
  box-shadow: ${props => (props.isFocus ?
    `0px 1px 3px 1px rgba(0,0,0,0.1)`
    : `0 1px 1px rgba(0,0,0,0.1)`
  )};
  border-radius: 24px;
  transition: box-shadow 0.1s ease-in;
  background: #fff;
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
  const wrapperRef = useRef(null);
  const [isFocus, setFocus] = useState(false);
  const [query, setQuery] = useState('');
  const [displayValue, setDisplay] = useState('');
  const [isInsideAutoComplete, setIsMoving] = useState(false);
  const layoutRef = useRef({
    query: displayValue
  });

  layoutRef.current = {
    query: displayValue
  };

  // make api call to github after string is set to state
  useEffect(() => {
    // using timeout here to wait to make api until user stops typing
    // this will help reduce the amount of unnecessary api calls being made
    const timeout = setTimeout(()=> {
      searchGitHub(query)
    }, 300);
  
    return () => {
      clearTimeout(timeout);
    }
  }, [query]);

  // add event listener
  useEffect(() => {
    window.addEventListener('keydown', handleSearch);
    return () => {
      window.removeEventListener('keydown', handleSearch);
    };
  }, [handleSearch]);

  const handleSearch = (e) => {
    if(e && e.keyCode === 13) {
      const { getResults } = props;
      const { current } = layoutRef;

      getResults(current.query);
    }
  }
  
  const onFocusHandler = () => {
    if(!isFocus) {
      setFocus(true);
    }
  }
  
  const onBlurHandler = () => {
    isFocus && setFocus(false)
  }

  const setSearchHandler = (e) => {
    const value = e.target.value;
    setQuery(value);
    setDisplay(value);
  }

  const searchGitHub = (value) => {
    const { getSuggestions } = props;
    getSuggestions(value);
  }

  const isSelectingAutoComplete = (e) => {
    if (e.keyCode === 40 && props.hasResults) {
      setIsMoving(true);
    }
  }

  const handleSetSuggestion = (value) => {
    setDisplay(value)
  }

  return (
    <Wrapper
      ref={wrapperRef}
      isFocus={isFocus}
      isError={props.isError}>
      <Search>
        <Icon><img src={SearchIcon} /></Icon>
        <InputField 
          type="text" 
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          value={displayValue}
          onChange={setSearchHandler}
          onKeyDown={isSelectingAutoComplete}
          maxLength={256}
        />
      </Search>
      <AutoCompleteResults 
        isMoving={isInsideAutoComplete}
        setSuggestion={handleSetSuggestion}
        wrapperRef={wrapperRef}
        handleSearch={handleSearch}
      />
    </Wrapper>
    
 )
}

function mapStateToProps(state){
  const { suggestions, apiError } = state;
  const { items } = suggestions;

  return {
    isError: apiError,
    hasResults: items && items.length > 0
  }
}

export default connect(
  mapStateToProps, 
  { getSuggestions, getResults }
)(SearchBar);