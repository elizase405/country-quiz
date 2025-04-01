import { useState } from 'react'
import { usePointsContext } from '../context/PointsContext';

function Congrats({ handleRestart }: { handleRestart: () => void }) {
  const { points, ResetPoints } = usePointsContext()
  const handleClick = () => {
    handleRestart()
    ResetPoints()
  }
  return (
    <div className='bg-[#343964] flex flex-col justify-center p-6 rounded-xl md:w-1/2 text-center'>
       <img src='/congrats.png' />
       <p className='font-medium text-lg md:text-2xl lg:text-3xl mt-4 mb-3 md:my-4'>Congrats! You've completed the quiz.</p>
       <p className='font-medium text-sm md:text-lg'>You answered {points}/10 correctly</p>
       <button className='bg-gradient-to-b from-[#E65895] to-[#BC6BE8] cursor-pointer p-3 lg:p-4 rounded-md md:w-1/2 self-center my-6 md:my-10' onClick={handleClick}>Play again</button>
    </div>
  )
}

export default Congrats;
