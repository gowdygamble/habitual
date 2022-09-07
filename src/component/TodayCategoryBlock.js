import React from 'react'
import styled from 'styled-components'
import HabitCard from './HabitCard';

import EditStatusSegment from './EditStatusSegment';

const CategoryCard = styled.div`
    border: 2px solid grey;
    border-radius: 8px;
    width: 70%;
    margin-top: 2px;
    margin-bottom: 2px;
    `;

const TitleContainer = styled.div`
    // border: 1px solid blue;
    // border-radius: 8px;
    //margin: 5px;
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    `;

export const HabitContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
`;


function TodayCategoryBlock(props) {
    const category = props.category
    const habits = props.habits ?? [];

    return (
        <CategoryCard>
            <TitleContainer>
                <h3>{category.name}</h3>
            </TitleContainer>
            <HabitContainer>
                {habits.map(habit => {
                    return (
                        <HabitCard key={habit.id} status={habit.status}>
                            <p>{habit.name}</p>
                            <EditStatusSegment handleStatusChange={props.changeStatus} habitId={habit.id}/>
                        </HabitCard> 
                    )
                })}
            </HabitContainer>
        </CategoryCard>
    )
}

export default TodayCategoryBlock