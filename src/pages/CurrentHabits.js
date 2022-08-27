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

    useEffect(() => {
        const q = query(collection(db, 'habits'))
        onSnapshot(q, (querySnapshot) => {

          var h = querySnapshot.docs.map(doc => ({
            name: doc.data().name,
            order: doc.data().order,
          }));
          h.sort((a, b) => parseInt(a.order) - parseInt(b.order))

          setHabits(h)
        })
      },[])

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