import React from "react";
import styled from "styled-components";
import moment from  "moment"
import Labels from "../../shared-components/labels/Labels";
import results from "../../../store/reducers/resultsReducer";

const ResultsWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 800px;

  @media (min-width: 767px) {
    margin-left: 184px;
  }
`
const Item = styled.div`
  width: 100%;
  margin-bottom: 10px;
  padding: 15px;
  box-sizing: border-box;
`
const Title = styled.a`
  font-size: 20px;
  color: #1a0dab;
  text-decoration: none;
`
const Details = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  
  li {
    display: inline-block;
    font-size: 13px;
    margin-right: 10px;
    color: #70757a;
  }
`

function Results(props) {
  return (
    <ResultsWrap>
      { props.results.map(result => (
        <Item key={result.id}>
          <Title href={result.url}>
            {result.title}
          </Title>
          <Labels allLabels={result.labels} />
          <Details>
            <li><b>Author</b>: {result.user.login}</li>
            <li><b>Comments</b>: {result.comments}</li>
            <li><b>State</b>: {result.state}</li>
            <li><b>Last Updated: </b> 
              {moment(results.updated_at).format("MMM DD, YYYY")}
            </li>
          </Details>
      </Item>
      ))}
    </ResultsWrap>
    
  )
}

export default Results;