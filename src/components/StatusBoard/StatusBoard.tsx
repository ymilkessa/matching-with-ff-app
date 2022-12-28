import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../logic/store";
import "./StatusBoard.css";
import {
  addErrorMarksFromObjects,
  addSelectionMarker,
  moveCursorMarker,
} from "../../logic/stateUpdaters/markingsSlice";
import {
  UNMATCHED_MARKER,
  addMatchingFromObjects,
  unmatchBox,
} from "../../logic/stateUpdaters/matchingsSlice";
import { SET_NUMBERS } from "../../logic/constants";
import { numbersAreCoprime } from "../../logic/utils";

const StatusBoard = () => {
  const dispatch = useDispatch();
  const { setA, setB } = useSelector((state: RootState) => state.sets);
  const setsInOrder = [setA, setB];
  const { previousSelection, selection } = useSelector(
    (state: RootState) => state.virtualSelection
  );
  const { setAMatches, setBMatches } = useSelector(
    (state: RootState) => state.matchings
  );

  // First move the cursor to where the current selction is
  selection && dispatch(moveCursorMarker(selection));

  // Get the match value for this box
  const relevantMatches =
    selection &&
    (selection.row === SET_NUMBERS.SET_A ? setAMatches : setBMatches);
  const matchFromOtherSet = selection && relevantMatches?.[selection.index];

  if (selection === null) {
    return;
  } else if (previousSelection === null) {
    // (1) If this is an initiol selection...
    dispatch(addSelectionMarker(selection));
  } else if (matchFromOtherSet && matchFromOtherSet !== UNMATCHED_MARKER) {
    // (2) If this is an unmatch operation...
    dispatch(unmatchBox(selection));
    dispatch(addSelectionMarker(selection));
    return;
  } else if (previousSelection.row !== selection.row) {
    // (3) If this selection is from a new row/set, this is a potential match
    const firstNumber =
      setsInOrder[previousSelection.row][previousSelection.index];
    const secondNumber = setsInOrder[selection.row][selection.index];
    if (numbersAreCoprime(firstNumber, secondNumber)) {
      dispatch(addMatchingFromObjects([previousSelection, selection]));
    } else {
      dispatch(addErrorMarksFromObjects([previousSelection, selection]));
    }
  }

  return (
    <div className="Status-board">
      <div className="inner-status-board">
        <div className="current-selection">
          Current Selection: Index {selection.index}, row {selection.row}
        </div>
        {previousSelection ? (
          <div className="previous-selection">
            Last selection: Index {previousSelection.index}, row{" "}
            {previousSelection.row}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default StatusBoard;
