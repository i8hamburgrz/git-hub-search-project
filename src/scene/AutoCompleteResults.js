import React from "react";
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
const Item = styled.a`
  display: block;
  text-transform: none;
  width: 100%;
  font-size: 12px;
  padding: 10px;
  box-sizing: border-box;
  cursor: pointer;
  text-decoration: none;
  color: #000;

  &:hover, &:focus {
    background: #89bdd6;
    color: #fff;
  }
`;

function AutoCompleteResults(props) {
  const { suggestions } = props;

  if (!suggestions || suggestions.length === 0) {
    return null;
  }
  
  return (
    <Container>
      {
        suggestions.map((result) => 
          <Item 
            key={result.title}
            href={result.url}>
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
        url: item.html_url,
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