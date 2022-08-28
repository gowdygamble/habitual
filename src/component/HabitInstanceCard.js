import React from 'react'
import styled from 'styled-components';

import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CancelIcon from '@mui/icons-material/Cancel';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const HabitCard = styled.div`
    border: 2px solid grey;
    border-radius: 3px;
    width: 90%;
    text-align: center;
    margin: 4px;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: ${props => props.status === "complete" ? "#aeffa8" : ( props.status === "failed" ? "#ffb1a8" : "white") }
`;

function HabitInstanceCard(props) {
    const habit = props.habit;

    return (
        <HabitCard status={habit.status} >
            <div>
                <p>{habit.name}</p>
            </div>
            <div>
                <CheckCircleIcon onClick={() => props.handleStatusChange(props.habitId, "complete")} />
                <CancelIcon onClick={() => props.handleStatusChange(props.habitId, "failed")} />
                <RadioButtonUncheckedIcon onClick={() => props.handleStatusChange(props.habitId, "incomplete")} />
            </div>
            
        </HabitCard>
  )
}

export default HabitInstanceCard