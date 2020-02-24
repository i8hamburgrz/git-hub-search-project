import React, { useState, useEffect, useRef } from "react";
import { withRouter } from 'react-router';
import { connect } from "react-redux";
import queryString from "query-string";
import { getSuggestions } from "../../../store/searchActions";
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
  const [isAutoCompleteVisible, setACVisibilty] = useState(false);
  const [isInsideAutoComplete, setIsMoving] = useState(false);
  const layoutRef = useRef({
    queryRef: displayValue,
    isMounted: false
  });

  // we need to assign the display value here so listeners get the
  // most up to date value from state.
  layoutRef.current.queryRef = displayValue;

  // on mount, check if we are on search page and set display value
  useEffect(() => {
    const { location } = props;

    if (location.pathname.includes('search')) {
      if(location.search.length > 0) {
        const query = queryString.parse(location.search);
        setDisplay(query.q);
      }
    }
    
  }, [])

  // make api call to github after string is set to state
  useEffect(() => {
    let timeout;
    const { current } = layoutRef;
    // using timeout here to wait to until user stops typing
    // this will help reduce the amount of unnecessary api calls being made
    // should only be called on componentDidUpdate lifecycle
    if(current.isMounted) {
      timeout = setTimeout(()=> {
        searchGitHub(query)
      }, 300);
    }
    
    return () => {
      clearTimeout(timeout);
      current.isMounted = true;
    }
  }, [query]);

  // add event listener
  useEffect(() => {
    window.addEventListener('keydown', handleSearchOnEnter);
    return () => {
      window.removeEventListener('keydown', handleSearchOnEnter);
    };
  }, [handleSearchOnEnter]);

  const handleSearchOnEnter = (e) => {
    if(e && e.keyCode === 13 && !isInsideAutoComplete) {
      const { current } = layoutRef;
      let { queryRef } = current;
      queryRef = queryRef.split(' ').join('+');
      props.history.push(`/search?q=${queryRef}`)
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
    setACVisibilty(true);
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
      { isAutoCompleteVisible && 
        <AutoCompleteResults 
          isMoving={isInsideAutoComplete}
          setSuggestion={handleSetSuggestion}
          wrapperRef={wrapperRef}
        />
      }
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

export default withRouter(
  connect(
  mapStateToProps, 
  { getSuggestions }
)(SearchBar));