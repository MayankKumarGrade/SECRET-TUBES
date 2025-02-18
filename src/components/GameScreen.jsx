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
  const [qs1Text, setQs1Text] = useState(
    "The Sun is the closest star to Earth?"
  );
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
        setQs1Text(
          trueClicks + 1 === 3
            ? "<span class='text-yellow-500 text-3xl changa-one-regular'>You got 0 coin</span><br/><span class='text-5xl font-extrabold bg-gradient-to-b from-[#82F7F5] to-[#0D52A0] text-transparent bg-clip-text changa-one-regular'>Noooo!!</span>"
            : "<span class='text-yellow-500 text-3xl changa-one-regular'>You got 1 coin</span><br/><span class='text-5xl font-extrabold bg-gradient-to-b from-[#82F7F5] to-[#0D52A0] text-transparent bg-clip-text changa-one-regular'>Congratulations</span>"
        );
        setTimeout(() => {
          setTrueClicks(0);
          setFalseClicks(0);
          setRrYOffsets([0, 0, 0]);
          setGrYOffsets([0, 0, 0]);
          setQs1Text("The Sun is the closest star to Earth?");
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
      <div
        className="stroke-custom absolute left-1/2 w-90 h-60 -translate-x-1/2 top-[15%] text-center text-white text-3xl font-extrabold"
        style={{ "--stroke-color": "#040F4F" }}
        dangerouslySetInnerHTML={{ __html: qs1Text }}
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

      <div className="absolute bottom-15 left-57 -translate-x-1/2 flex gap-4 z-50 items-center justify-between w-full">
        {/* False Button */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.02 }}
        >
          <motion.img
            src="/blueb.png"
            alt="False"
            className="max-w-[70%] max-h-[40%] w-auto h-auto transition-all duration-[20ms] cursor-pointer"
            onClick={() => handleButtonClick("false")}
          />
          <motion.div
            className="alkalami-regular stroke-custom absolute text-3xl font-bold text-white top-3/5 left-17 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ "--stroke-color": "#0C4ED0" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.02 }}
          >
            False
          </motion.div>
        </motion.div>

        {/* True Button */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.02 }}
        >
          <motion.img
            src="/blueb.png"
            alt="True"
            className="max-w-[70%] max-h-[40%] w-auto h-auto transition-all duration-[20ms] cursor-pointer"
            onClick={() => handleButtonClick("true")}
          />
          <motion.div
            className="alkalami-regular stroke-custom absolute text-3xl font-bold text-white top-3/5 left-17 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ "--stroke-color": "#0C4ED0" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.02 }}
          >
            True
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default GameScreen;
