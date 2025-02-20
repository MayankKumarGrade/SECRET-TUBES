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

const GameScreen = () => {
  const [trueClicks, setTrueClicks] = useState(0);
  const [falseClicks, setFalseClicks] = useState(0);
  const [rrYOffsets, setRrYOffsets] = useState([0, 0, 0]);
  const [grYOffsets, setGrYOffsets] = useState([0, 0, 0]);
  const [qs1Text, setQs1Text] = useState(
    "<span class='text-yellow-500 text-2xl sm:text-3xl lg:text-4xl changa-one-regular'>(1/12)</span><br/>The Sun is the closest star to Earth?"
  );
  const [isSettled, setIsSettled] = useState(false);
  const [bubbleYOffset, setBubbleYOffset] = useState(0);
  const [bubbleSide, setBubbleSide] = useState(null);

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

    const isfalseAction = type === "false";
    const currentCounter = isfalseAction ? trueClicks : falseClicks;
    const oppositeCounter = isfalseAction ? falseClicks : trueClicks;

    if (currentCounter >= 3) return;

    if (oppositeCounter > 0) {
      setTrueClicks(0);
      setFalseClicks(0);
      setRrYOffsets([0, 0, 0]);
      setGrYOffsets([0, 0, 0]);
      setBubbleYOffset(0);
      setBubbleSide(null);
    }

    const updateCounter = isfalseAction ? setTrueClicks : setFalseClicks;
    updateCounter((prev) => prev + 1);

    const offsetUpdates = isfalseAction ? [-75, -75, -105] : [-95, -79, -105];

    const updateOffsets = isfalseAction ? setRrYOffsets : setGrYOffsets;
    updateOffsets((prev) => [
      prev[0] + offsetUpdates[1],
      prev[1] + offsetUpdates[2],
      prev[2] + offsetUpdates[2]
    ]);

    setBubbleSide(isfalseAction ? "left" : "right");
    setBubbleYOffset((prev) => prev - 50);

    if (currentCounter + 1 === 3) {
      setIsSettled(true);
      setBubbleSide(null);

      const completionTimeout = setTimeout(() => {
        setQs1Text(
          isfalseAction
            ? "<span class='text-yellow-500 pointer-events-none text-2xl sm:text-3xl lg:text-4xl changa-one-regular'>You got 0 coin.</span><br/><span class='text-4xl sm:text-5xl lg:text-6xl font-extrabold pointer-events-none bg-gradient-to-b from-[#82F7F5] to-[#0D52A0] text-transparent bg-clip-text changa-one-regular'>Noooo!!</span>"
            : "<span class='text-yellow-500 pointer-events-none text-2xl sm:text-3xl lg:text-4xl changa-one-regular'>You got 1 coin.</span><br/><span class='text-4xl sm:text-5xl lg:text-6xl font-extrabold pointer-events-none bg-gradient-to-b from-[#82F7F5] to-[#0D52A0] text-transparent bg-clip-text changa-one-regular'>Congratulations.</span>"
        );

        const resetTimeout = setTimeout(() => {
          setTrueClicks(0);
          setFalseClicks(0);
          setRrYOffsets([0, 0, 0]);
          setGrYOffsets([0, 0, 0]);
          setQs1Text(
            "<span class='text-yellow-500 pointer-events-none text-2xl sm:text-3xl lg:text-4xl changa-one-regular'>(1/12)</span><br/><span class='pointer-events-none text-2xl sm:text-3xl lg:text-4xl changa-one-regular'>The Sun is the closest star to Earth?</span>"
          );
          setIsSettled(false);
          setBubbleYOffset(0);
        }, 4000);

        return () => clearTimeout(resetTimeout);
      }, 1000);

      return () => clearTimeout(completionTimeout);
    }
  };

  return (
    <div className="fixed inset-0 bg-[url('/playpage.png')] sm:bg-[url('/superbg2.jpg')] bg-cover bg-no-repeat bg-center overflow-y-auto custom-scrollbar">
      <div className="mx-auto w-full max-w-[393px] h-[calc(100vw*(852/393))] max-h-[852px] bg-cover bg-no-repeat bg-center relative transition-opacity duration-500">
        <div
          className="stroke-custom absolute left-1/2 w-90 h-60 -translate-x-1/2 top-[15%] text-center text-white text-2xl sm:text-3xl lg:text-4xl font-extrabold"
          style={{ "--stroke-color": "#040F4F" }}
          dangerouslySetInnerHTML={{ __html: qs1Text }}
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
              FAlSE
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
              TRUE
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
