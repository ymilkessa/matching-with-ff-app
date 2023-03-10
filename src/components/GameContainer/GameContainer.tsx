// import { generateShuffledCoprimePairs } from "../../logic/utils";
// import { useDispatch, useSelector } from "react-redux";
import NumberRow from "../NumberRow/NumberRow";
import "./GameContainer.css";
// import { RootState } from "../../logic/store";
import Controls from "../Controls/Controls";
import StatusBoard from "../StatusBoard/StatusBoard";
import { SET_NUMBERS } from "../../logic/constants";
// import { generateSets } from "../../logic/gameLogic/arraySlice";

const GameContainer = () => {
  return (
    <div className="container-fluid Game-container fixed-width">
      <Controls />
      <StatusBoard />
      <NumberRow row={SET_NUMBERS.SET_A} />
      <div className="dividing-row">
        <div className="dividing-bar" />
      </div>
      <NumberRow row={SET_NUMBERS.SET_B} />
    </div>
  );
};

export default GameContainer;
