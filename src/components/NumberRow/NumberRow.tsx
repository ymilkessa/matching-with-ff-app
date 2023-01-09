import NumberBox from "../NumberBox/NumberBox";
import "./NumberRow.css";
import { RootState } from "../../logic/store";
import { useSelector } from "react-redux";
import "./NumberRow.css";
import { NumberBoxArgs } from "../NumberBox/types";
import { NumberRowArgs } from "./types";
import { SET_NUMBERS } from "../../logic/constants";
import { min } from "lodash";
import { Coloring } from "../../logic/interfaceUtils/coloring";

let coloringScheme: Coloring | null = null;

const NumberRow = ({ row }: NumberRowArgs) => {
  const { setA, setB } = useSelector((state: RootState) => state.sets);
  const { setASize, setBSize } = useSelector(
    (state: RootState) => state.gameSettings
  );
  const gameSize = min([setASize, setBSize]) ?? setBSize; // (appeasing typescript here)
  if (!coloringScheme) {
    coloringScheme = new Coloring(gameSize);
  } else if (coloringScheme.getNumberOfOptions() !== gameSize) {
    coloringScheme = new Coloring(gameSize);
  }
  const numbers = row === SET_NUMBERS.SET_A ? setA : setB;
  const setSize = row === SET_NUMBERS.SET_A ? setASize : setBSize;
  const numbersToDisplay = numbers.slice(0, setSize);
  const numberParams: NumberBoxArgs[] = numbersToDisplay.map((num, index) => {
    return { num, row, index, boxTags: [] };
  });

  // Get the selectedBox and cursorBox markers.
  const { selectedBox, cursorBox } = useSelector(
    (state: RootState) => state.markings
  );

  // Add the cursorBox marker to the right NumberBox if in this set
  if (cursorBox.row === row && cursorBox.index < numberParams.length) {
    numberParams[cursorBox.index].boxTags?.push("number-box-passing");
  }
  // Also add the selectedBox marker if it is in this set
  if (
    selectedBox &&
    selectedBox.row === row &&
    selectedBox.index < numberParams.length
  ) {
    numberParams[selectedBox.index].boxTags?.push("number-box-selected");
  }
  // Now add the unique colorings for the matchings...
  const { arrayOfMatches } = useSelector((state: RootState) => state.matchings);

  for (let k = 0; k < arrayOfMatches.length; k++) {
    const matchedItemIndex = arrayOfMatches[k][row];
    if (!numberParams[matchedItemIndex]) {
    }
    numberParams[matchedItemIndex].matchColor =
      coloringScheme.selectColoring(k);
  }

  const numberBoxes = numberParams.map((params, index) => (
    // The 'key' element is simply to satisfy a react requirement
    <NumberBox key={index} {...params} />
  ));

  return <div className="row Number-row">{numberBoxes}</div>;
};

export default NumberRow;
