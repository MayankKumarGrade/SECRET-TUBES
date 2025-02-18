import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useState } from "react";

const RotatingImageGroup = ({ side, color, config, yOffsets, isSettled }) => (
  <div className="z-10">
    {config.map(({ position, top, initialRotate, animateRotate, y }, index) => (
      <motion.img
        key={`${side}-${index}`}
        src={`/${color}.png`}
        alt="Rotating Image"
        className="absolute w-[101px] h-[55px] object-cover z-50"
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

const GameScreen = () => {
  const [trueClicks, setTrueClicks] = useState(0);
  const [falseClicks, setFalseClicks] = useState(0);
  const [rrYOffsets, setRrYOffsets] = useState([0, 0, 0]);
  const [grYOffsets, setGrYOffsets] = useState([0, 0, 0]);
  const [qs1Image, setQs1Image] = useState("/qs1.png");
  const [isSettled, setIsSettled] = useState(false);
  const [bubbleYOffset, setBubbleYOffset] = useState(0);
  const [bubbleSide, setBubbleSide] = useState(null);

  const leftConfig = [
    {
      position: "80px",
      top: "75%",
      initialRotate: 11.37,
      animateRotate: 31.37,
      y: -20
    },
    {
      position: "60px",
      top: "80%",
      initialRotate: -18.92,
      animateRotate: 1.08,
      y: -20
    },
    {
      position: "70px",
      top: "77%",
      initialRotate: 12,
      animateRotate: 35,
      y: -10
    }
  ];

  const rightConfig = [
    {
      position: "60px",
      top: "75%",
      initialRotate: 11.37,
      animateRotate: 20,
      y: -20
    },
    {
      position: "40px",
      top: "80%",
      initialRotate: 18.92,
      animateRotate: 12.08,
      y: -20
    },
    {
      position: "70px",
      top: "77%",
      initialRotate: 0,
      animateRotate: -20,
      y: -10
    }
  ];

  const handleButtonClick = (type) => {
    if (type === "false" && trueClicks < 3) {
      if (falseClicks > 0) {
        setFalseClicks(0);
        setGrYOffsets([0, 0, 0]);
        setBubbleYOffset(0);
        setBubbleSide(null);
      }
      setTrueClicks((prev) => prev + 1);
      setRrYOffsets((prev) => [prev[0] - 70, prev[1] - 65, prev[2] - 105]);
      setBubbleSide("left");
      setBubbleYOffset((prev) => prev - 50);
    } else if (type === "true" && falseClicks < 3) {
      if (trueClicks > 0) {
        setTrueClicks(0);
        setRrYOffsets([0, 0, 0]);
        setBubbleYOffset(0);
        setBubbleSide(null);
      }
      setFalseClicks((prev) => prev + 1);
      setGrYOffsets((prev) => [prev[0] - 75, prev[1] - 70, prev[2] - 105]);
      setBubbleSide("right");
      setBubbleYOffset((prev) => prev - 50);
    }

    if (trueClicks + 1 === 3 || falseClicks + 1 === 3) {
      setIsSettled(true);
      setBubbleSide(null);
      setTimeout(() => {
        setQs1Image(
          trueClicks + 1 === 3 ? "/endscreenf.png" : "/endscreent.png"
        );
        setTimeout(() => {
          setTrueClicks(0);
          setFalseClicks(0);
          setRrYOffsets([0, 0, 0]);
          setGrYOffsets([0, 0, 0]);
          setQs1Image("/qs1.png");
          setIsSettled(false);
          setBubbleYOffset(0);
          setBubbleSide(null);
        }, 3000);
      }, 1000);
    }
  };

  return (
    <div
      className="mx-auto w-full max-w-[393px] h-[calc(100vw*(852/393))] max-h-[852px] bg-cover bg-no-repeat bg-center relative transition-opacity duration-500"
      style={{ backgroundImage: "url('/playpage.png')" }}
    >
      <img
        src={qs1Image}
        alt="Question 1"
        className="absolute left-1/2 -translate-x-1/2 top-[15%]"
      />

      <motion.img
        src="/plant.png"
        alt="Plant"
        className="absolute left-1/2 -translate-x-1/2 w-80 h-60 top-[38%]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      />

      {bubbleSide && (
        <motion.img
          src="/bubble.png"
          alt="Bubble"
          className={`absolute w-[80px] h-[110px] z-10 ${
            bubbleSide === "left" ? "left-22" : "right-20"
          }`}
          style={{ top: `calc(85% + ${bubbleYOffset}px)` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 2 }}
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

      <div className="absolute bottom-15 left-1/2 -translate-x-1/2 flex gap-8 z-50 items-center justify-center">
        <motion.img
          src="/false.png"
          alt="False"
          className="max-w-[70%] max-h-[40%] w-auto h-auto transition-all duration-[20ms] cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleButtonClick("false")}
        />
        <motion.img
          src="/true.png"
          alt="True"
          className="max-w-[70%] max-h-[40%] w-auto h-auto transition-all duration-[20ms] cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleButtonClick("true")}
        />
      </div>
    </div>
  );
};

export default GameScreen;