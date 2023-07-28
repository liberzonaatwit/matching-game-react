import React, { useEffect, useState } from "react";
import "./App.css";
import confetti from "canvas-confetti";
import Confetti from "./Confetti";

export default function CountryCapitalGame({ data }) {
  const [options, setOptions] = useState([]);
  const [selectedPair, setSelectedPair] = useState(null);
  const [wrongPair, setWrongPair] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);

  useEffect(() => {
    const countries = Object.keys(data);
    const capitals = Object.values(data);
    const combinedOptions = [...countries, ...capitals];
    shuffleArray(combinedOptions);
    setOptions(combinedOptions);
  }, [data]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handleButtonClick = (option) => {
    if (selectedPair) {
      if (selectedPair === option && !isPairCorrect(selectedPair, option)) {
        setSelectedPair(null);
        setWrongPair([]);
      } else if (isPairCorrect(selectedPair, option)) {
        setMatchedPairs([...matchedPairs, selectedPair, option]);
        setSelectedPair(null);
      } else {
        setSelectedPair(null);
        setWrongPair([...wrongPair, selectedPair, option]);
      }
    } else {
      setSelectedPair(option);
      setWrongPair([]);
    }
  };

  const isPairCorrect = (optA, optB) => {
    return data[optA] === optB || data[optB] === optA;
  };

  const renderButtons = () => {
    return options.map((option) => {
      // if (matchedPairs.includes(option)) {
      //   return null;
      // }

      const isSelected = selectedPair === option;
      const isWrongPair = wrongPair.includes(option);

      return (
        <button
          key={option}
          className={
            (isSelected ? "button-selected" : "") +
            (isWrongPair ? " wrong" : "") +
            (matchedPairs.includes(option) ? " matched" : "")
          }
          onClick={() => handleButtonClick(option)}
        >
          {option}
        </button>
      );
    });
  };

  const isGameCompleted = () => {
    return matchedPairs.length === options.length;
  };

  return (
    <main>
      {isGameCompleted() ? (
        <>
          <p className="congrats">Congratulations!</p>
          <Confetti start={isGameCompleted()} />
        </>
      ) : (
        <>
          <div className="container">{renderButtons()}</div>
        </>
      )}
    </main>
  );
}
