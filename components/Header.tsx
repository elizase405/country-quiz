import { usePointsContext } from '../context/PointsContext';

function Header() {
  const { points } = usePointsContext()

  return (
    <div className='flex flex-col md:flex-row items-center justify-between'>
        <h1 className='text-2xl md:text-3xl'>Country Quiz</h1>
        <div className='mt-3 md:mt-0 px-2 md:px-6 py-1 rounded-full self-center bg-gradient-to-b from-[#E65895] to-[#BC6BE8]'>
            🏆 {points}/10 Points
        </div>
    </div>
  )
}

export default Header
