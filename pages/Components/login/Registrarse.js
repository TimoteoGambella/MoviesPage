import { useState } from "react";
import Button from "../buttons/button";
import Image from "next/image";
import { useForm } from "react-hook-form";
import ojo from "./ojo.png"
import swal from "sweetalert";
import { addUser, usersData } from "../../../firebase/Firebase";
import Loader from "../loader";

export default function Registrarse({form,setForm,saveData}){

    const {register, formState:{errors},handleSubmit} = useForm()

    const [typeInput,setTypeInput]=useState(true)
    const [cargando,setCargando]=useState(false)

    const [newUser,setNewUser]=useState()


    const changeValues = ()=>{
        setNewUser({
            mail:document.getElementById("mail").value.trim(),
            user:document.getElementById("user").value,
            password:document.getElementById("password").value,
            name:document.getElementById("name").value
        })
    }

    const handleFormSubmit=()=>{
    
        setCargando(!cargando)
        usersData().then(res=>{
            if(document.getElementById("password").value !== document.getElementById("password2").value){
                setCargando(false)
                swal("ERROR","LAS CONTRASEÑAS NO COINCIDEN","error")
                return
            }
    
            const isUserIn = res.filter(user=>user.mail===document.getElementById("mail").value.trim())
            if(isUserIn.length!==0){
                setCargando(false)
                swal("INCORRECTO","EL MAIL YA SE ENCUENTRA EN USO","info")
                return
            }
            const isUserIn2 = res.filter(user=>user.user===document.getElementById("user").value)
            if(isUserIn2.length!==0){
                setCargando(false)
                swal("INCORRECTO","EL USUARIO YA SE ENCUENTRA EN USO","info")
                return
            }
            addUser(newUser).then(res=>{
                usersData().then(res=>{
                    const isUserIn = res.filter(user=>user.password===document.getElementById("password").value && user.user===document.getElementById("user").value)
                    saveData(isUserIn)
                })
            })
        })
    }

    return(
        <div className="registrarse-container">
            <p>Registro</p>

            <form onSubmit={handleSubmit(handleFormSubmit)}>

                <div className="input">
                    <input className="form-input" id="name" autoComplete="off" placeholder="Nombre y Apellido" type={"text"} onChangeCapture={changeValues}
                    {...register("name",{required:true,pattern:/^[a-zA-Z ]*$/})}/>
                    <span className="text-danger text-small d-block mb-2">
                        {errors.name?.type==="required"&&"Campo obligatorio."}
                        {errors.name?.type==="pattern"&&"Solo letras"}
                    </span>
                </div>

                <div className="input">
                    <input className="form-input" id="mail" autoComplete="off" placeholder="E-Mail" type={"email"} onChangeCapture={changeValues}
                    {...register("mail",{required:true})}/>
                    <span className="text-danger text-small d-block mb-2">
                        {errors.mail?.type==="required"&&"Campo obligatorio."}
                    </span>
                </div>

                <div className="input">
                    <input className="form-input" id="user" autoComplete="off" placeholder="Usuario" type={"text"} onChangeCapture={changeValues}
                    {...register("user",{required:true,minLength:5,maxLength:20,pattern:/^[a-zA-Z0-9]*$/})}/>
                    <span className="text-danger text-small d-block mb-2">
                        {errors.user?.type==="required"&&"Campo obligatorio. "}
                        {errors.user?.type==="minLength"&&"Mínimo 5 caracteres. "}
                        {errors.user?.type==="maxLength"&&"Máximo 20 caracteres. "}
                        {errors.user?.type==="pattern"&&"Sin espacios ni caracteres especiales."}
                    </span>
                </div>

                <div className="input">
                    <div className="input-pass input-pass-especial">
                        <input className="form-input" id="password" autoComplete="off" placeholder="Contraseña" type={typeInput?"password":"text"} onChangeCapture={changeValues}
                        {...register("password",{required:true,minLength:5,maxLength:20,pattern:/^[a-zA-Z0-9]*$/})}/>
                        <Image src={ojo} width={30} height={30} alt="Ojo" className="img" onClick={()=>setTypeInput(!typeInput)}/>
                    </div>
                    <span className="text-danger text-small d-block mb-2">
                        {errors.password?.type==="required"&&"Campo obligatorio. "}
                        {errors.password?.type==="minLength"&&"Mínimo 5 caracteres. "}
                        {errors.password?.type==="maxLength"&&"Máximo 20 caracteres. "}
                        {errors.password?.type==="pattern"&&"Sin espacios ni caracteres especiales."}
                    </span>
                </div>
                <div className="input">
                    <div className="input-pass">
                        <input className="form-input" id="password2" autoComplete="off" placeholder="Repetir contraseña" type={typeInput?"password":"text"} onChangeCapture={changeValues}
                        {...register("password2",{required:true,pattern:/^[a-zA-Z0-9]*$/})}/>
                    </div>
                    <span className="text-danger text-small d-block mb-2">
                        {errors.password2?.type==="required"&&"Campo obligatorio."}
                        {errors.password2?.type==="pattern"&&"Sin espacios ni caracteres especiales."}
                    </span>
                </div>

                {!cargando && <Button info={"Registrar"} click={""}/>}
                {cargando && <Loader info={"Registrar"} click={""}/>}
            </form>

            <p className="logearse" onClick={()=>setForm(!form)}>¿Ya tienes cuenta? Ingresar</p>
        </div>
    )
}