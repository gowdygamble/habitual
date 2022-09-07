import React, {useState} from 'react'
import styled from 'styled-components'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddHabitModal from './AddHabitModal';
import CancelIcon from '@mui/icons-material/Cancel';

import {doc, deleteDoc} from "firebase/firestore"
import {db} from '../firebase'

import HabitCard from './HabitCard';

const CategoryCard = styled.div`
    border: 2px solid grey;
    border-radius: 8px;
    width: 100%;
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


const ModalBackground = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .7);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
  `



function HabitCategoryBlock(props) {
    const category = props.category
    const habits = props.habits ?? [];

    const [modalOpen, setModalOpen] = useState(false)

    const openModal = () => {
      setModalOpen(true)
    }

    const closeModal = () => {
      setModalOpen(false)
    }

    const addHabit = () => {
        openModal()
    }

    const deleteHabit = async (habit) => {
        console.log(habit)
        await deleteDoc(doc(db, "habits", habit.id));
    }

    return (
        <CategoryCard>
            {modalOpen && (
                <div>
                    <ModalBackground onClick={closeModal}></ModalBackground>
                    <AddHabitModal 
                        category={category} 
                        maxOrder={props.maxOrder} 
                        handleClose={closeModal}
                    />
                </div>
            )}
            <TitleContainer>
                <h3>{category.name}</h3>
                <AddCircleIcon onClick={addHabit} />
            </TitleContainer>
            <HabitContainer>
                {habits.map(habit => {
                    return (
                        <HabitCard key={habit.name}>
                            <p>{habit.name}</p>
                            <CancelIcon onClick={() => deleteHabit(habit)} />
                        </HabitCard>
                    )
                })}
            </HabitContainer>
        </CategoryCard>
    )
}

export default HabitCategoryBlock