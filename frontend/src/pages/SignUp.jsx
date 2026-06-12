import React, { useContext, useState } from 'react'
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom"
import bg from "../assets/authBg.png"
import { userDataContext } from '../context/UserContext';
import axios from "axios"
const Signup = () => { 
  const [showPassword,setShowPassword]=useState(false)
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [loading,setLoading]=useState(false)
  const [password,setPassword]=useState("")
  const navigate = useNavigate()
  const { serverUrl ,userData ,setUserData} =useContext(userDataContext)
  const [err,setErr] =useState("")
    const handleSignUp =async (e)=>{
      e.preventDefault()
       setErr("")
        try{
          
          let result = await axios.post(`${serverUrl}/api/auth/signup`,{name,email,password},{withCredentials:true})
          setUserData(result.data);
          setLoading(false)
          navigate("/customize")
          
        }catch(error){
          setUserData(null)
          setErr(error.response.data.message)
          
   }
    }
 

  return (
    <div className='w-full h-screen bg-cover flex justify-center items-center' 
   style = {{backgroundImage :`url(${bg})`}}>
      
      <form className='w-[90%] h-[600px] max-w-[500px] 
      bg-[#00000062] backdrop-blur shadow-black-950 flex flex-col 
      items-center justify-center gap-[20px] px-[20px] 'onSubmit={handleSignUp}>
      <h1 className='text-white text-[30px] font-semibold mb-[30px]'>
      Register to <span className='text-blue-400 '>Virtual Assistant
        </span></h1>
        <input type="text" placeholder='Enter your Name'
         required onChange={(e)=>setName(e.target.value)} value={name}
         className='w-full h-[60px] outline-none border-2
          border-white bg-transparent text-white
           placeholder-gray-300 px-[20px] py-[10px] 
           rounded-full text-[18px]'/>
        <input type="text" placeholder='Enter your Email' 
        required onChange={(e)=>setEmail(e.target.value)} value={email}
        className='w-full h-[60px] outline-none border-2
         border-white bg-transparent text-white
          placeholder-gray-300 px-[20px] py-[10px] 
          rounded-full text-[18px]'/>

        <div className=' relative w-full h-[60px] border-2
         border-white bg-transparent text-white
           rounded-full text-[18px]'>
            <input type={showPassword?"text":"password"} placeholder="password" 
            required onChange={(e)=>setPassword(e.target.value)} value={password}
            className='w-full h-full rounded-full outline-none bg-transparent
             placeholder-gray-300 px-[20px] py-[10px]'/>

              {!showPassword && <IoEye className='absolute top-[20px] right-[20px] 
              w-[25px] h-[25px] text-[white] cursor-pointer
             'onClick={()=>setShowPassword(true)}/> }

              {showPassword && <IoEyeOff className='absolute top-[20px] right-[20px] 
              w-[25px] h-[25px] text-[white] cursor-pointer
             'onClick={()=>setShowPassword(false)}/> }
          

           </div>
                {err.length>0 && 
                <p className='text-red-600'> *{err}</p>}
                <button className='cursor-pointer min-w-[150px] h-[60px] mt-[30px] text-black font-semibold
                 bg-white rounded-full text-[19px] '>Sign up</button>
                 <p className='text-[18px] text-[white] cursor-pointer' onClick={()=>navigate('/signin')}>Already have an account ?
                 <span className='text-blue-400' > Sign in</span></p>
       </form>
    </div>
  )
}

export default Signup
