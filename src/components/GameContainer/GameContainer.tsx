// import { generateShuffledCoprimePairs } from "../../logic/utils";
// import { useDispatch, useSelector } from "react-redux";
import NumberRow from "../NumberRow/NumberRow";
import "./GameContainer.css";
// import { RootState } from "../../logic/store";
import Controls from "../Controls/Controls";
// import { generateSets } from "../../logic/gameLogic/arraySlice";

const GameContainer = () => {
  // const gameSettings = useSelector((state: RootState) => state.gameSettings);
  // const dispatch = useDispatch();
  // dispatch(generateSets(gameSettings));
  // const { setA, setB } = useSelector((state: RootState) => state.sets);
  return (
    <div className="container-fluid Game-container fixed-width">
      <Controls />
      <NumberRow row={0} />
      <div className="dividing-row">
        <div className="dividing-bar" />
      </div>
      <NumberRow row={1} />
    </div>
  );
};

export default GameContainer;

/**
 * react-dom.development.js:86 Warning: Cannot update a component (`Controls`) while rendering a different component (`GameContainer`). 
 * To locate the bad setState() call inside `GameContainer`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render
    at GameContainer (http://localhost:3000/static/js/bundle.js:331:80)
    at div
    at App
 */
