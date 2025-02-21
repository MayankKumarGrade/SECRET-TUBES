import { useState } from "react";
import GameLogic from "./GameLogic";
import PlayPage from "./PlayPage";

const GameScreen = () => {
  const questions = [
    {
      id: 1,
      questionHtml:
        "<span class='text-yellow-500 text-2xl sm:text-3xl lg:text-4xl changa-one-regular'>(1/2)</span><br/><span class='text-4xl sm:text-5xl lg:text-4xl font-extrabold pointer-events-none changa-one-regular'>The Sun is the closest star to Earth?</span>",
      trueResponseHtml:
        "<span class='text-yellow-500 pointer-events-none text-2xl sm:text-3xl lg:text-4xl changa-one-regular'>You got 1 coin.</span><br/><span class='text-4xl sm:text-5xl lg:text-6xl font-extrabold pointer-events-none bg-gradient-to-b from-[#82F7F5] to-[#0D52A0] text-transparent bg-clip-text changa-one-regular'>Congratulations.</span>",
      falseResponseHtml:
        "<span class='text-yellow-500 pointer-events-none text-2xl sm:text-3xl lg:text-4xl changa-one-regular'>You got 0 coin.</span><br/><span class='text-4xl sm:text-5xl lg:text-6xl font-extrabold pointer-events-none bg-gradient-to-b from-[#82F7F5] to-[#0D52A0] text-transparent bg-clip-text changa-one-regular'>Noooo!!</span>",
      trueButtonLabel: "TRUE",
      falseButtonLabel: "FALSE"
    },
    {
      id: 2,
      questionHtml:
        "<span class='text-yellow-500 text-2xl sm:text-3xl lg:text-4xl changa-one-regular'>(2/2)</span><br/><span class='text-4xl sm:text-5xl lg:text-4xl font-extrabold pointer-events-none changa-one-regular'>Coffee is made from beans?</span>",
      trueResponseHtml:
        "<span class='text-yellow-500 pointer-events-none text-2xl sm:text-3xl lg:text-4xl changa-one-regular'>You got 1 coin.</span><br/><span class='text-4xl sm:text-5xl lg:text-6xl font-extrabold pointer-events-none bg-gradient-to-b from-[#82F7F5] to-[#0D52A0] text-transparent bg-clip-text changa-one-regular'>Congratulations.</span>",
      falseResponseHtml:
        "<span class='text-yellow-500 pointer-events-none text-2xl sm:text-3xl lg:text-4xl changa-one-regular'>You got 0 coin.</span><br/><span class='text-4xl sm:text-5xl lg:text-6xl font-extrabold pointer-events-none bg-gradient-to-b from-[#82F7F5] to-[#0D52A0] text-transparent bg-clip-text changa-one-regular'>Noooo!!</span>",
      trueButtonLabel: "YES",
      falseButtonLabel: "NO"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showGameUI, setShowGameUI] = useState(false);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      null;
    }
  };

  const handleHome = () => {
    setShowGameUI(true);
  };

  return showGameUI ? (
    <PlayPage />
  ) : (
    <GameLogic
      questionHtml={questions[currentIndex].questionHtml}
      trueResponseHtml={questions[currentIndex].trueResponseHtml}
      falseResponseHtml={questions[currentIndex].falseResponseHtml}
      trueButtonLabel={questions[currentIndex].trueButtonLabel}
      falseButtonLabel={questions[currentIndex].falseButtonLabel}
      onNext={handleNext}
      onHome={handleHome}
      isLastQuestion={currentIndex === questions.length - 1}
    />
  );
};

export default GameScreen;
