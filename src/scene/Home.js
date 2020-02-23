import React from "react";
import styled from "styled-components";
import SearchBar from "./shared-components/SearchBar/SearchBar";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 1200px;
  margin: 30px auto 0;
  justify-content: flex-start;
  min-height: 400px;
  padding: 10px 0;
  box-sizing: border-box;

  @media (min-width: 767px) {
    margin-top: 0;
    justify-content: center;
  }
`
const Title = styled.h1`
  font-size: 30px;
  letter-spacing: 2px;
  margin: 0;
  text-align: center;
  margin-bottom: 15px;
`

function Home(props) {
  return (
    <Wrapper>
      <Title>React Issue Search</Title>
      <SearchBar />
    </Wrapper>
  )
}

export default Home;