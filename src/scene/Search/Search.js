import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import queryString from "query-string";
import styled from "styled-components";
import SearchBar from "../shared-components/SearchBar/SearchBar";
import { getResults } from "../../store/actions/searchActions";
import Results from "./components/Results";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  justify-content: flex-start;
  border-bottom: 1px solid #dfe1e5;
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

  // get results when search params change
  useEffect(() => {
    const urlParam = queryString.parse(props.history.location.search);
    props.getResults(urlParam.q);
  }, [props.history.location.search])

  return (
    <React.Fragment>
      <Header>
      <Title>React Issue Search</Title>
      <SearchWrapper>
        <SearchBar />
      </SearchWrapper>
    </Header>
    <Results results={props.results} />
    </React.Fragment>
  )
}

function mapStateToProps(state) {
  let { results } = state;
  const { items } = results;
  results = items ? Object.values(items) : [];

  return {
    results,
    isLoading: state.loadingResults
  }
}

export default withRouter(
  connect(
  mapStateToProps, 
  { getResults }
)(Search));