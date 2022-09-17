import React, {useEffect, useState} from 'react'
import {collection, query, onSnapshot, where, addDoc, setDoc, updateDoc, doc, deleteDoc, getDocs} from "firebase/firestore"
import {db} from '../firebase'
import { PageContainer } from '../component/StyleComponents';
import TodayCategoryBlock from '../component/TodayCategoryBlock';
import RefreshIcon from '@mui/icons-material/Refresh';

import styled from 'styled-components';

const TitleRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const dayCodes = {
  'Sun' : 'Sunday',
  'Mon' : 'Monday',
  'Tue' : 'Tuesday',
  'Wed' : 'Wednesday',
  'Thu' : 'Thursday',
  'Fri' : 'Friday',
  'Sat' : 'Saturday'
}

const createDayHabits = async (datestring) => {

  // filter here by day specificty
  console.log("filtering")
  const dayCode = datestring.split(/(\s+)/)[0];
  const dayName = dayCodes[dayCode]

  const q = query(collection(db, "habits"), where("day", 'in', ["not-day-specific", dayName] ));
  const querySnapshot = await getDocs(q);
  
    
  const dayHabits = querySnapshot.docs.map(doc => {
      return (
        [doc.id, {
        id: doc.id,
        name: doc.data().name,
        status: 'incomplete',
        order: doc.data().order,
        category: doc.data().category,
        day: doc.data().day || "not-day-specific"
      }]
      );
    
    }
  )

  const dayObj = {
    datestring,
    habits: Object.fromEntries(dayHabits)
  }
  // i think this is waht's screwing up the multi day add stuff
  // doing this in add snapshot or something
  await setDoc(doc(db, "days", datestring), dayObj);

  
}

const deleteDayHabits = async id => {
  console.log("delete")
  await deleteDoc(doc(db, "days", id));
}



function Today() {
  const [todayHabits, setTodayHabits] = useState([]);
  const [dayId, setDayId] = useState('');
  const [categories, setCategories] = useState([]);
  const [habitsByCategory, setHabitsByCategory] = useState({})

  var d = new Date();
  const ds = d.toDateString();
  const dayCode = ds.split(/(\s+)/)[0];

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

  const getDayHabits = async () => {
    const q = query(collection(db, 'days'), where("datestring", "==", ds))

    onSnapshot(q, async (querySnapshot) => {
      // if there's a match for today
      // set today's habits equal
      if (querySnapshot.docs && querySnapshot.docs.length) {

        let h = querySnapshot.docs[0].data().habits;
        h = Object.keys(h).map(k => h[k])
        h.sort((a, b) => parseInt(a.order) - parseInt(b.order))
        setTodayHabits(h);
        setDayId(querySnapshot.docs[0].id);
       }
  })}

  

  const changeStatus = async (habitId, newStatus) => {
    const dayDocRef = doc(db, "days", dayId)
    const dotNotation = "habits." + habitId + ".status"
    //"habits.KvuOpHW9KLLfDRmv9zsw.status"
    //console.log(dotNotation)
    await updateDoc(dayDocRef, {
      [dotNotation] : newStatus
    });
  }

  useEffect(() => {
    const q = query(collection(db, 'days'), where("datestring", "==", ds))

    onSnapshot(q, async (querySnapshot) => {

      if (querySnapshot.docs && querySnapshot.docs.length) {

        let h = querySnapshot.docs[0].data().habits;
        h = Object.keys(h).map(k => h[k])
        h.sort((a, b) => parseInt(a.order) - parseInt(b.order))
        setTodayHabits(h);
        setDayId(querySnapshot.docs[0].id);
      }
    })
  }, [])

  const sortHabitsByCategory = (categories, habits) => {
    const catNames = categories.map(h => h.name)
    const hByCategory = catNames.reduce((o, cat) => ({ ...o, [cat]: habits.filter(h => h.category === cat)}), {})
    //console.log(habitsByCategory)
    setHabitsByCategory(hByCategory)
  }

  useEffect(() => {
    sortHabitsByCategory(categories, todayHabits)
  }, [categories, todayHabits])

  

  const refreshTodayHabits = async () => {
    console.log("refresh")
    if (dayId !== '') {
      await deleteDayHabits(dayId)
    }
    
    //it seems to create it on its own...
    await createDayHabits(ds)
    await getDayHabits()
    //await addDoc(collection(db, 'days'), {yoyo: "ma"})
  }
  
  return (
    <PageContainer>
      <TitleRow>
        <h2 style={{marginRight:20}}>{ds}</h2>
        <RefreshIcon onClick={refreshTodayHabits} />
      </TitleRow>
      
      {categories.map(category => {
            let hh;
            if (category.name === "Day Specific" && habitsByCategory[category.name]) {
              hh = habitsByCategory[category.name].filter(h => h.day === dayCodes[dayCode])
            } else {
              hh = habitsByCategory[category.name]
            }

            return (
              <TodayCategoryBlock 
                key={category.name} 
                category={category} 
                habits={hh}
                changeStatus={changeStatus} 
                />
            )
      })}
    </PageContainer>
  )
}

export default Today