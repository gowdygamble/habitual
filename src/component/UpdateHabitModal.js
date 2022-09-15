import React, {useState} from 'react'
import styled from 'styled-components'
import {db} from '../firebase'
import {collection, addDoc, Timestamp, setDoc, doc} from 'firebase/firestore'

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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const CustomTextInput = styled.input`
  margin-right: 10px;
  font-size: 20px;
  border: 2px solid grey;
  border-radius: 3px;
  width: 400px;
  height: 40px;
  text-align: center;
`

const CustomButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid black;
  color: black;
  margin: 8px 1em;
  padding: 0.25em 1em;
`

function UpdateHabitModal(props) {

  const [newHabitName, setNewHabitName] = useState(props.habit.name)

  const handleSubmit = async event => {
      event.preventDefault();

      if (newHabitName !== '') {
        await setDoc(doc(db, 'habits', props.habit.id), {
            name: newHabitName}, {merge: true})
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
        <CustomButton onClick={handleSubmit}>Update Habit</CustomButton>
      </CustomForm >
    </Modal>
  )
}

export default UpdateHabitModal