import { getFavMovies, usersData } from "../firebase/Firebase";

export const ValidationStorage=()=>{

    let dateLocal = ""

    if(localStorage.getItem("tokenMoviesDate")){
        dateLocal = JSON.parse(localStorage.getItem("tokenMoviesDate"))
    }

    const token = localStorage.getItem("tokenMovies")

    const date = {"hora": ((new Date().getHours())),'dia': (new Date()).getDate(),'mes':((new Date()).getMonth()+1),"ano":(new Date()).getFullYear()};

    if(token===null){
        return(false)
    }
    if(token!==null){
        if(dateLocal===null){
            return(false)
        }
        if(dateLocal.ano!==date.ano || dateLocal.mes!==date.mes || dateLocal.dia!==date.dia){
            localStorage.setItem("tokenMoviesDate","")
            localStorage.setItem("tokenMovies","")
            return(false)
        }
        usersData().then(res=>{
            const isUserIn = res.filter(user=>user.id===token)
            if(isUserIn.length===0){
                return(false)
            }else{
                return(true)
            }
        })
    }
    return(true)
}