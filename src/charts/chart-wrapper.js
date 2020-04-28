// Wrapper for Victory Chart
// Responsive container with legend overlay

import React, { useState, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';

import Legend from './legend';

export default function chartWrapper(ChartComponent) {
  return props => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const containerRef = useRef();

    // resize chart to parent container
    const resize = () =>
      window.requestAnimationFrame(() => {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      });

    // resize chart on window resize
    useLayoutEffect(() => {
      resize();
      window.addEventListener('resize', resize);
      return () => window.removeEventListener('resize', resize);
    }, []);

    const { width, height } = dimensions;
    return (
      <Container ref={containerRef} maxHeight={props.maxHeight}>
        <svg
          width='100%'
          height='100%'
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio='none'
        >
          <ChartComponent {...props} width={width} height={height} />
        </svg>
        <Legend
          chartDatas={props.chartDatas}
          legendX={props.legendX}
          legendY={props.legendY}
          tooltip={props.legendTooltip}
        />
      </Container>
    );
  };
}

const Container = styled.div`
  height: 100%;
  max-height: ${({ maxHeight }) => maxHeight}px;
  overflow: hidden;
  position: relative;
`;
