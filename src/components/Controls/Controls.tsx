import { useDispatch } from "react-redux";
import Button from "../Buttons/Button";
import { generateSets } from "../../logic/arraySlice";

const Controls = () => {
  const dispatch = useDispatch();
  return (
    <div className="Control-box row">
      <Button
        text="New Game"
        action={() => dispatch(generateSets())}
        classNames={["col-sm-2"]}
      />
    </div>
  );
};

export default Controls;
