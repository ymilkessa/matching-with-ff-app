import NumberBox from "../NumberBox/NumberBox";
import "./NumberRow.css";
import { RootState } from "../../logic/store";
import { useSelector } from "react-redux";
import "./NumberRow.css";
import { NumberBoxArgs } from "../NumberBox/types";
import { NumberRowArgs } from "./types";
import { SET_NUMBERS } from "../../logic/constants";

const NumberRow = ({ row }: NumberRowArgs) => {
  const { setA, setB } = useSelector((state: RootState) => state.sets);
  const { setASize, setBSize } = useSelector(
    (state: RootState) => state.gameSettings
  );
  const numbers = row === SET_NUMBERS.SET_A ? setA : setB;
  const setSize = row === SET_NUMBERS.SET_A ? setASize : setBSize;
  const numbersToDisplay = numbers.slice(0, setSize);

  // Get the selectedBox and cursorBox markers.
  const { selectedBox, cursorBox } = useSelector(
    (state: RootState) => state.markings
  );
  const numberParams: NumberBoxArgs[] = numbersToDisplay.map((num, index) => {
    return { num, row, index };
  });
  // Add the cursorBox marker to the right NumberBox if in this set
  if (cursorBox.row === row && cursorBox.index < numberParams.length) {
    numberParams[cursorBox.index].boxTags = ["number-box-passing"];
  }
  // Also add the selectedBox marker if it is in this set
  if (
    selectedBox &&
    selectedBox.row === row &&
    selectedBox.index < numberParams.length
  ) {
    numberParams[selectedBox.index].boxTags = ["number-box-selected"];
  }

  const numberBoxes = numberParams.map((params, index) => (
    // The 'key' element is simply to satisfy a react requirement
    <NumberBox key={index} {...params} />
  ));

  return <div className="row Number-row">{numberBoxes}</div>;
};

export default NumberRow;
