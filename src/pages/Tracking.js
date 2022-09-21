import React, {useState, useEffect} from 'react'
import { PageContainer } from '../component/StyleComponents'
import {db} from '../firebase'
import {collection, query, onSnapshot, doc,  getDocs, updateDoc} from "firebase/firestore"
import { useSelector } from 'react-redux';

import HabitCard from '../component/HabitCard'
import EditStatusSegment from '../component/EditStatusSegment'

function Tracking() {
  const authenticated = useSelector((state) => state.auth.authenticated)

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

  // also want it to be by week           

  // break into array of weeks
  //then display a row for each week
  // how to start the weeks
  // how to fill in missing days?


  

  return ( <div>
    {!authenticated && (
          <PageContainer>
            <h2>Log in to see your habit tracking</h2>
          </PageContainer>
        )}
    {authenticated && (
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

            const changeStatus = async (habitId, newStatus) => {
              const dayDocRef = doc(db, "days", d.datestring)
              const dotNotation = "habits." + habitId + ".status"
              //"habits.KvuOpHW9KLLfDRmv9zsw.status"
              //console.log(dotNotation)
              await updateDoc(dayDocRef, {
                [dotNotation] : newStatus
              });
            }
        
            habits.sort((a, b) => parseInt(a.order) - parseInt(b.order))
            return (
              <div key={d.datestring} style={{ width: '230px', margin: '5px', display: 'flex', flexDirection: 'column', 'alignItems': 'center' }}>
                <h3>{d.datestring}</h3>
                {habits.map(habit => {
                          return (
                              <HabitCard key={habit.id} status={habit.status}>
                                  <p>{habit.name}</p>
                                  <EditStatusSegment handleStatusChange={changeStatus} habitId={habit.id}/>
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
    )}
  </div>);
}

export default Tracking