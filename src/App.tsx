import { useState } from "react";
import Header from "../components/Header";
import Body from "../components/Body";
import Congrats from "../components/Congrats";
import { PointsProvider } from "../context/PointsContext";

function App() {
  const [animate, setAnimate] = useState(false);
  const [done, setDone] = useState(0);
  const [next, setNext] = useState(0);
  const [num, setNum] = useState<number | null>(null);
  const [countries, setCountries] = useState([]);
  const [possibleValues, setPossibleValues] = useState([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleRestart = () => {
    setAnimate(true);
    setTimeout(() => {
      setDone(0);
      setNext(0);
      setNum(null);
      setCountries([]);
      setPossibleValues([]);
      setSelectedOption(null);
      setAnimate(false);
    }, 800);
  };

  return (
    <PointsProvider>
      <div
        className="min-h-screen bg-cover bg-center flex justify-center items-center text-[#E2E4F3] font-semibold"
        style={{ backgroundImage: "url('../bg.jpg')" }}
      >
        <div className={`w-3/4 md:w-2/3 space-y-6 md:space-y-8 mt-4 transition-transform duration-1000 ${animate ? "translate-x-[150%]" : "translate-x-0"}`}>
          {done != 10 && <Header />}
          {done != 10 && (
            <Body
              setAnimate={setAnimate}
              done={done}
              setDone={setDone}
              next={next}
              setNext={setNext}
              num={num}
              setNum={setNum}
              countries={countries}
              setCountries={setCountries}
              possibleValues={possibleValues}
              setPossibleValues={setPossibleValues}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          )}
          <div className="flex justify-center items-center">
            {done == 10 && <Congrats handleRestart={handleRestart} />}
          </div>
        </div>
      </div>
    </PointsProvider>
  );
}

export default App;
