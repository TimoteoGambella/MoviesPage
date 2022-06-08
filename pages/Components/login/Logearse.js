import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { changePassword, usersData } from "../../../firebase/Firebase";
import Image from "next/image";
import ojo from "./ojo.png"
import swal from "sweetalert";
import Button from "../buttons/button";
import Loader from "../Loader";
import { sendEmail } from "../../../Functions/EmailJs";

export default function Logearse({form,setForm,saveData}){

    const {register, formState:{errors},handleSubmit} = useForm()

    const [typeInput,setTypeInput]=useState(true)
    const [cargando,setCargando]=useState(false)
    const [cargando2,setCargando2]=useState(false)
    const [forgotPass,setForgotPass]=useState(false)
    
    const [pass,setPass]=useState("")

    const regexEmail= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const handleFormSubmit=()=>{
        setCargando(!cargando)
        usersData().then(res=>{
            
            const isUserIn = res.filter(user=>user.password===document.getElementById("password").value && user.user===document.getElementById("user").value)
            const isUserIn2 = res.filter(user=>user.password===document.getElementById("password").value && user.mail===document.getElementById("user").value)
            if(isUserIn.length===0 || isUserIn2.length===0){
                setCargando(false)
                swal("INCORRECTO","USUARIO O CONTRASEÑA INCORRECTOS","info")
                return
            }

            saveData(isUserIn)
            setCargando(false)
        })
    }
    
    const changePassword=()=>{
        if(regexEmail.test(document.getElementById("forgotPass").value)){
            setPass(document.getElementById("forgotPass").value)
        }else{
            setPass("")
        }
    }

    const handleForgot= ()=>{
        if(pass!==""){
            setCargando2(true)
            usersData().then(res=>{
                const emailUser= res.filter(user=>user.mail===pass)
                if(emailUser.length===0){
                    swal("INCORRECTO","NO SE ENCONTRO EL MAIL","info")
                    setCargando2(false)
                }else{
                    const array= {
                        nombre:emailUser[0].name,
                        contrasena:emailUser[0].password,
                        toMail:emailUser[0].mail
                    }
                    const respuesta = sendEmail("template_osa03k3",array)
                    setCargando2(false)
                    document.getElementById("forgotPass").value=""
                }
            })
        }else{
            swal("MAIL","COMPLETE CON SU MAIL","info")
        }
    }


    return(
        <div className="logearse-container">
            <p>LOGIN</p>
            <form onSubmit={handleSubmit(handleFormSubmit)}>

                <div className="input">
                    <input className="form-input" id="user" autoComplete="off" placeholder="Usuario o mail" type={"text"}
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

            <p className="registarse" onClick={()=>setForgotPass(true)}>Olvide mi contraseña</p>
            <p className="registarse" style={{marginBottom:"1vw"}} onClick={()=>setForm(!form)}>¿No tienes cuenta? Registrar</p>

            {forgotPass && 
                <div className="forgot-pass">
                    <div className="forgot-container">
                    <div style={{backgroundColor:"transparent", paddingTop:"2vw",width:"fit-content",margin:"auto"}} onClick={()=>setForgotPass(false)}>
                        <Button info={"ATRAS"}/>
                    </div>
                        <p>Recuperar contraseña</p>
                        <input placeholder="Ingrese su mail" type={"email"} id="forgotPass" onChangeCapture={()=>changePassword()}/>
                        <div style={{backgroundColor:"transparent", paddingBottom:"2vw",width:"fit-content",margin:"auto"}} onClick={()=>handleForgot()}>
                            {!cargando2 && <Button info={"ENVIAR"}/>}
                            {cargando2 && <Loader classParam={"loader"} />}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}