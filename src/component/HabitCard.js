import React from 'react'
import styled from 'styled-components';

//move this to single style sheet
const HabitCardStyle = styled.div`
    border: 2px solid grey;
    border-radius: 3px;
    width: 95%;
    text-align: center;
    margin: 1px;
    padding-left: 5px;
    padding-right: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: ${props => props.status === "complete" ? "#aeffa8" : ( props.status === "failed" ? "#ffb1a8" : "white") }
`;

            

function HabitCard(props) {

    return (
        <HabitCardStyle status={props.status} >
            {props.children}
        </HabitCardStyle>
  )
}

export default HabitCard