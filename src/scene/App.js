import React, { Component} from "react";
import {hot} from "react-hot-loader";
import styled from "styled-components";
import SearchBar from "./SearchBar";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  justify-content: center;
`
const Title = styled.h1`
  font-size: 30px;
  letter-spacing: 2px;
  margin: 0;
  text-align: center;
  margin-bottom: 15px;
`

class App extends Component{
  render(){
    return(
      <Wrapper>
        <Title>React Issue Search</Title>
        <SearchBar />
      </Wrapper>
    );
  }
}

export default hot(module)(App);


// TODO: add link <a target="_blank" href="https://icons8.com/icons/set/search">Search icon</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>