import NumberRow from "../NumberRow/NumberRow";
import "./GameContainer.css";

const GameContainer = () => {
  const setA = [1, 2, 3];
  const setB = [4, 5, 6];
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
