import React, {useState} from 'react'
import styled from 'styled-components'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddHabitModal from './AddHabitModal';
import CancelIcon from '@mui/icons-material/Cancel';

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


const HabitCard = styled.div`
    border: 2px solid grey;
    border-radius: 3px;
    width: 90%;
    text-align: center;
    margin: 4px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 15px;
    padding-right: 15px;
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

//   {habits.map(habit => {
//     return (
//         <HabitCard key={habit.name}>
//             <p>{habit.name}</p>
//             <CancelIcon onClick={() => deleteHabit(habit)} />
//         </HabitCard>
//     )
// })}

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
                        {habits.filter(h => h.day === day).map(habit => {
                            return (
                                <HabitCard key={habit.id}>
                                    <p>{habit.name}</p>
                                    <CancelIcon onClick={() => deleteHabit(habit)} />
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