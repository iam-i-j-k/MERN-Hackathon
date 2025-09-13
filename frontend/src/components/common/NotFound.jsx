import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate();
  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-10'>
        <div className='flex flex-col items-center justify-center'>
            <img alt="image" src="https://b.zmtcdn.com/404_web787058f236e16cef33bf733ade2e08ba1574663725.png" loading="lazy" className="sc-s1isp7-5 h-[40vh] jQwYOW"/>
        </div>
        <div>
            <p className='font-poppins'>Oops. We didn't find the page you are looking.</p>
        </div>
        <div>
            <button 
            className="w-full cursor-pointer font-normal font-poppins p-3 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-all duration-300"
            onClick={()=>navigate('/home')}>Back To Home</button>
        </div>
    </div>
  )
}

export default NotFound