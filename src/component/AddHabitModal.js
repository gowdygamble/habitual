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

function AddHabitModal(props) {

  const [newHabitName, setNewHabitName] = useState('')

  const handleSubmit = async event => {
      event.preventDefault();

      await addDoc(collection(db, 'habits'), {
          name: newHabitName,
          category: props.category.name,
          order: props.maxOrder+1,
      })

      setNewHabitName('');
      props.handleClose()
  }

  const handleChange = event => {
      setNewHabitName(event.target.value);
  }

  return (
    <Modal>
      <form onSubmit={handleSubmit}>
        <input type="text" value={newHabitName} onChange={handleChange}/>
        <button>Add Habit</button>
      </form>
    </Modal>
  )
}

export default AddHabitModal