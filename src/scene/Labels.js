import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction row;
  flex-wrap: wrap;
`;
const Label = styled.div`
  border-radius: 3px;
  white-space: nowrap;
  padding: 2px 4px;
  font-size: 12px;
  font-family: 'Anonymous Pro', sans-serif;
  margin: 3px 3px 0 0;
`
// gets the text color based on background contrast
function getContrastYIQ(hexcolor){
  hexcolor = hexcolor.replace("#", "");
  const r = parseInt(hexcolor.substr(0,2),16);
  const g = parseInt(hexcolor.substr(2,2),16);
  const b = parseInt(hexcolor.substr(4,2),16);
  const yiq = ( (r * 299) + (g * 587) + (b * 114))/1000;

  return (yiq >= 128) ? '#000' : '#fff';
}

function Labels(props) {
  const { allLabels } = props;

  return (
    <Wrapper>
      {allLabels && allLabels.map(label => 
        <Label 
          key={label.id}
          style={{
            color: getContrastYIQ(label.color),
            background: `#${label.color}`
          }}>
          {label.name}
        </Label>
      )}
    </Wrapper>
  )
}

export default Labels;