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
  clearAllMatchings,
  unmatchBox,
} from "../../logic/stateUpdaters/matchingsSlice";
import { SET_NUMBERS } from "../../logic/constants";
import { numbersAreCoprime } from "../../logic/utils";
import { min } from "lodash";
import { generateSets } from "../../logic/stateUpdaters/arraySlice";
import { GameSize } from "../../logic/stateUpdaters/gameSizeSlice";
import { BoxLocation } from "../NumberBox/types";

type SelectionSnapshot = {
  selection: BoxLocation | null;
  currentlyMatching: boolean;
  newSelection: boolean;
  selectionTime: number;
};

let selectionSnapshot: SelectionSnapshot = {
  selection: null,
  currentlyMatching: false,
  newSelection: false,
  selectionTime: 0,
};

const StatusBoard = () => {
  // State to indicate if this is a match selection or something else
  const dispatch = useDispatch();
  const { setA, setB } = useSelector((state: RootState) => state.sets);
  const setsInOrder = [setA, setB];
  const { previousSelection, selection, selectionTime } = useSelector(
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
  const isCurrentBoxMatched =
    relevantMatches?.length && matchFromOtherSet !== UNMATCHED_MARKER;

  // Get the match value for the previous box
  const relevantMatchesOfPrevBox =
    previousSelection &&
    (previousSelection.row === SET_NUMBERS.SET_A ? setAMatches : setBMatches);
  const matchOfPrevBox =
    previousSelection && relevantMatchesOfPrevBox?.[previousSelection.index];
  const isPreviousBoxMatched =
    previousSelection &&
    relevantMatchesOfPrevBox?.length &&
    matchOfPrevBox !== UNMATCHED_MARKER;

  // Now decide if this selection is a matching operation or not
  if (selection && selectionSnapshot.selectionTime !== selectionTime) {
    const partialSelection = { selection, selectionTime, newSelection: true };
    let currentlyMatching = false;
    if (
      previousSelection &&
      !isCurrentBoxMatched &&
      !isPreviousBoxMatched &&
      previousSelection.row !== selection.row
    ) {
      currentlyMatching = true;
    }
    selectionSnapshot = {
      ...partialSelection,
      currentlyMatching,
    };
  } else if (selectionSnapshot.newSelection) {
    selectionSnapshot = { ...selectionSnapshot, newSelection: false };
  }

  // First move the cursor to where the current selction is
  selection && dispatch(moveCursorMarker(selection));

  if (selection === null) {
    // (0) Nothing to do here. Just re-render.
  } else if (!selectionSnapshot.newSelection) {
    // (1) Nothing to do here as well. Just re-render.
  } else if (isCurrentBoxMatched) {
    // (2) If the new selection is a matched box, then this is an unmatch operation...
    dispatch(unmatchBox(selection));
    dispatch(addSelectionMarker(selection));
  } else if (previousSelection && selectionSnapshot.currentlyMatching) {
    // (3) If this new selection is a matching operation
    const previousNum =
      setsInOrder[previousSelection.row][previousSelection.index];
    const currentNum = setsInOrder[selection.row][selection.index];
    if (numbersAreCoprime(previousNum, currentNum)) {
      // If this is the last match, just reset the game.
      if (arrayOfMatches.length + 1 === min([setASize, setBSize])) {
        // Reset the game.
        dispatch(generateSets({ setASize, setBSize } as GameSize));
        dispatch(clearAllMatchings(undefined));
        dispatch(addSelectionMarker(selection));
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
    // (4) Just a new selection. No matching/unmatching.
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
