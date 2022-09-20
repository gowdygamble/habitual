import React, {useState} from 'react'
import styled, { isStyledComponent } from 'styled-components'
import {db} from '../firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore'

import { CustomForm, CustomButton, CustomTextInput} from './StyleComponents';

const Modal = styled.div`
    position: fixed;
    z-index: 20;
    background: #fff;
    width: 500px;
    height: 200px;
    border-radius: 10px;

    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
`

function AddHabitModal(props) {

  const [newHabitName, setNewHabitName] = useState('')

  const handleSubmit = async event => {
      event.preventDefault();

      if (newHabitName !== '') {
        await addDoc(collection(db, 'habits'), {
            name: newHabitName,
            category: props.category.name,
            order: props.maxOrder+1,
            day: props.category.name === "Day Specific" ? props.day : "not-day-specific"
        })
      }

      setNewHabitName('');
      props.handleClose()
  }

  const handleChange = event => {
      setNewHabitName(event.target.value);
  }

  return (
    <Modal>
      <CustomForm >
        <CustomTextInput type="text" value={newHabitName} onChange={handleChange}/>
        <CustomButton onClick={handleSubmit}>Add Habit</CustomButton>
      </CustomForm >
    </Modal>
  )
}

export default AddHabitModal