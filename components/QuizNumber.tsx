interface QuizNumberProps {
  num: number,
  isOn?: boolean
}

function QuizNumber({num, isOn}: QuizNumberProps) {
  return (
    <button className={`bg-[#393F6E] w-6 md:w-10 h-6 md:h-10 rounded-full ${isOn && 'bg-gradient-to-b'} from-[#E65895] to-[#BC6BE8]`}>
      {num}
    </button>
  )
}

export default QuizNumber;