import { useEffect, useState } from "react"
import Image from "next/image";
import midStar from "./mid-star.png"
import star from "./star.png"

export default function Estrellas({rate}){

    const [rateStar,setRateStar]=useState("")

    useEffect(()=>{
        if(rate <= 1){
            setRateStar("0.5")
        }else if(rate > 1 && rate <= 2){
            setRateStar("1")
        }else if(rate > 2 && rate <= 3){
            setRateStar("1.5")
        }else if(rate > 3 && rate <= 4){
            setRateStar("2")
        }else if(rate > 4 && rate <= 5){
            setRateStar("2.5")
        }else if(rate > 5 && rate <= 6){
            setRateStar("3")
        }else if(rate > 6 && rate <= 7){
            setRateStar("3.5")
        }else if(rate > 7 && rate <= 8){
            setRateStar("4")
        }else if(rate > 8 && rate <= 9){
            setRateStar("4.5")
        }else if(rate > 9 && rate <= 10){
            setRateStar("5")
        }
    },[])// eslint-disable-line react-hooks/exhaustive-deps

    return(
        <div className="estrellas-container">
            {rateStar==="" && <></>}
            {rateStar==="0.5" && <Image src={midStar} width={48} height={48} alt={"Star"}/>}
            {rateStar==="1" && <Image src={star} width={48} height={48} alt={"Star"}/>}
            {rateStar==="1.5" && <><Image src={star} width={48} height={48} alt={"Star"}/><Image src={midStar} width={48} height={48} alt={"Star"}/></>}
            {rateStar==="2" && <><Image src={star} width={48} height={48} alt={"Star"}/><Image src={star} width={48} height={48} alt={"Star"}/></>}
            {rateStar==="2.5" && <><Image src={star} width={48} height={48} alt={"Star"}/><Image src={star} width={48} height={48} alt={"Star"}/><Image src={midStar} width={48} height={48} alt={"Star"}/></>}
            {rateStar==="3" && <><Image src={star} width={48} height={48} alt={"Star"}/><Image src={star} width={48} height={48} alt={"Star"}/><Image src={star} width={48} height={48} alt={"Star"}/></>}
            {rateStar==="3.5" && <><Image src={star} width={48} height={48} alt={"Star"}/><Image src={star} width={48} height={48} alt={"Star"}/><Image src={star} width={48} height={48} alt={"Star"}/><Image src={midStar} width={48} height={48} alt={"Star"}/></>}
            {rateStar==="4" && <><Image src={star} width={48} height={48} alt={"Star"}/><Image src={star} width={48} height={48} alt={"Star"}/><Image src={star} width={48} height={48} alt={"Star"}/><Image src={star} width={48} height={48} alt={"Star"}/></>}
            {rateStar==="4.5" && <><Image src={star} width={48} height={48} alt={"Star"}/><Image src={star} width={48} height={48} alt={"Star"}/><Image src={star} width={48} height={48} alt={"Star"}/><Image src={star} width={48} height={48} alt={"Star"}/><Image src={midStar} width={48} height={48} alt={"Star"}/></>}
            {rateStar==="5" && <><Image src={star} width={48} height={48} alt={"Star"}/><Image src={star} width={48} height={48} alt={"Star"}/><Image src={star} width={48} height={48} alt={"Star"}/><Image src={star} width={48} height={48} alt={"Star"}/><Image src={star} width={238} height={48} alt={"Star"}/></>}
        </div>
    )
}