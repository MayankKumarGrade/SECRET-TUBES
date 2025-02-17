import PropTypes from "prop-types";

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
          <img
            src={showStart ? "/start.png" : "/play.png"}
            alt="Play"
            className={`max-w-[60%] max-h-[30%] w-auto h-auto transition-all duration-[1000ms] ${
              isClicked ? "transform translate-x-full opacity-0" : ""
            }`}
            onClick={showStart ? handleStartClick : handlePlayClick}
            style={{ cursor: "pointer", transition: "transform 0.2s" }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>
        {showPush && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <img
              src="/push.png"
              alt="Push"
              className="max-w-[60%] max-h-[30%] w-auto h-auto"
            />
            <img
              src="/Arrow.png"
              alt="Arrow"
              className="max-w-[20%] max-h-[30%] w-auto h-auto"
            />
            <p className="text-white text-lg font-bold text-center">
              Keep pushing until tubes rise <br /> under pressure and then get{" "}
              <br /> stuck on a plant.
            </p>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-between p-4">
        <img
          src="/question.png"
          alt="Question"
          className="max-w-[30%] h-auto cursor-pointer"
          onClick={handleIconClick}
          style={{ transition: "transform 0.2s" }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
        <img
          src="/setting.png"
          alt="Setting"
          className="max-w-[30%] h-auto cursor-pointer"
          onClick={handleIconClick}
          style={{ transition: "transform 0.2s" }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
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
