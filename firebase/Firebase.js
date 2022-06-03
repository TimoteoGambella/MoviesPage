import { initializeApp } from "firebase/app";
import {addDoc, collection, doc, getDocs, getFirestore, setDoc} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAO3sUzOdfGxVITGw9F7SeqUwMM26WA-Tk",
    authDomain: "moviespage-1ac6c.firebaseapp.com",
    projectId: "moviespage-1ac6c",
    storageBucket: "moviespage-1ac6c.appspot.com",
    messagingSenderId: "302258040692",
    appId: "1:302258040692:web:653b132d47b2f903d38621",
    measurementId: "G-07LL5CXK2E"
  };
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  export const usersData = async() => {

    const usersArray = await getDocs(collection(db, "Users"));
    const users = usersArray.docs.map(doc=>{return{id:doc.id,...doc.data()}});
    return(users)
  }

  export const addUser = async(newUser) => {
    const user = await addDoc(collection(db, "Users"), newUser);
    return(user)
  }

  export const changePassword = async(idUser,pass)=>{
    const user =  doc(db, 'Users', idUser);
    await setDoc(user, { password: pass }, { merge: true });
    return(true)
  }



  export const getFavMovies = async(idUser)=>{
    const users = await usersData()
    return(users.filter(user=>user.id===idUser))
  }

  export const addFavMovies = async(idUser,movie)=>{
    const user =  doc(db, 'Users', idUser);
    await setDoc(user, { favsMovies: movie }, { merge: true });
  }

  export const removeFavMovies = async(idUser,movie)=>{
    const user =  doc(db, 'Users', idUser);
    await setDoc(user, { favsMovies: movie }, { merge: true });
  }



  
  export const getVistoMovies = async(idUser)=>{
    const users = await usersData()
    return(users.filter(user=>user.id===idUser))
  }

  export const addVistoMovies = async(idUser,movie)=>{
    const user =  doc(db, 'Users', idUser);
    await setDoc(user, { vistoMovies: movie }, { merge: true });
  }

  export const removeVistoMovies = async(idUser,movie)=>{
    const user =  doc(db, 'Users', idUser);
    await setDoc(user, { vistoMovies: movie }, { merge: true });
  }