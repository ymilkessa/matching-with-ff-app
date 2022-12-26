import { useDispatch } from "react-redux";
import "./NumberBox.css";
import { moveSelectionTo } from "../../logic/selectionTracker/selectionSlice";
import { NumberBoxArgs } from "./types";

const NumberBox = ({
  num,
  row,
  index,
  boxTags = ["number-box-neutral"],
}: NumberBoxArgs) => {
  const dispatch = useDispatch();
  const onClickFunc = () => {
    dispatch(moveSelectionTo({ row, index }));
  };
  let classes = "Number-box ";
  for (let k = 0; k < boxTags.length; k++) {
    classes += `${boxTags[k]} `;
  }
  return (
    <div className={classes} onClick={onClickFunc}>
      {num}
    </div>
  );
};

export default NumberBox;
