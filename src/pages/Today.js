import React, {useEffect, useState} from 'react'
import {collection, query, onSnapshot, where, addDoc, updateDoc, doc} from "firebase/firestore"
import {db} from '../firebase'
import { PageContainer } from '../component/StyleComponents';
import DayCategoryBlock from '../component/DayCategoryBlock';

const createDayHabits = async (datestring) => {
  const q = query(collection(db, 'habits'))
  onSnapshot(q, (querySnapshot) => {
    
    const dayHabits = querySnapshot.docs.map(doc => {
      return (
        [doc.id, {
        id: doc.id,
        name: doc.data().name,
        status: 'incomplete',
        order: doc.data().order,
        category: doc.data().category,
      }]
      );
    }
    )



    const dayObj = {
      datestring,
      habits: Object.fromEntries(dayHabits)
    }

    addDoc(collection(db, 'days'), dayObj)

  })
}

function Today() {
  const [todayHabits, setTodayHabits] = useState([]);
  const [dayId, setDayId] = useState('');
  const [categories, setCategories] = useState([]);
  const [habitsByCategory, setHabitsByCategory] = useState({})

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

    var d = new Date();
    const ds = d.toDateString();
    //console.log(ds)
    const q = query(collection(db, 'days'), where("datestring", "==", ds))

    onSnapshot(q, async (querySnapshot) => {

      //console.log(querySnapshot.docs[0].data())

      // if there's a match for today
      // set today's habits equal
      if (querySnapshot.docs && querySnapshot.docs.length) {

        let h = querySnapshot.docs[0].data().habits;
        h = Object.keys(h).map(k => h[k])
        h.sort((a, b) => parseInt(a.order) - parseInt(b.order))
        setTodayHabits(h);
        setDayId(querySnapshot.docs[0].id);
      }
      else
      {
        // if there's no match for today
        // create a day object and write it to FB
        console.log("no day found for today, creating one")
        await createDayHabits(ds)
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

  var d = new Date();
  const ds = d.toDateString();

  //onComplete={handleComplete} 
  //onFail={handleFail} 

  // {todayHabits.map(
  //   habit => {
  //     return (
  //       <HabitInstanceCard 
  //         key={habit.id} 
  //         habit={habit} 
  //         habitId={habit.id} 
  //         handleStatusChange={changeStatus}
  //       />
  //     );
  // })}
  
  return (
    <PageContainer>
      <h2>{ds}</h2>
      
      {categories.map(category => {
            return (
              <DayCategoryBlock 
                key={category.name} 
                category={category} 
                habits={habitsByCategory[category.name]}
                changeStatus={changeStatus} 
                />
            )
      })}
    </PageContainer>
  )
}

export default Today