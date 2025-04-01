import { usePointsContext } from '../context/PointsContext';

interface OptionProps {
  options: any[]
  answer: string
  selectedOption: string | null
  handleClick: (string) => void
}

function Option({options, answer, selectedOption, handleClick}: OptionProps) {
  const { IncrementPoints } = usePointsContext();

  return (
    <div className='grid grid-cols-2 gap-6'>
      {options.map((option, index) => {
        const isCorrect = option === answer;
        const isSelected = option === selectedOption;
          return (
            <button
              key={index}
              className={`bg-[#393F6E] mx-2 p-2 md:p-4 rounded-md cursor-pointer hover:bg-gradient-to-b from-[#E65895] to-[#BC6BE8] text-sm md:text-md ${isSelected && 'bg-gradient-to-b'}`}
              onClick={() => {
                isCorrect && IncrementPoints()
                handleClick(option)
            }}>
                {option}
                {isSelected && (
                  <img src={isCorrect ? '/check_round_fill.svg' : '/close_round_fill.svg'} className='inline pl-2' />
                )}
                {selectedOption && isCorrect && !isSelected && (
              <img src="/check_round_fill.svg" className="inline pl-2" />
            )}
            </button>
          )}
      )}
    </div>
  )
}

export default Option
