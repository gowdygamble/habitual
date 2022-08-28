import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import AddHabit from '../component/AddHabit';
import { PageContainer } from '../component/StyleComponents';

import {collection, query, onSnapshot} from "firebase/firestore"
import {db} from '../firebase'

const HabitCard = styled.div`
    border: 2px solid grey;
    border-radius: 3px;
    width: 50%;
    text-align: center;
    margin: 4px;
`;

function CurrentHabits() {

    const [habits, setHabits] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const q = query(collection(db, 'habits'))
        onSnapshot(q, (querySnapshot) => {

          var h = querySnapshot.docs.map(doc => ({
            name: doc.data().name,
            order: doc.data().order,
            category: doc.data().category,
          }));
          h.sort((a, b) => parseInt(a.order) - parseInt(b.order))

          setHabits(h)
        })
      },[])

      useEffect(() => {
        const q = query(collection(db, 'categories'))
        onSnapshot(q, (querySnapshot) => {

          var h = querySnapshot.docs.map(doc => ({
            name: doc.data().name,
            order: doc.data().order,
          }));
          h.sort((a, b) => parseInt(a.order) - parseInt(b.order))

          setCategories(h)
        })
      },[])

    // build up object {category: array of habits in that category}
    // function that takes two arrays: array of habits, array of categories
    // returns object above

    const sortHabitsByCategory = (categories, habits) => {
      const catNames = categories.map(h => h.name)
      const habitsByCategory = catNames.reduce((o, cat) => ({ ...o, [cat]: habits.filter(h => h.category === cat)}), {})
      console.log(habitsByCategory)
    }

    
    console.log(categories)
    sortHabitsByCategory(categories, habits)

    return (
      <PageContainer>
          <AddHabit />
          {habits.map(habit => {
              return (
                  <HabitCard key={habit.name}>
                      <p>{habit.name}</p>
                  </HabitCard>
              )
          })}
      </PageContainer>
  )
}

export default CurrentHabits