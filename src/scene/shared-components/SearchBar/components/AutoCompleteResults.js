import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import styled from "styled-components";
import Labels from "../../labels/Labels";

const Container = styled.div`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
  max-height: 267px;
  overflow-y: auto;

  ::before {
    content: "";
    background: #dfe1e5;
    width: calc(100% - 30px); 
    height: 1px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`
const Item = styled.div`
  width: 100%;
  font-size: 12px;
  padding: 10px;
  box-sizing: border-box;
  cursor: pointer;
  color: #000;

  &:hover, &:focus {
    background: #f6f8fa;
  }

  ${props => {
    if (props.isActive) {
      return `
        background: #f6f8fa;
      `;
    }
  }}
`;

function AutoCompleteResults(props) {
  const [isHidden, setHidden] = useState(true);
  const [pos, setNavigate] = useState(-1);
  const layoutRef = useRef({
    pos: -1,
    isMoving
  });
  const { 
    suggestions, 
    isMoving, 
    setSuggestion, 
    wrapperRef,
    isError
   } = props;

  // reference of previous position and props
  layoutRef.current = {
    pos,
    isMoving,
    suggestions
  };

  // if the position in the array changes, set that value to the input field
  useEffect(() => {
    if( pos >= 0) {
      const selectedSuggestion = suggestions[pos].title;
      setSuggestion(selectedSuggestion);
    }
  }, [pos]);

  // make visible suggestions and reset active state position
  useEffect(() => {
    setNavigate(-1);
    setHidden(false);
  }, [suggestions]);

  // add event listeners
  useEffect(() => {
    window.addEventListener('click', handleHideSuggestions);
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keydown', handleSearchOnEnter);
    return () => {
      window.removeEventListener('click', handleHideSuggestions);
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keydown', handleSearchOnEnter);
    };
  }, [handleKeyPress, handleHideSuggestions, handleSearchOnEnter]);


  const handleHideSuggestions = (e) => {
    const { current } = wrapperRef;
    if(current && !current.contains(e.target)) {
      setHidden(true);
    }
  }

  const handleSearchOnEnter = (e) => {
    if(e && e.keyCode === 13 ) {
      const { current } = layoutRef;
      const { suggestions, pos } = current;
      const query = suggestions[pos].title;
      onSearch(query);
    }
  }

  const handleKeyPress = (e) => {
    // using the layoutRef, navigate up and down list
    const { current } = layoutRef;
    const { suggestions, isMoving, pos } = current;
    const isDownKeyPress = e.keyCode === 40;
    const isUpKeyPress = e.keyCode === 38;
    const isAtFirstOption = pos === 0;
    const isAtLastOption = pos + 1 === suggestions.length;
    const isMoveUp = isMoving && !isAtFirstOption && isUpKeyPress;
    const isMoveDown = isMoving && !isAtLastOption && isDownKeyPress;

    // moves up and down the list
    if (isMoveUp) {
      setNavigate(pos - 1);
    }

    if (isMoveDown) {
      setNavigate(pos + 1);
    }
  }

  const onClickSearch = (query) => {
    setSuggestion(query);
    setHidden(true);
    onSearch(query);
  }

  const onSearch = (query) => {
      setHidden(true);
      query = query.split(' ').join('+');
      props.history.push(`/search?q=${query}`)
  }

  if (
      suggestions.length === 0
      || isHidden 
      || isError
    ) {
    return false;
  }

  return (
    <Container>
      {
        suggestions.map((suggestion, i) => 
          <Item 
            key={i}
            isActive={pos === i}
            onClick={() => onClickSearch(suggestion.title)}
            >
              {suggestion.title}
              <Labels allLabels={suggestion.labels} />
          </Item>
        )
      }
      
    </Container>
  )
}

function mapStateToProps(state){
  let { suggestions, apiError } = state;
  const { items } = suggestions;
  suggestions = items ? Object.values(items) : [];

  return {
    isError: apiError,
    suggestions
  }
}

export default withRouter(
  connect(
  mapStateToProps, 
  {  }
)(AutoCompleteResults));