import React, {useState, useEffect} from 'react'
import { PageContainer } from '../component/StyleComponents'
import {db} from '../firebase'
import {collection, query, onSnapshot, doc,  getDocs} from "firebase/firestore"


function Tracking() {

  const [days, setDays] = useState([]);

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

  console.log(days)

  return (
    <PageContainer>
      <h2>Tracking</h2>
      {days.map(d => {
        return (
          <h3>{d.datestring}</h3>
        )
      })}
    </PageContainer>
  )
}

export default Tracking