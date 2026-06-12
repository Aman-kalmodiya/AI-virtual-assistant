import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
export const userDataContext=createContext()
function UserContext({children}) {
    const serverUrl="http://localhost:7879"
    const [userData,setUserData]=useState(null)
    const [frontendImage,setFrontendImage]=useState(null)
     const [backendImage,setBackendImage]=useState(null)
     const [selectedImage,setSelectedImage]=useState(null)
    const handleCurrentUser=async ()=>{
        try {
            const result=await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
            setUserData(result.data)
            console.log(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getGeminiResponse=async (command)=>{
try {
  const result=await axios.post(`${serverUrl}/api/user/asktoassistant`,{command},{withCredentials:true})
  return result.data
} 
// catch (error) {
//   console.log(error)
// }
catch (error) {
    console.log(error)
    return null; 
  }
    }

    useEffect(()=>{
handleCurrentUser()
    },[])
    const value={
serverUrl,userData,setUserData,backendImage,setBackendImage,frontendImage,setFrontendImage,selectedImage,setSelectedImage,getGeminiResponse
    }
  return (
    <div>
    <userDataContext.Provider value={value}>
      {children}
      </userDataContext.Provider>
    </div>
  )
}

export default UserContext


// import React, { createContext } from 'react'
// import { useEffect } from 'react'
// import { useState } from 'react'
// import axios from "axios"
// export  const userDataContext = createContext()
// const UserContext = ({children}) => {
//     const serverUrl = "http://localhost:7879"
//     const[loading,setLoading]=useState(true);
//     const [userData ,setUserData] = useState()
//      const [frontendImage,setFrontendImage] =useState(null);
//      const [backendImage,setBackendImage] = useState(null);
//      const [selectedImage,setSelectedImage] = useState(null);
//     const handleCurrentUser = async ()=>{
//       try {
//         const result = await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
//         setUserData(result.data)
        
//         console.log(result.data)
//       } catch (error) {
//         console.log("userContext fullerror",error);
//         console.log("data",error.response?.data);
//         console.log("status",error.response?.status);
//       }finally{
//         setLoading(false);
//       }
//     }

//     const getGeminiResponse =async(command)=>{
//       try {
//         const result=await axios.post(`${serverUrl}/api/user/asktoassistant`,{command},{withCredentials:true})
//         return result.data
//       } catch (error) {
//         console.log("Error from UserContext=>getGeminiResponse",error);
        
//       }
//     }
//     useEffect(()=>{
//       handleCurrentUser()
//     },[])
//     const value = {
//          serverUrl,userData ,setUserData,backendImage,setBackendImage,
//          frontendImage,setFrontendImage,selectedImage,setSelectedImage,
//          loading,setLoading,getGeminiResponse
//     }
//   return (
//     <div>
//         <userDataContext.Provider value ={value}>
//              {children}
//         </userDataContext.Provider>
//     </div>
//   )
// }
// export default UserContext
 