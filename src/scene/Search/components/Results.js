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
const Loading = styled.div`
  width: 50px;
  height: 50px;
  border-top: 3px solid rgba(0, 0, 0, 0.5);
  border-right: 3px solid transparent;
  border-radius: 50%;
  animation: rotation .8s linear infinite;
  position: relative;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;

  @keyframes rotation{
    from{
      transform: rotate(0deg);
    }
    to{
      transform: rotate(360deg);
    }
  }
`

function Results(props) {
  const { isLoading, results } = props;

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <ResultsWrap>
      { results.map(result => (
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