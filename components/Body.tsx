import { useState, useEffect, useRef } from 'react'
import QuizNumber from './QuizNumber'
import Option from './Option'

const getAnswers = [
  ['name', 'common'],
  'population',
  ['capital', 0],
  'area',
  ['continents', 0],
  ['timezones', 0],
  ['car', 'side'],
  'region',
  'subregion',
  ['name', 'common'],
]

interface BodyProps {
  setAnimate: () => void
  done: number,
  setDone: () => void,
  next: number,
  setNext: () => void,
  num: number | null,
  setNum: () => void,
  countries: Array,
  setCountries: () => void
  possibleValues: Array,
  setPossibleValues: () => void
  selectedOption: string | null,
  setSelectedOption: () => void
}

const correctSound = '/correct-answer.mp3'
const wrongSound = '/wrong-answer.mp3'
const congrats = '/congrats.mp3'

function Body({ setAnimate, done, setDone, next, setNext, num, setNum, countries, setCountries, possibleValues, setPossibleValues, selectedOption, setSelectedOption }: BodyProps) {
  const correctAudioRef = useRef(new Audio(correctSound))
  const wrongAudioRef = useRef(new Audio(wrongSound))
  const congratsAudioRef = useRef(new Audio(congrats))

  const countryLen = countries.length

  const shuffleArray = (data) => {
    for (let i = data.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [data[i], data[j]] = [data[j], data[i]];
    }
    return data.slice(0, 4)
  }

  const handleClick = (option: string) => {
    setSelectedOption(option);

    const isCorrect = option === answers[next];
    const audio = isCorrect ? correctAudioRef.current : wrongAudioRef.current
    audio.currentTime = 0
    audio.play()

    setTimeout(() => {
      if (done === 9) {
        // If last question, trigger animation before showing Congrats
        setAnimate(true);
        const audio = congratsAudioRef.current;
        audio.currentTIme = 0;
        audio.play()
        setTimeout(() => {
          setDone(prev => prev + 1);
          setAnimate(false);
        }, 1200); // Matches transition duration
      } else {
        // Otherwise, move to next question
        setNum(Math.floor(Math.random() * countryLen));
        setNext(prev => prev + 1);
        setDone(prev => prev + 1);
        setSelectedOption(null);
      }
    }, 2000);
  };


  useEffect(() => {
    const res = fetch('https://restcountries.com/v3.1/all')
    .then(data => data.json())
    .then(data => setCountries(shuffleArray(data)))
    .catch(err => console.error(err))
    setNum(Math.floor(Math.random() * countryLen))
  }, [])

  useEffect(() => {
    if (countries.length > 0 && countries[num][getAnswers[2][0]][getAnswers[2][1]]) {
      const value = getAnswers[next]
      let newValues: any[] = []
      if (typeof value === 'object') {
        newValues = countries.map(country => country[value[0]][value[1]])
        //console.log(newValues)
      } else {
        newValues = countries.map(country => country[value])
        //console.log(newValues)
      }
      setPossibleValues(Array.from(new Set(newValues)))
    }
    
  }, [countries, next])

  if (countryLen == 0) {
    return <div>Loading...</div>
  }

  const questions = [
    `Which country does this flag ${countries[num].flag} belong to?`,
    `What is the population of ${countries[num].name.common}?`,
    `What is the capital of ${countries[num].name.common}?`,
    `What is the area of ${countries[num].name.common}?`,
    `What continent is ${countries[num].name.common} located?`,
    `What is the timezone of ${countries[num].name.common}?`,
    `The car is driven on what side in ${countries[num].name.common}?`,
    `What region is ${countries[num].name.common} located?`,
    `What subregion is ${countries[num].name.common} located?`,
    `${countries[num]?.capital[0]} is the captial of which country??`,
  ]

  const answers = [
    countries[num]?.name.common,
    countries[num]?.population,
    countries[num]?.capital[0],
    countries[num]?.area,
    countries[num]?.continents[0],
    countries[num]?.timezones[0],
    countries[num]?.car.side,
    countries[num]?.region,
    countries[num]?.subregion,
    countries[num]?.name.common,
  ]

  return (
    <div className="bg-[#343964] flex flex-col items-center justify-center py-8 md:py-14 rounded-xl transition-transform duration-500">
        <div className='w-3/4 lg:w-full flex flex-wrap items-center justify-center space-x-2 md:space-x-4'>
            {Array.from({ length: 10 }, (_, i) => {
                return <QuizNumber key={i} num={i + 1} isOn={i <= next} />
            })}
        </div>
        <p className='mt-6 mb-10 w-3/4 lg:w-[33%] text-center'>{questions[next]}</p>
        <Option options={possibleValues}
                answer={answers[next]} selectedOption={selectedOption} handleClick={handleClick}
        />
    </div>
  )
}

export default Body

