import { useEffect, useState } from "react";
import { ValidationStorage } from "../Functions/ValidationStorage";
import Header from "./Components/header/Header";
import { useRouter } from "next/router"
import Button from "./Components/buttons/button";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { changePassword } from "../firebase/Firebase";

export default function Cuenta(){
    const {register, formState:{errors},handleSubmit} = useForm()

    const router = useRouter()

    const [cambio,setCambio]=useState(false)

    const [pass1,setPass1]=useState("")
    const [pass2,setPass2]=useState("")

    useEffect(()=>{
        if(!ValidationStorage()){
            router.replace("/")
        }else{

        }
    },[])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        setPass1("")
        setPass2("")
        if(cambio===true){
            document.getElementById("password1").value=""
            document.getElementById("password2").value=""
        }
    },[cambio])

    const cerrarSesion = ()=>{
        swal({
            title: "¿Cerrar sesion?",
            text: "",
            icon: "info",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                localStorage.removeItem("tokenMovies")
                localStorage.removeItem("tokenMoviesDate")
                router.replace("/")
            }
          });
    }

    const changeValues = ()=>{
        setPass1(document.getElementById("password1").value)
        setPass2(document.getElementById("password2").value)
    }

    const handleFormSubmit = ()=>{
        if(pass1==="" || pass2===""){
            alert("NDS")
            return
        }
        if(pass1!==pass2){
            swal("Contraseñas diferentes","","error")
            return
        }else if(pass1===pass2){
            const token = localStorage.getItem("tokenMovies")
            if(changePassword(token,pass1)){
                swal("Cambio realizado","","info")
                setCambio(false)
            }
        }
    }

    return(
        <>
            <Header active={"Cuenta"}/>
            <p className="site-title">CUENTA</p>
            <div className="cuenta-container">
                <p onClick={()=>cerrarSesion()}>Cerrar sesion</p>
                <p onClick={()=>setCambio(true)}>Cambiar contraseña</p>
            </div>
            {cambio && 
                <div className="cambio-container">
                    <form onSubmit={handleSubmit(handleFormSubmit)} style={{textAlign:"center"}}>
                        <div onClick={()=>{setPass1(""),setPass2(""),setCambio(false)}} style={{width:"fit-content",margin:"auto"}}>
                            <Button info={"ATRAS"}/>
                        </div>

                        <div className="input-pass input-pass-especial">
                            <input className="form-input" id="password1" autoComplete="off" placeholder="Nueva contraseña" onChangeCapture={changeValues}
                            {...register("password1",{required:true,minLength:5,maxLength:20,pattern:/^[a-zA-Z0-9]*$/})}/>
                        </div>
                        <span className="text-danger text-small d-block mb-2">
                            {errors.password1?.type==="required"&&"Campo obligatorio. "}
                            {errors.password1?.type==="minLength"&&"Mínimo 5 caracteres. "}
                            {errors.password1?.type==="maxLength"&&"Máximo 20 caracteres. "}
                            {errors.password1?.type==="pattern"&&"Sin espacios ni caracteres especiales."}
                        </span>

                        <div className="input-pass input-pass-especial">
                            <input className="form-input" id="password2" autoComplete="off" placeholder="Repetir contraseña" onChangeCapture={changeValues}
                            {...register("password2",{required:true,minLength:5,maxLength:20,pattern:/^[a-zA-Z0-9]*$/})}/>
                        </div>
                        <span className="text-danger text-small d-block mb-2">
                            {errors.password2?.type==="required"&&"Campo obligatorio. "}
                            {errors.password2?.type==="minLength"&&"Mínimo 5 caracteres. "}
                            {errors.password2?.type==="maxLength"&&"Máximo 20 caracteres. "}
                            {errors.password2?.type==="pattern"&&"Sin espacios ni caracteres especiales."}
                        </span>

                        <div style={{width:"fit-content",margin:"auto"}}>
                            <Button info={"CONFIRMAR"}/>
                        </div>
                    </form>
                </div>
            }
        </>
    )
}