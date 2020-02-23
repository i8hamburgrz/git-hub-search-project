import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Labels from "./Labels";

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
  const [isHidden, setHidden] = useState(false);
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

  // reset navigation && unhide if suggestions array changes
  useEffect(() => {
    setNavigate(-1);
    setHidden(false);
  }, [suggestions]);

  // add event listeners
  useEffect(() => {
    window.addEventListener('click', handleHideSuggestions);
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('click', handleHideSuggestions);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);


  const handleHideSuggestions = (e) => {
    const { current } = wrapperRef;
    if(current && !current.contains(e.target)) {
      setHidden(true);
    }
  }

  const handleKeyPress = (e) => {
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


  if (
      !suggestions 
      || suggestions.length === 0 
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
  const { suggestions, apiError } = state;
  const { items } = suggestions;
  let _suggestions = items ? Object.values(items) : [];

  if (_suggestions.length > 0) {
    _suggestions = _suggestions.map((item) => {
      return {
        labels: item.labels,
        title: item.title,
      }
    })
  }

  return {
    isError: apiError,
    suggestions: _suggestions
  }
}

export default connect(
  mapStateToProps, 
  {  }
)(AutoCompleteResults);