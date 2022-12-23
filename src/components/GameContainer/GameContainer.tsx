// import { generateShuffledCoprimePairs } from "../../logic/utils";
import { useSelector } from "react-redux";
import NumberRow from "../NumberRow/NumberRow";
import "./GameContainer.css";
import { RootState } from "../../logic/store";
import Controls from "../Controls/Controls";

const GameContainer = () => {
  // const { list1: setA, list2: setB } = generateShuffledCoprimePairs();
  const { setA, setB } = useSelector((state: RootState) => state.sets);
  return (
    <div className="container-fluid Game-container fixed-width">
      <Controls />
      <NumberRow numbers={setA} />
      <div className="dividing-row">
        <div className="dividing-bar" />
      </div>
      <NumberRow numbers={setB} />
    </div>
  );
};

export default GameContainer;
