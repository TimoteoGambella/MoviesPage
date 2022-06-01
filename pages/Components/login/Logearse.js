import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { usersData } from "../../../firebase/Firebase";
import Image from "next/image";
import ojo from "./ojo.png"
import swal from "sweetalert";
import Button from "../buttons/button";
import Loader from "../Loader";

export default function Logearse({form,setForm,saveData}){

    const {register, formState:{errors},handleSubmit} = useForm()

    const [typeInput,setTypeInput]=useState(true)
    const [cargando,setCargando]=useState(false)
    
    
    const handleFormSubmit=()=>{
        setCargando(!cargando)
        usersData().then(res=>{
            
            const isUserIn = res.filter(user=>user.password===document.getElementById("password").value && user.user===document.getElementById("user").value)
            if(isUserIn.length===0){
                setCargando(false)
                swal("INCORRECTO","USUARIO O CONTRASEÑA INCORRECTOS","info")
                return
            }

            saveData(isUserIn)
            setCargando(false)
        })
    }

    return(
        <div className="logearse-container">
            <p>LOGIN</p>
            <form onSubmit={handleSubmit(handleFormSubmit)}>

                <div className="input">
                    <input className="form-input" id="user" autoComplete="off" placeholder="Usuario" type={"text"}
                    {...register("user",{required:true})}/>
                    <span className="text-danger text-small d-block mb-2">
                        {errors.user?.type==="required"&&"Campo obligatorio"}
                    </span>
                </div>

                <div className="input">
                    <div className="input-pass">
                        <input className="form-input" id="password" autoComplete="off" placeholder="Contraseña" type={typeInput?"password":"text"}
                        {...register("password",{required:true})}/>
                        <Image src={ojo} width={30} height={30} alt="Ojo" className="img" onClick={()=>setTypeInput(!typeInput)}/>
                    </div>
                    <span className="text-danger text-small d-block mb-2">
                        {errors.password?.type==="required"&&"Campo obligatorio"}
                    </span>
                </div>

                {!cargando && <Button info={"Ingresar"} />}
                {cargando && <Loader classParam={"loader"} />}
            </form>

            <p className="registarse" onClick={()=>setForm(!form)}>¿No tienes cuenta? Registrar</p>
        </div>
    )
}