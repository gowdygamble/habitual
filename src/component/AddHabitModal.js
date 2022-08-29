import React, {useState} from 'react'
import styled from 'styled-components'
import {db} from '../firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore'

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

const CustomForm = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const CustomTextInput = styled.input`
  margin-right: 10px;
  width: 200px;
`

const CustomButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid black;
  color: black;
  margin: 0 1em;
  padding: 0.25em 1em;
`

function AddHabitModal(props) {

  const [newHabitName, setNewHabitName] = useState('')

  const handleSubmit = async event => {
      event.preventDefault();

      await addDoc(collection(db, 'habits'), {
          name: newHabitName,
          category: props.category.name,
          order: props.maxOrder+1,
          day: props.category.name === "Day Specific" ? props.day : "not-day-specific"
      })

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