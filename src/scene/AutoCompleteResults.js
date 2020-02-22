import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  position: relative;

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
    background: #89bdd6;
    color: #fff;
  }

  ${props => {
    if (props.isActive) {
      return `
        background: #89bdd6;
        color: #fff;
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
  const { suggestions, isMoving, setSuggestion, wrapperRef } = props;

  // reference of previous position and props
  layoutRef.current = {
    pos: pos,
    isMoving,
    suggestions
  };

  // if the position in the array changes, set that value to the input field
  useEffect(() => {
    if( pos >= 0) {
      const currSuggestion = suggestions[pos].title;
      setSuggestion(currSuggestion);
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
    const _suggestions = layoutRef.current.suggestions;
    const _isMoving = layoutRef.current.isMoving;
    const currentPos = layoutRef.current.pos;
    const isDownKeyPress = e.keyCode === 40;
    const isUpKeyPress = e.keyCode === 38;
    const isAtFirstOption = currentPos === 0;
    const isAtLastOption = currentPos + 1 === _suggestions.length;
    const isMoveUp = _isMoving && !isAtFirstOption && isUpKeyPress;
    const isMoveDown = _isMoving && !isAtLastOption && isDownKeyPress;

    // moves up and down the list
    if (isMoveUp) {
      setNavigate(currentPos - 1);
    }

    if (isMoveDown) {
      setNavigate(currentPos + 1);
    }
  }


  if (!suggestions || suggestions.length === 0 || isHidden) {
    return false;
  }


  // TODO: on click setSuggestion
  return (
    <Container>
      {
        suggestions.map((result, i) => 
          <Item 
            isActive={pos === i}
            key={result.title}>
              {result.title}
          </Item>
        )
      }
      
    </Container>
  )
}

function mapStateToProps(state){
  const { results } = state;
  const { items } = results;
  let suggestions = items ? Object.values(results.items) : [];

  if (suggestions.length > 0) {
    suggestions = suggestions.map((item) => {
      return {
        // url: item.html_url,
        labels: item.labels,
        title: item.title,
      }
    })
  }

  return {
    suggestions
  }
}

export default connect(
  mapStateToProps, 
  {  }
)(AutoCompleteResults);