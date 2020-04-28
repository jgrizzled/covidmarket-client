// Chart legend overlay

import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

// legendX: 'left' or 'right'
// legendY: 'top' or 'bottom'
// tooltip: bool
export default function Legend({ chartDatas, legendX, legendY, tooltip }) {
  const [expanded, setExpanded] = useState(false);
  if (expanded || !tooltip)
    return (
      <LegendContainer
        legendX={legendX}
        legendY={legendY}
        onMouseOut={() => tooltip && setExpanded(false)}
      >
        {chartDatas.map((cd, i) => (
          <Item color={cd.style.data.stroke} key={i}>
            {cd.name}
          </Item>
        ))}
      </LegendContainer>
    );
  return (
    <LegendContainer legendX={legendX} legendY={legendY}>
      <FontAwesomeIcon
        size='lg'
        style={{ margin: 10 }}
        icon={faInfoCircle}
        onMouseOver={() => setExpanded(true)}
      />
    </LegendContainer>
  );
}

const LegendContainer = styled.ul`
pointer-events: fill;
position: absolute;
max-width: 75%;
z-index: 2;
display: flex;
flex-wrap: wrap;
margin: 0;
list-style: none;
padding: 0;
background-color: rgba(255,255,255,0.8);
border-radius: 10px;
${({ legendX }) =>
  legendX === 'right' && 'justify-content: flex-end; right: 50px;'}
${({ legendX }) => legendX === 'left' && 'left: 50px;'}
${({ legendY }) => legendY === 'top' && 'top: 0;'}
${({ legendY }) => legendY === 'bottom' && 'bottom: 50px;'}
`;

const Item = styled.li`
  pointer-events: none;
  margin: 2px 4px;
  display: inline-block;
  color: ${({ color }) => color};
`;
