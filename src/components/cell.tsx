import styled from 'styled-components';
import React from "react";

const StyledCell = styled.div<{value: number}>`
    display: block;
    width: 12px;
    height: 12px;
    border: solid;
    border-width: 1px;
    border-color: black;
    will-change: background-color, border-color;
    transition: border-color 0.1s;
    background-color: ${(props) => (props.value ? 'cadetblue' : 'white')};
`;

type cell = {
    value: 0|1
}

export const Cell = ( value: cell ) => (
    <StyledCell value={value.value} ></StyledCell>
);

export default Cell;