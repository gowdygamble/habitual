import React, {useState, useEffect} from 'react'
import { PageContainer } from '../component/StyleComponents'
import {db} from '../firebase'
import {collection, query, onSnapshot, doc,  getDocs} from "firebase/firestore"

import HabitCard from '../component/HabitCard'


function Tracking() {

  const [days, setDays] = useState([]);
  const [weeks, setWeeks] = useState([]);



  useEffect(() => {
    const q = query(collection(db, 'days'))

    onSnapshot(q, async (querySnapshot) => {

      var h = querySnapshot.docs.map(doc => ({
        datestring: doc.data().datestring,
        habits: doc.data().habits,
      }));

      h.sort((a,b) =>  new Date(b.datestring) - new Date(a.datestring));

      setDays(h)


    })
  }, [])

  useEffect(() => {
    let w = []
    while (days.length) {
      w.push(days.splice(0, 5));
    }
    setWeeks(w)
  }, [days])

  //console.log(days)
  //console.log(weeks)
  //<EditStatusSegment handleStatusChange={props.changeStatus} habitId={habit.id}/>

  
  // this is including all day specific...
  // also want it to be by week
  // way too tall if theyre all stacked
  // break it down by 7                        

  // break into array of weeks
  //then display a row for each week
  // how to start the weeks
  // how to fill in missing days?


  

  return (
    <PageContainer>
      <h2>Tracking</h2>
      <div style={{display:'flex', 
      flexDirection:'column', 
      gap: '6px', 
      padding:'20px',
      justifyContent: 'left'}}>
      
      {weeks.map(week => {
        return (
          <div style={{ display: 'flex', flexDirection: 'row' }}>
        {  week.map(d => {

            const habits = Object.keys(d.habits).map(habitID => {
              return d.habits[habitID];
            })
        
            habits.sort((a, b) => parseInt(a.order) - parseInt(b.order))
            return (
              <div key={d.datestring}>
                <h3>{d.datestring}</h3>
                {habits.map(habit => {
                          return (
                              <HabitCard key={habit.id} status={habit.status}>
                                  <p>{habit.name}</p>
                              </HabitCard> 
                          )
                })}
              </div>
            )
        
            
            
          })
        }</div>
      )})}

      
      </div>
    </PageContainer>
  )
}

export default Tracking