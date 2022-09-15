import {
    collection, 
    query, 
    onSnapshot, 
    where, 
    addDoc, 
    setDoc, 
    updateDoc, 
    doc, 
    deleteDoc, 
    getDocs} from "firebase/firestore"
import {db} from '../firebase'

export const HandleStatusSwap = async (habitA, habitB) => {
    //console.log("swapping " + habitA.order + " and " + habitB.order)

    await setDoc(doc(db, "habits", habitA.id), {order: habitB.order}, {merge:true});
    await setDoc(doc(db, "habits", habitB.id), {order: habitA.order}, {merge:true});
};

const getCategories = () => {};

const getTodayHabits = () => {};

const createTodayHabits = () => {};