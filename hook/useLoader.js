import { useState } from "react"

 export function useLoader(){
    const [loader,setLoader] = useState("hidden")
//    const obj = {loader , setLoader}
    return(
        {loader , setLoader}
    )
 }
 module.exports={
    useLoader
 }