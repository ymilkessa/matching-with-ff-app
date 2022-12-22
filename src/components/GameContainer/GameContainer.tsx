import { generateShuffledCoprimePairs } from "../../logic/utils";
import NumberRow from "../NumberRow/NumberRow";
import "./GameContainer.css";

const GameContainer = () => {
  const { list1: setA, list2: setB } = generateShuffledCoprimePairs();
  return (
    <div className="container-fluid Game-container fixed-width">
      <NumberRow numbers={setA} />
      <div className="dividing-row">
        <div className="dividing-bar" />
      </div>
      <NumberRow numbers={setB} />
    </div>
  );
};

export default GameContainer;
