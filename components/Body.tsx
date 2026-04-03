import React, { useEffect, useRef } from 'react';
import QuizNumber from './QuizNumber';
import Option from './Option';

const getAnswers = [
  ['continents', 0],
  'population',
  ['capital', 0],
  'area',
  ['continents', 0],
  ['timezones', 0],
  ['car', 'side'],
  'region',
  'subregion',
  ['name', 'common'],
];

interface BodyProps {
  setAnimate: React.Dispatch<React.SetStateAction<boolean>>;
  done: number;
  setDone: React.Dispatch<React.SetStateAction<number>>;
  next: number;
  setNext: React.Dispatch<React.SetStateAction<number>>;
  num: number | null;
  setNum: React.Dispatch<React.SetStateAction<number | null>>;
  countries: any[];
  setCountries: React.Dispatch<React.SetStateAction<any[]>>;
  possibleValues: string[];
  setPossibleValues: React.Dispatch<React.SetStateAction<string[]>>;
  selectedOption: string | null;
  setSelectedOption: React.Dispatch<React.SetStateAction<string | null>>;
}

const correctSound = '/correct-answer.mp3';
const wrongSound = '/wrong-answer.mp3';
const congratsSound = '/congrats.mp3';

function Body({
  setAnimate,
  done,
  setDone,
  next,
  setNext,
  num,
  setNum,
  countries,
  setCountries,
  possibleValues,
  setPossibleValues,
  selectedOption,
  setSelectedOption,
}: BodyProps) {
  const correctAudioRef = useRef(new Audio(correctSound));
  const wrongAudioRef = useRef(new Audio(wrongSound));
  const congratsAudioRef = useRef(new Audio(congratsSound));

  const shuffleArray = <T,>(data: T[]): T[] => {
    for (let i = data.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [data[i], data[j]] = [data[j], data[i]];
    }
    console.log(data.slice(0, 4));
    return data.slice(0, 4);
  };

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,capital,population,area,continents,timezones,car,region,subregion')
      .then(response => response.json())
      .then(data => {
        const shuffledCountries = shuffleArray(data);
        setCountries(shuffledCountries);
        setNum(Math.floor(Math.random() * shuffledCountries.length));
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (num !== null && countries.length > 0) {
      const value = getAnswers[next];
      let newValues: any[] = [];
      if (typeof value === 'object') {
        newValues = countries.map(country => country[value[0]]?.[value[1]]);
      } else {
        newValues = countries.map(country => country[value]);
      }
      setPossibleValues(Array.from(new Set(newValues.filter(Boolean))));
    }
  }, [countries, next]);

  if (num === null || countries.length === 0) {
    return <div>Loading...</div>;
  }

  const questions = [
    `${countries[num]?.name?.common} is located in which continent?`,
    `What is the population of ${countries[num]?.name?.common}?`,
    `What is the capital of ${countries[num]?.name?.common}?`,
    `What is the area of ${countries[num]?.name?.common}?`,
    `What continent is ${countries[num]?.name?.common} located in?`,
    `What is the timezone of ${countries[num]?.name?.common}?`,
    `The car is driven on what side in ${countries[num]?.name?.common}?`,
    `What region is ${countries[num]?.name?.common} located in?`,
    `What subregion is ${countries[num]?.name?.common} located in?`,
    `${countries[num]?.capital?.[0]} is the capital of which country?`,
  ];

  const answers = [
    countries[num]?.continents?.[0],
    countries[num]?.population,
    countries[num]?.capital?.[0],
    countries[num]?.area,
    countries[num]?.continents?.[0],
    countries[num]?.timezones?.[0],
    countries[num]?.car?.side,
    countries[num]?.region,
    countries[num]?.subregion,
    countries[num]?.name?.common,
  ];

  const handleClick = (option: string) => {
    setSelectedOption(option);
    const isCorrect = option === answers[next];
    const audio = isCorrect ? correctAudioRef.current : wrongAudioRef.current;
    audio.currentTime = 0;
    audio.play();

    setTimeout(() => {
      if (done === 9) {
        setAnimate(true);
        congratsAudioRef.current.currentTime = 0;
        congratsAudioRef.current.play();
        setTimeout(() => {
          setDone(prev => prev + 1);
          setAnimate(false);
        }, 1200);
      } else {
        setNum(Math.floor(Math.random() * countries.length));
        setNext(prev => prev + 1);
        setDone(prev => prev + 1);
        setSelectedOption(null);
      }
    }, 2000);
  };

  return (
    <div className="bg-[#343964] flex flex-col items-center justify-center py-8 md:py-14 rounded-xl transition-transform duration-500">
      <div className='w-3/4 lg:w-full flex flex-wrap items-center justify-center space-x-2 md:space-x-4'>
        {Array.from({ length: 10 }, (_, i) => (
          <QuizNumber key={i} num={i + 1} isOn={i <= next} />
        ))}
      </div>
      <p className='mt-6 mb-10 w-3/4 lg:w-[33%] text-center'>{questions[next]}</p>
      <Option options={possibleValues} answer={answers[next]} selectedOption={selectedOption} handleClick={handleClick} />
    </div>
  );
}

export default Body;