import { useState, useEffect } from "react";
import GameUI from "./GameUI";
import GameScreen from "./GameScreen";

const PlayPage = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [showPush, setShowPush] = useState(false);
  const [showStart, setShowStart] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [fadeOutOldUI, setFadeOutOldUI] = useState(false);

  useEffect(() => {
    if (isClicked && !startGame) {
      const pushTimeout = setTimeout(() => setShowPush(true), 800);
      const startTimeout = setTimeout(() => setShowStart(true), 2500);
      const resetTimeout = setTimeout(() => {
        setIsClicked(false);
        setShowPush(false);
        setShowStart(true);
      }, 5000);
      return () => {
        clearTimeout(pushTimeout);
        clearTimeout(startTimeout);
        clearTimeout(resetTimeout);
      };
    }
  }, [isClicked, startGame]);

  const handleIconClick = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1000);
  };

  const handlePlayClick = () => setIsClicked(true);

  const handleStartClick = () => {
    setFadeOutOldUI(true);
    setTimeout(() => {
      setStartGame(true);
    }, 500);
  };

  return (
    <div className="relative w-full h-screen overflow-auto bg-black custom-scrollbar">
      <div
        className={`transition-opacity duration-500 ${
          fadeOutOldUI ? "opacity-0" : "opacity-100"
        }`}
      >
        {!startGame ? (
          <GameUI
            isClicked={isClicked}
            showPush={showPush}
            showStart={showStart}
            handlePlayClick={handlePlayClick}
            handleStartClick={handleStartClick}
            handleIconClick={handleIconClick}
            showToast={showToast}
          />
        ) : null}
      </div>

      {startGame && <GameScreen />}
    </div>
  );
};

export default PlayPage;
