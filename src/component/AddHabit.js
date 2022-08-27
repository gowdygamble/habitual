import React, {useState} from 'react'
import {db} from '../firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore'

function AddHabit() {
    const [newHabitName, setNewHabitName] = useState('')

    const handleSubmit = async event => {
        event.preventDefault();

        await addDoc(collection(db, 'habits'), {
            name: newHabitName
        })

        setNewHabitName('');
    }

    const handleChange = event => {
        setNewHabitName(event.target.value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={newHabitName} onChange={handleChange}/>
                <button>Add Habit</button>
            </form>
        </div>
    )
}

export default AddHabit