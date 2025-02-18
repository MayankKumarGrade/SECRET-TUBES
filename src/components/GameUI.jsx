import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const GameUI = ({
  isClicked,
  showPush,
  showStart,
  handlePlayClick,
  handleStartClick,
  handleIconClick,
  showToast
}) => {
  return (
    <div
      className="mx-auto w-full max-w-[393px] h-[calc(100vw*(852/393))] max-h-[852px] bg-cover bg-no-repeat bg-center relative transition-opacity duration-500"
      style={{ backgroundImage: `url('/startpage.png')` }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={isClicked ? "/aural.png" : "/aura.png"}
          alt="Aura"
          className="max-w-[80%] max-h-[80%] w-auto h-auto transition-all duration-[2000ms] opacity-100"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <img
            src="/title.png"
            alt="Title"
            className={`max-w-[60%] max-h-[30%] w-auto h-auto transition-all duration-[300ms] hover:scale-110 ${
              isClicked ? "transform -translate-y-60" : ""
            }`}
          />
          <div
            className={`relative flex items-center justify-center transition-all duration-[1000ms] ${
              isClicked ? "transform translate-x-full opacity-0" : ""
            }`}
            style={{ cursor: "pointer", transition: "transform 0.2s" }}
            onClick={showStart ? handleStartClick : handlePlayClick}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src="/goldenb.png"
              alt="GoldenB"
              className="max-w-[85%] max-h-[75%] w-auto h-auto"
            />

            <span
              className="alkalami-regular stroke-custom absolute text-3xl font-bold"
              style={{ "--stroke-color": "#FF0000" }}
            >
              {showStart ? "Start" : "Play"}
            </span>
          </div>
        </div>
        {showPush && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="relative flex justify-center items-center">
              <img
                src="/blueb.png"
                alt="Push"
                className="max-w-[85%] max-h-[75%] w-auto h-auto"
              />
              <p
                className="alkalami-regular stroke-custom absolute text-3xl font-bold text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{ "--stroke-color": "#0C4ED0" }}
              >
                Push
              </p>
            </div>

            <img
              src="/Arrow.png"
              alt="Arrow"
              className="max-w-[20%] max-h-[30%] w-auto h-auto"
            />

            <p className="text-white text-lg font-bold text-center alkalami-regular">
              Keep pushing until tubes rise <br /> under pressure and then get{" "}
              <br /> stuck on a plant.
            </p>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-between p-4">
        <div className="relative max-w-[30%] hover:scale-110 transition-transform duration-200">
          <img
            src="/blues.png"
            alt="Question"
            className="w-full h-auto cursor-pointer"
            onClick={handleIconClick}
          />
          <span className="text-white font-bold text-6xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            ?
          </span>
        </div>

        <div className="relative max-w-[30%] hover:scale-110 transition-transform duration-200">
          <img
            src="/blues.png"
            alt="Setting"
            className="w-full h-auto cursor-pointer"
            onClick={handleIconClick}
          />
          <FontAwesomeIcon
            icon={faGear}
            className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            size="3x"
          />
        </div>
      </div>
      {showToast && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-90 text-white text-sm px-4 py-2 rounded-lg shadow-lg animate-fade-in-up">
          Focus on the game, buddy!
        </div>
      )}
    </div>
  );
};

GameUI.propTypes = {
  isClicked: PropTypes.bool.isRequired,
  showPush: PropTypes.bool.isRequired,
  showStart: PropTypes.bool.isRequired,
  handlePlayClick: PropTypes.func.isRequired,
  handleStartClick: PropTypes.func.isRequired,
  handleIconClick: PropTypes.func.isRequired,
  showToast: PropTypes.bool.isRequired
};

export default GameUI;
