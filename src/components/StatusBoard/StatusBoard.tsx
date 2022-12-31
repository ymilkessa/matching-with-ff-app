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
  addMatching,
  unmatchBox,
} from "../../logic/stateUpdaters/matchingsSlice";
import { SET_NUMBERS } from "../../logic/constants";
import { numbersAreCoprime } from "../../logic/utils";
import { min } from "lodash";
import { generateSets } from "../../logic/stateUpdaters/arraySlice";
import { GameSize } from "../../logic/stateUpdaters/gameSizeSlice";

const StatusBoard = () => {
  const dispatch = useDispatch();
  const { setA, setB } = useSelector((state: RootState) => state.sets);
  const setsInOrder = [setA, setB];
  const { previousSelection, selection } = useSelector(
    (state: RootState) => state.virtualSelection
  );
  const { setAMatches, setBMatches, arrayOfMatches } = useSelector(
    (state: RootState) => state.matchings
  );
  const { setASize, setBSize } = useSelector(
    (state: RootState) => state.gameSettings
  );

  // Get the match value for this box
  const relevantMatches =
    selection &&
    (selection.row === SET_NUMBERS.SET_A ? setAMatches : setBMatches);
  const matchFromOtherSet = selection && relevantMatches?.[selection.index];
  const areYouHereAfterAddingAMatch =
    previousSelection && previousSelection.index === matchFromOtherSet;

  // First move the cursor to where the current selction is
  selection && dispatch(moveCursorMarker(selection));

  if (selection === null) {
    // (0) Nothing to do here. Just re-render.
  } else if (areYouHereAfterAddingAMatch) {
    // (1) Nothing to do here as well. Just re-render.
  } else if (previousSelection === null) {
    // (2) If this is an initiol selection...
    dispatch(addSelectionMarker(selection));
  } else if (matchFromOtherSet && matchFromOtherSet !== UNMATCHED_MARKER) {
    // (3) If this is an unmatch operation...
    dispatch(unmatchBox(selection));
    dispatch(addSelectionMarker(selection));
  } else if (previousSelection.row !== selection.row) {
    // (4) If this selection is from a new row/set, this is a potential match
    const previousNum =
      setsInOrder[previousSelection.row][previousSelection.index];
    const currentNum = setsInOrder[selection.row][selection.index];
    if (numbersAreCoprime(previousNum, currentNum)) {
      // If this is the last match, just reset the game.
      if (arrayOfMatches.length + 1 === min([setASize, setBSize])) {
        // Reset the game.
        dispatch(generateSets({ setASize, setBSize } as GameSize));
      } else {
        dispatch(
          addMatching({
            matching: [previousSelection, selection],
            setASize: setA.length,
            setBSize: setB.length,
          })
        );
      }
    } else {
      dispatch(addErrorMarksFromObjects([previousSelection, selection]));
      setTimeout(() => dispatch(addSelectionMarker(selection)), 1000);
    }
  } else {
    // (5) This is just a new selection within the same set.
    dispatch(addSelectionMarker(selection));
  }

  return (
    <div className="Status-board">
      <div className="inner-status-board">
        {selection ? (
          <div className="current-selection">
            Current Selection: Index {selection.index}, row {selection.row}
          </div>
        ) : (
          ""
        )}
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
