import React from "react";
import styled from "styled-components";
import SearchBar from "../shared-components/SearchBar/SearchBar";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  justify-content: flex-start;
  border-bottom: 1px solid #dfe1e5
`
const Title = styled.h1`
  margin: 0;
  font-size: 16px;
  line-height: 2.7;
  height: 48px;
`
const SearchWrapper = styled.div`
  width: 638px;
  position: absolute;
  left: 160px;
`;

function Search(props) {
  return (
    <Header>
      <Title>React Issue Search</Title>
      <SearchWrapper>
        <SearchBar />
      </SearchWrapper>
      
    </Header>
  )
}

export default Search;