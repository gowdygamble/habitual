import React, {useState} from 'react'
import styled from 'styled-components'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddHabitModal from './AddHabitModal';
import CancelIcon from '@mui/icons-material/Cancel';

import HabitCard from './HabitCard';
import OrderChangeBox from './OrderChangeBox';
import { HandleStatusSwap } from '../functions/FirebaseHelperFunctions';

import {doc, deleteDoc} from "firebase/firestore"
import {db} from '../firebase'

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

const DayContainer = styled.div`
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

const HabitControlBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    * {
       margin-left: 5px;
    }
`

const ModalBackground = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .7);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
  `

const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]

function DaySpecificCategoryBlock(props) {
    const category = {name: "Day Specific"}
    const habits = props.habits ?? [];

    const [modalOpen, setModalOpen] = useState(false)
    const [selectedDay, setSelectedDay] = useState('');

    const openModal = () => {
      setModalOpen(true)
    }

    const closeModal = () => {
      setModalOpen(false)
      setSelectedDay('')
    }

    const addDayHabit = (day) => {
        setSelectedDay(day);
        openModal()
    }

    const deleteHabit = async (habit) => {
        console.log(habit)
        await deleteDoc(doc(db, "habits", habit.id));
    }

    //<HabitContainer>
    //</HabitContainer>

    return (
        <CategoryCard>
            {modalOpen && (
                <div>
                    <ModalBackground onClick={closeModal}></ModalBackground>
                    <AddHabitModal 
                        category={category} 
                        maxOrder={props.maxOrder} 
                        handleClose={closeModal}
                        day={selectedDay}
                    />
                </div>
            )}
            
            <TitleContainer>
                <h2>Day Specific</h2>
            </TitleContainer>
            
            {days.map(day => {
                
                return (
                    <div key={day}>
                        <DayContainer key={day}>
                            <h3>{day}</h3>
                            <AddCircleIcon onClick={() => addDayHabit(day)} />
                        </DayContainer>
                        {habits.filter(h => h.day === day).map((habit, index) => {
                            let upindex = index - 1;
                            if (upindex < 0) { upindex = 0}
                            let downindex = index + 1;
                            if (downindex === habits.length) { downindex = habits.length - 1}
        
                            let upHabit = habits[upindex]
                            let downHabit = habits[downindex]
                            
                            return (
                                <HabitCard key={habit.id}>
                                    <p>{habit.name}</p>
                                    <HabitControlBox>
                                        <CancelIcon onClick={() => deleteHabit(habit)} />
                                        <OrderChangeBox 
                                            upHandler={() => {HandleStatusSwap(habit, upHabit)}}
                                            downHandler={() => {HandleStatusSwap(downHabit, habit)}}
                                        />
                                    </HabitControlBox>
                                </HabitCard>

                            )}
                        )}
                        
                        
                    </div>
                )
            })}
            
        </CategoryCard>
    )
}

export default DaySpecificCategoryBlock