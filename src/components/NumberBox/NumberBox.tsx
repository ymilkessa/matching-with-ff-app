import { useDispatch } from "react-redux";
import "./NumberBox.css";
import { setNewVirtualSelection } from "../../logic/stateUpdaters/selectionSlice";
import { NumberBoxArgs } from "./types";

const NumberBox = ({
  num,
  row,
  index,
  boxTags = [],
  matchColor = undefined,
}: NumberBoxArgs) => {
  const dispatch = useDispatch();
  const onClickFunc = () => {
    dispatch(setNewVirtualSelection({ row, index }));
  };
  if (!boxTags.length) boxTags.push("number-box-neutral");
  let classes = "Number-box ";
  for (let k = 0; k < boxTags.length; k++) {
    classes += `${boxTags[k]} `;
  }
  return (
    <div
      className={classes}
      style={matchColor ? { backgroundColor: matchColor } : undefined}
      onClick={onClickFunc}
    >
      {num}
    </div>
  );
};

export default NumberBox;
