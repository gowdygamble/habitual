import React, {useState, useEffect} from 'react'
import { PageContainer } from '../component/StyleComponents';
import styled from 'styled-components';
import {collection, query, onSnapshot} from "firebase/firestore"
import {db} from '../firebase'

import HabitCategoryBlock from '../component/HabitCategoryBlock';




function CurrentHabits() {

    const [habits, setHabits] = useState([])
    const [categories, setCategories] = useState([])
    const [habitsByCategory, setHabitsByCategory] = useState({})

    useEffect(() => {
        const q = query(collection(db, 'habits'))
        onSnapshot(q, (querySnapshot) => {

          var h = querySnapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            order: doc.data().order,
            category: doc.data().category,
          }));
          h.sort((a, b) => parseInt(a.order) - parseInt(b.order))

          setHabits(h)
        })
      },[])

      const sortHabitsByCategory = (categories, habits) => {
        const catNames = categories.map(h => h.name)
        const hByCategory = catNames.reduce((o, cat) => ({ ...o, [cat]: habits.filter(h => h.category === cat)}), {})
        //console.log(habitsByCategory)
        setHabitsByCategory(hByCategory)
      }

      useEffect(() => {
        sortHabitsByCategory(categories, habits)
      }, [categories, habits])

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
    
    const maxOrder = habits.at(-1) ? habits.at(-1).order : 0
    
    return (
      <PageContainer>

          

          <h2>Current Habits</h2>
          
          {categories.map(category => {
            return (
              <HabitCategoryBlock 
                key={category.name} 
                category={category} 
                habits={habitsByCategory[category.name]} 
                maxOrder={maxOrder}
              />
            )
          })}
      </PageContainer>
  )
}

export default CurrentHabits