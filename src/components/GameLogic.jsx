import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const RotatingImageGroup = ({ side, color, config, yOffsets, isSettled }) => (
  <div className="z-10">
    {config.map(({ position, top, initialRotate, animateRotate, y }, index) => (
      <motion.img
        key={`${side}-${index}`}
        src={`/${color}.png`}
        alt="Rotating Image"
        className="absolute w-[101px] h-[55px] object-cover z-20"
        style={{
          [side]: position,
          top: `calc(${top} + ${yOffsets[index]}px)`,
          filter: "drop-shadow(0px 4px 8px rgba(4, 15, 79, 0.3))",
          transform: `rotate(${initialRotate}deg)`
        }}
        initial={{ y: 0, rotate: initialRotate }}
        animate={{
          y: isSettled ? 0 : y,
          rotate: isSettled ? animateRotate : initialRotate
        }}
        transition={{ type: "tween", duration: 0.5 }}
      />
    ))}
  </div>
);

RotatingImageGroup.propTypes = {
  side: PropTypes.oneOf(["left", "right"]).isRequired,
  color: PropTypes.oneOf(["rr", "gr"]).isRequired,
  config: PropTypes.arrayOf(
    PropTypes.shape({
      position: PropTypes.string.isRequired,
      top: PropTypes.string.isRequired,
      initialRotate: PropTypes.number.isRequired,
      animateRotate: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    })
  ).isRequired,
  yOffsets: PropTypes.arrayOf(PropTypes.number).isRequired,
  isSettled: PropTypes.bool.isRequired
};

const GameLogic = ({
  questionHtml,
  trueResponseHtml,
  falseResponseHtml,
  trueButtonLabel,
  falseButtonLabel,
  onNext,
  onHome,
  onReset,
  isLastQuestion
}) => {
  const [trueClicks, setTrueClicks] = useState(0);
  const [falseClicks, setFalseClicks] = useState(0);
  const [rrYOffsets, setRrYOffsets] = useState([0, 0, 0]);
  const [grYOffsets, setGrYOffsets] = useState([0, 0, 0]);
  const [displayHtml, setDisplayHtml] = useState(questionHtml);
  const [isSettled, setIsSettled] = useState(false);
  const [bubbleYOffset, setBubbleYOffset] = useState(0);
  const [bubbleSide, setBubbleSide] = useState(null);
  const [showNavigation, setShowNavigation] = useState(false);

  useEffect(() => {
    setDisplayHtml(questionHtml);
    setTrueClicks(0);
    setFalseClicks(0);
    setRrYOffsets([0, 0, 0]);
    setGrYOffsets([0, 0, 0]);
    setIsSettled(false);
    setBubbleYOffset(0);
    setBubbleSide(null);
    setShowNavigation(false);
  }, [questionHtml, trueResponseHtml, falseResponseHtml]);

  useEffect(() => {
    if (showNavigation && isLastQuestion) {
      const timeout = setTimeout(() => {
        if (onHome) onHome();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [showNavigation, isLastQuestion, onHome]);

  const leftConfig = [
    {
      position: "10.18%",
      top: "75.19%",
      initialRotate: 11.37,
      animateRotate: -30,
      y: -20
    },
    {
      position: "11.45%",
      top: "80%",
      initialRotate: -18.92,
      animateRotate: 12.08,
      y: -20
    },
    {
      position: "17.81%",
      top: "76.99%",
      initialRotate: 12,
      animateRotate: -5,
      y: -10
    }
  ];
  const rightConfig = [
    {
      position: "8.91%",
      top: "74.69%",
      initialRotate: 11.37,
      animateRotate: 5,
      y: -20
    },
    {
      position: "11.45%",
      top: "80%",
      initialRotate: 18.92,
      animateRotate: 12.08,
      y: -20
    },
    {
      position: "17.81%",
      top: "77%",
      initialRotate: 0,
      animateRotate: -2,
      y: -10
    }
  ];

  const handleButtonClick = (type) => {
    if (isSettled) return;
    const isFalseAction = type === "false";
    const currentCounter = isFalseAction ? trueClicks : falseClicks;
    const oppositeCounter = isFalseAction ? falseClicks : trueClicks;
    if (currentCounter >= 3) return;
    if (oppositeCounter > 0) {
      setTrueClicks(0);
      setFalseClicks(0);
      setRrYOffsets([0, 0, 0]);
      setGrYOffsets([0, 0, 0]);
      setBubbleYOffset(0);
      setBubbleSide(null);
    }
    const updateCounter = isFalseAction ? setTrueClicks : setFalseClicks;
    updateCounter((prev) => prev + 1);
    const offsetUpdates = isFalseAction ? [-75, -75, -105] : [-95, -79, -105];
    const updateOffsets = isFalseAction ? setRrYOffsets : setGrYOffsets;
    updateOffsets((prev) => [
      prev[0] + offsetUpdates[1],
      prev[1] + offsetUpdates[2],
      prev[2] + offsetUpdates[2]
    ]);
    setBubbleSide(isFalseAction ? "left" : "right");
    setBubbleYOffset((prev) => prev - 50);
    if (currentCounter + 1 === 3) {
      setIsSettled(true);
      setBubbleSide(null);
      setTimeout(() => {
        setDisplayHtml(isFalseAction ? falseResponseHtml : trueResponseHtml);
        setTimeout(() => {
          setShowNavigation(true);
        }, 1000);
      }, 1000);
    }
  };

  const resetQuizState = () => {
    setTrueClicks(0);
    setFalseClicks(0);
    setRrYOffsets([0, 0, 0]);
    setGrYOffsets([0, 0, 0]);
    setDisplayHtml(questionHtml);
    setIsSettled(false);
    setBubbleYOffset(0);
    setBubbleSide(null);
    setShowNavigation(false);
    if (onReset) onReset();
  };

  const handleNextClick = () => {
    if (onNext) onNext();
    resetQuizState();
  };

  const handleHomeClick = () => {
    if (onHome) onHome();
  };

  return (
    <div className="fixed inset-0 bg-[url('/playpage.png')] sm:bg-[url('/superbg2.jpg')] bg-cover bg-no-repeat bg-center overflow-y-auto custom-scrollbar">
      <div className="mx-auto w-full max-w-[393px] h-[calc(100vw*(852/393))] max-h-[852px] bg-cover bg-no-repeat bg-center relative transition-opacity duration-500">
        {!showNavigation && (
          <>
            <div
              className="stroke-custom absolute left-1/2 w-90 h-60 -translate-x-1/2 top-[15%] text-center text-white text-2xl sm:text-3xl lg:text-4xl font-extrabold"
              style={{ "--stroke-color": "#040F4F" }}
              dangerouslySetInnerHTML={{ __html: displayHtml }}
            />
            <motion.img
              src="/plant.png"
              alt="Plant"
              className="absolute left-1/2 -translate-x-1/2 w-[81.42%] top-[38%]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            />
            <motion.img
              src="/plant1.png"
              alt="Plant"
              className="absolute left-[17%] top-[48.09%] w-[7.98%]"
              initial={{ opacity: 0, zIndex: 0 }}
              animate={{
                opacity: trueClicks === 3 || falseClicks === 3 ? 1 : 0,
                zIndex: trueClicks === 3 || falseClicks === 3 ? 50 : 0
              }}
              transition={{ duration: 0.5 }}
            />
            <motion.img
              src="/plant2.png"
              alt="Plant"
              className="absolute left-[74.9%] top-[47.22%] w-[7.38%]"
              initial={{ opacity: 0, zIndex: 0 }}
              animate={{
                opacity: trueClicks === 3 || falseClicks === 3 ? 1 : 0,
                zIndex: trueClicks === 3 || falseClicks === 3 ? 50 : 0
              }}
              transition={{ duration: 0.5 }}
            />
            <motion.img
              src="/lplants.png"
              alt="Plant"
              className="absolute left-[22.39%] top-[38.15%] w-[27.74%]"
              initial={{ opacity: 0, zIndex: 0 }}
              animate={{
                opacity: trueClicks === 3 || falseClicks === 3 ? 1 : 0,
                zIndex: trueClicks === 3 || falseClicks === 3 ? 50 : 0
              }}
              transition={{ duration: 0.5 }}
            />
            <motion.img
              src="/rplants.png"
              alt="Plant"
              className="absolute left-[49.87%] top-[38.15%] w-[27.48%]"
              initial={{ opacity: 0, zIndex: 0 }}
              animate={{
                opacity: trueClicks === 3 || falseClicks === 3 ? 1 : 0,
                zIndex: trueClicks === 3 || falseClicks === 3 ? 50 : 0
              }}
              transition={{ duration: 0.5 }}
            />
            {bubbleSide && (
              <motion.img
                src="/bubble.png"
                alt="Bubble"
                className={`absolute w-[35%] h-[30%] z-10 ${
                  bubbleSide === "left" ? "left-[10%]" : "right-[10%]"
                }`}
                style={{ top: `calc(80% + ${bubbleYOffset}px)` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
            <RotatingImageGroup
              side="left"
              color="rr"
              config={leftConfig}
              yOffsets={rrYOffsets}
              isSettled={isSettled && trueClicks === 3}
            />
            <RotatingImageGroup
              side="right"
              color="gr"
              config={rightConfig}
              yOffsets={grYOffsets}
              isSettled={isSettled && falseClicks === 3}
            />
            <div className="absolute bottom-15 left-[60%] -translate-x-1/2 flex z-50 items-center justify-between w-full px-4">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.02 }}
              >
                <motion.img
                  src="/blueb.png"
                  alt="False"
                  className="w-[70%] h-auto transition-all duration-[20ms] cursor-pointer"
                  onClick={() => handleButtonClick("false")}
                />
                <motion.div
                  className="alkalami-regular stroke-custom absolute text-xl sm:text-2xl font-bold text-white top-3/5 left-[35%] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ "--stroke-color": "#0C4ED0" }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.02 }}
                >
                  {falseButtonLabel}
                </motion.div>
              </motion.div>
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.02 }}
              >
                <motion.img
                  src="/blueb.png"
                  alt="True"
                  className="w-[70%] h-auto transition-all duration-[20ms] cursor-pointer"
                  onClick={() => handleButtonClick("true")}
                />
                <motion.div
                  className="alkalami-regular stroke-custom absolute text-xl sm:text-2xl font-bold text-white top-3/5 left-[35%] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ "--stroke-color": "#0C4ED0" }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.02 }}
                >
                  {trueButtonLabel}
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
        {showNavigation && !isLastQuestion && (
          <div className="absolute inset-0 flex flex-row justify-center items-center gap-10 w-full h-full">
            <div
              className="relative max-w-[30%] hover:scale-110 transition-transform duration-200 cursor-pointer"
              onClick={handleHomeClick}
            >
              <img src="/blues.png" alt="Home" className="w-full h-auto" />
              <FontAwesomeIcon
                icon={faHome}
                className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                size="4x"
              />
            </div>
            <div
              className="relative max-w-[40%] hover:scale-110 transition-transform duration-200 cursor-pointer"
              onClick={handleNextClick}
            >
              <img
                src="/goldenb.png"
                alt="Next"
                className="max-w-[100%] max-h-[100%]"
              />
              <span
                className="alkalami-regular stroke-custom absolute text-2xl sm:text-3xl font-bold text-white top-3/5 left-[45%] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{ "--stroke-color": "#0C4ED0" }}
              >
                NEXT
              </span>
            </div>
          </div>
        )}
        {showNavigation && isLastQuestion && (
          <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 w-full h-full">
            <div
              className="text-center"
              dangerouslySetInnerHTML={{
                __html:
                  "<span class='text-yellow-500 text-2xl sm:text-3xl lg:text-4xl changa-one-regular'>You got total 2 coin.</span><br/><span class='text-amber-50 text-4xl sm:text-5xl lg:text-6xl font-extrabold pointer-events-none changa-one-regular'>Thanks for Playing this Game !!</span>"
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

GameLogic.propTypes = {
  questionHtml: PropTypes.string.isRequired,
  trueResponseHtml: PropTypes.string.isRequired,
  falseResponseHtml: PropTypes.string.isRequired,
  trueButtonLabel: PropTypes.string,
  falseButtonLabel: PropTypes.string,
  onNext: PropTypes.func,
  onHome: PropTypes.func,
  onReset: PropTypes.func,
  isLastQuestion: PropTypes.bool
};

GameLogic.defaultProps = {
  trueButtonLabel: "TRUE",
  falseButtonLabel: "FALSE",
  onNext: null,
  onHome: null,
  onReset: null,
  isLastQuestion: false
};

export default GameLogic;
