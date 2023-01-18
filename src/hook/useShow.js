import { useState} from "react";

export const useShow = (initialState) =>{
    const [show, setShow] = useState(initialState)    
    const handleShowMessge = ()=>{setShow(!show)}

    return {show, handleShowMessge}
}