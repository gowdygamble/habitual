import React from 'react'
import styled from 'styled-components'
import HabitInstanceCard from './HabitInstanceCard';

const CategoryCard = styled.div`
    border: 2px solid grey;
    border-radius: 8px;
    width: 70%;
    margin-top: 4px;
    margin-bottom: 4px;
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


function DayCategoryBlock(props) {
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
                        <HabitInstanceCard 
                                key={habit.id} 
                                habit={habit} 
                                habitId={habit.id} 
                                handleStatusChange={props.changeStatus}
                              />
                    )
                })}
            </HabitContainer>
        </CategoryCard>
    )
}

export default DayCategoryBlock