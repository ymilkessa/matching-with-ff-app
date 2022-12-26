import NumberBox from "../NumberBox/NumberBox";
import "./NumberRow.css";
import { RootState } from "../../logic/store";
import { useSelector } from "react-redux";
import "./NumberRow.css";
import { NumberBoxArgs } from "../NumberBox/types";
import { NumberRowArgs, RowNum } from "./types";

const NumberRow = ({ row }: NumberRowArgs) => {
  const { setA, setB } = useSelector((state: RootState) => state.sets);
  const { setASize, setBSize } = useSelector(
    (state: RootState) => state.gameSettings
  );
  const numbers = row === RowNum.setA ? setA : setB;
  const setSize = row === RowNum.setA ? setASize : setBSize;
  const numbersToDisplay = numbers.slice(0, setSize);

  // Get the selection and cursor markers.
  const { selection, cursor } = useSelector(
    (state: RootState) => state.selectionAndCursor
  );
  const numberParams: NumberBoxArgs[] = numbersToDisplay.map((num, index) => {
    return { num, row, index };
  });
  // Add the cursor marker to the right NumberBox if in this set
  if (cursor.row === row && cursor.index < numberParams.length) {
    numberParams[cursor.index].boxTags = ["number-box-passing"];
  }
  // Also add the selection marker if it is in this set
  if (selection.row === row && selection.index < numberParams.length) {
    numberParams[selection.index].boxTags = ["number-box-selected"];
  }

  const numberBoxes = numberParams.map((params, index) => (
    // The 'key' element is simply to satisfy a react requirement
    <NumberBox key={index} {...params} />
  ));

  return <div className="row Number-row">{numberBoxes}</div>;
};

export default NumberRow;
